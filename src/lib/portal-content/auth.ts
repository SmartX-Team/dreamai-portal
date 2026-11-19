import { createHash, createHmac, randomBytes, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { ContentError, isDraftSite } from "./server";

const sessionName = "dreamai-editor-session";
const loginName = "dreamai-editor-oauth";
const sessionSeconds = 60 * 60 * 4;
const loginSeconds = 60 * 10;
type Login = { state: string; verifier: string; returnTo: string };
type Identity = { login: string; id: number; email: string };

function settings() {
  const origin = process.env.DREAMAI_EDITOR_ORIGIN;
  const clientId = process.env.DREAMAI_GITHUB_CLIENT_ID;
  const clientSecret = process.env.DREAMAI_GITHUB_CLIENT_SECRET;
  const sessionSecret = process.env.DREAMAI_EDITOR_SESSION_SECRET;
  if (!isDraftSite() || !origin || !clientId || !clientSecret || !sessionSecret || sessionSecret.length < 32) return;

  const address = new URL(origin);
  if (address.protocol !== "https:" && !["localhost", "127.0.0.1"].includes(address.hostname)) return;
  return { origin: address.origin, clientId, clientSecret, sessionSecret, secure: address.protocol === "https:" };
}

export function editorAvailable() {
  return isDraftSite() && Boolean(process.env.DREAMAI_CONTENT_DIR);
}

function requireSettings() {
  const config = settings();
  if (!config) throw new ContentError("GitHub 로그인이 아직 설정되지 않았습니다.", 503);
  return config;
}

function wrap<T>(value: T, maxAge: number, secret: string) {
  const payload = Buffer.from(JSON.stringify({ value, expires: Date.now() + maxAge * 1000 })).toString("base64url");
  const signature = createHmac("sha256", secret).update(payload).digest("base64url");
  return `${payload}.${signature}`;
}

function unwrap<T>(token: string | undefined, secret: string): T | undefined {
  if (!token) return;
  const [payload, signature, extra] = token.split(".");
  if (!payload || !signature || extra !== undefined) return;
  const expected = createHmac("sha256", secret).update(payload).digest();
  const received = Buffer.from(signature, "base64url");
  if (received.length !== expected.length || !timingSafeEqual(received, expected)) return;
  try {
    const parsed = JSON.parse(Buffer.from(payload, "base64url").toString()) as { value: T; expires: number };
    if (typeof parsed.expires === "number" && parsed.expires > Date.now()) return parsed.value;
  } catch {
    return;
  }
}

function getPublisherEmail() {
  return process.env.DREAMAI_PUBLISHER_EMAIL?.trim().toLowerCase();
}

function allowedEmails() {
  return [getPublisherEmail() ?? "", ...(process.env.DREAMAI_EDITOR_EMAILS ?? "").split(",")]
    .map((value) => value.trim().toLowerCase())
    .filter(Boolean);
}

export async function getEditorIdentity() {
  const config = settings();
  if (!config) return;
  const identity = unwrap<Identity>((await cookies()).get(sessionName)?.value, config.sessionSecret);
  if (identity && allowedEmails().includes(identity.email)) return identity;
}

export function canPublish(identity: Identity) {
  const accountId = process.env.DREAMAI_PUBLISHER_GITHUB_ID;
  return identity.email === getPublisherEmail() && (!accountId || String(identity.id) === accountId);
}

export function requireSameOrigin(request: Request) {
  if (request.headers.get("origin") !== requireSettings().origin) throw new ContentError("이 사이트에서 보낸 요청만 허용됩니다.", 403);
}

function cookieOptions(secure: boolean, maxAge: number) {
  return { httpOnly: true, sameSite: "lax" as const, secure, path: "/", maxAge };
}

export function beginGithubLogin(request: Request) {
  const config = requireSettings();
  const requested = new URL(request.url).searchParams.get("returnTo") ?? "/";
  const candidate = requested.startsWith("/") ? new URL(requested, config.origin) : new URL(config.origin);
  const returnTo = candidate.origin === config.origin ? candidate.pathname + candidate.search : "/";
  const state = randomBytes(32).toString("base64url");
  const verifier = randomBytes(32).toString("base64url");
  const authorize = new URL("https://github.com/login/oauth/authorize");
  authorize.search = new URLSearchParams({
    client_id: config.clientId,
    redirect_uri: config.origin + "/api/portal-content/callback",
    scope: "user:email",
    state,
    code_challenge_method: "S256",
    code_challenge: createHash("sha256").update(verifier).digest("base64url"),
  }).toString();
  const response = NextResponse.redirect(authorize);
  response.cookies.set(loginName, wrap({ state, verifier, returnTo }, loginSeconds, config.sessionSecret), cookieOptions(config.secure, loginSeconds));
  return response;
}

export async function finishGithubLogin(request: Request) {
  const config = requireSettings();
  const login = unwrap<Login>((await cookies()).get(loginName)?.value, config.sessionSecret);
  const params = new URL(request.url).searchParams;
  const code = params.get("code");
  if (!code || !login || params.get("state") !== login.state) throw new ContentError("GitHub 로그인을 다시 시작하세요.", 401);
  const tokenResponse = await fetch("https://github.com/login/oauth/access_token", {
    method: "POST",
    headers: { Accept: "application/json" },
    body: new URLSearchParams({
      client_id: config.clientId, client_secret: config.clientSecret, code,
      code_verifier: login.verifier, redirect_uri: config.origin + "/api/portal-content/callback",
    }),
    cache: "no-store",
    signal: AbortSignal.timeout(8_000),
  });
  const token = (await tokenResponse.json() as { access_token?: string }).access_token;
  if (!tokenResponse.ok || !token) throw new ContentError("GitHub에서 로그인 확인을 받지 못했습니다.", 401);
  const options = {
    headers: { Authorization: `Bearer ${token}`, Accept: "application/vnd.github+json" },
    cache: "no-store" as const,
    signal: AbortSignal.timeout(8_000),
  };
  const [userResponse, emailResponse] = await Promise.all([
    fetch("https://api.github.com/user", options),
    fetch("https://api.github.com/user/emails?per_page=100", options),
  ]);
  if (!userResponse.ok || !emailResponse.ok) throw new ContentError("GitHub 계정 정보를 확인하지 못했습니다.", 401);
  const user = await userResponse.json() as { login: string; id: number };
  const addresses = await emailResponse.json() as { email: string; verified: boolean }[];
  const verified = addresses.filter((entry) => entry.verified).map((entry) => entry.email.toLowerCase());
  const email = allowedEmails().find((entry) => verified.includes(entry));
  if (!email || !user.login || !Number.isSafeInteger(user.id)) throw new ContentError("이 GitHub 계정에는 편집 권한이 없습니다.", 403);
  const response = NextResponse.redirect(new URL(login.returnTo, config.origin));
  response.cookies.set(sessionName, wrap({ login: user.login, id: user.id, email }, sessionSeconds, config.sessionSecret), cookieOptions(config.secure, sessionSeconds));
  response.cookies.set(loginName, "", cookieOptions(config.secure, 0));
  return response;
}

export function clearEditorSession() {
  const config = requireSettings();
  const response = NextResponse.json({ signedOut: true });
  response.cookies.set(sessionName, "", cookieOptions(config.secure, 0));
  return response;
}

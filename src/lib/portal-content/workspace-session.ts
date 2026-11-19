import { createHash, randomBytes, timingSafeEqual } from "node:crypto";
import { readFile } from "node:fs/promises";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import type { SiteState } from "./registry";
import { ContentError, isDraftSite, readState, updateState } from "./server";

const cookieName = "dreamai-workspace";
const sessionSeconds = 8 * 60 * 60;

export function workspaceProtected() {
  return isDraftSite() && Boolean(process.env.DREAMAI_EDITOR_PASSWORD_FILE);
}

export function editorOrigin() {
  const origin = process.env.DREAMAI_EDITOR_ORIGIN;
  if (!origin) throw new ContentError("편집 사이트 주소가 아직 설정되지 않았습니다.", 503);
  return new URL(origin).origin;
}

export async function workspaceToken() {
  if (!workspaceProtected()) return;
  return (await cookies()).get(cookieName)?.value;
}

export function isWorkspaceSession(state: SiteState, token?: string) {
  return Boolean(token && state.editSession?.id === token && state.editSession.expires > Date.now());
}

export async function requireWorkspace(token?: string) {
  const activeToken = token ?? await workspaceToken();
  if (!activeToken || !isWorkspaceSession(await readState(), activeToken)) {
    throw new ContentError("다른 사용자의 로그인으로 로그아웃되었거나 세션이 만료되었습니다.", 401);
  }
  return activeToken;
}

export async function openWorkspace(password: unknown, replace: boolean) {
  const filename = process.env.DREAMAI_EDITOR_PASSWORD_FILE;
  if (!workspaceProtected() || !filename) throw new ContentError("비밀번호 로그인이 설정되지 않았습니다.", 503);
  if (typeof password !== "string" || password.length > 256) throw new ContentError("비밀번호가 올바르지 않습니다.", 401);
  const expected = (await readFile(filename, "utf8")).trim();
  if (expected.length < 16) throw new ContentError("편집 비밀번호 설정을 확인하세요.", 503);
  const hash = (value: string) => createHash("sha256").update(value).digest();
  if (!timingSafeEqual(hash(password), hash(expected))) {
    await new Promise((resolve) => setTimeout(resolve, 500));
    throw new ContentError("비밀번호가 올바르지 않습니다.", 401);
  }
  const id = randomBytes(32).toString("base64url");
  await updateState((state) => {
    if (!replace && state.editSession && state.editSession.expires > Date.now()) {
      throw new ContentError("다른 사용자가 편집 중입니다. 기존 사용자를 로그아웃할까요?", 409);
    }
    state.editSession = { id, expires: Date.now() + sessionSeconds * 1000 };
  });
  const response = NextResponse.json({ signedIn: true }, { headers: { "Cache-Control": "no-store" } });
  response.cookies.set(cookieName, id, {
    httpOnly: true, secure: editorOrigin().startsWith("https:"), sameSite: "lax", path: "/", maxAge: sessionSeconds,
  });
  return response;
}

export async function closeWorkspace(token: string) {
  await updateState((state) => {
    if (isWorkspaceSession(state, token)) delete state.editSession;
  });
  const response = NextResponse.json({ signedOut: true }, { headers: { "Cache-Control": "no-store" } });
  response.cookies.set(cookieName, "", { path: "/", maxAge: 0 });
  return response;
}

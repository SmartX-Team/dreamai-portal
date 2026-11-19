"use client";

import { useEffect, useState, type FormEvent } from "react";
import styles from "./editor.module.css";

export function WorkspaceLogin({ displaced }: { displaced: boolean }) {
  const [password, setPassword] = useState("");
  const [replace, setReplace] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy(true);
    setError("");
    try {
      const response = await fetch("/api/portal-content/access", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password, replace }),
      });
      if (response.ok) {
        window.location.reload();
        return;
      }
      if (response.status === 409) {
        setReplace(true);
      } else {
        setReplace(false);
        const data = await response.json().catch(() => null);
        setError(data?.error ?? "로그인하지 못했습니다.");
      }
    } catch {
      setError("로그인 서버에 연결할 수 없습니다.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <main id="dreamai-workspace-login" className={styles.login}>
      <form onSubmit={submit} className={styles.loginCard}>
        <p>DreamAI 시험판</p>
        <h1>편집기에 로그인</h1>
        {displaced && <p role="alert">다른 사용자의 로그인으로 로그아웃되었거나 편집 시간이 만료되었습니다.</p>}
        {replace ? (
          <>
            <p role="alert">다른 사용자가 편집 중입니다. 기존 사용자를 로그아웃하고 편집을 시작할까요?</p>
            <button type="submit" disabled={busy}>기존 사용자 로그아웃</button>
            <button type="button" onClick={() => { setReplace(false); setPassword(""); }}>취소</button>
          </>
        ) : (
          <>
            <label>편집 비밀번호
              <input type="password" required autoComplete="current-password" autoFocus value={password}
                onChange={(event) => setPassword(event.target.value)} />
            </label>
            <button type="submit" disabled={busy}>로그인</button>
          </>
        )}
        {error && <p role="alert" className={styles.error}>{error}</p>}
      </form>
    </main>
  );
}

export function SessionMonitor() {
  useEffect(() => {
    let stopped = false;
    async function check() {
      try {
        const response = await fetch("/api/portal-content/session", { cache: "no-store" });
        if (!stopped && response.status === 401) window.location.reload();
      } catch {
        // Retry on the next heartbeat when connectivity returns.
      }
    }
    const timer = setInterval(() => void check(), 4000);
    document.addEventListener("visibilitychange", check);
    return () => {
      stopped = true;
      clearInterval(timer);
      document.removeEventListener("visibilitychange", check);
    };
  }, []);
  return null;
}

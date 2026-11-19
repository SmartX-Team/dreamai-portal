"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useEffectEvent, useId, useRef, useState, type FormEvent } from "react";
import { pageNames, portalPageForPath, type Field, type PortalPage } from "./registry";
import { EditMarkers, matchFields, normalize, PencilIcon } from "./edit-markers";
import { WidgetEditor } from "./widget-editor";
import { defaultWidgets, isWidgetZone, widgetZones, type Widget, type WidgetLayouts, type WidgetZone } from "./widgets";
import styles from "./editor.module.css";

type Draft = { fields: Field[]; revision: string; published: boolean; canPublish: boolean; releaseSite: string; layouts: WidgetLayouts };
type Change = { value: string; filename?: string };
const api = "/api/portal-content";
const imageAccept = "image/png,image/jpeg,image/webp,image/gif";
const videoAccept = "video/mp4,video/webm";
const kindNames = { image: "이미지", text: "문구", link: "링크" };

async function apiRequest<T>(action: string, options?: RequestInit): Promise<T> {
  const response = await fetch(`${api}/${action}`, { cache: "no-store", ...options });
  const data = await response.json().catch(() => null);
  if (!response.ok) throw new Error(data?.error ?? "요청을 완료하지 못했습니다.");
  return data as T;
}

function uploadImage(file: File) {
  return apiRequest<{ url: string }>("upload", { method: "POST", body: file });
}

function messageFor(error: unknown) {
  return error instanceof Error ? error.message : "다시 시도해 주세요.";
}

function ImageUpload({ onUpload, caption = "이미지 선택, 끌어놓기 또는 붙여넣기", autoFocus = false, accept = imageAccept }: {
  onUpload: (url: string, filename: string) => void;
  caption?: string;
  autoFocus?: boolean;
  accept?: string;
}) {
  const id = useId();
  const zone = useRef<HTMLLabelElement>(null);
  useEffect(() => { if (autoFocus) zone.current?.focus(); }, [autoFocus]);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  async function choose(file: File | undefined) {
    if (!file || busy) return;
    setBusy(true);
    setError("");
    try {
      if (file.type && !accept.split(",").includes(file.type)) throw new Error("이 항목에 맞는 파일 형식을 선택하세요.");
      onUpload((await uploadImage(file)).url, file.name);
    } catch (failure) {
      setError(messageFor(failure));
    } finally {
      setBusy(false);
    }
  }
  return (
    <div>
      <label ref={zone} className={styles.drop} htmlFor={id} tabIndex={0}
        onPaste={(event) => {
          const file = event.clipboardData.files[0];
          if (file) { event.preventDefault(); void choose(file); }
        }}
        onDragOver={(event) => event.preventDefault()}
        onDrop={(event) => { event.preventDefault(); void choose(event.dataTransfer.files[0]); }}>
        <span>{busy ? "업로드 중…" : caption}</span>
        <input id={id} type="file" disabled={busy} accept={accept}
          onChange={(event) => { void choose(event.target.files?.[0]); event.currentTarget.value = ""; }} />
      </label>
      {error && <p className={styles.error} role="alert">{error}</p>}
    </div>
  );
}

function EditField({ field, change, edit, reset, saving }: {
  field: Field;
  change?: Change;
  edit: (change: Change) => void;
  reset: () => void;
  saving: boolean;
}) {
  const value = change?.value ?? field.value;
  const replacement = change?.filename;
  const form = useRef<HTMLFormElement>(null);
  useEffect(() => { form.current?.scrollIntoView({ block: "nearest" }); }, []);
  return (
    <form ref={form} className={styles.form} onSubmit={(event) => event.preventDefault()}>
      <h3>{field.label}</h3>
      {field.kind === "image" ? (
        <>
          <div className={styles.fileInfo}>현재 파일 <strong>{field.filename ?? "등록된 파일 없음"}</strong></div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          {value && <img className={styles.image} src={value} alt="선택한 이미지 미리보기" />}
          {replacement && <div className={styles.fileInfo}>교체할 파일 <strong>{replacement}</strong></div>}
          <ImageUpload autoFocus onUpload={(url, filename) => edit({ value: url, filename })} />
        </>
      ) : (
        <label>
          {kindNames[field.kind]}
          <textarea autoFocus rows={field.kind === "text" ? 5 : 2} required maxLength={16000}
            value={value} onChange={(event) => edit({ value: event.target.value })} />
        </label>
      )}
      {change && !value.trim() && <span className={styles.error}>내용을 입력하면 자동 저장됩니다.</span>}
      {change && <button type="button" disabled={saving} onClick={reset}>저장 전 변경 취소</button>}
    </form>
  );
}

function CourseForm({ disabled, save }: { disabled: boolean; save: (value: object) => void }) {
  const [imageUrl, setImageUrl] = useState("");
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    save({ ...Object.fromEntries(data), imageUrl, isRegistrationOpen: data.has("isRegistrationOpen") });
  }
  return (
    <form className={styles.form} onSubmit={submit}>
      <h3>과정 추가</h3>
      <label>과정 이름<input name="title" required maxLength={250} /></label>
      <label>교육 시간<input name="duration" required maxLength={120} placeholder="예: 1일 4시간" /></label>
      <div className={styles.columns}>
        <label>분류<select name="category"><option>Core</option><option>AgenticAI</option><option>DT&amp;Robot</option></select></label>
        <label>난이도<select name="level"><option>체험</option><option>집중</option><option>심화</option></select></label>
      </div>
      <label>설명<textarea name="description" rows={3} maxLength={16000} /></label>
      <label>신청 링크<input name="formUrl" type="url" maxLength={2048} /></label>
      <label className={styles.checkbox}><input name="isRegistrationOpen" type="checkbox" /> 신청 버튼 표시</label>
      <ImageUpload onUpload={setImageUrl} caption={imageUrl ? "포스터 업로드 완료 · 교체하려면 선택" : "과정 포스터 업로드"} />
      <button type="submit" className={styles.primary} disabled={disabled}>시험판에 과정 추가</button>
    </form>
  );
}

function EditorPanel({ login, page, workspace }: { login: string; page: PortalPage; workspace: boolean }) {
  const router = useRouter();
  const [open, setOpen] = useState(workspace);
  const [pane, setPane] = useState(false);
  const [draft, setDraft] = useState<Draft>();
  const [selected, setSelected] = useState<string>();
  const [adding, setAdding] = useState(false);
  const [search, setSearch] = useState("");
  const [clickMatches, setClickMatches] = useState<string[]>();
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const [changes, setChanges] = useState<Record<string, Change>>({});
  const [layoutChanges, setLayoutChanges] = useState<WidgetLayouts>({});
  const [zone, setZone] = useState<WidgetZone>();
  const [widget, setWidget] = useState<string>();
  const request = useRef(0);
  const field = draft?.fields.find((entry) => entry.id === selected);
  const dirty = Object.keys(changes).length > 0 || Object.keys(layoutChanges).length > 0;
  const availableZones = (Object.keys(widgetZones) as WidgetZone[]).filter((key) => widgetZones[key].page === page);

  async function load() {
    const current = ++request.current;
    setError("");
    try {
      const data = await apiRequest<Draft>(`draft?page=${encodeURIComponent(page)}`);
      if (request.current === current) setDraft(data);
    } catch (failure) {
      if (request.current === current) setError(messageFor(failure));
    }
  }

  useEffect(() => {
    if (!workspace) return;
    let canceled = false;
    apiRequest<Draft>(`draft?page=${encodeURIComponent(page)}`).then(
      (data) => { if (!canceled) setDraft(data); },
      (failure) => { if (!canceled) setError(messageFor(failure)); },
    );
    return () => { canceled = true; };
  }, [page, workspace]);

  function select(id: string) {
    if (id.startsWith("widget:")) {
      const [, key, item] = id.split(":");
      if (isWidgetZone(key)) { setZone(key); setWidget(item); setPane(true); setSelected(undefined); setAdding(false); }
      return;
    }
    setSelected(id);
    setZone(undefined);
    setPane(true);
    setAdding(false);
    setNotice("");
    setError("");
  }

  function showList() {
    setPane(true);
    setSelected(undefined);
    setAdding(false);
    setZone(undefined);
    setClickMatches(undefined);
    setSearch("");
  }

  function showPreview() {
    setPane(false);
    setSelected(undefined);
    setZone(undefined);
    setAdding(false);
    setOpen(false);
  }

  useEffect(() => {
    if (!open || !draft) return;
    const fields = draft.fields;
    function locate(event: MouseEvent) {
      if (!(event.target instanceof Element) || !event.target.closest("#portal-page")) return;
      const matches = matchFields(event.target, fields);
      if (!matches.length) return;
      event.preventDefault();
      event.stopPropagation();
      setSearch("");
      setClickMatches(matches.map((entry) => entry.id));
      if (matches.length === 1) select(matches[0].id);
      else { setSelected(undefined); setAdding(false); setZone(undefined); setPane(true); }
    }
    document.addEventListener("click", locate, true);
    return () => document.removeEventListener("click", locate, true);
  }, [open, draft]);

  async function mutate(action: "save" | "course" | "layout" | "publish" | "logout", data?: object) {
    if (pending || (!draft && action !== "logout")) return;
    setPending(true);
    setError("");
    setNotice("");
    try {
      const next = await apiRequest<Draft>(action, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ page, revision: draft?.revision, ...data }),
      });
      if (action === "logout") { window.location.reload(); return; }
      setDraft(next);
      if (action === "course") setAdding(false);
      if (action === "save" && data && "id" in data && "value" in data) {
        const { id, value } = data as { id: string; value: string };
        setChanges((previous) => {
          const next = { ...previous };
          if (previous[id]?.value === value) delete next[id];
          return next;
        });
      }
      if (action === "layout" && data && "zone" in data && "widgets" in data) {
        const { zone: key, widgets } = data as { zone: WidgetZone; widgets: Widget[] };
        setLayoutChanges((current) => {
          if (current[key] !== widgets) return current;
          const next = { ...current };
          delete next[key];
          return next;
        });
      }
      setNotice(action === "publish" ? `${next.releaseSite}에 게시했습니다.` : "시험판에 저장했습니다.");
      router.refresh();
    } catch (failure) {
      setError(messageFor(failure));
    } finally {
      setPending(false);
    }
  }

  const saveQueued = useEffectEvent(() => {
    const entry = Object.entries(changes).find(([, change]) => change.value.trim());
    if (entry) {
      const [id, change] = entry;
      void mutate("save", { id, ...change });
      return;
    }
    const pendingZone = (Object.keys(layoutChanges) as WidgetZone[])[0];
    if (pendingZone) void mutate("layout", { zone: pendingZone, widgets: layoutChanges[pendingZone] });
  });

  useEffect(() => {
    if (!dirty || pending || error || !draft) return;
    const timer = setTimeout(saveQueued, 450);
    return () => clearTimeout(timer);
  }, [changes, layoutChanges, dirty, draft, error, pending]);

  useEffect(() => {
    if (!dirty) return;
    const warn = (event: BeforeUnloadEvent) => event.preventDefault();
    window.addEventListener("beforeunload", warn);
    return () => window.removeEventListener("beforeunload", warn);
  }, [dirty]);

  const visible = draft?.fields.filter((item) => {
    if (clickMatches && !clickMatches.includes(item.id)) return false;
    return normalize(item.label + " " + item.value).toLowerCase().includes(search.trim().toLowerCase());
  });
  const publishButton = draft?.canPublish ? (
    <button type="button" className={pane ? styles.primary : styles.publish} disabled={dirty || pending || draft.published}
      title={draft.releaseSite} onClick={() => void mutate("publish")}>배포하기</button>
  ) : null;

  if (!open) return <button type="button" className={styles.launch} onClick={() => { setOpen(true); void load(); }}>
    <PencilIcon /> 페이지 편집
  </button>;

  return (
    <>
    {draft && <EditMarkers fields={draft.fields} paneVisible={pane} selected={selected} onSelect={select} />}
    {!pane && publishButton}
    {!pane && <div className={styles.toolbar} aria-label="편집 도구">
      {!draft && !error && <span role="status">편집 항목을 불러오는 중…</span>}
      {draft && <span>화면의 연필을 눌러 수정</span>}
      {error && <span role="alert">{error}</span>}
      {error && <button type="button" onClick={() => void load()}>다시 시도</button>}
      {draft && <button type="button" onClick={showList}>편집 항목</button>}
      {dirty && <span role="status">자동 저장 대기 중</span>}
      {notice && <span role="status" className={styles.success}>{notice}</span>}
      <button type="button" disabled={dirty || pending} onClick={showPreview}>미리보기</button>
      {workspace && <button type="button" disabled={dirty || pending} onClick={() => void mutate("logout")}>로그아웃</button>}
    </div>}
    {pane && <aside id="portal-editor-panel" className={styles.panel} aria-label="페이지 편집">
      <header className={styles.header}>
        <div><p>DreamAI 시험판</p><h2>페이지 편집</h2></div>
        {publishButton}
        <button type="button" onClick={() => setPane(false)} aria-label="편집 패널 닫기">닫기</button>
      </header>
      <div className={styles.body}>
        {field || adding || zone ? <button type="button" onClick={showList}>← 편집 항목</button> : <>
        <nav className={styles.pages} aria-label="편집 가능한 페이지">
          {Object.entries(pageNames).map(([href, label]) => (
            <Link key={href} href={href} aria-current={href === page ? "page" : undefined}
              onClick={(event) => { if (dirty || pending) event.preventDefault(); }}>{label}</Link>
          ))}
        </nav>
        {!draft && !error && <p role="status">편집 항목을 불러오는 중…</p>}
        {draft && (
            <div className={styles.section}>
              <h3>{pageNames[page]}</h3>
              <p>화면의 연필 아이콘을 누르거나 아래 목록에서 선택하세요.</p>
              <input aria-label="편집 항목 검색" placeholder="항목 검색" type="search" value={search}
                onChange={(event) => { setClickMatches(undefined); setSearch(event.target.value); }} />
              {clickMatches && <button onClick={() => setClickMatches(undefined)}>모든 항목 보기</button>}
              <div className={styles.fields}>
                {visible?.map((item) => (
                  <button key={item.id} type="button" aria-pressed={item.id === selected} onClick={() => select(item.id)}>
                    <span>{kindNames[item.kind]}</span><span>{item.label}</span>
                  </button>
                ))}
                {!visible?.length && <p>일치하는 항목이 없습니다.</p>}
              </div>
              <h3>배치할 영역</h3>
              <div className={styles.pages}>
                {availableZones.map((key) => <button key={key} type="button" onClick={() => { setZone(key); setWidget(undefined); }}>
                  {widgetZones[key].name}
                </button>)}
              </div>
              {page === "/training" && <button onClick={() => { setAdding(true); setSelected(undefined); }}>＋ 과정 추가</button>}
            </div>
        )}
        </>}
        {field && !adding && <EditField key={field.id} field={field} change={changes[field.id]} saving={pending}
          edit={(change) => {
            setError("");
            setChanges((current) => {
            const next = { ...current };
            if (change.value === field.value && !pending) delete next[field.id];
            else next[field.id] = change;
            return next;
            });
          }}
          reset={() => {
            setChanges((current) => { const next = { ...current }; delete next[field.id]; return next; });
            setError("");
          }} />}
        {adding && <CourseForm disabled={pending || dirty} save={(course) => void mutate("course", { course })} />}
        {zone && draft && (
          <WidgetEditor key={zone} zone={zone} items={layoutChanges[zone] ?? draft.layouts[zone] ?? defaultWidgets(zone)}
            selected={widget} select={setWidget}
            update={(widgets) => { setError(""); setLayoutChanges((current) => ({ ...current, [zone]: widgets })); }}
            upload={(kind, onUpload) => <ImageUpload accept={kind === "image" ? imageAccept : videoAccept}
              caption={kind === "image" ? "이미지 끌어놓기 또는 붙여넣기" : "동영상 끌어놓기 또는 붙여넣기"}
              onUpload={onUpload} />} />
        )}
        {error && <p role="alert" className={styles.error}>{error} <button onClick={() => void load()}>새로고침</button></p>}
        {notice && <p role="status" className={styles.success}>{notice}</p>}
      </div>
      <footer className={styles.footer}>
        <span>@{login}</span>
        {dirty && <span role="status">자동 저장 대기 중</span>}
        <button type="button" disabled={dirty || pending} onClick={showPreview}>미리보기</button>
        <button disabled={pending || dirty} onClick={() => void mutate("logout")}>로그아웃</button>
      </footer>
    </aside>}
    </>
  );
}

export function PortalEditor({ login, workspace = false }: { login?: string; workspace?: boolean }) {
  const pathname = usePathname();
  const page = portalPageForPath(pathname);
  if (!page) return null;
  if (!login && !workspace) return <a className={styles.launch} href={`${api}/login?returnTo=${encodeURIComponent(pathname)}`}>GitHub로 편집 로그인</a>;
  return <EditorPanel key={pathname} login={login ?? "편집자"} page={page} workspace={workspace} />;
}

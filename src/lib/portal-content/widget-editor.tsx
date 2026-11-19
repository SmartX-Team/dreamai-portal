"use client";

import { useRef, type ReactNode } from "react";
import { defaultWidgets, getZoneItems, moveWidget, widgetLabel, type Widget, type WidgetType, type WidgetZone } from "./widgets";
import styles from "./editor.module.css";

type Upload = (kind: "image" | "video", receive: (url: string, filename: string) => void) => ReactNode;

const palette: Array<[Exclude<WidgetType, "existing">, string]> = [
  ["heading", "제목"], ["text", "문구"], ["image", "이미지"], ["video", "동영상"], ["link", "링크"],
  ["divider", "구분선"], ["spacer", "여백"],
];

export function WidgetEditor({ zone, items, selected, select, update, upload }: {
  zone: WidgetZone;
  items: Widget[];
  selected?: string;
  select: (id: string | undefined) => void;
  update: (items: Widget[]) => void;
  upload: Upload;
}) {
  const dragged = useRef<string>(null);
  const current = items.find((item) => item.id === selected);
  const missing = getZoneItems(zone).filter(([slot]) => !items.some((item) => item.slot === slot));

  function add(type: WidgetType, slot?: string) {
    const item = { id: slot ?? crypto.randomUUID(), type, slot };
    update([...items, item]);
    select(item.id);
  }

  function reorder(id: string, target: string | number) {
    const next = moveWidget(items, id, target);
    if (next !== items) update(next);
  }

  function change(fields: Partial<Widget>) {
    update(items.map((item) => item.id === selected ? { ...item, ...fields } : item));
  }

  function remove(id: string) {
    update(items.filter((item) => item.id !== id));
    if (selected === id) select(undefined);
  }

  return (
    <section className={styles.section} aria-label="위젯 배치 편집기">
      <h3>요소 배치</h3>
      <p>순서 손잡이를 끌거나 화살표 버튼으로 위치를 바꿉니다.</p>
      <ol className={styles.widgetList}>
        {items.map((item, index) => {
          const name = widgetLabel(zone, item);
          return (
            <li key={item.id} onDragOver={(event) => { if (dragged.current) event.preventDefault(); }}
              onDrop={(event) => {
                if (!dragged.current) return;
                event.preventDefault();
                reorder(dragged.current, item.id);
                dragged.current = null;
              }}>
              <button type="button" draggable aria-label={`${name} 위치 이동`} className={styles.handle}
                onDragStart={(event) => { dragged.current = item.id; event.dataTransfer.setData("text/plain", item.id); }}
                onDragEnd={() => { dragged.current = null; }}>⠿</button>
              <button type="button" aria-pressed={selected === item.id} onClick={() => select(item.id)}>{name}</button>
              <button type="button" aria-label={`${name} 위로 이동`} disabled={index === 0} onClick={() => reorder(item.id, -1)}>↑</button>
              <button type="button" aria-label={`${name} 아래로 이동`} disabled={index === items.length - 1} onClick={() => reorder(item.id, 1)}>↓</button>
            </li>
          );
        })}
      </ol>
      {current && (
        <div className={styles.widgetProperties}>
          <label>너비<select value={current.width ?? ""} onChange={(event) => change({ width: (event.target.value || undefined) as Widget["width"] })}>
            <option value="">영역 기본값</option><option value="full">한 줄 전체</option>
            <option value="half">한 줄의 절반</option><option value="third">한 줄의 3분의 1</option>
          </select></label>
          {["heading", "text", "link", "image", "video"].includes(current.type) && (
            <label>{current.type === "image" || current.type === "video" ? "파일 설명" : "문구"}
              <textarea rows={2} maxLength={16000} value={current.text ?? ""} onChange={(event) => change({ text: event.target.value })} />
            </label>
          )}
          {current.type === "link" && <label>링크 주소<input value={current.href ?? ""} maxLength={2048}
            onChange={(event) => change({ href: event.target.value })} /></label>}
          {(current.type === "image" || current.type === "video") && (
            <>
              {current.filename && <span className={styles.fileInfo}>{current.filename}</span>}
              {upload(current.type, (src, filename) => change({ src, filename }))}
            </>
          )}
          <button type="button" onClick={() => remove(current.id)}>요소 제거</button>
        </div>
      )}
      <div>
        <h3>요소 추가</h3>
        <div className={styles.pages}>{palette.map(([type, name]) => <button type="button" key={type} onClick={() => add(type)}>{name}</button>)}</div>
      </div>
      {missing.length > 0 && <div>
        <h3>기존 요소 추가</h3>
        <div className={styles.pages}>{missing.map(([slot, name]) => <button type="button" key={slot} onClick={() => add("existing", slot)}>{name}</button>)}</div>
      </div>}
      <div className={styles.pages}>
        <button type="button" disabled={!items.length} onClick={() => { select(undefined); update([]); }}>빈 배치로 시작</button>
        <button type="button" onClick={() => { select(undefined); update(defaultWidgets(zone)); }}>기존 배치 복원</button>
      </div>
    </section>
  );
}

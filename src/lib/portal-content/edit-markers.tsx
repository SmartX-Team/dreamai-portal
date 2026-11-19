"use client";

import { useEffect, useRef, useState } from "react";
import type { Field } from "./registry";
import styles from "./editor.module.css";

type Marker = { id: string; label: string; x: number; y: number };

export function PencilIcon() {
  return <svg aria-hidden="true" viewBox="0 0 24 24" width="17" height="17" fill="none"
    stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="m14.5 5.5 4 4m-13 9 4-.8L20 7.2a2.8 2.8 0 0 0-4-4L5.5 13.7l-.8 4.8z" />
  </svg>;
}

export function normalize(value: string) {
  return value.replace(/\s+/g, " ").trim();
}

function fieldIndex(fields: Field[]) {
  const byId = new Map(fields.map((field) => [field.id, field]));
  const byValue = new Map<string, Field[]>();
  for (const field of fields) {
    const value = normalize(field.value);
    if (!value || field.kind === "link") continue;
    const matches = byValue.get(value) ?? [];
    matches.push(field);
    byValue.set(value, matches);
  }
  return { byId, byValue };
}

function elementFields(element: Element, index: ReturnType<typeof fieldIndex>) {
  const id = element.getAttribute("data-portal-field");
  if (id) {
    const field = index.byId.get(id);
    return field ? [field] : [];
  }

  let value = "";
  let image = false;
  if (element instanceof HTMLImageElement) {
    const raw = element.getAttribute("src");
    if (!raw) return [];
    const source = URL.parse(raw, location.origin);
    value = source?.pathname === "/_next/image" ? source.searchParams.get("url") ?? raw : raw;
    image = true;
  } else if (element instanceof HTMLElement) {
    const background = element.style.backgroundImage.match(/^url\(["']?(.+?)["']?\)$/)?.[1];
    value = background ?? element.textContent ?? "";
    image = Boolean(background);
  }
  return (index.byValue.get(normalize(value)) ?? []).filter((field) => image === (field.kind === "image"));
}

export function matchFields(target: Element, fields: Field[]) {
  const index = fieldIndex(fields);
  for (let element: Element | null = target; element && element.id !== "portal-page"; element = element.parentElement) {
    const matches = elementFields(element, index);
    if (matches.length) return matches;
  }
  return [];
}

function getMarkers(root: HTMLElement, fields: Field[], panel: HTMLElement | null, layout: boolean) {
  const index = fieldIndex(fields);
  const panelBounds = panel?.getBoundingClientRect();
  const width = document.documentElement.clientWidth;
  const height = document.documentElement.clientHeight;
  const candidates = new Set(root.querySelectorAll(layout ? "[data-portal-widget]" :
    "[data-portal-field], [data-portal-widget], img, [style*='background-image'], h1, h2, h3, h4, p, figcaption"));
  if (!layout) {
    const textNodes = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
    while (textNodes.nextNode()) {
      const node = textNodes.currentNode;
      if (node.parentElement && node.nodeValue?.trim() && !node.parentElement.closest("script,style,template")) {
        candidates.add(node.parentElement);
      }
    }
  }

  const markers: Marker[] = [];
  const handled = new Set<string>();
  for (const element of candidates) {
    const widget = element.getAttribute("data-portal-widget");
    const matches = elementFields(element, index);
    if (layout ? !widget : !widget && matches.length !== 1) continue;
    const { id, label } = widget && (layout || matches.length !== 1)
      ? { id: widget, label: element.getAttribute("data-portal-widget-name") ?? "위젯" }
      : matches[0];
    if (handled.has(id)) continue;
    const rect = element.getBoundingClientRect();
    if (rect.width <= 0 || rect.height <= 0 || rect.bottom < 0 || rect.top > height || rect.right < 0 || rect.left > width) continue;
    if (getComputedStyle(element).visibility !== "visible") continue;

    const y = Math.min(Math.max(rect.top + 2, 4), height - 40);
    let x = Math.min(Math.max(rect.right - 34, 4), width - 40);
    const obscuredRange = panelBounds && y + 36 > panelBounds.top && y < panelBounds.bottom;
    if (obscuredRange && x + 36 > panelBounds.left) {
      if (rect.left >= panelBounds.left || panelBounds.left <= 40) continue;
      x = panelBounds.left - 40;
    }
    const overlaps = (next: number) => markers.some((marker) => Math.abs(marker.x - next) < 34 && Math.abs(marker.y - y) < 34);
    if (overlaps(x)) {
      const right = obscuredRange ? panelBounds.left - 40 : width - 40;
      const positions = [x + 40, x - 40, x + 80, x - 80];
      const available = positions.find((position) => position >= 4 && position <= right && !overlaps(position));
      if (available === undefined) continue;
      x = available;
    }
    markers.push({ id, label, x, y });
    handled.add(id);
  }
  return markers;
}

export function EditMarkers({ fields, paneVisible, selected, onSelect, layout, onMove }: {
  fields: Field[];
  paneVisible: boolean;
  selected?: string;
  onSelect: (id: string) => void;
  layout: boolean;
  onMove: (id: string, destination: number | string) => void;
}) {
  const [markers, setMarkers] = useState<Marker[]>([]);
  const dragged = useRef<string>(null);
  useEffect(() => {
    const root = document.getElementById("portal-page");
    if (!root) return;
    const panel = paneVisible ? document.getElementById("portal-editor-panel") : null;
    let frame = 0;
    const refresh = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => setMarkers(getMarkers(root, fields, panel, layout)));
    };
    const mutations = new MutationObserver(refresh);
    mutations.observe(root, { childList: true, subtree: true, characterData: true, attributes: true, attributeFilter: ["src", "style", "class"] });
    const sizes = new ResizeObserver(refresh);
    sizes.observe(root);
    if (panel) sizes.observe(panel);
    window.addEventListener("resize", refresh);
    window.addEventListener("scroll", refresh, { capture: true, passive: true });
    refresh();
    return () => {
      cancelAnimationFrame(frame);
      mutations.disconnect();
      sizes.disconnect();
      window.removeEventListener("resize", refresh);
      window.removeEventListener("scroll", refresh, true);
    };
  }, [fields, paneVisible, layout]);

  return markers.map(({ id, label, x, y }) => (
    <button key={id} type="button" className={styles.marker} aria-label={`${label} ${layout ? "배치" : "수정"}`}
      title={layout ? `${label} 이동 · 끌어놓기 또는 Alt + 방향키` : `${label} 수정`}
      draggable={layout} aria-pressed={selected === id} style={{ left: x, top: y }} onClick={() => onSelect(id)}
      onDragStart={(event) => { dragged.current = id; event.dataTransfer.setData("text/plain", id); }}
      onDragEnd={() => { dragged.current = null; }}
      onDragOver={(event) => {
        if (dragged.current?.split(":")[1] === id.split(":")[1]) event.preventDefault();
      }}
      onDrop={(event) => {
        if (!dragged.current || !layout) return;
        event.preventDefault();
        onMove(dragged.current, id);
        dragged.current = null;
      }}
      onKeyDown={(event) => {
        if (!layout || !event.altKey || !["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(event.key)) return;
        event.preventDefault();
        onMove(id, ["ArrowUp", "ArrowLeft"].includes(event.key) ? -1 : 1);
      }}>
      {layout ? <span aria-hidden="true">⠿</span> : <PencilIcon />}
    </button>
  ));
}

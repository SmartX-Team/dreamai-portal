"use client";

import { Fragment, type ReactNode } from "react";
import { useWidgetLayouts } from "./provider";
import { defaultWidgets, widgetLabel, type Widget, type WidgetZone } from "./widgets";
import styles from "./editor.module.css";

function renderNewWidget(widget: Widget, zone: WidgetZone) {
  const marker = { "data-portal-widget": `widget:${zone}:${widget.id}`, "data-portal-widget-name": widgetLabel(zone, widget) };
  switch (widget.type) {
    case "heading":
      return <h2 {...marker} className={styles.widgetHeading}>{widget.text}</h2>;
    case "text":
      return <p {...marker} className={styles.widgetText}>{widget.text}</p>;
    case "link":
      return widget.href ? <a {...marker} className={styles.widgetLink} href={widget.href}>{widget.text || widget.href}</a> : null;
    case "image":
      // Uploaded dimensions vary and layout width is set by the editor.
      // eslint-disable-next-line @next/next/no-img-element
      return widget.src ? <img {...marker} className={styles.widgetMedia} src={widget.src} alt={widget.text ?? ""} /> : null;
    case "video":
      return widget.src ? <video {...marker} className={styles.widgetMedia} src={widget.src} aria-label={widget.text || "동영상"} controls playsInline preload="metadata" /> : null;
    case "divider":
      return <hr {...marker} className={styles.widgetDivider} />;
    case "spacer":
      return <div {...marker} className={styles.widgetSpacer} aria-hidden="true" />;
    default:
      return null;
  }
}

export function PageWidgets({ zone, nodes }: { zone: WidgetZone; nodes: Record<string, ReactNode> }) {
  const layout = useWidgetLayouts()[zone] ?? defaultWidgets(zone);
  const render = (widget: Widget) => widget.type === "existing" ? nodes[widget.slot!] : renderNewWidget(widget, zone);
  if (!layout.some((widget) => widget.width)) {
    return layout.map((widget) => <Fragment key={widget.id}>{render(widget)}</Fragment>);
  }
  return <div className={styles.widgetGrid}>
    {layout.map((widget) => <div key={widget.id} data-width={widget.width ?? "full"}>{render(widget)}</div>)}
  </div>;
}

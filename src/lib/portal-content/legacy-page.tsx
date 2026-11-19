import { createElement, type ReactNode } from "react";
import { PageWidgets } from "./page-widgets";
import { portalFieldId } from "./registry";
import { widgetTarget, type WidgetZone } from "./widgets";

type FieldRef = { field: string };
type Attribute = string | boolean | FieldRef;
type ElementNode = {
  tag: string;
  props?: Record<string, Attribute>;
  style?: Record<string, string>;
  children?: LegacyNode[];
  zone?: string;
  slots?: Record<string, LegacyNode>;
};
type LegacyNode = string | FieldRef | ElementNode;
export type LegacyLayout = {
  rootClass: string;
  css?: string;
  slots: Record<string, LegacyNode>;
};

function render(node: LegacyNode, content: Record<string, string>, key: string, zone?: WidgetZone): ReactNode {
  if (typeof node === "string") return node;
  if ("field" in node) return content[node.field];
  const props: Record<string, unknown> = { key, style: node.style, ...(zone && widgetTarget(zone, key)) };
  const media = node.props?.src;
  const label = node.children?.length === 1 ? node.children[0] : undefined;
  for (const [name, value] of Object.entries(node.props ?? {})) {
    props[name] = typeof value === "object" ? content[value.field] : value;
  }
  if (media && typeof media === "object") props["data-portal-field"] = portalFieldId("display", media.field);
  else if (label && typeof label === "object" && "field" in label) {
    props["data-portal-field"] = portalFieldId("display", label.field);
  }

  if (node.zone && node.slots) {
    const nested = node.zone as WidgetZone;
    return createElement(node.tag, props, <PageWidgets zone={nested} nodes={renderSlots(node.slots, content, nested)} />);
  }
  if (!node.children?.length) return createElement(node.tag, props);
  return createElement(node.tag, props, node.children.map((child, index) => render(child, content, String(index))));
}

function renderSlots(nodes: Record<string, LegacyNode>, content: Record<string, string>, zone: WidgetZone) {
  return Object.fromEntries(Object.entries(nodes).map(([key, node]) => [key, render(node, content, key, zone)]));
}

export function LegacyPage({ layout, zone, content }: { layout: LegacyLayout; zone: WidgetZone; content: Record<string, string> }) {
  return <>
    {layout.css && <style>{layout.css}</style>}
    <main className={layout.rootClass}>
      <PageWidgets zone={zone} nodes={renderSlots(layout.slots, content, zone)} />
    </main>
  </>;
}

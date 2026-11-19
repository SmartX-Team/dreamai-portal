"use client";

import { createContext, useContext, type ReactNode } from "react";
import { portalDefaults, type PortalContent, type PortalPage } from "./registry";
import type { WidgetLayouts } from "./widgets";

const PortalContentContext = createContext<PortalContent>(portalDefaults);
const PortalLayoutContext = createContext<WidgetLayouts>({});

export function PortalContentProvider({ content, layouts, children }: { content: PortalContent; layouts: WidgetLayouts; children: ReactNode }) {
  return <PortalContentContext.Provider value={content}>
    <PortalLayoutContext.Provider value={layouts}>{children}</PortalLayoutContext.Provider>
  </PortalContentContext.Provider>;
}

export function usePortalPage<Page extends PortalPage>(page: Page): PortalContent[Page] {
  return useContext(PortalContentContext)[page];
}

export function useWidgetLayouts() {
  return useContext(PortalLayoutContext);
}

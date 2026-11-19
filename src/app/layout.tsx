import { widgetTarget } from "@/lib/portal-content/widgets";
import { PageWidgets } from "@/lib/portal-content/page-widgets";
import Link from "next/link";
import Image from "next/image";
import { PortalContentProvider } from "@/lib/portal-content/provider";
import { PortalEditor } from "@/lib/portal-content/editor";
import { editorAvailable, getEditorIdentity } from "@/lib/portal-content/auth";
import { readPortalContent, readState } from "@/lib/portal-content/server";
import { isWorkspaceSession, workspaceProtected, workspaceToken } from "@/lib/portal-content/workspace-session";
import { SessionMonitor, WorkspaceLogin } from "@/lib/portal-content/workspace-login";
import "./globals.css";
import "../styles/styles.css";

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const protectedWorkspace = workspaceProtected();
  if (protectedWorkspace) {
    const token = await workspaceToken();
    if (!isWorkspaceSession(await readState(), token)) {
      return <html lang="ko"><body><WorkspaceLogin displaced={Boolean(token)} /></body></html>;
    }
  }
  const { content, layouts } = await readPortalContent();
  const editableCopy = content["/"].display;
  const showEditor = editorAvailable();
  const editor = showEditor ? await getEditorIdentity() : undefined;
  return (
    <html lang="ko">
      <body className="bg-gray-50 min-h-screen">
        <PortalContentProvider content={content} layouts={layouts}>
        <div id="portal-page">
        <header className="bg-white border-b px-6 py-4 shadow-sm">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex flex-1 items-center space-x-4">
              <PageWidgets zone="header.left" nodes={{
                gist: (
                  <Link {...widgetTarget("header.left", "gist")} href={editableCopy["RootLayout 링크 1"]}>
                <Image
                  src={editableCopy["RootLayout 이미지 1"]}
                  alt="GIST 로고"
                  width={100}
                  height={50}
                />
              </Link>
                ),
                aigs: (
                  <Link {...widgetTarget("header.left", "aigs")} href={editableCopy["RootLayout 링크 2"]} target="_blank">
                <Image
                  src={editableCopy["RootLayout 이미지 2"]}
                  alt="AIGS"
                  width={140}
                  height={40}
                />
              </Link>
                ),
              }} />
            </div>
            <div className="flex items-center space-x-4">
              <PageWidgets zone="header.right" nodes={{
                scent: (
                  <Link {...widgetTarget("header.right", "scent")} href={editableCopy["RootLayout 링크 3"]} target="_blank">
                <Image
                  src={editableCopy["RootLayout 이미지 3"]}
                  alt="슈퍼컴퓨팅센터"
                  width={140}
                  height={40}
                />
              </Link>
                ),
                khp: (
                  <Link {...widgetTarget("header.right", "khp")} href={editableCopy["RootLayout 링크 4"]} target="_blank">
                <Image
                  src={editableCopy["RootLayout 이미지 4"]}
                  alt="KHP"
                  width={160}
                  height={40}
                />
              </Link>
                ),
              }} />
            </div>
          </div>
        </header>

          <main>{children}</main>
        </div>
        </PortalContentProvider>
        {showEditor && <PortalEditor login={editor?.login} workspace={protectedWorkspace} />}
        {protectedWorkspace && <SessionMonitor />}
      </body>
    </html>
  );
}

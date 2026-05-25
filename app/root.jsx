import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "react-router";

import { LayoutShell } from "./components/LayoutShell";
import { ErrorState } from "./components/ErrorState";
import "./app.css";

export const links = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;500;700;800&display=swap",
  },
];

const themeScript = `
  (() => {
    const stored = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    document.documentElement.dataset.theme = stored || (prefersDark ? "dark" : "light");
  })();
`;

export function Layout({ children }) {
  return (
    <html lang="ja" suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return (
    <LayoutShell>
      <Outlet />
    </LayoutShell>
  );
}

export function ErrorBoundary({ error }) {
  let title = "エラーが発生しました";
  let message = "時間をおいてもう一度お試しください。";
  let stack;

  if (isRouteErrorResponse(error)) {
    title = error.status === 404 ? "404 Not Found" : `${error.status} Error`;
    message =
      error.status === 404
        ? "お探しのページは見つかりませんでした。"
        : error.statusText || message;
  } else if (error instanceof Error) {
    message = error.message;
    stack = import.meta.env.DEV ? error.stack : undefined;
  }

  return (
    <LayoutShell>
      <ErrorState title={title} message={message} stack={stack} />
    </LayoutShell>
  );
}

import { useState } from "react";

import { BlogCard } from "../components/BlogCard";
import { fetchPostPage } from "../lib/api";
import styles from "./blog.module.css";

export const meta = () => [
  { title: "記事一覧 | Route Notes" },
  { name: "description", content: "Route Notes の記事一覧" },
];

export async function loader({ request }) {
  const page = await fetchPostPage(request, { offset: 0, limit: 10 });
  return page;
}

export default function BlogIndex({ loaderData }) {
  const [posts, setPosts] = useState(loaderData.items);
  const [hasMore, setHasMore] = useState(loaderData.hasMore);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  async function loadMore() {
    setIsLoading(true);
    setError("");

    try {
      const response = await fetch(`/api/posts?offset=${posts.length}&limit=10`);

      if (!response.ok) {
        throw new Error("記事を読み込めませんでした。");
      }

      const page = await response.json();
      setPosts((currentPosts) => [...currentPosts, ...page.items]);
      setHasMore(page.hasMore);
    } catch (caughtError) {
      setError(caughtError instanceof Error ? caughtError.message : "記事を読み込めませんでした。");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <p className={styles.kicker}>Blog</p>
        <h1>記事一覧</h1>
        <p>React Router、Vite、UI 実装の要点を短く整理したノートです。</p>
      </header>

      <div className={styles.grid}>
        {posts.map((post) => (
          <BlogCard key={post.id} post={post} />
        ))}
      </div>

      <div className={styles.loadMore}>
        {error ? <p role="alert">{error}</p> : null}
        {hasMore ? (
          <button type="button" onClick={loadMore} disabled={isLoading}>
            {isLoading ? "読み込み中..." : "さらに10件読み込む"}
          </button>
        ) : (
          <span>すべての記事を表示しました</span>
        )}
      </div>
    </main>
  );
}

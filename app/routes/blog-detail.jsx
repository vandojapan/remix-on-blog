import { Link } from "react-router";

import { ImageReveal } from "../components/ImageReveal";
import { fetchPost } from "../lib/api";
import styles from "./blog-detail.module.css";

export async function loader({ params, request }) {
  const post = await fetchPost(request, params.id);
  return { post };
}

export const meta = ({ data }) => {
  if (!data?.post) {
    return [{ title: "記事が見つかりません | Route Notes" }];
  }

  return [
    { title: `${data.post.title} | Route Notes` },
    { name: "description", content: data.post.summary },
  ];
};

export default function BlogDetail({ loaderData }) {
  const { post } = loaderData;

  return (
    <main className={styles.page}>
      <Link className={styles.backLink} to="/blog">
        記事一覧へ戻る
      </Link>
      <article className={styles.article}>
        <ImageReveal className={styles.heroImage} src={post.image.src} alt={post.image.alt} />
        <header className={styles.header}>
          <div className={styles.meta}>
            <span>{post.category}</span>
            <time dateTime={post.publishedAt}>{post.publishedAt}</time>
          </div>
          <h1>{post.title}</h1>
          <p>{post.summary}</p>
        </header>
        <div className={styles.body}>
          {post.body.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </article>
    </main>
  );
}

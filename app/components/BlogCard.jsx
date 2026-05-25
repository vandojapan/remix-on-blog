import { Link } from "react-router";

import { ImageReveal } from "./ImageReveal";
import styles from "./BlogCard.module.css";

export function BlogCard({ post }) {
  return (
    <article className={styles.card}>
      <Link className={styles.imageLink} to={`/blog/${post.id}`} aria-label={`${post.title} を読む`}>
        <ImageReveal className={styles.image} src={post.image.src} alt={post.image.alt} />
      </Link>
      <div className={styles.copy}>
        <div className={styles.meta}>
          <span>{post.category}</span>
          <time dateTime={post.publishedAt}>{post.publishedAt}</time>
        </div>
        <h2>
          <Link to={`/blog/${post.id}`}>{post.title}</Link>
        </h2>
        <p>{post.summary}</p>
        <div className={styles.footer}>
          <span>{post.readingTime}</span>
          <Link to={`/blog/${post.id}`}>読む</Link>
        </div>
      </div>
    </article>
  );
}

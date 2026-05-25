import { Link } from "react-router";

import { BlogCard } from "../components/BlogCard";
import { ImageReveal } from "../components/ImageReveal";
import { fetchPosts } from "../lib/api";
import styles from "./home.module.css";

export const meta = () => [
  { title: "Route Notes | React Router Blog" },
  {
    name: "description",
    content: "React Router Framework Mode と Vite で作るブログサイト",
  },
];

export async function loader({ request }) {
  const posts = await fetchPosts(request);
  return { featuredPosts: posts.slice(0, 3) };
}

export default function Home({ loaderData }) {
  const { featuredPosts } = loaderData;

  return (
    <div className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.heroCopy}>
          <p className={styles.kicker}>React Router Framework Mode</p>
          <h1>Route Notes</h1>
          <p>
            Vite と React Router v7 の data loading を使った、軽量で読みやすいブログサイトです。
          </p>
          <Link className={styles.primaryLink} to="/blog">
            記事一覧を見る
          </Link>
        </div>
        <div className={styles.heroGallery} aria-label="注目記事の画像">
          {featuredPosts.map((post) => (
            <Link key={post.id} to={`/blog/${post.id}`} aria-label={`${post.title} を読む`}>
              <ImageReveal src={post.image.src} alt={post.image.alt} />
            </Link>
          ))}
        </div>
      </section>

      <section className={styles.section} aria-labelledby="featured-heading">
        <div className={styles.sectionHeader}>
          <p className={styles.kicker}>Latest</p>
          <h2 id="featured-heading">注目記事</h2>
        </div>
        <div className={styles.grid}>
          {featuredPosts.map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>
      </section>
    </div>
  );
}

import { index, route } from "@react-router/dev/routes";

export default [
  index("routes/home.jsx"),
  route("blog", "routes/blog.jsx"),
  route("blog/:id", "routes/blog-detail.jsx"),
  route("api/posts", "routes/api.posts.js"),
  route("api/posts/:id", "routes/api.posts.$id.js"),
  route("*", "routes/not-found.jsx"),
];

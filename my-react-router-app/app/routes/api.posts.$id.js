import { posts } from "../data/posts";
import { fetchMicroCmsPost, hasMicroCmsConfig } from "../lib/microcms.server";

export async function loader({ params, context }) {
  if (hasMicroCmsConfig(context)) {
    return Response.json(await fetchMicroCmsPost(params.id, context), {
      headers: {
        "Cache-Control": "public, max-age=60",
      },
    });
  }

  const post = posts.find((item) => item.id === params.id);

  if (!post) {
    throw new Response("Post not found", {
      status: 404,
      statusText: "Not Found",
    });
  }

  return Response.json(post, {
    headers: {
      "Cache-Control": "public, max-age=60",
    },
  });
}

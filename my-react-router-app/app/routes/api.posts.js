import { posts } from "../data/posts";
import { fetchMicroCmsPostPage, hasMicroCmsConfig } from "../lib/microcms.server";

export async function loader({ request, context }) {
  const url = new URL(request.url);
  const offset = Math.max(Number(url.searchParams.get("offset") || "0"), 0);
  const limit = Math.min(Math.max(Number(url.searchParams.get("limit") || "10"), 1), 10);

  if (hasMicroCmsConfig(context)) {
    const page = await fetchMicroCmsPostPage({ offset, limit, context });

    return Response.json(page, {
      headers: {
        "Cache-Control": "public, max-age=60",
      },
    });
  }

  const items = posts.slice(offset, offset + limit).map(({ body, ...post }) => post);

  return Response.json(
    {
      items,
      total: posts.length,
      nextOffset: offset + items.length,
      hasMore: offset + items.length < posts.length,
    },
    {
      headers: {
        "Cache-Control": "public, max-age=60",
      },
    },
  );
}

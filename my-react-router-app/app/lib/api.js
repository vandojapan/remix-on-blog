function getApiUrl(request, path) {
  return new URL(path, request.url).toString();
}

async function readJson(response) {
  if (!response.ok) {
    throw new Response(response.statusText || "API request failed", {
      status: response.status,
      statusText: response.statusText,
    });
  }

  return response.json();
}

export async function fetchPosts(request) {
  const page = await fetchPostPage(request, { offset: 0, limit: 10 });
  return page.items;
}

export async function fetchPostPage(request, { offset = 0, limit = 10 } = {}) {
  const response = await fetch(getApiUrl(request, `/api/posts?offset=${offset}&limit=${limit}`));
  return readJson(response);
}

export async function fetchPost(request, id) {
  const response = await fetch(getApiUrl(request, `/api/posts/${id}`));
  return readJson(response);
}

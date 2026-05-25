const DEFAULT_ENDPOINT = "blogs";

function getEnv(name, context) {
  const cloudflareEnv = context?.cloudflare?.env || context?.env;

  if (cloudflareEnv?.[name]) {
    return cloudflareEnv[name];
  }

  if (typeof process === "undefined") {
    return undefined;
  }

  return process.env[name];
}

function getMicroCmsConfig(context) {
  return {
    apiKey: getEnv("MICROCMS_API_KEY", context),
    serviceDomain: getEnv("MICROCMS_SERVICE_DOMAIN", context),
    endpoint: getEnv("MICROCMS_ENDPOINT", context) || DEFAULT_ENDPOINT,
  };
}

export function hasMicroCmsConfig(context) {
  const { apiKey, serviceDomain } = getMicroCmsConfig(context);
  return Boolean(apiKey && serviceDomain);
}

function getBaseUrl(endpoint, context) {
  const { serviceDomain } = getMicroCmsConfig(context);
  return `https://${serviceDomain}.microcms.io/api/v1/${endpoint}`;
}

function normalizeImage(content) {
  const image = content.image || content.eyecatch || content.thumbnail || content.coverImage;

  if (typeof image === "string") {
    return {
      src: image,
      alt: content.title ? `${content.title} のサムネイル` : "記事のサムネイル",
    };
  }

  if (image?.url) {
    return {
      src: image.url,
      alt: image.alt || (content.title ? `${content.title} のサムネイル` : "記事のサムネイル"),
    };
  }

  return {
    src: "/images/router-gallery.svg",
    alt: "記事のサムネイル",
  };
}

function normalizeCategory(category) {
  if (!category) {
    return "Blog";
  }

  if (typeof category === "string") {
    return category;
  }

  return category.name || category.title || "Blog";
}

function normalizeBody(body) {
  if (Array.isArray(body)) {
    return body;
  }

  if (typeof body === "string") {
    return body
      .replace(/<[^>]*>/g, "")
      .split(/\n{2,}/)
      .map((paragraph) => paragraph.trim())
      .filter(Boolean);
  }

  return ["本文がまだ登録されていません。"];
}

function normalizePost(content, includeBody = false) {
  const post = {
    id: content.id,
    title: content.title || "Untitled",
    summary: content.summary || content.description || "記事の概要がまだ登録されていません。",
    category: normalizeCategory(content.category),
    publishedAt: (content.publishedAt || content.createdAt || "").slice(0, 10),
    readingTime: content.readingTime || "3 min",
    image: normalizeImage(content),
  };

  if (includeBody) {
    post.body = normalizeBody(content.body || content.content);
  }

  return post;
}

async function requestMicroCms(path, searchParams, context) {
  const { apiKey, endpoint } = getMicroCmsConfig(context);
  const baseUrl = getBaseUrl(endpoint, context);
  const url = new URL(path ? `${baseUrl}/${path}` : baseUrl);

  if (searchParams) {
    for (const [key, value] of Object.entries(searchParams)) {
      url.searchParams.set(key, value);
    }
  }

  const response = await fetch(url, {
    headers: {
      "X-MICROCMS-API-KEY": apiKey,
    },
  });

  if (!response.ok) {
    throw new Response(response.statusText || "microCMS request failed", {
      status: response.status,
      statusText: response.statusText,
    });
  }

  return response.json();
}

export async function fetchMicroCmsPostPage({ offset = 0, limit = 10, context } = {}) {
  const data = await requestMicroCms("", {
    offset: String(offset),
    limit: String(limit),
    orders: "-publishedAt",
  }, context);

  const contents = data.contents || [];
  return {
    items: contents.map((content) => normalizePost(content)),
    total: data.totalCount || contents.length,
    nextOffset: offset + contents.length,
    hasMore: offset + contents.length < (data.totalCount || contents.length),
  };
}

export async function fetchMicroCmsPost(id, context) {
  const content = await requestMicroCms(id, undefined, context);
  return normalizePost(content, true);
}

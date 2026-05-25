import { createRequestHandler } from "react-router";

const requestHandler = createRequestHandler(
  () => import("../build/server/index.js"),
  "production",
);

export default {
  async fetch(request, env, ctx) {
    const assetResponse = await env.ASSETS.fetch(request);

    if (assetResponse.status !== 404) {
      return assetResponse;
    }

    return requestHandler(request, {
      cloudflare: { env, ctx },
      env,
    });
  },
};

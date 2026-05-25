import { createRequestHandler } from "react-router";

const requestHandler = createRequestHandler(
  () => import("../build/server/index.js"),
  "production",
);

export default {
  fetch(request, env, ctx) {
    return requestHandler(request, {
      cloudflare: { env, ctx },
      env,
    });
  },
};

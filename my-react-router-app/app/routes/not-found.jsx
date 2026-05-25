import { ErrorState } from "../components/ErrorState";

export const meta = () => [{ title: "404 Not Found | Route Notes" }];

export function loader() {
  throw new Response("Not Found", {
    status: 404,
    statusText: "Not Found",
  });
}

export default function NotFound() {
  return (
    <ErrorState
      title="404 Not Found"
      message="お探しのページは見つかりませんでした。"
    />
  );
}

import type { ReactNode } from "react";
import RateLimited from "./RateLimited";
import { isRateLimitError } from "../utils/apiErrors";

type QueryErrorProps = {
  error: unknown;
  fallback?: ReactNode;
};

function QueryError({
  error,
  fallback = "Something went wrong",
}: QueryErrorProps) {
  if (isRateLimitError(error)) {
    return <RateLimited />;
  }

  return <div>{fallback}</div>;
}

export default QueryError;

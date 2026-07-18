"use client";

import { useState } from "react";
import { QueryClient, QueryClientProvider, isServer } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60_000,
        // apiFetch() already does its own one-shot refresh-and-retry on a
        // 401 internally — React Query retrying on top of that (default: 3x
        // with backoff) double-amplifies every failure. A single broken
        // session on page load could fire 8-9+ requests instead of 1-2,
        // repeatedly re-triggering /auth/refresh and blowing through rate
        // limits before the user does anything at all.
        retry: false,
      },
    },
  });
}

let browserQueryClient: QueryClient | undefined;

function getQueryClient() {
  if (isServer) return makeQueryClient();
  if (!browserQueryClient) browserQueryClient = makeQueryClient();
  return browserQueryClient;
}

export function QueryProvider({ children }: { children: React.ReactNode }) {
  const [client] = useState(getQueryClient);

  return (
    <QueryClientProvider client={client}>
      {children}
      {process.env.NODE_ENV === "development" && <ReactQueryDevtools initialIsOpen={false} />}
    </QueryClientProvider>
  );
}

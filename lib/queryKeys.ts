export const queryKeys = {
  auth: {
    me: () => ["auth", "me"] as const,
  },
  series: {
    all: () => ["series"] as const,
    list: (params: { page: number; limit: number }) => ["series", "list", params] as const,
    detail: (id: string) => ["series", id] as const,
  },
  videos: {
    all: () => ["videos"] as const,
    list: (params: { page: number; limit: number; platform?: string; search?: string }) =>
      ["videos", "list", params] as const,
    detail: (id: string) => ["videos", id] as const,
  },
  settings: {
    all: () => ["settings"] as const,
  },
  billing: {
    plans: () => ["billing", "plans"] as const,
  },
};

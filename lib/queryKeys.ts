export const queryKeys = {
  auth: {
    me: () => ["auth", "me"] as const,
  },
  series: {
    all: () => ["series"] as const,
    detail: (id: string) => ["series", id] as const,
  },
  videos: {
    all: () => ["videos"] as const,
    detail: (id: string) => ["videos", id] as const,
  },
  settings: {
    all: () => ["settings"] as const,
  },
  billing: {
    plans: () => ["billing", "plans"] as const,
  },
};

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { apiFetch } from "@/lib/api";
import { queryKeys } from "@/lib/queryKeys";

export interface AuthUser {
  id: string;
  email: string;
  name: string;
  avatarUrl: string | null;
  plan: string;
  emailVerified: boolean;
  createdAt: string;
  updatedAt: string;
}

export function useAuth() {
  const queryClient = useQueryClient();

  const meQuery = useQuery({
    queryKey: queryKeys.auth.me(),
    queryFn: () => apiFetch<AuthUser>("/auth/me"),
    retry: false,
  });

  const registerMutation = useMutation({
    mutationFn: (input: { name: string; email: string; password: string }) =>
      apiFetch("/auth/register", { method: "POST", body: JSON.stringify(input) }),
  });

  const verifyEmailMutation = useMutation({
    mutationFn: (input: { email: string; code: string }) =>
      apiFetch("/auth/verify-email", { method: "POST", body: JSON.stringify(input) }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: queryKeys.auth.me() }),
  });

  const resendVerificationMutation = useMutation({
    mutationFn: (input: { email: string }) =>
      apiFetch("/auth/resend-verification", { method: "POST", body: JSON.stringify(input) }),
  });

  const loginMutation = useMutation({
    mutationFn: (input: { email: string; password: string }) =>
      apiFetch("/auth/login", { method: "POST", body: JSON.stringify(input) }),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: queryKeys.auth.me() }),
  });

  const forgotPasswordMutation = useMutation({
    mutationFn: (input: { email: string }) =>
      apiFetch("/auth/forgot-password", { method: "POST", body: JSON.stringify(input) }),
  });

  const resetPasswordMutation = useMutation({
    mutationFn: (input: { email: string; code: string; newPassword: string }) =>
      apiFetch("/auth/reset-password", { method: "POST", body: JSON.stringify(input) }),
  });

  const logoutMutation = useMutation({
    mutationFn: () => apiFetch("/auth/logout", { method: "POST" }),
    onSuccess: () => queryClient.setQueryData(queryKeys.auth.me(), null),
  });

  const updateProfileMutation = useMutation({
    mutationFn: (input: { name: string }) =>
      apiFetch<AuthUser>("/auth/profile", { method: "PUT", body: JSON.stringify(input) }),
    onSuccess: (user) => queryClient.setQueryData(queryKeys.auth.me(), user),
  });

  const uploadAvatarMutation = useMutation({
    mutationFn: (file: File) => {
      const formData = new FormData();
      formData.append("avatar", file);
      return apiFetch<AuthUser>("/auth/avatar", { method: "POST", body: formData });
    },
    onSuccess: (user) => queryClient.setQueryData(queryKeys.auth.me(), user),
  });

  const changePasswordMutation = useMutation({
    mutationFn: (input: { currentPassword: string; newPassword: string }) =>
      apiFetch("/auth/change-password", { method: "PUT", body: JSON.stringify(input) }),
  });

  const deleteAccountMutation = useMutation({
    mutationFn: (input: { password: string }) =>
      apiFetch("/auth/account", { method: "DELETE", body: JSON.stringify(input) }),
    onSuccess: () => queryClient.setQueryData(queryKeys.auth.me(), null),
  });

  return {
    user: meQuery.data ?? null,
    isLoading: meQuery.isLoading,
    registerMutation,
    verifyEmailMutation,
    resendVerificationMutation,
    loginMutation,
    forgotPasswordMutation,
    resetPasswordMutation,
    logoutMutation,
    updateProfileMutation,
    uploadAvatarMutation,
    changePasswordMutation,
    deleteAccountMutation,
  };
}

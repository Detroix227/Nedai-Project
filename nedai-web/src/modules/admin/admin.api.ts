import { request } from "@/lib/http";
import type { ApiResponse } from "@/modules/contracts";

export type AdminStats = {
  totalUsers: number;
  onlineUsers: number;
};

export type AdminUser = {
  id: string;
  email: string;
  fullName: string;
  role: string;
  createdAt: string;
  lastActiveAt: string;
};

export async function getStats(token: string) {
  const data = await request<ApiResponse<AdminStats>>("/admin/stats", {
    token,
  });
  return data.data;
}

export async function getUsers(token: string) {
  const data = await request<ApiResponse<{ users: AdminUser[] }>>("/admin/users", {
    token,
  });
  return data.data.users;
}

export async function notifyUsers(
  token: string,
  payload: { subject: string; message: string; target: "email" | "in-app" | "both" }
) {
  const data = await request<ApiResponse<null>>("/admin/notify", {
    method: "POST",
    token,
    body: payload,
  });
  return data.data;
}

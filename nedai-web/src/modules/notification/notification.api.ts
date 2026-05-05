import { request } from "@/lib/http";
import type { ApiResponse, ServerGetNotificationsResponse } from "@/modules/contracts";

export async function getMyNotifications(token: string) {
  const data = await request<ApiResponse<ServerGetNotificationsResponse>>("/notifications", {
    token,
  });
  return data.data.notifications;
}

export async function markAsRead(token: string, notificationId: string) {
  const data = await request<ApiResponse<null>>(`/notifications/${notificationId}/read`, {
    method: "PATCH",
    token,
  });
  return data.data;
}

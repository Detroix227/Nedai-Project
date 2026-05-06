import { useEffect, useState } from "react";
import { Bell, CheckCircle2, ArrowLeft, Trash2, Megaphone } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { AppShell } from "@/components/AppShell";
import { useAuthStore } from "@/modules/auth/useAuthStore";
import type { Notification } from "@/modules/contracts";
import * as NotificationApi from "@/modules/notification/notification.api";

export default function NotificationsScreen() {
  const navigate = useNavigate();
  const token = useAuthStore((state) => state.accessToken);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!token) return;
    
    setLoading(true);
    NotificationApi.getMyNotifications(token)
      .then((data) => {
        setNotifications(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load notifications:", err);
        setLoading(false);
      });
  }, [token]);

  const handleMarkAsRead = async (id: string) => {
    if (!token) return;
    try {
      await NotificationApi.markAsRead(token, id);
      setNotifications((prev) =>
        prev.map((n) => (n.id === id ? { ...n, isRead: true } : n))
      );
    } catch (error) {
      console.error(error);
    }
  };

  const handleMarkAllAsRead = async () => {
    if (!token) return;
    const unreadIds = notifications.filter((n) => !n.isRead).map((n) => n.id);
    await Promise.all(unreadIds.map((id) => NotificationApi.markAsRead(token, id)));
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
  };

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  return (
    <AppShell title="Notifications">
      <div className="flex flex-col w-full max-w-4xl mx-auto p-6">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate("/settings")}
              className="p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition"
            >
              <ArrowLeft size={20} className="text-slate-600 dark:text-slate-400" />
            </button>
            <div>
              <h1 className="text-2xl font-bold text-slate-900 dark:text-slate-100">Notifications</h1>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                {unreadCount > 0 ? `${unreadCount} unread` : "All caught up"}
              </p>
            </div>
          </div>
          
          {unreadCount > 0 && (
            <button
              onClick={handleMarkAllAsRead}
              className="flex items-center gap-2 px-4 py-2 text-sm font-semibold text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-xl transition"
            >
              <CheckCircle2 size={18} />
              Mark all as read
            </button>
          )}
        </div>

        {/* Notifications List */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-700 overflow-hidden">
          {loading ? (
            <div className="p-12 text-center">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
              <p className="text-slate-500 dark:text-slate-400">Loading notifications...</p>
            </div>
          ) : notifications.length === 0 ? (
            <div className="p-12 text-center">
              <div className="w-16 h-16 rounded-full bg-slate-100 dark:bg-slate-700 flex items-center justify-center mx-auto mb-4">
                <Bell size={32} className="text-slate-400" />
              </div>
              <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-2">
                No notifications yet
              </h3>
              <p className="text-slate-500 dark:text-slate-400 max-w-sm mx-auto">
                When you receive updates from the admin, they'll appear here.
              </p>
            </div>
          ) : (
            <div className="divide-y divide-slate-100 dark:divide-slate-700">
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`p-5 transition hover:bg-slate-50 dark:hover:bg-slate-700/50 ${
                    !notification.isRead ? "bg-blue-50/30 dark:bg-blue-900/10" : ""
                  }`}
                >
                  <div className="flex items-start gap-4">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${
                      !notification.isRead 
                        ? "bg-blue-100 dark:bg-blue-900/30 text-blue-600" 
                        : "bg-slate-100 dark:bg-slate-700 text-slate-500"
                    }`}>
                      <Megaphone size={20} />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-3">
                        <h4 className={`font-semibold text-base ${
                          !notification.isRead 
                            ? "text-slate-900 dark:text-slate-100" 
                            : "text-slate-700 dark:text-slate-300"
                        }`}>
                          {notification.title}
                        </h4>
                        <span className="text-xs text-slate-400 dark:text-slate-500 shrink-0">
                          {new Date(notification.createdAt).toLocaleDateString(undefined, {
                            month: "short",
                            day: "numeric",
                            hour: "numeric",
                            minute: "2-digit",
                          })}
                        </span>
                      </div>
                      
                      <p className="text-slate-600 dark:text-slate-400 text-sm mt-1 leading-relaxed">
                        {notification.message}
                      </p>
                      
                      {!notification.isRead && (
                        <button
                          onClick={() => handleMarkAsRead(notification.id)}
                          className="mt-3 flex items-center gap-1.5 text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition"
                        >
                          <CheckCircle2 size={16} />
                          Mark as read
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </AppShell>
  );
}

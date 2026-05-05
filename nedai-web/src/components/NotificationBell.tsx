import { useEffect, useRef, useState } from "react";
import { Bell, CheckCircle2 } from "lucide-react";

import { useAuthStore } from "@/modules/auth/useAuthStore";
import type { Notification } from "@/modules/contracts";
import * as NotificationApi from "@/modules/notification/notification.api";

export function NotificationBell() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  
  const token = useAuthStore((state) => state.accessToken);

  useEffect(() => {
    if (!token) return;
    
    // Fetch notifications
    NotificationApi.getMyNotifications(token)
      .then((data) => setNotifications(data))
      .catch(console.error);
  }, [token]);

  useEffect(() => {
    // Click outside to close
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const unreadCount = notifications.filter((n) => !n.isRead).length;

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

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 rounded-xl hover:bg-slate-100 transition relative"
      >
        <Bell size={24} className="text-slate-600" strokeWidth={2} />
        {unreadCount > 0 && (
          <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-rose-500 text-[10px] font-bold text-white shadow-sm ring-2 ring-white">
            {unreadCount > 9 ? "9+" : unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute left-full ml-4 top-0 w-80 bg-white rounded-2xl shadow-xl border border-slate-100 z-50 overflow-hidden flex flex-col max-h-[500px]">
          <div className="px-4 py-3 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between">
            <h3 className="font-semibold text-slate-800">Notifications</h3>
            {unreadCount > 0 && (
              <span className="text-xs font-medium text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">
                {unreadCount} new
              </span>
            )}
          </div>
          
          <div className="flex-1 overflow-y-auto">
            {notifications.length === 0 ? (
              <div className="px-4 py-8 text-center text-sm text-slate-500">
                You're all caught up!
              </div>
            ) : (
              <div className="divide-y divide-slate-100">
                {notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`p-4 transition hover:bg-slate-50 ${
                      !notification.isRead ? "bg-blue-50/30" : ""
                    }`}
                  >
                    <div className="flex justify-between items-start mb-1">
                      <h4
                        className={`text-sm font-semibold ${
                          !notification.isRead ? "text-slate-900" : "text-slate-700"
                        }`}
                      >
                        {notification.title}
                      </h4>
                      {!notification.isRead && (
                        <button
                          onClick={() => handleMarkAsRead(notification.id)}
                          className="text-blue-600 hover:text-blue-700 p-1 rounded-full hover:bg-blue-50 transition"
                          title="Mark as read"
                        >
                          <CheckCircle2 size={16} />
                        </button>
                      )}
                    </div>
                    <p className="text-sm text-slate-600 mb-2 leading-relaxed">
                      {notification.message}
                    </p>
                    <span className="text-xs text-slate-400 font-medium">
                      {new Date(notification.createdAt).toLocaleDateString(undefined, {
                        month: "short",
                        day: "numeric",
                        hour: "numeric",
                        minute: "2-digit",
                      })}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

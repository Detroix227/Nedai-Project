import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { Users, Activity, Send } from "lucide-react";

import { useAuthStore } from "@/modules/auth/useAuthStore";
import * as AdminApi from "@/modules/admin/admin.api";

export default function AdminDashboard() {
  const user = useAuthStore((state) => state.user);
  const token = useAuthStore((state) => state.accessToken);

  const [stats, setStats] = useState<AdminApi.AdminStats | null>(null);
  const [users, setUsers] = useState<AdminApi.AdminUser[]>([]);
  
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [target, setTarget] = useState<"email" | "in-app" | "both">("both");
  const [sending, setSending] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");

  useEffect(() => {
    if (user?.role !== "ADMIN" || !token) return;

    AdminApi.getStats(token).then(setStats).catch(console.error);
    AdminApi.getUsers(token).then(setUsers).catch(console.error);
  }, [user, token]);

  if (user?.role !== "ADMIN") {
    return <Navigate to="/" replace />;
  }

  const handleNotify = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) return;
    setSending(true);
    setSuccessMsg("");
    try {
      await AdminApi.notifyUsers(token, { subject, message, target });
      setSuccessMsg("Notifications sent successfully!");
      setSubject("");
      setMessage("");
    } catch (error) {
      console.error(error);
      alert("Failed to send notification");
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="flex-1 overflow-y-auto bg-slate-50/50 p-6 sm:p-10">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* Header */}
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Admin Dashboard</h1>
          <p className="mt-2 text-slate-500">Manage users and send announcements.</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex items-center">
            <div className="p-4 bg-blue-50 text-blue-600 rounded-xl mr-5">
              <Users size={28} />
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-1">Total Users</p>
              <h2 className="text-3xl font-bold text-slate-900">{stats?.totalUsers ?? "..."}</h2>
            </div>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 flex items-center">
            <div className="p-4 bg-emerald-50 text-emerald-600 rounded-xl mr-5">
              <Activity size={28} />
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-1">Online Now</p>
              <h2 className="text-3xl font-bold text-slate-900">{stats?.onlineUsers ?? "..."}</h2>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Notify Form */}
          <div className="lg:col-span-1 bg-white p-6 rounded-2xl shadow-sm border border-slate-200 h-fit">
            <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
              <Send size={20} className="text-blue-600" /> Send Notification
            </h2>
            <form onSubmit={handleNotify} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">Subject</label>
                <input
                  type="text"
                  required
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full border border-slate-200 rounded-xl px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                  placeholder="Update: New Feature!"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-1">Message</label>
                <textarea
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full border border-slate-200 rounded-xl px-4 py-2 min-h-[120px] focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                  placeholder="Type your announcement here..."
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">Send Via</label>
                <div className="space-y-2">
                  <label className="flex items-center gap-3 p-3 border border-slate-200 rounded-xl cursor-pointer hover:bg-slate-50 transition">
                    <input type="radio" checked={target === "both"} onChange={() => setTarget("both")} className="w-4 h-4 text-blue-600 focus:ring-blue-500" />
                    <span className="text-sm font-medium text-slate-700">Both (Email & In-App)</span>
                  </label>
                  <label className="flex items-center gap-3 p-3 border border-slate-200 rounded-xl cursor-pointer hover:bg-slate-50 transition">
                    <input type="radio" checked={target === "email"} onChange={() => setTarget("email")} className="w-4 h-4 text-blue-600 focus:ring-blue-500" />
                    <span className="text-sm font-medium text-slate-700">Email Only</span>
                  </label>
                  <label className="flex items-center gap-3 p-3 border border-slate-200 rounded-xl cursor-pointer hover:bg-slate-50 transition">
                    <input type="radio" checked={target === "in-app"} onChange={() => setTarget("in-app")} className="w-4 h-4 text-blue-600 focus:ring-blue-500" />
                    <span className="text-sm font-medium text-slate-700">In-App Only</span>
                  </label>
                </div>
              </div>
              
              {successMsg && <div className="p-3 bg-emerald-50 text-emerald-700 text-sm rounded-xl border border-emerald-100">{successMsg}</div>}

              <button
                type="submit"
                disabled={sending}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-xl transition shadow-md disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {sending ? "Sending..." : "Blast Notification"}
              </button>
            </form>
          </div>

          {/* Users Table */}
          <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="p-6 border-b border-slate-200">
              <h2 className="text-xl font-bold text-slate-900">Registered Users</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left text-slate-500">
                <thead className="text-xs text-slate-700 uppercase bg-slate-50 border-b border-slate-200">
                  <tr>
                    <th className="px-6 py-4 font-semibold">Name</th>
                    <th className="px-6 py-4 font-semibold">Role</th>
                    <th className="px-6 py-4 font-semibold">Joined</th>
                    <th className="px-6 py-4 font-semibold">Last Active</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {users.map((u) => {
                    const lastActive = new Date(u.lastActiveAt);
                    const isOnline = Date.now() - lastActive.getTime() < 15 * 60 * 1000;
                    
                    return (
                      <tr key={u.id} className="hover:bg-slate-50 transition">
                        <td className="px-6 py-4">
                          <div className="font-semibold text-slate-900">{u.fullName}</div>
                          <div className="text-slate-500">{u.email}</div>
                        </td>
                        <td className="px-6 py-4">
                          <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${u.role === 'ADMIN' ? 'bg-rose-100 text-rose-700' : u.role === 'LECTURER' ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'}`}>
                            {u.role}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {new Date(u.createdAt).toLocaleDateString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center gap-2">
                            <div className={`w-2 h-2 rounded-full ${isOnline ? 'bg-emerald-500' : 'bg-slate-300'}`} />
                            {isOnline ? 'Online' : lastActive.toLocaleDateString()}
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
              {users.length === 0 && (
                <div className="p-8 text-center text-slate-500">Loading users...</div>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

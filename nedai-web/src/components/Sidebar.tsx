import { useLocation, useNavigate } from "react-router-dom";
import {
  CalendarDays,
  FolderOpen,
  MessageSquare,
  Plus,
  User,
  Menu,
  Settings,
} from "lucide-react";

import { useChatStore } from "@/modules/chat/useChatStore";
import { useUIStore } from "@/modules/ui/useUIStore";
import { ChatItem } from "./ChatItem";

const STUDY_TOOLS = [
  {
    key: "chat",
    label: "Chat",
    href: "/",
    icon: MessageSquare,
  },
  {
    key: "knowledge-vault",
    label: "Knowledge Vault",
    href: "/knowledge-vault",
    icon: FolderOpen,
  },
  {
    key: "timetable",
    label: "Timetable",
    href: "/timetable",
    icon: CalendarDays,
  },
  {
    key: "profile",
    label: "Profile",
    href: "/profile",
    icon: User,
  },
] as const;

export function Sidebar() {
  const threads = useChatStore((state) => state.threads);
  const activeThreadId = useChatStore((state) => state.activeThreadId);
  const selectThread = useChatStore((state) => state.selectThread);
  const startFreshChat = useChatStore((state) => state.startFreshChat);
  const navigate = useNavigate();
  const location = useLocation();
  const { isSidebarCollapsed, toggleSidebar, setCurrentSection } = useUIStore();

  function handleSelectRecentThread(threadId: string) {
    navigate("/");
    void selectThread(threadId);
  }

  const activePath = location.pathname;

  return (
    <>
      {/* Collapsed Sidebar - Hamburger Menu */}
      {isSidebarCollapsed && (
        <div className="w-16 bg-white border-r border-slate-200 flex flex-col h-screen bg-slate-50/50 sticky top-0 shrink-0">
          <div className="flex-1 flex flex-col items-center py-4 space-y-4">
            {/* Hamburger Menu Button */}
            <button
              onClick={toggleSidebar}
              className="p-3 rounded-xl bg-blue-600 hover:bg-blue-700 transition shadow-md"
            >
              <Menu size={20} className="text-white" strokeWidth={3} />
            </button>
            
            {/* Quick Access Icons */}
            <div className="flex flex-col space-y-3">
              {STUDY_TOOLS.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.href;
                
                const handleClick = () => {
                  setCurrentSection(item.key);
                  navigate(item.href);
                };
                
                return (
                  <button
                    key={item.key}
                    onClick={handleClick}
                    className={`p-3 rounded-xl transition ${
                      isActive ? "bg-blue-50" : "hover:bg-slate-100"
                    }`}
                    title={item.label}
                  >
                    <Icon
                      size={18}
                      className={isActive ? "text-blue-600" : "text-slate-500"}
                      strokeWidth={2}
                    />
                  </button>
                );
              })}
              
              {/* Settings Icon - Separate from STUDY_TOOLS */}
              <button
                onClick={() => {
                  setCurrentSection('settings');
                  navigate("/settings");
                }}
                className={`p-3 rounded-xl transition ${
                  location.pathname === "/settings" ? "bg-blue-50" : "hover:bg-slate-100"
                }`}
                title="Settings"
              >
                <Settings
                  size={18}
                  className={location.pathname === "/settings" ? "text-blue-600" : "text-slate-500"}
                  strokeWidth={2}
                />
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* Expanded Sidebar */}
      {!isSidebarCollapsed && (
        <aside className="w-72 bg-white border-r border-slate-200 flex flex-col h-screen bg-slate-50/50 sticky top-0 shrink-0 overflow-hidden">
          {/* Header - Fixed */}
          <div className="px-4 pt-4 pb-4 shrink-0">
            {/* Hamburger Menu to Collapse */}
            <button
              onClick={toggleSidebar}
              className="p-2 rounded-xl hover:bg-slate-100 transition mb-4"
            >
              <Menu size={24} className="text-slate-600" strokeWidth={2} />
            </button>
            
            {/* New Chat Button */}
            <button
              onClick={() => {
                startFreshChat();
                navigate("/");
                setCurrentSection('chat');
              }}
              className="w-full flex flex-row items-center justify-center rounded-xl bg-blue-600 py-3 shadow-md hover:bg-blue-700 transition"
            >
              <Plus size={20} className="text-white" strokeWidth={3} />
              <span className="ml-2 text-base font-bold text-white">
                New Chat
              </span>
            </button>
          </div>

          {/* Study Tools - Fixed */}
          <div className="px-4 pb-4 border-b border-slate-200 shrink-0">
            <h3 className="mb-3 text-xs font-bold uppercase tracking-widest text-slate-400">
              Study Tools
            </h3>
            {STUDY_TOOLS.map((item) => {
              const Icon = item.icon;
              const isActive = activePath === item.href;

              const handleClick = () => {
                setCurrentSection(item.key);
                navigate(item.href);
              };

              return (
                <button
                  key={item.key}
                  onClick={handleClick}
                  className={`w-full mb-1 flex flex-row items-center rounded-xl p-3 transition ${
                    isActive ? "bg-blue-50" : "hover:bg-slate-100"
                  }`}
                >
                  <Icon
                    size={18}
                    className={isActive ? "text-blue-600" : "text-slate-500"}
                    strokeWidth={2}
                  />
                  <span
                    className={`ml-3 text-sm ${
                      isActive ? "font-semibold text-blue-700" : "text-slate-700 font-medium"
                    }`}
                  >
                    {item.label}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Recent Chats - Scrollable */}
          <div className="flex-1 px-4 mt-6 overflow-y-auto min-h-0">
            <h3 className="mb-3 text-xs font-bold uppercase tracking-widest text-slate-400 sticky top-0 bg-white py-1 z-10">
              Recent Chats
            </h3>

            {threads.length === 0 ? (
              <p className="text-sm leading-6 text-slate-400">
                Your conversation history will appear here after the first
                message.
              </p>
            ) : (
              <div className="flex flex-col space-y-1 pb-4">
                {threads.map((thread) => (
                  <ChatItem
                    key={thread.id}
                    id={thread.id}
                    title={thread.title}
                    isActive={activeThreadId === thread.id}
                    isPinned={thread.isPinned}
                    onClick={() => handleSelectRecentThread(thread.id)}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Settings - Fixed at bottom */}
          <div className="px-4 py-4 border-t border-slate-200 shrink-0">
            <button
              onClick={() => {
                setCurrentSection('settings');
                navigate("/settings");
              }}
              className={`w-full flex flex-row items-center px-3 py-3 rounded-xl transition ${
                location.pathname === "/settings"
                  ? "bg-blue-50 border border-blue-100"
                  : "hover:bg-slate-100"
              }`}
            >
              <Settings
                size={20}
                className={location.pathname === "/settings" ? "text-blue-600" : "text-slate-500"}
                strokeWidth={2}
              />
              <span
                className={`ml-3 text-sm font-semibold ${
                  location.pathname === "/settings"
                    ? "text-blue-700"
                    : "text-slate-600"
                }`}
              >
                Settings
              </span>
            </button>
          </div>
        </aside>
      )}
    </>
  );
}

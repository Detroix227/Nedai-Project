import { useState } from "react";
import { LogOut, User, Key, Trash2, Bell, Shield, Palette } from "lucide-react";

import { AppShell } from "@/components/AppShell";
import { useAuthStore } from "@/modules/auth/useAuthStore";
import { useChatStore } from "@/modules/chat/useChatStore";

function Section({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="mt-6 rounded-3xl bg-white p-6 shadow-sm border border-slate-100">
      <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-4">
        {title}
      </h3>
      {children}
    </div>
  );
}

function SettingItem({
  icon: Icon,
  title,
  description,
  onClick,
  danger = false,
}: {
  icon: any;
  title: string;
  description: string;
  onClick: () => void;
  danger?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      className={`w-full mb-3 rounded-2xl border ${
        danger 
          ? "bg-rose-50 border-rose-200 hover:bg-rose-100" 
          : "bg-white border-slate-200 hover:bg-slate-50"
      } px-4 py-4 text-left transition`}
    >
      <div className="flex items-center">
        <Icon size={20} className={`${danger ? "text-rose-600" : "text-slate-600"} mr-3`} />
        <div>
          <h4 className={`text-base font-semibold ${danger ? "text-rose-700" : "text-slate-800"}`}>
            {title}
          </h4>
          <p className={`mt-1 text-sm leading-5 ${danger ? "text-rose-600" : "text-slate-500"}`}>
            {description}
          </p>
        </div>
      </div>
    </button>
  );
}

export default function SettingsScreen() {
  const logout = useAuthStore((state) => state.logout);
  const clearChatHistory = useChatStore((state) => state.clearChatHistory);
  const [showClearChatConfirm, setShowClearChatConfirm] = useState(false);

  function handleClearChatHistory() {
    setShowClearChatConfirm(true);
  }

  function confirmClearChatHistory() {
    clearChatHistory();
    setShowClearChatConfirm(false);
  }

  function handleLogout() {
    logout();
    window.location.href = "/login";
  }

  function handleProfileSettings() {
    window.location.href = "/profile";
  }

  function handleChangePassword() {
    window.location.href = "/change-password";
  }

  return (
    <AppShell
      title="Settings"
    >
      <div className="flex flex-col w-full max-w-6xl mx-auto p-6">
        {/* Account Settings */}
        <Section title="Account">
          <SettingItem
            icon={User}
            title="Profile Settings"
            description="Manage your personal information and academic profile"
            onClick={handleProfileSettings}
          />
          <SettingItem
            icon={Key}
            title="Change Password"
            description="Update your password without leaving your account settings"
            onClick={handleChangePassword}
          />
        </Section>

        {/* Application Settings */}
        <Section title="Application">
          <SettingItem
            icon={Bell}
            title="Notifications"
            description="Configure notification preferences and alerts"
            onClick={() => {
              // TODO: Implement notifications settings
              alert("Notifications settings coming soon!");
            }}
          />
          <SettingItem
            icon={Palette}
            title="Appearance"
            description="Customize the app theme and display preferences"
            onClick={() => {
              // TODO: Implement appearance settings
              alert("Appearance settings coming soon!");
            }}
          />
          <SettingItem
            icon={Shield}
            title="Privacy & Security"
            description="Manage your privacy settings and security preferences"
            onClick={() => {
              // TODO: Implement privacy settings
              alert("Privacy settings coming soon!");
            }}
          />
        </Section>

        {/* Data Management */}
        <Section title="Data Management">
          <SettingItem
            icon={Trash2}
            title="Clear Chat History"
            description="Remove every saved conversation from this account"
            danger={true}
            onClick={handleClearChatHistory}
          />
        </Section>

        {/* Account Actions */}
        <Section title="Account Actions">
          <SettingItem
            icon={LogOut}
            title="Log Out"
            description="Sign out of your account and return to login"
            onClick={handleLogout}
          />
        </Section>

        {/* Clear Chat History Confirmation Modal */}
        {showClearChatConfirm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-2xl p-6 max-w-md mx-4">
              <h3 className="text-lg font-semibold text-slate-900 mb-2">
                Clear chat history
              </h3>
              <p className="text-sm text-slate-600 mb-6">
                This will permanently delete your chat history from the device and server.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowClearChatConfirm(false)}
                  className="flex-1 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium rounded-xl transition"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmClearChatHistory}
                  className="flex-1 px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-medium rounded-xl transition"
                >
                  Clear
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </AppShell>
  );
}

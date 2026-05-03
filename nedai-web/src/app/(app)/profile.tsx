import { useEffect, useState } from "react";
import { Save, RefreshCw, Key, Trash2, LogOut, ChevronDown } from "lucide-react";

import { AppShell } from "@/components/AppShell";
import { useAuthStore } from "@/modules/auth/useAuthStore";
import { useChatStore } from "@/modules/chat/useChatStore";

function Section({
  title,
  children,
  defaultCollapsed = false,
}: {
  title: string;
  children: React.ReactNode;
  defaultCollapsed?: boolean;
}) {
  const [isCollapsed, setIsCollapsed] = useState(defaultCollapsed);
  
  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };
  
  return (
    <div className="mt-6 rounded-3xl bg-white shadow-sm border border-slate-100 overflow-hidden">
      <button
        onClick={toggleCollapse}
        className="w-full px-6 py-4 flex items-center justify-between hover:bg-slate-50 transition-all duration-200 group"
        type="button"
      >
        <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 group-hover:text-slate-500">
          {title}
        </h3>
        <div className="flex items-center space-x-2">
          <span className="text-xs text-slate-400 group-hover:text-slate-500">
            {isCollapsed ? "Show" : "Hide"}
          </span>
          <div className={`transform transition-transform duration-200 ${isCollapsed ? 'rotate-0' : 'rotate-180'}`}>
            <ChevronDown size={16} className="text-slate-400 group-hover:text-slate-500" />
          </div>
        </div>
      </button>
      <div className={`transition-all duration-300 ease-in-out ${isCollapsed ? 'max-h-0 opacity-0 overflow-hidden' : 'opacity-100 overflow-visible'}`}>
        <div className="px-6 pb-6">
          {children}
        </div>
      </div>
    </div>
  );
}

function TextField({
  label,
  value,
  onChange,
  placeholder,
  editable = true,
  type = "text",
}: {
  label: string;
  value: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  editable?: boolean;
  type?: string;
}) {
  return (
    <div className="mb-5">
      <label className="block mb-2 text-xs font-bold uppercase tracking-wider text-slate-500">
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        placeholder={placeholder}
        disabled={!editable}
        className={`w-full min-h-[56px] rounded-2xl border border-slate-200 px-5 py-4 text-base focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
          editable 
            ? "bg-slate-50 text-slate-900" 
            : "bg-slate-100 text-slate-500 cursor-not-allowed"
        }`}
      />
    </div>
  );
}

export default function ProfileScreen() {
  const user = useAuthStore((state) => state.user);
  const updateProfile = useAuthStore((state) => state.updateProfile);
  const logout = useAuthStore((state) => state.logout);
  const clearError = useAuthStore((state) => state.clearError);
  const errorMessage = useAuthStore((state) => state.errorMessage);
  const status = useAuthStore((state) => state.status);
  const refreshProfile = useAuthStore((state) => state.refreshProfile);
  const token = useAuthStore((state) => state.accessToken);
  const clearChatHistory = useChatStore((state) => state.clearChatHistory);
  
  const [fullName, setFullName] = useState("");
  const [institution, setInstitution] = useState("");
  const [matricNumber, setMatricNumber] = useState("");
  const [studentAcademicLevel, setStudentAcademicLevel] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [lecturerHighestQualification, setLecturerHighestQualification] = useState("");
  const [lecturerCurrentAcademicStage, setLecturerCurrentAcademicStage] = useState("");
  const [localError, setLocalError] = useState<string | null>(null);
  const [showClearChatConfirm, setShowClearChatConfirm] = useState(false);

  useEffect(() => {
    if (!user) {
      return;
    }

    setFullName(user.fullName);
    setInstitution(user.institution ?? "");
    setMatricNumber(user.matricNumber ?? "");
    setStudentAcademicLevel(user.studentAcademicLevel ?? "");
    setDateOfBirth(user.dateOfBirth ?? "");
    setLecturerHighestQualification(user.lecturerHighestQualification ?? "");
    setLecturerCurrentAcademicStage(user.lecturerCurrentAcademicStage ?? "");
  }, [user]);

  async function handleSave() {
    clearError();

    if (!fullName.trim() || !institution.trim()) {
      setLocalError("Name and university name are required.");
      return;
    }

    if (user?.role === "STUDENT") {
      if (
        !studentAcademicLevel.trim() ||
        !matricNumber.trim() ||
        !dateOfBirth.trim()
      ) {
        setLocalError("Complete all required student fields.");
        return;
      }
    }

    if (user?.role === "LECTURER") {
      if (
        !lecturerHighestQualification.trim() ||
        !lecturerCurrentAcademicStage.trim()
      ) {
        setLocalError("Complete all required lecturer fields.");
        return;
      }
    }

    setLocalError(null);

    try {
      await updateProfile({
        fullName,
        institution,
        ...(user?.role === "STUDENT"
          ? {
              matricNumber,
              studentAcademicLevel,
              dateOfBirth,
            }
          : {}),
        ...(user?.role === "LECTURER"
          ? {
              lecturerHighestQualification,
              lecturerCurrentAcademicStage,
            }
          : {}),
      });
    } catch (error) {
      console.error("Profile update failed:", error);
    }
  }

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

  function handleRefresh() {
    if (token) {
      refreshProfile(token);
    }
  }

  const versionId = "Web Build";

  return (
    <AppShell
      title="Profile"
    >
      <div className="flex flex-col w-full max-w-6xl mx-auto p-6">
        {/* Identity Section */}
        <Section title="Identity" defaultCollapsed={false}>
          <TextField
            label="Name"
            value={fullName}
            onChange={setFullName}
            placeholder="Your full name"
          />
          <TextField 
            label="Email" 
            value={user?.email ?? ""} 
            editable={false} 
          />
          <TextField 
            label="Role" 
            value={user?.role ?? ""} 
            editable={false} 
          />
        </Section>

        {/* Academic Profile Section */}
        <Section title="Academic Profile" defaultCollapsed={false}>
          <TextField
            label="University Name"
            value={institution}
            onChange={setInstitution}
            placeholder="Mountain Top University"
          />

          {user?.role === "STUDENT" ? (
            <>
              <TextField
                label="Academic Level"
                value={studentAcademicLevel}
                onChange={setStudentAcademicLevel}
                placeholder="400 Level"
              />
              <TextField
                label="Matriculation Number"
                value={matricNumber}
                onChange={setMatricNumber}
                placeholder="MAT/2022/001"
              />
              <TextField
                label="Date of Birth"
                value={dateOfBirth}
                onChange={setDateOfBirth}
                placeholder="YYYY-MM-DD"
                type="date"
              />
            </>
          ) : (
            <>
              <TextField
                label="Highest Qualification"
                value={lecturerHighestQualification}
                onChange={setLecturerHighestQualification}
                placeholder="BSc Computer Science"
              />
              <TextField
                label="Current Academic Stage"
                value={lecturerCurrentAcademicStage}
                onChange={setLecturerCurrentAcademicStage}
                placeholder="Masters Level"
              />
            </>
          )}
        </Section>

        {/* System Section */}
        <Section title="System" defaultCollapsed={true}>
          <button
            onClick={() => window.location.href = "/change-password"}
            className="w-full mb-3 rounded-2xl border border-slate-200 bg-white px-4 py-4 text-left hover:bg-slate-50 transition"
          >
            <div className="flex items-center">
              <Key size={20} className="text-slate-600 mr-3" />
              <div>
                <h4 className="text-base font-semibold text-slate-800">
                  Change Password
                </h4>
                <p className="mt-1 text-sm leading-5 text-slate-500">
                  Update your password without leaving your account settings.
                </p>
              </div>
            </div>
          </button>

          <div className="mb-3 rounded-2xl bg-white border border-slate-100 px-4 py-4 flex items-center justify-between">
            <div>
              <h4 className="text-sm font-semibold text-slate-700">
                Update Version
              </h4>
              <p className="text-xs text-slate-400 mt-1">
                ID: {versionId}
              </p>
            </div>
            <button
              onClick={handleRefresh}
              className="rounded-xl bg-blue-50 px-4 py-2 hover:bg-blue-100 transition flex items-center"
            >
              <RefreshCw size={16} className="text-blue-600 mr-2" />
              <span className="text-sm font-bold text-blue-600">Check</span>
            </button>
          </div>

          <button
            onClick={handleClearChatHistory}
            className="w-full mb-3 rounded-2xl bg-rose-50 px-4 py-4 text-left hover:bg-rose-100 transition"
          >
            <div className="flex items-center">
              <Trash2 size={20} className="text-rose-600 mr-3" />
              <div>
                <h4 className="text-base font-semibold text-rose-700">
                  Clear Chat History
                </h4>
                <p className="mt-1 text-sm leading-5 text-rose-600">
                  Remove every saved conversation from this account.
                </p>
              </div>
            </div>
          </button>

          <button
            onClick={handleLogout}
            className="w-full rounded-2xl bg-slate-100 px-4 py-4 text-left hover:bg-slate-200 transition"
          >
            <div className="flex items-center">
              <LogOut size={20} className="text-slate-600 mr-3" />
              <h4 className="text-base font-semibold text-slate-700">
                Log Out
              </h4>
            </div>
          </button>
        </Section>

        {/* Error Message */}
        {localError || errorMessage ? (
          <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-2xl">
            <p className="text-sm text-red-600">
              {localError || errorMessage}
            </p>
          </div>
        ) : null}

        {/* Save Button */}
        <button
          onClick={handleSave}
          disabled={status === "loading"}
          className="mt-6 w-full bg-blue-600 hover:bg-blue-700 disabled:bg-slate-300 text-white font-semibold py-4 rounded-2xl transition flex items-center justify-center"
        >
          {status === "loading" ? (
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
          ) : (
            <Save size={20} className="mr-2" />
          )}
          {status === "loading" ? "Saving..." : "Save Profile"}
        </button>

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

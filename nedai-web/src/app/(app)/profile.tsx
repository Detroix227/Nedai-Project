import { useEffect, useState } from "react";
import { Key, Trash2, LogOut, ChevronDown, User, GraduationCap, Settings, Loader2 } from "lucide-react";

import { AppShell } from "@/components/AppShell";
import { useAuthStore } from "@/modules/auth/useAuthStore";
import { useChatStore } from "@/modules/chat/useChatStore";

function Section({
  title,
  icon: Icon,
  children,
  defaultCollapsed = false,
}: {
  title: string;
  icon?: any;
  children: React.ReactNode;
  defaultCollapsed?: boolean;
}) {
  const [isCollapsed, setIsCollapsed] = useState(defaultCollapsed);
  
  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };
  
  return (
    <div className="mt-6 rounded-3xl bg-white dark:bg-slate-900 shadow-sm border border-slate-100 dark:border-slate-800 overflow-hidden transition-all duration-300">
      <button
        onClick={toggleCollapse}
        className="w-full px-6 py-5 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-all duration-200 group"
        type="button"
      >
        <div className="flex items-center space-x-3">
          {Icon && (
            <div className="w-10 h-10 rounded-full bg-blue-50 dark:bg-blue-900/30 flex items-center justify-center">
              <Icon size={20} className="text-blue-600 dark:text-blue-400" />
            </div>
          )}
          <h3 className="text-sm font-bold uppercase tracking-widest text-slate-700 dark:text-slate-200 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
            {title}
          </h3>
        </div>
        <div className="flex items-center space-x-2 bg-slate-100 dark:bg-slate-800 px-3 py-1.5 rounded-full">
          <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
            {isCollapsed ? "Expand" : "Collapse"}
          </span>
          <div className={`transform transition-transform duration-300 ${isCollapsed ? 'rotate-0' : 'rotate-180'}`}>
            <ChevronDown size={16} className="text-slate-500 dark:text-slate-400" />
          </div>
        </div>
      </button>
      <div className={`transition-all duration-500 ease-in-out ${isCollapsed ? 'max-h-0 opacity-0 overflow-hidden' : 'opacity-100 max-h-[2000px]'}`}>
        <div className="px-6 pb-6 pt-2">
          <div className="h-px w-full bg-slate-100 dark:bg-slate-800 mb-6" />
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
  options,
}: {
  label: string;
  value: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  editable?: boolean;
  type?: string;
  options?: string[];
}) {
  return (
    <div className="mb-5">
      <label className="block mb-2 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
        {label}
      </label>
      {options ? (
        <select
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          disabled={!editable}
          className={`w-full min-h-[56px] rounded-2xl border border-slate-200 dark:border-slate-700 px-5 py-4 text-base focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
            editable 
              ? "bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-700" 
              : "bg-slate-100 dark:bg-slate-800/50 text-slate-500 dark:text-slate-500 cursor-not-allowed"
          }`}
        >
          <option value="" disabled>Select an option</option>
          {options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
        </select>
      ) : (
        <input
          type={type}
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          placeholder={placeholder}
          disabled={!editable}
          className={`w-full min-h-[56px] rounded-2xl border border-slate-200 dark:border-slate-700 px-5 py-4 text-base focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all ${
            editable 
              ? "bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-slate-100 hover:bg-slate-100 dark:hover:bg-slate-700" 
              : "bg-slate-100 dark:bg-slate-800/50 text-slate-500 dark:text-slate-500 cursor-not-allowed"
          }`}
        />
      )}
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
  const clearChatHistory = useChatStore((state) => state.clearChatHistory);
  
  // Identity
  const [fullName, setFullName] = useState("");
  const [age, setAge] = useState("");
  const [maritalStatus, setMaritalStatus] = useState("");

  // Academic Profile
  const [academicLevel, setAcademicLevel] = useState("");
  const [institutionalLevel, setInstitutionalLevel] = useState("");
  const [futureCareer, setFutureCareer] = useState("");

  const [localError, setLocalError] = useState<string | null>(null);
  const [showClearChatConfirm, setShowClearChatConfirm] = useState(false);

  useEffect(() => {
    if (!user) return;
    setFullName(user.fullName);
    setAge(user.age != null ? String(user.age) : "");
    setMaritalStatus(user.maritalStatus ?? "");
    setAcademicLevel(user.academicLevel ?? "");
    setInstitutionalLevel(user.institutionalLevel ?? "");
    setFutureCareer(user.futureCareer ?? "");
  }, [user]);

  async function handleSave() {
    clearError();

    if (!fullName.trim()) {
      setLocalError("Name is required.");
      return;
    }

    setLocalError(null);

    try {
      await updateProfile({
        fullName,
        institution: user?.institution ?? undefined,
        age: age ? Number(age) : null,
        maritalStatus: maritalStatus || null,
        academicLevel: academicLevel || null,
        institutionalLevel: institutionalLevel || null,
        futureCareer: futureCareer || null,
      });
    } catch (error) {
      console.error("Profile update failed:", error);
    }
  }

  function handleLogout() {
    logout();
    window.location.href = "/login";
  }

  return (
    <AppShell title="Profile">
      <div className="flex flex-col w-full max-w-4xl mx-auto p-6 overflow-y-auto custom-scrollbar h-full pb-24">
        
        <div className="flex items-center space-x-6 mb-8">
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-3xl font-bold text-white shadow-lg">
            {fullName.charAt(0).toUpperCase()}
          </div>
          <div>
            <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white">{fullName || "Your Profile"}</h1>
            <p className="text-slate-500 dark:text-slate-400 text-lg">{user?.role} Account</p>
          </div>
        </div>

        {/* Identity Section */}
        <Section title="Identity" icon={User} defaultCollapsed={false}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
            <TextField label="Full Name" value={fullName} onChange={setFullName} placeholder="Your full name" />
            <TextField label="Email Address" value={user?.email ?? ""} editable={false} />
            <TextField label="Role" value={user?.role ?? ""} editable={false} />
            <TextField label="Age" value={age} onChange={setAge} type="number" placeholder="e.g. 21" />
            <TextField 
              label="Marital Status" 
              value={maritalStatus} 
              onChange={setMaritalStatus} 
              options={["Single", "Married", "Divorced", "Widowed"]}
            />
          </div>
        </Section>

        {/* Academic Profile Section */}
        <Section title="Academic Profile" icon={GraduationCap} defaultCollapsed={false}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
            <TextField 
              label="Academic Level" 
              value={academicLevel} 
              onChange={setAcademicLevel} 
              options={["Primary", "Secondary", "University", "Postgraduate"]}
            />
            <TextField 
              label="Institutional Level" 
              value={institutionalLevel} 
              onChange={setInstitutionalLevel} 
              placeholder="e.g. Primary 1, JSS1, SS1, 100L, Masters" 
            />
            <TextField 
              label="Current / Future Career" 
              value={futureCareer} 
              onChange={setFutureCareer} 
              placeholder="e.g. Software Engineer, Doctor" 
            />
          </div>
        </Section>

        {/* System Section */}
        <Section title="System" icon={Settings} defaultCollapsed={true}>
          <div className="grid grid-cols-1 gap-4">
            <button
              onClick={() => window.location.href = "/change-password"}
              className="w-full rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-6 py-5 text-left hover:bg-slate-50 dark:hover:bg-slate-800 transition shadow-sm group"
            >
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center mr-4 group-hover:bg-blue-50 dark:group-hover:bg-blue-900/30 transition-colors">
                  <Key size={20} className="text-slate-600 dark:text-slate-400 group-hover:text-blue-600 dark:group-hover:text-blue-400" />
                </div>
                <div>
                  <h4 className="text-base font-bold text-slate-800 dark:text-slate-200">Change Password</h4>
                  <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Update your account security credentials.</p>
                </div>
              </div>
            </button>

            <button
              onClick={() => setShowClearChatConfirm(true)}
              className="w-full rounded-2xl border border-rose-100 dark:border-rose-900/30 bg-rose-50/50 dark:bg-rose-900/10 px-6 py-5 text-left hover:bg-rose-100 dark:hover:bg-rose-900/30 transition shadow-sm group"
            >
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-rose-100 dark:bg-rose-900/50 flex items-center justify-center mr-4 group-hover:bg-rose-200 dark:group-hover:bg-rose-800 transition-colors">
                  <Trash2 size={20} className="text-rose-600 dark:text-rose-400" />
                </div>
                <div>
                  <h4 className="text-base font-bold text-rose-700 dark:text-rose-400">Clear Chat History</h4>
                  <p className="mt-1 text-sm text-rose-600 dark:text-rose-500">Remove every saved conversation from this account.</p>
                </div>
              </div>
            </button>

            <button
              onClick={handleLogout}
              className="w-full rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-100 dark:bg-slate-800 px-6 py-5 text-left hover:bg-slate-200 dark:hover:bg-slate-700 transition shadow-sm"
            >
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-white dark:bg-slate-900 flex items-center justify-center mr-4">
                  <LogOut size={20} className="text-slate-600 dark:text-slate-400" />
                </div>
                <h4 className="text-base font-bold text-slate-700 dark:text-slate-200">Log Out</h4>
              </div>
            </button>
          </div>
        </Section>

        {/* Error Message */}
        {(localError || errorMessage) && (
          <div className="mt-6 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-2xl">
            <p className="text-sm font-semibold text-red-600 dark:text-red-400">{localError || errorMessage}</p>
          </div>
        )}

        {/* Save Button */}
        <button
          onClick={handleSave}
          disabled={status === "loading"}
          className="mt-8 w-full bg-blue-600 hover:bg-blue-700 disabled:bg-slate-400 text-white font-bold py-5 rounded-2xl transition shadow-lg transform hover:scale-[1.01] active:scale-[0.99] flex items-center justify-center text-lg"
        >
          {status === "loading" && <Loader2 size={22} className="animate-spin mr-3" />}
          {status === "loading" ? "Saving Profile..." : "Save Profile"}
        </button>

        {/* Clear Chat History Confirmation Modal */}
        {showClearChatConfirm && (
          <div className="fixed inset-0 bg-slate-900/40 dark:bg-slate-950/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
            <div className="bg-white dark:bg-slate-900 rounded-3xl p-8 w-full max-w-md shadow-2xl border border-slate-100 dark:border-slate-800">
              <h3 className="text-xl font-bold text-slate-900 dark:text-slate-100 mb-3">Clear chat history?</h3>
              <p className="text-slate-600 dark:text-slate-400 mb-8 leading-relaxed">
                This will permanently delete your chat history from the device and server. This action cannot be undone.
              </p>
              <div className="flex gap-4">
                <button
                  onClick={() => setShowClearChatConfirm(false)}
                  className="flex-1 px-4 py-3 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 font-bold rounded-xl transition"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    clearChatHistory();
                    setShowClearChatConfirm(false);
                  }}
                  className="flex-1 px-4 py-3 bg-rose-600 hover:bg-rose-700 text-white font-bold rounded-xl transition shadow-md"
                >
                  Yes, Clear
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </AppShell>
  );
}

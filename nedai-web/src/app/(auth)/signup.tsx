import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { User, Mail, Lock, Eye, EyeOff } from "lucide-react";

import { useAuthStore } from "@/modules/auth/useAuthStore";

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

export default function SignupScreen() {
  const [showPassword, setShowPassword] = useState(false);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<"STUDENT" | "LECTURER">("STUDENT");
  const [localError, setLocalError] = useState<string | null>(null);
  
  const signUp = useAuthStore((state) => state.signUp);
  const clearError = useAuthStore((state) => state.clearError);
  const errorMessage = useAuthStore((state) => state.errorMessage);
  const status = useAuthStore((state) => state.status);
  const isSubmitting = status === "loading";
  const activeError = localError || errorMessage;
  const navigate = useNavigate();

  async function handleSignup(e: React.FormEvent) {
    e.preventDefault();
    clearError();

    if (!fullName.trim() || !email.trim() || !password.trim()) {
      setLocalError("Full name, role, email, and password are required.");
      return;
    }

    if (fullName.trim().length < 2) {
      setLocalError("Full name must be at least 2 characters.");
      return;
    }

    if (!isValidEmail(email)) {
      setLocalError("Enter a valid email address.");
      return;
    }

    if (password.length < 8) {
      setLocalError("Password must be at least 8 characters.");
      return;
    }

    setLocalError(null);

    try {
      await signUp({ fullName, role, email, password });
      navigate("/");
    } catch {}
  }

  return (
    <main className="flex-1 bg-white min-h-screen flex flex-col">
      <div className="flex-1 overflow-y-auto">
        <div className="flex-1 flex flex-col items-center px-6 pb-10 pt-10 max-w-md mx-auto">
          
          <div className="mb-4 h-20 w-20 flex items-center justify-center">
            <img 
              src="/nedai-logo.png" 
              alt="NedAI Logo" 
              className="w-full h-full object-contain"
            />
          </div>

          <h1 className="mb-10 text-3xl font-bold text-slate-900">
            NedAI
          </h1>

          <h2 className="mb-2 text-2xl font-bold text-slate-900 text-center">
            Create account
          </h2>
          <p className="mb-10 px-4 text-center text-slate-500">
            Set up your account and continue building from the app shell.
          </p>

          <form onSubmit={handleSignup} className="w-full flex-1 flex flex-col">
            <div className="mb-5">
              <label className="mb-2 ml-1 text-sm font-semibold text-slate-700 block">
                Full Name
              </label>
              <div className="h-14 flex flex-row items-center rounded-xl border border-slate-200 bg-slate-50 px-4">
                <User size={20} className="text-[#64748B]" />
                <input
                  type="text"
                  placeholder="John Doe"
                  className="ml-3 flex-1 text-base text-slate-900 bg-transparent outline-none"
                  value={fullName}
                  onChange={(e) => {
                    setFullName(e.target.value);
                    setLocalError(null);
                    clearError();
                  }}
                />
              </div>
            </div>

            <div className="mb-5">
              <label className="mb-2 ml-1 text-sm font-semibold text-slate-700 block">
                Role
              </label>
              <div className="flex flex-row">
                {(
                  [
                    { label: "Student", value: "STUDENT" },
                    { label: "Lecturer", value: "LECTURER" },
                  ] as const
                ).map((option) => (
                  <button
                    type="button"
                    key={option.value}
                    onClick={() => {
                      setRole(option.value);
                      setLocalError(null);
                      clearError();
                    }}
                    className={`mr-3 flex-1 rounded-xl px-4 py-3 transition-colors ${role === option.value ? "bg-blue-600" : "bg-slate-100 hover:bg-slate-200"}`}
                  >
                    <span
                      className={`text-center text-sm font-semibold ${role === option.value ? "text-white" : "text-slate-700"}`}
                    >
                      {option.label}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-5">
              <label className="mb-2 ml-1 text-sm font-semibold text-slate-700 block">
                Email Address
              </label>
              <div className="h-14 flex flex-row items-center rounded-xl border border-slate-200 bg-slate-50 px-4">
                <Mail size={20} className="text-[#64748B]" />
                <input
                  type="email"
                  placeholder="name@email.com"
                  className="ml-3 flex-1 text-base text-slate-900 bg-transparent outline-none"
                  autoCapitalize="none"
                  autoCorrect="off"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setLocalError(null);
                    clearError();
                  }}
                />
              </div>
            </div>

            <div className="mb-5">
              <label className="mb-2 ml-1 text-sm font-semibold text-slate-700 block">
                Password
              </label>
              <div className="h-14 flex flex-row items-center rounded-xl border border-slate-200 bg-slate-50 px-4">
                <Lock size={20} className="text-[#64748B]" />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="........"
                  className="ml-3 flex-1 text-base text-slate-900 bg-transparent outline-none"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setLocalError(null);
                    clearError();
                  }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((value) => !value)}
                  className="p-1"
                >
                  {showPassword ? (
                    <EyeOff size={20} className="text-[#64748B]" />
                  ) : (
                    <Eye size={20} className="text-[#64748B]" />
                  )}
                </button>
              </div>
            </div>

            {activeError && (
              <span className="mb-2 px-1 text-sm text-red-600">
                {activeError}
              </span>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className={`mt-4 h-14 w-full flex items-center justify-center rounded-xl shadow-sm transition-colors ${
                isSubmitting ? "bg-slate-400 cursor-not-allowed" : "bg-slate-900 hover:bg-slate-800"
              }`}
            >
              <span className="text-lg font-bold text-white">
                {isSubmitting ? "Creating account..." : "Create Account"}
              </span>
            </button>
          </form>

          <div className="mb-6 mt-auto flex flex-row pt-10">
            <span className="text-slate-500 mr-1">
              Already have an account?
            </span>
            <Link to="/login" className="font-bold text-blue-600 hover:text-blue-700">
              Log in
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}

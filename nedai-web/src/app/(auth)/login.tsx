import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import { useAuthStore } from "@/modules/auth/useAuthStore";

function isValidEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim());
}

export default function LoginScreen() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [localError, setLocalError] = useState<string | null>(null);
  const navigate = useNavigate();
  
  const signIn = useAuthStore((state) => state.signIn);
  const clearError = useAuthStore((state) => state.clearError);
  const errorMessage = useAuthStore((state) => state.errorMessage);
  const status = useAuthStore((state) => state.status);
  const isSubmitting = status === "loading";
  const activeError = localError || errorMessage;

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    clearError();
    if (!email.trim() || !password.trim()) {
      setLocalError("Email and password are required.");
      return;
    }
    if (!isValidEmail(email)) {
      setLocalError("Enter a valid email address.");
      return;
    }
    setLocalError(null);
    try {
      await signIn({ email, password });
      navigate("/chat");
    } catch {}
  }

  return (
    <main className="flex-1 bg-white min-h-screen flex flex-col">
      <div className="flex-1 overflow-y-auto">
        <div className="flex-1 flex flex-col items-center px-6 pb-10 pt-10 max-w-md mx-auto">
          
          {/* Logo */}
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

          <h2 className="mb-2 text-2xl font-bold text-slate-900 w-full text-center">
            Welcome
          </h2>
          <p className="mb-10 px-4 text-center text-slate-500">
            Sign in to continue with your workspace.
          </p>

          <form className="w-full" onSubmit={handleLogin}>
            <div className="mb-6">
              <label className="block mb-2 ml-1 text-sm font-semibold text-slate-700">
                Email Address
              </label>
              <div className="h-14 flex flex-row items-center rounded-xl border border-slate-200 bg-slate-50 px-4">
                <Mail className="w-5 h-5 text-slate-500" />
                <input
                  type="email"
                  placeholder="name@email.com"
                  className="ml-3 flex-1 text-base text-slate-900 bg-transparent outline-none w-full"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setLocalError(null);
                  }}
                />
              </div>
            </div>

            <div className="mb-6">
              <div className="mx-1 mb-2 flex flex-row items-center justify-between">
                <label className="text-sm font-semibold text-slate-700">
                  Password
                </label>
                <Link to="/forgot-password" className="text-sm font-semibold text-blue-600 hover:opacity-80 transition-opacity">
                  Forgot password?
                </Link>
              </div>
              <div className="h-14 flex flex-row items-center rounded-xl border border-slate-200 bg-slate-50 px-4">
                <Lock className="w-5 h-5 text-slate-500" />
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="........"
                  className="ml-3 flex-1 text-base text-slate-900 bg-transparent outline-none w-full"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setLocalError(null);
                  }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="hover:opacity-80 transition-opacity ml-2 focus:outline-none"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5 text-slate-500" />
                  ) : (
                    <Eye className="w-5 h-5 text-slate-500" />
                  )}
                </button>
              </div>
            </div>

            {activeError ? (
              <p className="mb-2 px-1 text-sm text-red-600">
                {activeError}
              </p>
            ) : null}

            <button
              type="submit"
              className={`mt-8 w-full h-14 flex items-center justify-center rounded-xl shadow-sm transition-opacity ${
                isSubmitting ? "bg-slate-400 cursor-not-allowed" : "bg-slate-900 hover:opacity-90"
              }`}
              disabled={isSubmitting}
            >
              <span className="text-lg font-bold text-white">
                {isSubmitting ? "Signing in..." : "Continue"}
              </span>
            </button>
          </form>

          <div className="mb-6 mt-10 flex flex-row items-center gap-1 justify-center w-full">
            <span className="text-slate-500">
              Don't have an account?
            </span>
            <Link to="/signup" className="font-bold text-blue-600 hover:opacity-80 transition-opacity">
              Sign up
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}

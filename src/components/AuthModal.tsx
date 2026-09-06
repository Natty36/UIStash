"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Mail, Lock, User as UserIcon, ArrowRight, Check, Loader2, AlertCircle, AtSign } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

export function AuthModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const { signInWithGoogle, signInWithGithub, signInWithEmail, signUpWithEmail, checkUsernameAvailable } = useAuth();
  const [isSignUp, setIsSignUp] = useState(false);
  const [identifier, setIdentifier] = useState(""); // Email or Username for Sign In
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Username live availability checking state
  const [usernameStatus, setUsernameStatus] = useState<"idle" | "checking" | "available" | "taken" | "invalid">("idle");

  // Handle ESC key press
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  // Reset form state when modal opens/closes
  useEffect(() => {
    if (!isOpen) {
      queueMicrotask(() => {
        setError("");
        setIsLoading(false);
        setIsSuccess(false);
        setUsernameStatus("idle");
      });
    }
  }, [isOpen]);

  // Live username availability debounced check
  useEffect(() => {
    if (!isSignUp || !username.trim()) {
      queueMicrotask(() => setUsernameStatus("idle"));
      return;
    }

    const trimmed = username.trim();
    if (trimmed.length < 3 || !/^[a-zA-Z0-9_]+$/.test(trimmed)) {
      queueMicrotask(() => setUsernameStatus("invalid"));
      return;
    }

    const timer = setTimeout(async () => {
      try {
        const isAvailable = await checkUsernameAvailable(trimmed);
        setUsernameStatus(isAvailable ? "available" : "taken");
      } catch {
        setUsernameStatus("idle");
      }
    }, 350);

    queueMicrotask(() => setUsernameStatus("checking"));

    return () => clearTimeout(timer);
  }, [username, isSignUp, checkUsernameAvailable]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    if (isSignUp && usernameStatus === "taken") {
      setError("That username is already taken. Please choose another.");
      return;
    }

    setIsLoading(true);

    try {
      if (isSignUp) {
        if (!username.trim() || !email.trim()) {
          setError("Please fill in both username and email.");
          setIsLoading(false);
          return;
        }
        await signUpWithEmail(email, password, username);
      } else {
        if (!identifier.trim()) {
          setError("Please enter your email or username.");
          setIsLoading(false);
          return;
        }
        await signInWithEmail(identifier, password);
      }
      setIsSuccess(true);
      setTimeout(() => {
        setIsSuccess(false);
        onClose();
        setEmail("");
        setUsername("");
        setIdentifier("");
        setPassword("");
      }, 800);
    } catch (err: unknown) {
      const errorObj = err as Error;
      const rawMsg = errorObj.message || "An authentication error occurred.";
      setError(rawMsg.replace("Firebase: ", "").replace(/auth\//g, ""));
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setError("");
    setIsLoading(true);
    try {
      await signInWithGoogle();
      setIsSuccess(true);
      setTimeout(() => {
        setIsSuccess(false);
        onClose();
      }, 800);
    } catch (err: unknown) {
      const errorObj = err as Error;
      const rawMsg = errorObj.message || "Failed to sign in with Google.";
      setError(rawMsg.replace("Firebase: ", "").replace(/auth\//g, ""));
    } finally {
      setIsLoading(false);
    }
  };

  const handleGithubSignIn = async () => {
    setError("");
    setIsLoading(true);
    try {
      await signInWithGithub();
      setIsSuccess(true);
      setTimeout(() => {
        setIsSuccess(false);
        onClose();
      }, 800);
    } catch (err: unknown) {
      const errorObj = err as Error;
      const rawMsg = errorObj.message || "Failed to sign in with GitHub.";
      setError(rawMsg.replace("Firebase: ", "").replace(/auth\//g, ""));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          {/* Backdrop Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm"
          />

          {/* Modal Card */}
          <motion.div
            layout
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{
              layout: { type: "spring", stiffness: 350, damping: 32 },
              duration: 0.25,
            }}
            className="relative w-full max-w-md bg-zinc-950 border border-zinc-800 rounded-2xl shadow-2xl overflow-hidden z-10 font-mono"
          >
            {/* Top Bar Gradient */}
            <div className="h-1.5 w-full bg-gradient-to-r from-zinc-700 via-zinc-400 to-zinc-700" />

            <div className="p-6 sm:p-7">
              {/* Header Row */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2.5">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src="/logo.png" alt="UI Stash" className="w-7 h-7 object-contain rounded-md" />
                  <span className="font-bold text-lg text-zinc-100 tracking-tight font-mono">
                    UI Stash
                  </span>
                </div>
                <button
                  onClick={onClose}
                  className="p-1.5 rounded-lg text-zinc-400 hover:text-zinc-100 hover:bg-zinc-900 border border-transparent hover:border-zinc-800 transition-all"
                  aria-label="Close modal"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Title & Subtitle */}
              <div className="mb-6">
                <h2 className="text-xl font-bold tracking-tight text-zinc-100 mb-1">
                  {isSignUp ? "Create an account" : "Welcome back"}
                </h2>
                <p className="text-xs text-zinc-400">
                  Sign in to sync your saved tools across all your devices.
                </p>
              </div>

              {/* Mode Selector Tabs */}
              <div className="grid grid-cols-2 p-1 bg-zinc-900/80 border border-zinc-800/80 rounded-xl mb-6 relative">
                <button
                  type="button"
                  onClick={() => { setIsSignUp(false); setError(""); }}
                  className={`py-2 text-xs font-semibold rounded-lg relative transition-colors duration-200 z-10 ${
                    !isSignUp ? "text-zinc-100" : "text-zinc-400 hover:text-zinc-200"
                  }`}
                >
                  {!isSignUp && (
                    <motion.div
                      layoutId="authActiveTab"
                      className="absolute inset-0 bg-zinc-800 border border-zinc-700/60 rounded-lg shadow-sm -z-10"
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                  Sign In
                </button>
                <button
                  type="button"
                  onClick={() => { setIsSignUp(true); setError(""); }}
                  className={`py-2 text-xs font-semibold rounded-lg relative transition-colors duration-200 z-10 ${
                    isSignUp ? "text-zinc-100" : "text-zinc-400 hover:text-zinc-200"
                  }`}
                >
                  {isSignUp && (
                    <motion.div
                      layoutId="authActiveTab"
                      className="absolute inset-0 bg-zinc-800 border border-zinc-700/60 rounded-lg shadow-sm -z-10"
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                  Create Account
                </button>
              </div>

              {/* OAuth Social Buttons */}
              <div className="grid grid-cols-2 gap-3 mb-6">
                <button
                  type="button"
                  disabled={isLoading}
                  onClick={handleGoogleSignIn}
                  className="flex items-center justify-center gap-2 py-2.5 px-3 bg-zinc-900 hover:bg-zinc-800/80 border border-zinc-800 hover:border-zinc-700 rounded-xl text-xs font-medium text-zinc-300 hover:text-white transition-all active:scale-[0.98] disabled:opacity-50"
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24">
                    <path
                      fill="#EA4335"
                      d="M12 5c1.6 0 3 .6 4.1 1.6l3.1-3.1C17.3 1.7 14.8 1 12 1 7.5 1 3.7 3.6 1.9 7.3l3.7 2.9C6.5 7.4 9 5 12 5z"
                    />
                    <path
                      fill="#4285F4"
                      d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.5h6.5c-.3 1.5-1.1 2.8-2.4 3.7l3.7 2.9c2.2-2 3.7-5 3.7-8.8z"
                    />
                    <path
                      fill="#FBBC05"
                      d="M5.6 14.8c-.2-.7-.4-1.5-.4-2.3s.2-1.6.4-2.3L1.9 7.3C.7 9.7 0 10.8 0 12.5s.7 2.8 1.9 5.2l3.7-2.9z"
                    />
                    <path
                      fill="#34A853"
                      d="M12 23c3.2 0 6-1.1 8-3l-3.7-2.9c-1.1.7-2.5 1.2-4.3 1.2-3 0-5.5-2.4-6.4-5.2L1.9 16c1.8 3.7 5.6 7 10.1 7z"
                    />
                  </svg>
                  Google
                </button>
                <button
                  type="button"
                  disabled={isLoading}
                  onClick={handleGithubSignIn}
                  className="flex items-center justify-center gap-2 py-2.5 px-3 bg-zinc-900 hover:bg-zinc-800/80 border border-zinc-800 hover:border-zinc-700 rounded-xl text-xs font-medium text-zinc-300 hover:text-white transition-all active:scale-[0.98] disabled:opacity-50"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                  </svg>
                  GitHub
                </button>
              </div>

              {/* Divider */}
              <div className="relative flex items-center justify-center mb-6">
                <div className="border-t border-zinc-800/80 w-full" />
                <span className="bg-zinc-950 px-3 text-[10px] text-zinc-500 uppercase tracking-widest absolute">
                  or continue with
                </span>
              </div>

              {/* Error Banner */}
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex items-center gap-2 p-3 mb-4 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-mono"
                >
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{error}</span>
                </motion.div>
              )}

              {/* Form */}
              <form onSubmit={handleSubmit} className="space-y-4">
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={isSignUp ? "signup-fields" : "signin-fields"}
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -4 }}
                    transition={{ duration: 0.15, ease: "easeInOut" }}
                    className="space-y-4"
                  >
                    {isSignUp ? (
                      <>
                        {/* Username Field */}
                        <div className="space-y-1.5">
                          <div className="flex items-center justify-between">
                            <label className="text-[11px] text-zinc-400 font-mono font-medium">
                              Username
                            </label>
                            {usernameStatus === "checking" && (
                              <span className="text-[10px] text-zinc-400 font-mono flex items-center gap-1">
                                <Loader2 className="w-3 h-3 animate-spin" /> Checking...
                              </span>
                            )}
                            {usernameStatus === "available" && (
                              <span className="text-[10px] text-emerald-400 font-mono flex items-center gap-1">
                                <Check className="w-3 h-3 text-emerald-400" /> Available
                              </span>
                            )}
                            {usernameStatus === "taken" && (
                              <span className="text-[10px] text-red-400 font-mono flex items-center gap-1">
                                <X className="w-3 h-3 text-red-400" /> Already taken
                              </span>
                            )}
                            {usernameStatus === "invalid" && username.length > 0 && (
                              <span className="text-[10px] text-zinc-500 font-mono">
                                Min 3 chars (letters, numbers, _)
                              </span>
                            )}
                          </div>
                          <div className="relative">
                            <AtSign className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                            <input
                              type="text"
                              placeholder="johndoe"
                              required
                              value={username}
                              onChange={(e) => setUsername(e.target.value)}
                              className={`w-full bg-zinc-900/60 border rounded-xl py-2.5 pl-10 pr-4 text-xs text-zinc-200 placeholder:text-zinc-600 focus:outline-none transition-all font-mono ${
                                usernameStatus === "taken"
                                  ? "border-red-500/60 focus:border-red-500"
                                  : usernameStatus === "available"
                                  ? "border-emerald-500/60 focus:border-emerald-500"
                                  : "border-zinc-800 focus:border-zinc-400"
                              }`}
                            />
                          </div>
                        </div>

                        {/* Email Field */}
                        <div className="space-y-1.5">
                          <label className="text-[11px] text-zinc-400 font-mono font-medium">
                            Email Address
                          </label>
                          <div className="relative">
                            <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                            <input
                              type="email"
                              placeholder="name@example.com"
                              required
                              value={email}
                              onChange={(e) => setEmail(e.target.value)}
                              className="w-full bg-zinc-900/60 border border-zinc-800 rounded-xl py-2.5 pl-10 pr-4 text-xs text-zinc-200 placeholder:text-zinc-600 focus:outline-none focus:ring-1 focus:ring-zinc-400 focus:border-zinc-400 transition-all font-mono"
                            />
                          </div>
                        </div>
                      </>
                    ) : (
                      /* Identifier (Email or Username) Field */
                      <div className="space-y-1.5">
                        <label className="text-[11px] text-zinc-400 font-mono font-medium">
                          Email or Username
                        </label>
                        <div className="relative">
                          <UserIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                          <input
                            type="text"
                            placeholder="name@example.com or username"
                            required
                            value={identifier}
                            onChange={(e) => setIdentifier(e.target.value)}
                            className="w-full bg-zinc-900/60 border border-zinc-800 rounded-xl py-2.5 pl-10 pr-4 text-xs text-zinc-200 placeholder:text-zinc-600 focus:outline-none focus:ring-1 focus:ring-zinc-400 focus:border-zinc-400 transition-all font-mono"
                          />
                        </div>
                      </div>
                    )}
                  </motion.div>
                </AnimatePresence>

                {/* Password Field */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <label className="text-[11px] text-zinc-400 font-mono font-medium">
                      Password
                    </label>
                  </div>
                  <div className="relative">
                    <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500" />
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••••••"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full bg-zinc-900/60 border border-zinc-800 rounded-xl py-2.5 pl-10 pr-10 text-xs text-zinc-200 placeholder:text-zinc-600 focus:outline-none focus:ring-1 focus:ring-zinc-400 focus:border-zinc-400 transition-all font-mono"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-zinc-300 text-[10px] uppercase font-mono tracking-wider transition-colors"
                    >
                      {showPassword ? "Hide" : "Show"}
                    </button>
                  </div>
                </div>

                {/* Primary Action Button */}
                <button
                  type="submit"
                  disabled={isLoading || isSuccess || (isSignUp && usernameStatus === "taken")}
                  className="w-full mt-2 flex items-center justify-center gap-2 py-2.5 px-4 bg-zinc-100 hover:bg-white text-zinc-950 font-semibold rounded-xl text-xs transition-all duration-200 shadow-md active:scale-[0.98] disabled:opacity-80 disabled:cursor-not-allowed font-mono"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin text-zinc-950" />
                      <span>Processing...</span>
                    </>
                  ) : isSuccess ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-600" />
                      <span>{isSignUp ? "Account Created!" : "Signed In!"}</span>
                    </>
                  ) : (
                    <>
                      <span>{isSignUp ? "Sign Up" : "Sign In"}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>
              </form>

              {/* Bottom Toggle Note */}
              <p className="mt-5 text-center text-xs text-zinc-400 font-mono">
                {isSignUp ? "Already have an account? " : "Don't have an account? "}
                <button
                  type="button"
                  onClick={() => { setIsSignUp(!isSignUp); setError(""); }}
                  className="text-zinc-100 underline hover:text-zinc-300 font-medium transition-colors"
                >
                  {isSignUp ? "Sign In" : "Sign Up"}
                </button>
              </p>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

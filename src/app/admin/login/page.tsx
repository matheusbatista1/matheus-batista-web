"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { Mail } from "lucide-react";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [emailSent, setEmailSent] = useState(false);
  const [loading, setLoading] = useState("");

  async function handleOAuth(provider: string) {
    setLoading(provider);
    await signIn(provider, { callbackUrl: "/admin" });
  }

  async function handleEmail(e: React.FormEvent) {
    e.preventDefault();
    setLoading("resend");
    await signIn("resend", { email, callbackUrl: "/admin", redirect: false });
    setEmailSent(true);
    setLoading("");
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#0a0a0a] px-4">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <div className="mb-12 text-center">
          <h1 className="text-[48px] font-light capitalize text-[#d9d9d9]">
            LOGO
          </h1>
          <p className="mt-2 text-[14px] text-[#6e6e73]">Admin Panel</p>
        </div>

        <div className="rounded-xl bg-[#1a1a1a] p-8">
          <h2 className="mb-6 text-center text-[18px] font-medium text-[#f5f5f7]">
            Sign in
          </h2>

          {/* OAuth providers */}
          <div className="flex flex-col gap-3">
            <button
              type="button"
              onClick={() => handleOAuth("google")}
              disabled={!!loading}
              className="flex h-[44px] items-center justify-center gap-3 rounded-lg bg-white/5 text-[14px] text-[#f5f5f7] transition-colors hover:bg-white/10 disabled:opacity-50"
            >
              <svg width="18" height="18" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
              </svg>
              {loading === "google" ? "Signing in..." : "Continue with Google"}
            </button>

            <button
              type="button"
              onClick={() => handleOAuth("microsoft-entra-id")}
              disabled={!!loading}
              className="flex h-[44px] items-center justify-center gap-3 rounded-lg bg-white/5 text-[14px] text-[#f5f5f7] transition-colors hover:bg-white/10 disabled:opacity-50"
            >
              <svg width="18" height="18" viewBox="0 0 23 23">
                <rect fill="#f25022" x="1" y="1" width="10" height="10" />
                <rect fill="#00a4ef" x="1" y="12" width="10" height="10" />
                <rect fill="#7fba00" x="12" y="1" width="10" height="10" />
                <rect fill="#ffb900" x="12" y="12" width="10" height="10" />
              </svg>
              {loading === "microsoft-entra-id" ? "Signing in..." : "Continue with Microsoft"}
            </button>
          </div>

          {/* Divider */}
          <div className="my-6 flex items-center gap-3">
            <div className="h-px flex-1 bg-white/10" />
            <span className="text-[12px] text-[#6e6e73]">or</span>
            <div className="h-px flex-1 bg-white/10" />
          </div>

          {/* Email magic link */}
          {emailSent ? (
            <div className="text-center">
              <Mail size={32} className="mx-auto mb-3 text-[#2997ff]" />
              <p className="text-[14px] text-[#f5f5f7]">Check your email</p>
              <p className="mt-1 text-[12px] text-[#6e6e73]">
                We sent a sign-in link to {email}
              </p>
              <button
                type="button"
                onClick={() => setEmailSent(false)}
                className="mt-4 text-[12px] text-[#2997ff] hover:underline"
              >
                Use a different email
              </button>
            </div>
          ) : (
            <form onSubmit={handleEmail} className="flex flex-col gap-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@email.com"
                required
                className="h-[44px] rounded-lg bg-white/5 px-4 text-[14px] text-[#f5f5f7] outline-none placeholder:text-[#6e6e73] focus:ring-1 focus:ring-[#2997ff]"
              />
              <button
                type="submit"
                disabled={!!loading}
                className="flex h-[44px] items-center justify-center gap-2 rounded-lg bg-[#2997ff] text-[14px] font-medium text-white transition-colors hover:bg-[#40a9ff] disabled:opacity-50"
              >
                <Mail size={16} />
                {loading === "resend" ? "Sending..." : "Sign in with Email"}
              </button>
            </form>
          )}
        </div>

        <p className="mt-6 text-center text-[11px] text-[#6e6e73]">
          Only authorized administrators can access this panel.
        </p>
      </div>
    </div>
  );
}

"use client";

import Link from "next/link";
import { useState } from "react";
import { Server, Lock, User } from "lucide-react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-accent">
            <Server className="h-6 w-6 text-white" />
          </div>
          <h1 className="text-2xl font-bold">Sign in to myapp</h1>
          <p className="mt-1 text-sm text-[#8b9cb3]">
            Local network control panel
          </p>
        </div>

        <form
          className="card space-y-4"
          onSubmit={(e) => {
            e.preventDefault();
            window.location.href = "/dashboard";
          }}
        >
          <div>
            <label className="label-field" htmlFor="email">
              Email <span className="text-red-400">*</span>
            </label>
            <div className="relative">
              <User className="absolute left-3 top-2.5 h-4 w-4 text-[#5a6a82]" />
              <input
                id="email"
                type="email"
                required
                className="input-field pl-9"
                placeholder="admin@lab.local"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          <div>
            <label className="label-field" htmlFor="password">
              Password <span className="text-red-400">*</span>
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-2.5 h-4 w-4 text-[#5a6a82]" />
              <input
                id="password"
                type="password"
                required
                className="input-field pl-9"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <div>
            <label className="label-field" htmlFor="role">
              Role <span className="text-red-400">*</span>
            </label>
            <select id="role" required className="input-field" defaultValue="admin">
              <option value="viewer">Viewer — read only</option>
              <option value="operator">Operator — wake & restart</option>
              <option value="admin">Admin — full control</option>
            </select>
          </div>

          <button type="submit" className="btn-primary w-full py-2.5">
            Sign In
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-[#5a6a82]">
          <Link href="/" className="text-accent hover:underline">
            ← Back to portfolio
          </Link>
        </p>
      </div>
    </div>
  );
}

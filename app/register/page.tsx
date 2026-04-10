"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { RegisterErrors } from "@/types/auth";

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [registerErrors, setRegisterErrors] = useState<RegisterErrors>({});
  const [loading, setLoading] = useState(false);

  const getLogin = () => router.push("/login");

  const handleRegister = async () => {
    setRegisterErrors({});
    setLoading(true);

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, name, confirmPassword }),
      });

      if (!res.ok) {
        const data = await res.json();
        setRegisterErrors(
          data.registerErrors || { general: "登録に失敗しました" },
        );
        setLoading(false);
        return;
      }

      const loginRes = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });

      if (loginRes?.error) {
        setRegisterErrors({
          general: "自動ログインに失敗しました。手動でログインしてください",
        });
      } else {
        router.push("/dashboard");
      }
    } catch {
      setRegisterErrors({ general: "サーバーエラーが発生しました" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-8">
        <h1 className="text-2xl font-bold text-center mb-6">Register</h1>

        {/* Name */}
        <div className="mb-4">
          <input
            className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
            placeholder="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          {registerErrors.name && (
            <p className="text-red-500 text-sm mt-1">{registerErrors.name}</p>
          )}
        </div>

        {/* Email */}
        <div className="mb-4">
          <input
            className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
            placeholder="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {registerErrors.email && (
            <p className="text-red-500 text-sm mt-1">{registerErrors.email}</p>
          )}
        </div>

        {/* Password */}
        <div className="mb-4">
          <input
            type="password"
            className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {registerErrors.password && (
            <p className="text-red-500 text-sm mt-1">
              {registerErrors.password}
            </p>
          )}
        </div>

        {/* Confirm Password */}
        <div className="mb-4">
          <input
            type="password"
            className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none"
            placeholder="confirm password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          {registerErrors.confirmPassword && (
            <p className="text-red-500 text-sm mt-1">
              {registerErrors.confirmPassword}
            </p>
          )}
        </div>

        {/* General Error */}
        {registerErrors.general && (
          <p className="text-red-600 text-center mb-4">
            {registerErrors.general}
          </p>
        )}

        {/* Register Button */}
        <button
          onClick={handleRegister}
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition disabled:bg-gray-400"
        >
          {loading ? "登録中..." : "Register"}
        </button>

        {/* Login Link */}
        <button
          onClick={getLogin}
          className="w-full mt-4 text-blue-600 hover:underline text-center"
        >
          Login
        </button>
      </div>
    </div>
  );
}

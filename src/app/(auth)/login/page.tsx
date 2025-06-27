"use client";
import { useState, FormEvent, ChangeEvent, ReactNode } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "../../contexts/AuthContext";

function AuthPage({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <Link href="/" className="text-3xl font-bold text-gray-800 mb-8">
        JOHN LEWIS
      </Link>
      <div className="max-w-md w-full bg-white p-8 rounded-xl shadow-2xl">
        {children}
      </div>
    </div>
  );
}

export default function LoginPage() {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<string>("");
  const router = useRouter();
  const { login } = useAuth();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);
    try {
      const res = await fetch("https://fakestoreapi.com/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      if (!res.ok) throw new Error("Invalid username or password.");
      const { token } = await res.json();
      login(token);
      setSuccess("Login successful! Redirecting...");
      setTimeout(() => {
        router.push("/");
      }, 1500);
    } catch (err: any) {
      setError(err.message || "Failed to login.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthPage>
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
        Login
      </h2>
      {error && (
        <p className="bg-red-100 text-red-700 p-3 rounded-md mb-4 text-sm">
          {error}
        </p>
      )}
      {success && (
        <p className="bg-green-100 text-green-700 p-3 rounded-md mb-4 text-sm">
          {success}
        </p>
      )}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            className="block text-neutral-700 mb-2 text-sm"
            htmlFor="username"
          >
            Username
          </label>
          <input
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="text"
            id="username"
            value={username}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setUsername(e.target.value)
            }
            required
          />
        </div>
        <div className="mb-6">
          <label
            className="block text-neutral-700 mb-2 text-sm"
            htmlFor="password"
          >
            Password
          </label>
          <input
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="password"
            id="password"
            value={password}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setPassword(e.target.value)
            }
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-black text-white py-2 rounded-lg hover:bg-gray-800 transition-colors disabled:bg-gray-400"
          disabled={loading}
        >
          {loading ? "Logging In..." : "Login"}
        </button>
      </form>
      <p className="text-center text-sm mt-4">
        New here?{" "}
        <Link href="/register" className="text-blue-600 hover:underline">
          Create an account
        </Link>
      </p>
      <div className="mt-4 p-3 bg-blue-50 rounded-lg">
        <p className="text-xs text-blue-700 mb-2 font-medium">
          Test Credentials:
        </p>
        <p className="text-xs text-blue-600">Username: johnd</p>
        <p className="text-xs text-blue-600">Password: m38rmF$</p>
      </div>
      <Link
        href="/"
        className="text-center text-sm text-gray-500 mt-4 w-full block hover:text-black"
      >
        &larr; Or back to shop
      </Link>
    </AuthPage>
  );
}

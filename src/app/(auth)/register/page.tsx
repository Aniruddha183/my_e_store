"use client";
import { useState, FormEvent, ChangeEvent, ReactNode } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

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

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
    name: { firstname: "", lastname: "" },
  });
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === "firstname" || name === "lastname") {
      setFormData((prev) => ({
        ...prev,
        name: { ...prev.name, [name]: value },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await fetch("https://fakestoreapi.com/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (!res.ok)
        throw new Error(
          "Could not create account. The API might be down or username might be taken."
        );
      alert("Registration successful! Please log in.");
      router.push("/login");
    } catch (err: unknown) {
      const errorMessage =
        err instanceof Error ? err.message : "Registration failed.";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthPage>
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
        Create Account
      </h2>
      {error && (
        <p className="bg-red-100 text-red-700 p-3 rounded-md mb-4 text-sm">
          {error}
        </p>
      )}
      <form className="text-neutral-800" onSubmit={handleSubmit}>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-neutral-700 mb-2 text-sm">
              First Name
            </label>
            <input
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="text"
              name="firstname"
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label className="block text-neutral-700 mb-2 text-sm">
              Last Name
            </label>
            <input
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="text"
              name="lastname"
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-neutral-700 mb-2 text-sm">Email</label>
          <input
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="email"
            name="email"
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-neutral-700 mb-2 text-sm">
            Username
          </label>
          <input
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="text"
            name="username"
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-6">
          <label className="block text-neutral-700 mb-2 text-sm">
            Password
          </label>
          <input
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            type="password"
            name="password"
            onChange={handleChange}
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-black text-white py-2 rounded-lg hover:bg-gray-800 disabled:bg-gray-400"
          disabled={loading}
        >
          {loading ? "Creating..." : "Sign Up"}
        </button>
      </form>
      <p className="text-center text-sm mt-4">
        Have an account?{" "}
        <Link href="/login" className="text-blue-600 hover:underline">
          Login
        </Link>
      </p>
      <div className="mt-4 p-3 bg-yellow-50 rounded-lg">
        <p className="text-xs text-yellow-700 mb-2 font-medium">Note:</p>
        <p className="text-xs text-yellow-600">
          This uses the FakeStore API for demonstration. Registration will
          create a test account.
        </p>
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

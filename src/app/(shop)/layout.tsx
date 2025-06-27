"use client";
import { useState, useEffect, ReactNode } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function ShopLayout({ children }: { children: ReactNode }) {
  const router = useRouter();
  const [authToken, setAuthToken] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    setAuthToken(token);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    setAuthToken(null);
    router.push("/");
    router.refresh(); // Refresh to update server-side state if any
  };

  return (
    <>
      <header className="border-b sticky top-0 bg-white z-20 shadow-sm">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center py-4">
            <Link href="/" className="text-2xl font-bold text-gray-800">
              JOHN LEWIS
            </Link>
            <nav className="hidden md:flex items-center space-x-6">
              {authToken ? (
                <>
                  <span className="text-neutral-700">Welcome!</span>
                  <button
                    onClick={handleLogout}
                    className="bg-gray-800 text-white px-6 py-2 rounded-md hover:bg-gray-700 transition-colors"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <Link
                  href="/login"
                  className="bg-gray-800 text-white px-6 py-2 rounded-md hover:bg-gray-700 transition-colors"
                >
                  Login
                </Link>
              )}
              <button
                onClick={() => alert("Cart functionality not implemented yet.")}
                className="relative text-neutral-700 hover:text-black"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </button>
            </nav>
          </div>
        </div>
      </header>
      {children}
    </>
  );
}

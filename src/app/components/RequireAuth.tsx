"use client";

import { useState, useEffect, ReactNode } from "react";
import { useAuth } from "../contexts/AuthContext";
import LoginPopup from "./LoginPopup";

interface RequireAuthProps {
  children: ReactNode;
  redirectTo?: string;
}

export default function RequireAuth({
  children,
  redirectTo,
}: RequireAuthProps) {
  const { isAuthenticated, authToken } = useAuth();
  const [showLoginPopup, setShowLoginPopup] = useState(false);
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    // Check if user is authenticated
    if (!isAuthenticated && !authToken) {
      setShowLoginPopup(true);
    }
    setIsChecking(false);
  }, [isAuthenticated, authToken]);

  // Show loading while checking authentication
  if (isChecking) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Checking authentication...</p>
        </div>
      </div>
    );
  }

  // If not authenticated, show login popup
  if (!isAuthenticated) {
    return (
      <>
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
          <div className="text-center">
            <div className="mb-4">
              <svg
                className="w-16 h-16 text-gray-400 mx-auto"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              Authentication Required
            </h2>
            <p className="text-gray-600 mb-4">
              Please sign in to access this page
            </p>
            <button
              onClick={() => setShowLoginPopup(true)}
              className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
            >
              Sign In
            </button>
          </div>
        </div>

        <LoginPopup
          isOpen={showLoginPopup}
          onClose={() => setShowLoginPopup(false)}
          redirectTo={redirectTo}
        />
      </>
    );
  }

  // If authenticated, show the children
  return <>{children}</>;
}

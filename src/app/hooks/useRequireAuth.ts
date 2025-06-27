"use client";

import { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useRouter } from "next/navigation";

interface UseRequireAuthOptions {
  redirectTo?: string;
  showPopup?: boolean;
}

export function useRequireAuth(options: UseRequireAuthOptions = {}) {
  const { showPopup = true } = options;
  const { isAuthenticated, authToken } = useAuth();
  const router = useRouter();
  const [showLoginPopup, setShowLoginPopup] = useState(false);
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    // Check if user is authenticated
    if (!isAuthenticated && !authToken) {
      if (showPopup) {
        setShowLoginPopup(true);
      } else {
        router.push("/login");
      }
    }
    setIsChecking(false);
  }, [isAuthenticated, authToken, showPopup, router]);

  const requireAuth = () => {
    if (!isAuthenticated) {
      if (showPopup) {
        setShowLoginPopup(true);
      } else {
        router.push("/login");
      }
      return false;
    }
    return true;
  };

  return {
    isAuthenticated,
    isChecking,
    showLoginPopup,
    setShowLoginPopup,
    requireAuth,
  };
}

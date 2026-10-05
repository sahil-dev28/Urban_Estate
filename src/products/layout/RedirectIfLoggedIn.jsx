import { useState } from "react";
import { useAuthStore } from "../../store/authStore";

import { Navigate } from "react-router";

export default function RedirectIfLoggedIn({ children }) {
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);

  // Only bounce users who were already logged in when they opened the page.
  // A login that happens on this page navigates on its own, and redirecting
  // here as well would race it and always land on "/".
  const [wasLoggedIn] = useState(isLoggedIn);

  if (wasLoggedIn) return <Navigate to="/" />;

  return children;
}

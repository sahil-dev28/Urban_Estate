import { useAuthStore } from "../../store/authStore";

import { Navigate } from "react-router";

export default function RedirectIfLoggedIn({ children }) {
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);

  if (isLoggedIn) return <Navigate to="/" />;

  return children;
}

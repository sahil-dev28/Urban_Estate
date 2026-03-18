import { Navigate } from "react-router-dom";

import { useAuthStore } from "../../store/authStore";

export default function RequiredAuth({ children }) {
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);

  if (!isLoggedIn) return <Navigate to="/auth/login" />;

  return children;
}

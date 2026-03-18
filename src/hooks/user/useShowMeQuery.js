import api from "../../api/axios-instance";
import { useQuery } from "@tanstack/react-query";
import { useAuthStore } from "../../store/authStore";

const fetchUser = async () => {
  const { data } = await api.get("/users/show-me");
  return data.user;
};

export const useShowMeQuery = () => {
  const { login, isLoggedIn } = useAuthStore();

  return useQuery({
    queryKey: ["showMe"],
    queryFn: fetchUser,
    enabled: isLoggedIn,
    onSuccess: (data) => {
      login(data.name, data.email, data.role);
    },

    retry: false,
  });
};

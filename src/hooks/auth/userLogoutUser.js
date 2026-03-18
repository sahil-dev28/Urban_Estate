import api from "../../api/axios-instance";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { useAuthStore } from "../../store/authStore";

const logoutUser = async (data) => {
  const response = await api.delete("/auth/logout", data);
  return response.data;
};

export const useLogoutUser = () => {
  const logout = useAuthStore((state) => state.logout);
  return useMutation({
    mutationFn: logoutUser,
    mutationKey: ["logoutUser"],
    onSuccess: (data) => {
      toast.success(data.msg || "Account logout successfully");
      logout();
    },
  });
};

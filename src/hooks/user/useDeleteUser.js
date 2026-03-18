import api from "../../api/axios-instance";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { useAuthStore } from "../../store/authStore";

const deleteUser = async (data) => {
  const response = await api.delete("/users", data);
  return response.data;
};

export const useDeleteUser = () => {
  const logout = useAuthStore((state) => state.logout);

  return useMutation({
    mutationKey: ["deleteUser"],
    mutationFn: deleteUser,

    onSuccess: (data) => {
      toast.success(data.msg || "Account deleted successfully");
      logout();
    },
  });
};

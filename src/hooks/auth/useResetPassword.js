import api from "../../api/axios-instance";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export const resetPasswordUser = async (data) => {
  const response = await api.post("/auth/reset-password", data);
  return response.data;
};

export const useResetPassword = () => {
  return useMutation({
    mutationFn: resetPasswordUser,
    mutationKey: ["resetPassword"],

    onSuccess: (data) => {
      toast.success(data.msg);
    },
    // onError: (error) => {
    //   toast.error(error.response?.data?.msg || "Reset Password failed");
    // },
  });
};

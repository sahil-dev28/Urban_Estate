import { useMutation } from "@tanstack/react-query";
import api from "@/api/axios-instance";
import { toast } from "sonner";

export const verifyEmailUser = async (data) => {
  const response = await api.post("/auth/verify", data);
  return response.data;
};

export const useVerifyEmail = () => {
  return useMutation({
    mutationFn: verifyEmailUser,
    mutationKey: ["verifyEmailUser"],

    onSuccess: (data) => {
      toast.success(data.msg);
    },
    // onError: (error) => {
    //   toast.error(error.response?.data?.msg || "Verification failed");
    // },
  });
};

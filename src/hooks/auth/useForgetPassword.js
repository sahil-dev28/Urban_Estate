import api from "../../api/axios-instance";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export const forgetPassword = async (data) => {
  const response = await api.post("/auth/forgot-password", data);
  console.log(data);
  return response.data;
};

export const useForgetPasswordUser = () => {
  return useMutation({
    mutationFn: forgetPassword,
    mutationKey: ["forgetPassword"],

    onSuccess: (data) => {
      toast.success(data.msg);
    },
  });
};

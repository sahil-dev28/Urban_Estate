import { useMutation } from "@tanstack/react-query";
import api from "../../api/axios-instance";
import { toast } from "sonner";

export const registerUser = async (data) => {
  const response = await api.post("/auth/register", data);
  return response.data;
};

export const useRegisterUser = () => {
  return useMutation({
    mutationFn: registerUser,
    mutationKey: ["registerUser"],

    onSuccess: (data) => {
      toast.success(data.msg);
    },
    // onError: (error) => {
    //   toast.error(error.response?.data?.msg || "Registration failed");
    // },
  });
};

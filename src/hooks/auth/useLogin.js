import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import api from "../../api/axios-instance";

export const loginUser = async (data) => {
  const response = await api.post("/auth/login", data);
  return response.data;
};

export const useLoginUser = () => {
  return useMutation({
    mutationFn: loginUser,
    mutationKey: ["loginUser"],

    onSuccess: (data) => {
      toast.success(data.msg || "Logged in successfully");
    },
    // onError: (error) => {
    //   console.error("Login failed:", error.response?.data);
    //   toast.error(error.response?.data?.msg || "Login failed");
    // },
  });
};

import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import api from "../../api/axios-instance";
import { queryClient } from "../../main";

export const createApplication = async (payload) => {
  const response = await api.post("/application", payload);
  return response.data;
};

export const useCreateApplicationMutation = () => {
  return useMutation({
    mutationFn: createApplication,
    mutationKey: ["createApplication"],

    onSuccess: (data) => {
      toast.success(data?.msg);
      queryClient.invalidateQueries({ queryKey: ["userApplication"] });
    },
    onError: (error) => {
      toast.error(
        error.response?.data?.message || "Failed to book the property"
      );
    },
  });
};

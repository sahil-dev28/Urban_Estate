import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import api from "../../api/axios-instance";
import { queryClient } from "../../main";

export const createProperty = async (formData) => {
  const response = await api.post("/property", formData);
  return response.data;
};

export const useCreatePropertyMutation = () => {
  return useMutation({
    mutationFn: createProperty,
    onSuccess: (data) => {
      toast.success(data.msg || "Property created successfully");
      queryClient.invalidateQueries({ queryKey: ["user-property"] });
    },
  });
};

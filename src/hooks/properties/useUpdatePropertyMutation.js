import { useMutation } from "@tanstack/react-query";
import api from "../../api/axios-instance";
import { toast } from "sonner";
import { queryClient } from "../../main";

export const updateProperty = async ({ id, details }) => {
  const response = await api.patch(`/property/${id}`, details);
  return response.data;
};

export const useUpdatePropertyMutation = () => {
  return useMutation({
    mutationFn: updateProperty,
    onSuccess: (data) => {
      toast.success(data.msg || "Property updated successfully");
      queryClient.invalidateQueries({ queryKey: ["user-property"] });
    },
  });
};

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import api from "../../api/axios-instance";

export const deletePropertyApi = async (id) => {
  const response = await api.delete(`/property/${id}`);
  return response.data;
};
export default function useDeleteUserProperty() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deletePropertyApi,

    onMutate: async (id) => {
      await queryClient.cancelQueries(["userProperties"]);

      const previousProperties = queryClient.getQueryData(["userProperties"]);

      queryClient.setQueryData(["userProperties"], (old) => {
        if (!old) return old;
        return old.filter((property) => property._id !== id);
      });

      return { previousProperties };
    },

    onSuccess: (data) => {
      toast.success(data.msg || "Property deleted successfully");
    },

    onSettled: () => {
      queryClient.invalidateQueries(["userProperties"]);
    },
  });
}

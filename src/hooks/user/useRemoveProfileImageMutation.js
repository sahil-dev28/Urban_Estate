import { useMutation, useQueryClient } from "@tanstack/react-query";
import api from "../../api/axios-instance";
import { toast } from "sonner";

const removeProfileImageApi = async (profileImageId) => {
  const response = await api.delete("/users/profile-image/" + profileImageId);
  return response.data;
};

export const useRemoveProfileImageMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: removeProfileImageApi,

    onMutate: async (profileImageId) => {
      await queryClient.cancelQueries(["currentUser"]);

      const previousUser = queryClient.getQueryData(["currentUser"]);

      queryClient.setQueryData(["currentUser"], (old) => {
        if (!old) return old;
        return old.filter((image) => image._id !== profileImageId);
      });

      return { previousUser };
    },
    onSuccess: (data) => {
      toast.success(data.msg || "Profile image removed successfully");
    },

    onSettled: () => {
      queryClient.invalidateQueries(["currentUser"]);
    },
  });
};

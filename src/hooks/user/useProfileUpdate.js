// import api from "../api/axios-instance";
// import { useMutation } from "@tanstack/react-query";
// import { toast } from "sonner";

// const updateProfile = async () => {
//   const response = await api.patch("/users");
//   return response.data.user;
// };

// export const useProfileUpdate = () => {
//   return useMutation({
//     mutationKey: ["updateProfile"],
//     mutationFn: updateProfile,

//     onSuccess: (data) => {
//       toast.success(data.msg);
//     },
//   });
// };

import { useMutation } from "@tanstack/react-query";
import api from "../../api/axios-instance";
import { toast } from "sonner";
import { queryClient } from "../../main";

export const useProfileUpdate = () => {
  return useMutation({
    mutationFn: async (updatedData) => {
      const res = await api.patch("/users", updatedData);
      return res.data;
    },
    onSuccess: (data) => {
      toast.success(data.msg);
      queryClient.invalidateQueries({ queryKey: ["showMe"] });
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Update failed");
    },
  });
};

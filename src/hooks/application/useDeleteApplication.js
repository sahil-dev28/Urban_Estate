import { useMutation } from "@tanstack/react-query";
import api from "../../api/axios-instance";
import { toast } from "sonner";
import { queryClient } from "../../main";

export const deleteApplicationApi = async (id) => {
  const response = await api.delete(`/application/${id}`);
  return response.data;
};

export const useDeleteApplication = () => {
  return useMutation({
    mutationFn: deleteApplicationApi,
    onSuccess: (data) => {
      toast.success(data?.msg || "Booking canceled successfully");
      queryClient.invalidateQueries({ queryKey: ["userApplication"] });
    },
  });
};

// import { useMutation, useQueryClient } from "@tanstack/react-query";
// import api from "../../api/axios-instance";
// import { toast } from "sonner";

// export const deleteApplicationApi = async (id) => {
//   const response = await api.delete(`/application/${id}`);
//   return response.data;
// };

// export default function useDeleteApplication() {
//   const queryClient = useQueryClient();

//   return useMutation({
//     mutationFn: deleteApplicationApi,

//     onMutate: async (id) => {
//       await queryClient.cancelQueries(["userApplication"]);

//       const previousApplications = queryClient.getQueryData([
//         "userApplication",
//       ]);

//       queryClient.setQueryData(["userApplication"], (old) => {
//         if (!old) return old;
//         return old.filter((app) => app._id !== id);
//       });

//       return { previousApplications };
//     },

//     onSuccess: (data) => {
//       toast.success(data?.msg || "Booking canceled successfully");
//     },

//     onSettled: () => {
//       queryClient.invalidateQueries(["userApplication"]);
//     },
//   });
// }

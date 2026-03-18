import { useQuery } from "@tanstack/react-query";
import api from "../../api/axios-instance";
import { toast } from "sonner";

export default function useGetUserApplication() {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["userApplication"],
    queryFn: async () => {
      const response = await api.get("/application");
      return response.data.results;
    },

    onSuccess: (data) => {
      toast.success(data.results.msg);
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
  return {
    application: data,
    isLoading,
    isError,
    error,
  };
}

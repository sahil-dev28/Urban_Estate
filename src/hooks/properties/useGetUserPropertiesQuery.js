import { useQuery } from "@tanstack/react-query";
import api from "../../api/axios-instance";
import { toast } from "sonner";

export default function useGetUserPropertiesQuery() {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["user-property"],
    queryFn: async () => {
      const response = await api.get("/property/my");
      return response.data.results;
    },
    onSuccess: (data) => {
      toast.success(data.msg);
    },
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  return {
    userProperty: data,
    isLoading,
    isError,
    error,
  };
}

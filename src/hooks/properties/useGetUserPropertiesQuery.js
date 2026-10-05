import { useQuery, keepPreviousData } from "@tanstack/react-query";
import api from "../../api/axios-instance";
import { toast } from "sonner";

export default function useGetUserPropertiesQuery(params = {}) {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["user-property", params],
    queryFn: async () => {
      const response = await api.get("/property/my", { params });
      return response.data; // { results, totalCount, totalPages }
    },
    onSuccess: (data) => {
      toast.success(data.msg);
    },
    placeholderData: keepPreviousData,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  return {
    userProperty: data?.results,
    totalPages: data?.totalPages ?? 0,
    isLoading,
    isError,
    error,
  };
}

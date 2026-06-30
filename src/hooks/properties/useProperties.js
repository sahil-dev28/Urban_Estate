import { useQuery, keepPreviousData } from "@tanstack/react-query";

import api from "../../api/axios-instance";

export default function useProperties(params = {}) {
  const { data, isLoading, isFetching, isError, error } = useQuery({
    queryKey: ["properties", params],
    queryFn: async () => {
      const response = await api.get("/property", { params });
      return response.data; // { results, totalCount, totalPages }
    },

    // Keep showing the current page while the next one loads (no flash/empty state).
    placeholderData: keepPreviousData,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  return {
    property: data?.results ?? [],
    totalCount: data?.totalCount ?? 0,
    totalPages: data?.totalPages ?? 0,
    isLoading,
    isFetching,
    isError,
    error,
  };
}

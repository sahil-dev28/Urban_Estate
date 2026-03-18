import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";

import api from "../../api/axios-instance";

export default function useProperties() {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["properties"],
    queryFn: async () => {
      const response = await api.get("/property");
      return response.data.results;
    },

    onSuccess: (data) => {
      toast.success(data.msg);
    },

    staleTime: 1000 * 60 * 5, // 5 minutes
  });

  return {
    property: data,
    isLoading,
    isError,
    error,
  };
}

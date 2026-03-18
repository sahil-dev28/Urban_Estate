import { useQuery } from "@tanstack/react-query";
import { toast } from "sonner";

import api from "../../api/axios-instance";

export default function useSinglePropertyPage({ id }) {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["property", id],

    queryFn: async () => {
      const response = await api.get(`/property/${id}`);
      console.log(response.data);
      return response.data.property;
    },
    enabled: !!id,
    onSuccess: (data) => {
      toast.success(data.msg);
    },
  });

  return {
    property: data,
    isLoading,
    isError,
    error,
  };
}

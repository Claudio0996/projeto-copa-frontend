import { useQuery } from "@tanstack/react-query";
import { getSales } from "../../../shared/apiClient";

export default function useAdminSales() {
  const { data, isPending, isError, error } = useQuery({
    queryKey: ["sales-admin"],
    queryFn: getSales,
    placeholderData: { data: [] },
    refetchInterval: 5000,
  });

  return { sales: data.data, isPending, isError, error };
}

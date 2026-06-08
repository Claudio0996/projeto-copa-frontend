import { useQuery } from "@tanstack/react-query";
import { getAllVendors } from "../../../shared/apiClient";

export default function useVendors() {
  const { data, isPending, isError, error } = useQuery({
    queryKey: ["vendors-list"],
    queryFn: getAllVendors,
    placeholderData: { data: [] },
  });

  return { vendors: data.data, isPending, isError, error };
}

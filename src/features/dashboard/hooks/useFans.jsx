import { useQuery } from "@tanstack/react-query";
import { getFans } from "../../../shared/apiClient";

export default function useFans() {
  const { data, isPending, isError, error } = useQuery({
    queryKey: ["get-fans"],
    queryFn: getFans,
    placeholderData: { data: [] },
  });

  return { fans: data.data, isPending, isError, error };
}

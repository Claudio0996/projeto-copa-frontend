import { useQuery } from "@tanstack/react-query";
import { getAllSdrs } from "../../../shared/apiClient";

export default function useSdrs() {
  const { data, isPending, isError, error } = useQuery({
    queryKey: ["sdr-list"],
    queryFn: getAllSdrs,
    placeholderData: { data: [] },
  });

  return { sdrs: data.data, isPending, isError, error };
}

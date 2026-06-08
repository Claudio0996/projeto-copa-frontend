import { useQuery } from "@tanstack/react-query";
import { getWeeklyRanking } from "../../../shared/apiClient";

export default function useRanking() {
  const { data, isPending, isError, error } = useQuery({
    queryKey: ["weekly-rank"],
    queryFn: getWeeklyRanking,
    placeholderData: { data: { venda: [], farm: [] } },
  });

  return { rank: data.data, isPending, isError, error };
}

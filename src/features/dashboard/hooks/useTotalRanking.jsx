import { useQuery } from "@tanstack/react-query";
import { getTotalRanking } from "../../../shared/apiClient";

export default function useTotalRanking(){
      const { data, isPending, isError, error } = useQuery({
        queryKey: ["total-rank"],
        queryFn: getTotalRanking,
        placeholderData: { data: { venda: [], farm: [] } },
        refetchInterval: 3000
      });
    
      return { rank: data.data, isPending, isError, error };
}
import { useQuery } from "@tanstack/react-query";
import { getTotalScore } from "../../../shared/apiClient";

export default function useTotalScoreBoard(){
  const { data, isPending, isError, error } = useQuery({
      queryKey: ["total-scoreboard"],
      queryFn: getTotalScore,
      placeholderData: { data: [] },
      refetchInterval: 5000
  });
      
  return { scores: data?.data, isPending, isError, error };
}

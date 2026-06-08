import { useQuery } from "@tanstack/react-query";
import { getTotalScore } from "../../../shared/apiClient";

export default function useScoreBoard() {
  const { data, isPending, isError, error } = useQuery({
    queryKey: ["salesAdmin"],
    queryFn: getTotalScore,
    placeholderData: { data: [] },
    refetchInterval: 5000,
  });
  return { data: data.data, isPending, isError, error };
}

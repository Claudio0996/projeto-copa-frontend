import { useQuery } from "@tanstack/react-query";
import { getScoreBoard } from "../../../shared/apiClient";

export default function useScoreBoard() {
  const { data, isPending, isError, error } = useQuery({
    queryKey: ["weekly-scoreboard"],
    queryFn: getScoreBoard,
    placeholderData: { data: [] },
  });
  return { scores: data?.data ?? [], isPending, isError, error };
}

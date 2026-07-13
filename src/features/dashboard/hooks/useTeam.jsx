import { useQuery } from "@tanstack/react-query";
import { getTeamEscalation } from "../../../shared/apiClient";

export default function useTeam(teamId) {
  const { data, isPending, isError, error } = useQuery({
    queryKey: ["team", "escalation", teamId],
    queryFn: () => {
      return getTeamEscalation(teamId);
    },
    placeholderData: { data: [] },
  });

  return { data, isPending, isError, error };
}

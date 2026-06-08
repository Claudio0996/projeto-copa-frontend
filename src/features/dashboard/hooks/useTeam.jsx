import { useQuery } from "@tanstack/react-query";
import { getTeamEscalation } from "../../../shared/apiClient";

export default function useTeam(teamId) {
  const { data, isPending, isError, error } = useQuery({
    queryKey: ["teams-escalation"],
    queryFn: () => {
      return getTeamEscalation(teamId);
    },
    placeholderData: { data: { vendors: [], sdrs: [], fans: [], videos: [] } },
  });

  return { info: data, isPending, isError, error };
}

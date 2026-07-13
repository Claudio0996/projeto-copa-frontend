import { useQuery } from "@tanstack/react-query";

import { getTotalRanking } from "../../../shared/apiClient";

export default function useAdminRank(){
    const {data, isPending, isError, error} = useQuery({
        queryKey: ["rank-admin"],
        queryFn: getTotalRanking,
         placeholderData: { data: { venda: [], farm: [] } },
         refetchInterval: 5000
    });

    return {rank: data.data, isPending, isError, error}
}
import { useQuery } from "@tanstack/react-query";
import { getTotalSdrRanking } from "../../../shared/apiClient";

export default function useTotalSdrRanking() {
    const {data, isPending, isError, error} = useQuery({
        queryKey: ["total-sdr-ranking"],
        queryFn: getTotalSdrRanking,
        refetchInterval: 5000,
        placeholderData: {data: []}
    });

    return {rank: data.data};
}
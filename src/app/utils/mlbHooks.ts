import { useState, useEffect } from "react";
import { fetchMLBStandings } from "./mlbAPI";

interface TeamRecord {
    team: {
        id: number;
        name: string;
    };
    wins: number;
    losses: number;
}

interface DivisionRecord {
    division?: {
        id: number;
        name: string;
    };
    teamRecords: TeamRecord[];
}

interface UseMLBStandingsReturn {
    standings: TeamRecord[] | DivisionRecord[];
    isLoading: boolean;
    error: Error | null;
    refetch: () => Promise<void>;
}

export function useMLBStandings(leagueId: number, divisionId: number | null = null, season: number = 2025): UseMLBStandingsReturn {
    const [standings, setStandings] = useState<TeamRecord[] | DivisionRecord[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        fetchStandings();
    }, [leagueId, divisionId, season]);

    const fetchStandings = async (): Promise<void> => {
        try {
            const data = await fetchMLBStandings(leagueId, season);

            if(data.records && data.records.length > 0) {
                if(divisionId) {
                    const division = data.records.find(div => div.division?.id === divisionId);
                    setStandings(division?.teamRecords || []);
                } else {
                    setStandings(data.records);
                }
            }
            setIsLoading(false);
        } catch(err) {
            console.error('Error fetching standings:', err);
            setError(err as Error);
            setIsLoading(false);
        }
    };

    return { standings, isLoading, error, refetch: fetchStandings };
}
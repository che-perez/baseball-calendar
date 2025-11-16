import { useMLBStandings } from "../utils/mlbHooks";
import { MLB_LEAGUE_IDS, MLB_DIVISION_IDS, MLB_TEAM_IDS } from "../utils/gameUtils";
import TeamLogo  from "../components/TeamLogo";

interface SeriesData {
    dates?: Array<{
        games: Array<any>;
    }>;
}

interface TeamRecord {
    team: {
        id: number;
        name: string;
    };
    wins: number;
    losses: number;
}

interface StatsPanelProps {
    seriesData: SeriesData | null;
}

export default function StatsPanel({ seriesData }: StatsPanelProps ): JSX.Element | null {
    const {standings: nlEastStandings, isLoading} = useMLBStandings(MLB_LEAGUE_IDS.NATIONAL_LEAGUE, MLB_DIVISION_IDS.NL_EAST, 2025);

    if(!seriesData || !seriesData.dates) {
        return null;
    }

    {console.log('standings', nlEastStandings)}

    return (
        <aside className="space-y-6">
            <div className="bg-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transform rotate-1">
                <div className="bg-[#F97316] text-white px-4 py-3 border-b-4 border-black">
                    <h3 className="text-xl font-black uppercase">NL East Division Standings</h3>
                </div>
                <div className="p-4 bg-white">
                    <div className="space-y-2">
                        <div className="flex items-center justify-between text-xs font-black text-black pb-2 px-2 border-b-4 border-black uppercase">
                            <div className="w-32">Team</div>
                            <div className="flex gap-3">
                                <div className="w-10 text-center">W</div>
                                <div className="w-10 text-center">L</div>
                                <div className="w-10 text-center">PCT</div>
                                <div className="w-10 text-center">GB</div>
                            </div>
                        </div>
                        {!isLoading && nlEastStandings.length > 0 ? (
                            nlEastStandings.map((teamRecord) => (
                                <div key={teamRecord.team.id} className={`flex items-center justify-between py-3 px-2 transition-all 
                                    ${teamRecord.team.id === MLB_TEAM_IDS.METS ? 'bg-[#003D82] text-white border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]'
                                                                            : 'hover:bg-[#FDB462] border-2 border-transparent hover:border-black'}`}>
                                    <div className="flex items-center gap-2 min-w-[120px]">
                                        <TeamLogo teamId={teamRecord.team.id} teamName={teamRecord.team.name} size="w-6 h-6" />
                                        <span className="text-sm font-black uppercase">{teamRecord.team.name}</span>
                                    </div>
                                    <div className="flex gap-3 text-sm font-black">
                                        <div className="w-10 text-center">{teamRecord.wins}</div>
                                        <div className="w-10 text-center">{teamRecord.losses}</div>
                                        <div className="w-10 text-center">{teamRecord.winningPercentage}</div>
                                        <div className="w-10 text-center">{teamRecord.gamesBack}</div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="text-center py-4 text-sm font-black text-black uppercase">
                                {isLoading ? 'Loading...' : 'No Data'}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </aside>
    )
}
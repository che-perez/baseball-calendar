import { useMLBStandings } from "../utils/mlbHooks";
import { MLB_LEAGUE_IDS, MLB_DIVISION_IDS, MLB_TEAM_IDS } from "../utils/gameUtils";

import DivisionStandings from "./DivisionStanding";


export default function StatsPanel(): JSX.Element | null {
    const {standings: nlEastStandings, isLoading} = useMLBStandings(MLB_LEAGUE_IDS.NATIONAL_LEAGUE, MLB_DIVISION_IDS.NL_EAST, 2025);
    const {standings: nlStandings, isLoading: leagueLoading} = useMLBStandings(MLB_LEAGUE_IDS.NATIONAL_LEAGUE, null, 2025);

    console.log('standings', nlEastStandings);
    console.log('National League', nlStandings);

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
                                <DivisionStandings key={teamRecord.team.id} teamRecord={teamRecord} />
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
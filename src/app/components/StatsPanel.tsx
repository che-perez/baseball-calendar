import React, { JSX, useState } from "react";
import { useMLBStandings } from "../utils/mlbHooks";
import { MLB_LEAGUE_IDS, MLB_DIVISION_IDS, MLB_TEAM_IDS } from "../utils/gameUtils";

import DivisionStandings from "./DivisionStanding";


export default function StatsPanel(): JSX.Element | null {
    const {standings: nlEastStandings, isLoading} = useMLBStandings(MLB_LEAGUE_IDS.NATIONAL_LEAGUE, MLB_DIVISION_IDS.NL_EAST, 2025);
    const {standings: nlStandings, isLoading: leagueLoading} = useMLBStandings(MLB_LEAGUE_IDS.NATIONAL_LEAGUE, null, 2025);

    const [showAll, setShowAll] = useState<boolean>(false);

    console.log('standings', nlEastStandings);
    console.log('National League', nlStandings);

    const teamIndex = nlStandings.findIndex(team => team.team.id === MLB_TEAM_IDS.METS);
    const teamInTopSix = teamIndex >= 0 && teamIndex < 6;

    const teamsToDisplay = showAll ? nlStandings : nlStandings.slice(0, 6);

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
                                <DivisionStandings key={teamRecord.team.id} teamRecord={teamRecord} isDivision={true} />
                            ))
                        ) : (
                            <div className="text-center py-4 text-sm font-black text-black uppercase">
                                {isLoading ? 'Loading...' : 'No Data'}
                            </div>
                        )}
                    </div>
                </div>
            </div>
             {/* National League Standings Table */}
            <div className="bg-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transform rotate-1">
                <div className="bg-[#F97316] text-white px-4 py-3 border-b-4 border-black">
                    <h3 className="text-xl font-black uppercase">National League Standings</h3>
                </div>
                <div className="p-4 bg-white">
                    <div className="space-y-2">
                        <div className="flex items-center justify-between text-xs font-black text-black pb-2 px-2 border-b-4 border-black uppercase">
                            <div className="w-8">#</div>
                            <div className="w-32">Team</div>
                            <div className="flex gap-3">
                                <div className="w-12 text-center">W</div>
                                <div className="w-12 text-center">L</div>
                                <div className="w-16 text-center">PCT</div>
                            </div>
                        </div>
                        {teamsToDisplay.map((teamRecord) => {
                            const rank = nlStandings.indexOf(teamRecord) + 1;
                            const showSeparator = !showAll && rank === 3;
                            const showCurrentTeamSeparator = !showAll && !teamInTopSix && rank === 6;
                            return (
                                <React.Fragment key={teamRecord.team.id}>
                                    <DivisionStandings teamRecord={teamRecord} isDivision={false} />
                                    {showSeparator && (
                                        <div className="border-t-4 border-dashed border-black my-2"></div>
                                    )}
                                    {showCurrentTeamSeparator && (
                                        <div className="border-t-4 border-dashed border-black my-2"></div>
                                    )}
                                </React.Fragment>
                            );})}

                        {!showAll && !teamInTopSix && teamIndex >= 0 && (
                            <>
                                <div className="border-t-4 border-dashed border-black my-2"></div>
                                <DivisionStandings teamRecord={nlStandings[teamIndex]} />
                            </>
                        )}
                        {!showAll && nlStandings.length > 6 && (
                            <button onClick={() => setShowAll(true)} className="w-full mt-4 bg-[#003D82] hover:bg-[#F97316] text-white font-black text-sm uppercase border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all">
                                Load More</button>
                        )}
                    </div>
                </div>
            </div>
        </aside>
    )
}
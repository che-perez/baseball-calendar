import React, { JSX, useState } from "react";
import { useMLBStandings } from "../utils/mlbHooks";

import DivisionStandings from "./DivisionStanding";

import { getLeagueDivisionName, getTeamColors } from "../utils/mlbTeams";

interface StatsPanelProps {
    teamID: number;
    divisionId: number;
    leagueId: number;
}


export default function StatsPanel({ teamID, divisionId, leagueId }:StatsPanelProps): JSX.Element | null {
    const {standings: divisionStandings, isLoading} = useMLBStandings(leagueId, divisionId, 2025);
    const {standings: leagueStandings } = useMLBStandings(leagueId, null, 2025);
    const leagueName = getLeagueDivisionName(leagueId);
    const divisionName = getLeagueDivisionName(divisionId);
    const teamColors = getTeamColors(teamID);

    const [showAll, setShowAll] = useState<boolean>(false);

    console.log('Division Standings', divisionStandings);
    console.log('League Standings', leagueStandings);

    const teamIndex = leagueStandings.findIndex(team => team.team.id === teamID);
    const teamInTopSix = teamIndex >= 0 && teamIndex < 6;

    const teamsToDisplay = showAll ? leagueStandings : leagueStandings.slice(0, 6);

    return (
        <aside className="space-y-6">
            <div className="bg-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transform rotate-1">
                <div className="text-white px-4 py-3 border-b-4 border-black" style={{ backgroundColor: teamColors.primary }}>
                    <h3 className="text-xl font-black uppercase">{`${divisionName.name} Standings`}</h3>
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
                        {!isLoading && divisionStandings.length > 0 ? (
                            divisionStandings.map((teamRecord) => (
                                <DivisionStandings key={teamRecord.team.id} teamRecord={teamRecord} isDivision={true} teamID={teamID} />
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
                <div className="text-white px-4 py-3 border-b-4 border-black" style={{ backgroundColor: teamColors.primary }}>
                    <h3 className="text-xl font-black uppercase">{`${leagueName.name} Standings`}</h3>
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
                            const rank = leagueStandings.indexOf(teamRecord) + 1;
                            const showSeparator = !showAll && rank === 3;
                            const showCurrentTeamSeparator = !showAll && !teamInTopSix && rank === 6;
                            return (
                                <React.Fragment key={teamRecord.team.id}>
                                    <DivisionStandings teamRecord={teamRecord} isDivision={false} teamID={teamID}/>
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
                                <DivisionStandings teamRecord={leagueStandings[teamIndex]} teamID={teamID}/>
                            </>
                        )}

                            <button type="button" onClick={() => !showAll ? setShowAll(true) : setShowAll(false) } className="w-full p-2 mt-4 hover:text-white font-black text-sm uppercase border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all" style={{ backgroundColor: teamColors.primary}}>
                                {!showAll ? "Load More" : "Hide"}</button>

                    </div>
                </div>
            </div>
        </aside>
    )
}
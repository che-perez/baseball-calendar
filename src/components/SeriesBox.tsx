import { type JSX } from "react";

import { convertDate } from "../utils/gameUtils";
import { getTeamColors } from "../utils/mlbTeams";
import TeamLogo from "./TeamLogo";

interface Game {
    gamePk: number;
    officialDate: string;
    teams: {
        home: TeamData;
        away: TeamData;
    };
}

interface TeamData {
    team: {
        id: number;
        name: string;
        abbreviation: string;
    };
    score?: number;
}

interface Series {
    opponent: string;
    opponentAbbr: string;
    opponentId: number;
    isHome: boolean;
    games: Game[];
    venue: string;
}

interface SeriesBoxProps {
    series: Series;
    teamID: number;
}

export default function SeriesBox({ series, teamID }: SeriesBoxProps): JSX.Element {
    const teamColors = getTeamColors(teamID);

    return (
        // Series Box
        <li className="bg-[#FDB462] border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            {/* Series Box Header */}
            <div className="text-white px-4 py-3 border-b-4 border-black" style={{ backgroundColor: teamColors.primary }}>
                <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                        <TeamLogo teamId={series.opponentId} teamName={series.opponent} size="w-10 h-10" className="flex-shrink-0" onDark={true} />
                        <div className="flex-1 min-w-0">
                            <div className="tex-xl font-black tracking-tight truncate uppercase">
                                <span>{series.isHome ? "vs" : "@"} {series.opponent}</span>
                            </div>
                            <div className="text-xs font-bold opacity-90 truncate uppercase">
                                <span>{series.venue}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Series Game Score Box */}
            <div className="p-4 bg-[#FDB462]">
                <div className="flex gap-2 flex-wrap">
                    {series.games.map((game) => (
                        <div key={game.gamePk} className="bg-white border-3 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                            <div className="bg-black text-white px-2 py-1 border-b-3 border-black text-center">
                                <span className="text-[10px] font-black uppercase">{convertDate(game.officialDate)}</span>
                            </div>
                            <div className="min-w-[140px] bg-white">
                                <div className="flex items-center justify-between px-2 py-2 border-b-3 border-black">
                                    <div className="flex items-center gap-1.5 flex-1 min-w-0">
                                        <TeamLogo teamId={game.teams.away.team.id} teamName={game.teams.away.team.name} size="w-5 h5" />
                                        <span className="text-xs font-black text-black">{game.teams.away.team.abbreviation}</span>
                                    </div>
                                    <div className="text-base font-black text-black ml-2">
                                        <span>{game.teams.away.score}</span>
                                    </div>
                                </div>
                                <div className="flex items-center justify-between px-2 py-2">
                                    <div className="flex items-center gap-1.5 flex-1 min-w-0">
                                        <TeamLogo teamId={game.teams.home.team.id} teamName={game.teams.home.team.name} size="w-5 h5" />
                                        <span className="text-xs font-black text-black">{game.teams.home.team.abbreviation}</span>
                                    </div>
                                    <div className="text-base font-black text-black ml-2">
                                        <span>{game.teams.home.score}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
            ))}
                </div>
            </div>
        </li>
    )
}
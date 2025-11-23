import type { JSX } from "react";
import TeamLogo from "./TeamLogo";
import { getTeamColors } from "../utils/mlbTeams";

interface TeamRecord {
    team: {
        id: number;
        name: string;
    };
    wins: number;
    losses: number;
    winningPercentage: string;
    gamesBack: string;
    leagueRank: string;
}

interface DivisionStandingsProps {
    teamRecord: TeamRecord;
    isDivision: boolean;
    teamID: number;
}


export default function DivisionStandings({ teamRecord, isDivision, teamID }: DivisionStandingsProps): JSX.Element {

    const teamColors = getTeamColors(teamID);
    let color;
    if(teamRecord.team.id === teamID) { color = teamColors.secondary };
    return (
        <div className={`flex items-center justify-between py-3 px-2 transition-all 
            ${teamRecord.team.id === teamID ? 'text-white border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]'
                                                    : 'hover:bg-[#FDB462] border-2 border-transparent hover:border-black'}`} style={{ backgroundColor: color }}>
            <div className="flex items-center gap-2 min-w-[120px]">
                {!isDivision ? <div className="w-8 text-base font-black">{teamRecord.leagueRank}</div> : <></> }
                <TeamLogo teamId={teamRecord.team.id} teamName={teamRecord.team.name} size="w-6 h-6" />
                <span className="text-xs font-black uppercase">{teamRecord.team.name}</span>
            </div>
            <div className="flex gap-3 text-sm font-black">
                <div className={`${isDivision ? 'w-10 text-center' : 'w-12 text-center text-sm font-black'} `}>{teamRecord.wins}</div>
                <div className={`${isDivision ? 'w-10 text-center' : 'w-12 text-center text-sm font-black'} `}>{teamRecord.losses}</div>
                <div className={`${isDivision ? 'w-10 text-center' : 'w-16 text-center text-sm font-black'} `}>{teamRecord.winningPercentage}</div>
                {isDivision ? <div className="w-10 text-center">{teamRecord.gamesBack}</div> : <></> }
            </div>
        </div>
    )
}
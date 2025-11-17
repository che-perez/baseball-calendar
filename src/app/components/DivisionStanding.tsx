import { JSX } from "react";
import { MLB_TEAM_IDS } from "../utils/gameUtils";
import TeamLogo from "./TeamLogo";

interface TeamRecord {
    team: {
        id: number;
        name: string;
    };
    wins: number;
    losses: number;
    winningPercentage: string;
    gamesBack: string;
}

interface DivisionStandingsProps {
    teamRecord: TeamRecord;
}


export default function DivisionStandings({ teamRecord }: DivisionStandingsProps): JSX.Element {

    return (
        <div className={`flex items-center justify-between py-3 px-2 transition-all 
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
    )
}
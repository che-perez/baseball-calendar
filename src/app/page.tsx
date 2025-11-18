"use client"

import React, { JSX } from "react";
import { useMLBStandings } from "./utils/mlbHooks";
import { MLB_LEAGUE_IDS, getTeamColors } from "./utils/mlbTeams";
import TeamLogo from "./components/TeamLogo";

interface TeamRecord {
    team: {
        id: number;
        name: string;
    };
    wins: number;
    losses: number;
    winningPercentage: string;
    leagueRank?: string;
}

interface LeagueColumnProps {
    title: string;
    teams: TeamRecord[];
}

interface TeamRowProps {
    team: TeamRecord[];
}

export default function Home(): JSX.Element {
    const currentYear = new Date().getFullYear();

    const { standings: alStandings, isLoading: alLoading } = useMLBStandings(MLB_LEAGUE_IDS.AMERICAN_LEAGUE, null, currentYear);

    const { standings: nlStandings, isLoading: nlLoading } = useMLBStandings(MLB_LEAGUE_IDS.NATIONAL_LEAGUE, null, currentYear);

    const isLoading = alLoading || nlLoading;

    console.log('AL Teams', alStandings);
    console.log('NL Team', nlStandings);

    if(isLoading){
        return (
            <div className="min-h-screen bg-[#041E42] flex items-center justify-center">
                <div className="text-center bg-white border-4 border-black p-8 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]">
                    <p className="text-black font-black text-2xl uppercase">Loading....</p>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-[#041E42]">
            <header className="bg-white border-b-4 border-black py-12 shadow-[0px_8px_0px_8px_rgba(0,0,0,1)]">
                <div className="max-w-[1600px] mx-auto px-4 text-center">
                    <img src="https://www.mlbstatic.com/team-logos/league-on-light/1.svg" alt="MLB Logo" className="w-32 h-32 mx-auto mb-6" />
                    <h1 className="text-6xl font-black text-[#041E42] uppercase tracking-tight">{currentYear} MLB Season</h1>
                </div>
            </header>
            <div className="max-w-[1600px] mx-auto px-4 py-12">
                <div className="grid lg:grid-cols-2 gap-8">
                    <LeagueColumn title="American League" teams={alStandings} />
                    <LeagueColumn title="National League" teams={nlStandings} />
                </div>
            </div>
        </div>
    )
    
}

// Funtion for League Column Component
function LeagueColumn({ title, teams }: LeagueColumnProps) {
    return (
        <div className="bg-white border-4 border-black shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]">
            <div className="bg-[#BA0C2F] text-white px-6 py-4 border-b-4 border-black">
                <h2 className="text-3xl font-black uppercase text-center">{title}</h2>
            </div>
            <ul className="p-4 space-y-3">
                {teams.map((team) => (
                    <TeamRow key={team.team.id} team={team} />
                ))}
            </ul>
        </div>
    )
}

// Funtion for TeamRow component
function TeamRow({ team }: TeamRowProps) {
    const colors = getTeamColors(team.team.id);
    const leagueRank = team.leagueRank ? parseInt(team.leagueRank) : '-';

    return (
        <li className="flex items-center justify-between py-4 px-4 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]" style={{ backgroundColor: colors.primary }}>
            <div className="flex items-center gap-4 flex-1 min-w-0">
                <div className="bg-white border-3 border-black rounded-lg p-2 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                    <TeamLogo teamId={team.team.id} teamName={team.team.name} size="w-8-h8" />
                </div>
                <div className="flex-1 min-w-0">
                    <h3 className="text-white text-xl font-black uppercase">{team.team.name}</h3>
                    <p className="text-white/80 text-sm font-bold uppercase">Rank #{leagueRank}</p>
                </div>
            </div>
            <div className="text-right bg-white border-4 border-black px-4 py-2 shadow-[3px_3px_0px_0px_rgba(0,0,0,1]">
                <div className="text-2xl font-black text-black whitespace-nowrap">{team.wins}-{team.losses}</div>
                <div className="text-xs font-black text-black uppercase">{team.winningPercentage}</div>
            </div>
        </li>
    )
}
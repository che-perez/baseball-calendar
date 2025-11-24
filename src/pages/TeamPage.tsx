"use client"

import React, { useState, useEffect, type JSX } from "react";

import { fetchMlbSeriesData } from "../utils/mlbAPI";
import SeriesList from "../components/seriesList";
import StatsPanel from "../components/StatsPanel";
import TeamLogo from "../components/TeamLogo";
import { currentYear } from "../utils/gameUtils";
import { Link, useParams } from "react-router-dom";
import { MLB_TEAMS_IDS, getTeamColors } from "../utils/mlbTeams";


interface SeriesData {
  dates: Array<{
    games: Array<any>
  }>;
}

type UserParams = {
  id: string;
}

export default function TeamPage(): JSX.Element {
  const { id } = useParams<UserParams>();
  const teamID: number = parseInt(id!);
  const teamColors = getTeamColors(teamID);

  const [ seriesData, setSeriesData ] = useState<SeriesData | null>(null);
  const [ error, setError ] = useState<string | null>(null);
  const [ isLoading, setIsLoading ] = useState<boolean>(true);
  const [ divisionId, setDivisionId ] = useState<number>(204);
  const [ leagueId, setLeagueId ] = useState<number>(104);
  const [ teamName, setTeamName ] = useState<string>("MLB Team Logo");
  const [ selectedSeason, setSelectedSeason ] = useState<number>(currentYear);
  
  // Check if TeamID belongs to an actual MLB team
  const teamExist = Object.values(MLB_TEAMS_IDS).some(id => id === teamID);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/immutability
    fetchSeriesData();
  }, [selectedSeason, teamID]);

  const fetchSeriesData = async (): Promise<void> => {
    try {
      const data: SeriesData = await fetchMlbSeriesData(selectedSeason, teamID);
      setSeriesData(data);

      if(data.dates && data.dates.length > 0 && data.dates[0].games.length > 0) {
        const game = data.dates[0].games[0]; 
        const team = game.teams.away.team.id === teamID ? game.teams.away.team : game.teams.home.team;

        setTeamName(team.name);
        setDivisionId(team.division.id);
        setLeagueId(team.league.id);
      }


      setIsLoading(false);

    } catch (err) {
      setError((err as Error).message);
      setIsLoading(false);
    }
  }

  const seasons = Array.from({ length: currentYear - 1998 + 1}, (_, i) => currentYear - i);

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedSeason(parseInt(event.target.value));
  }
  
  // Display if not a MLB Team
  if(!teamExist) {
        return (
        <div className="min-h-screen bg-[#041E42] flex items-center justify-center">
            <div className="text-center bg-white border-4 border-black p-8 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]">
                <p className="text-black pb-5 font-black text-2xl uppercase">Team Not Found....</p>
                <Link to="/" className="w-full p-2 mt-4 hover:text-white font-black text-sm uppercase border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:bg-[#041E42] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all">Go Back to Home Page</Link>
            </div>
        </div>
    )
  }

  if(isLoading || error) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: teamColors.primary }}>
        <div className="text-center bg-white border-4 border-black p-8 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]">
          {isLoading ? <>
          <TeamLogo teamId={teamID} teamName={teamName} size="w-16 h-16" className="animate-spin mx-auto mb-4" />
          <p className="text-black font-black text-2xl uppercase">Loading...</p> </> : <></> }
          {error ? <p className="text-black font-black text-2xl uppercase">Error: {error}</p> : <></> }
        </div>
      </div>
    )
  }

    return (
      <>
        <div className="min-h-screen bg-opacity-75" style={{ backgroundColor: teamColors.secondary }}>
          <header className="border-b-4-black shadow-[0px_8px_0px_0px_rgba(0,0,0,1)]" style={{ backgroundColor: teamColors.primary }}>
            <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="border-4 border-black px-6 py-3 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transform -rotate-1" style={{ backgroundColor: teamColors.secondary }}>
                    <h1 className="text-6xl sm-text-7xl font-black text-white uppercase tracking-tighter">{teamName}</h1>
                  </div>
                </div>
                <select value={selectedSeason} onChange={handleChange} className="w-36 bg-white border-4 border-black text-3xl font-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px]">
                  {seasons.map((season) => (
                    <option key={season} value={season} className="text-xl font-black cursor-pointerbg-white border-4 border-black max-h-[400px] shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                      {season}
                    </option>
                  ))}
                </select>
              </div>
            </div>

          </header>
          <main className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-10">
            <div className="grid lg:grid-cols-[1fr_400px] gap-8">
              <div className="space-y-8">
                <SeriesList seriesList={seriesData} teamId={teamID} />
              </div>
              <div className="lg:top-8 lg:self-start space-y-8 lg:max-h-[clac(100vh-6rem)]">
                <StatsPanel teamID={teamID} divisionId={divisionId} leagueId={leagueId} selectedSeason={selectedSeason}/>
              </div>
            </div>
          </main>
        </div>
      </>
    );
  }

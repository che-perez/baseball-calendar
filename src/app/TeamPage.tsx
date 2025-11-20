"use client"

import React, { useState, useEffect, JSX } from "react";

import { fetchMlbSeriesData } from "./utils/mlbAPI";
import SeriesList from "./components/seriesList";
import StatsPanel from "./components/StatsPanel";
import TeamLogo from "./components/TeamLogo";
import { currentYear } from "./utils/gameUtils";
import { useParams } from "react-router-dom";
import { getTeamColors } from "./utils/mlbTeams";


interface SeriesData {
  data: Array<{
    games: Array<never>
  }>;
}
export default function Home(): JSX.Element {
  const { id } = useParams();
  const teamID = parseInt(id);
  const teamColors = getTeamColors(teamID);

  const [ seriesData, setSeriesData ] = useState<SeriesData | null>(null);
  const [ error, setError ] = useState<string | null>(null);
  const [ isLoading, setIsLoading ] = useState<boolean>(true);
  const [ divisionId, setDivisionId ] = useState<number | null>(null);
  const [ leagueId, setLeagueId ] = useState<number | null>(null);
  const [ teamName, setTeamName ] = useState<string | null>(null);
  const [ firstSeason, setFirstSeason ] = useState<number>(currentYear - 1);
  const [ selectedSeason, setSelectedSeason ] = useState<number>(currentYear);

  useEffect(() => {
    fetchSeriesData();
  }, [selectedSeason, id]);

  const fetchSeriesData = async (): Promise<void> => {
    try {
      const data: SeriesData = await fetchMlbSeriesData(selectedSeason, teamID);
      setSeriesData(data);

      if(data.dates && data.dates.length > 0 && data.dates[0].games.length > 0) {
        const game = data.dates[0].games[0]; 
        const team = game.teams.away.team.id == id ? game.teams.away.team : game.teams.home.team;

        setTeamName(team.name);
        setDivisionId(team.division.id);
        setLeagueId(team.league.id);
        setFirstSeason(team.firstYearOfPlay);
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
                  <div className="bg-white border-4 border-black max-h-[400px] shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                    {seasons.map((season) => (
                      <option key={season} value={season} className="text-xl font-black cursor-pointer">{season}</option>
                    ))}
                  </div>
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

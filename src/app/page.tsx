"use client"

import React, { useState, useEffect, JSX } from "react";

import { fetchMlbSeriesData } from "./utils/mlbAPI";
import SeriesList from "./components/SeriesList";
import StatsPanel from "./components/StatsPanel";

import TeamLogo from "./components/TeamLogo";

import { MLB_TEAM_IDS } from "./utils/gameUtils";


interface SeriesData {
  data: Array<{
    games: Array<never>
  }>;
}
export default function Home(): JSX.Element {

  const [ seriesData, setSeriesData ] = useState<SeriesData | null>(null);
  const [ error, setError ] = useState<string | null>(null);
  const [ isLoading, setIsLoading ] = useState<boolean>(true);

  useEffect(() => {
    fetchSeriesData();
  }, []);

  const fetchSeriesData = async (): Promise<void> => {
    try {
      const data: SeriesData = await fetchMlbSeriesData();
      setSeriesData(data);
      setIsLoading(false);

    } catch (err) {
      setError((err as Error).message);
      setIsLoading(false);
    }
  }

  if(isLoading || error) {
    return (
      <div className="min-h-screen bg-[#F97316] flex items-center justify-center">
        <div className="text-center bg-white border-4 border-black p-8 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]">
          {isLoading ? <>
          <TeamLogo teamId={MLB_TEAM_IDS.METS} teamName="Mets" size="w-16 h-16" className="animate-spin mx-auto mb-4" />
          <p className="text-black font-black text-2xl uppercase">Loading...</p> </> : <></> }
          {error ? <p className="text-black font-black text-2xl uppercase">Error: {error}</p> : <></> }
        </div>
      </div>
    )
  }

    return (
      <>
        <div className="min-h-screen bg-[#FDB462]">
          <header className="bg-[#003D82] border-b-4-black shadow-[0px_8px_0px_0px_rgba(0,0,0,1)]">
            <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="bg-[#F97316] border-4 border-black px-6 py-3 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transform -rotate-1">
                    <h1 className="text-6xl sm-text-7xl font-black text-white uppercase tracking-tighter">Mets</h1>
                  </div>
                </div>
              </div>
            </div>

          </header>
          <main className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-10">
            <div className="grid lg:grid-cols-[1fr_400px] gap-8">
              <div className="space-y-8">
                <SeriesList seriesList={seriesData} />
              </div>
              <div className="lg:top-8 lg:self-start space-y-8 lg:max-h-[clac(100vh-6rem)]">
                <StatsPanel />
              </div>
            </div>
          </main>
        </div>
      </>
    );
  }

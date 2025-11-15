"use client"

import React, { useState, useEffect } from "react";

import SeriesList from "./components/seriesList";


interface SeriesData {
  data: Array<{
    games: Array<any>
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
      const response = await fetch('https://statsapi.mlb.com/api/v1/schedule?hydrate=team,lineups&sportId=1&startDate=2025-03-27&endDate=2025-09-28&teamId=121');

      const data: SeriesData = await response.json();
      setSeriesData(data);
      setIsLoading(false);

    } catch (err) {
      setError((err as Error).message);
      setIsLoading(false);
    }
  }
  if(!isLoading) {
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
            <div className="grid lg-grid-cols-[1fr_400px] gap-8">
              <div className="space-y-8">
                <SeriesList seriesList={seriesData} />
              </div>
            </div>
          </main>
        </div>
      </>
    );
  }
}

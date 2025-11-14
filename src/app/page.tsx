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
        <SeriesList seriesList={seriesData} />
      </>
    );
  }
}

'use client'
 
import { useState } from 'react'
import { groupGameBySeries } from '../utils/gameUtils';

import SeriesBox from './SeriesBox';

interface Game {
  gamePk: number;
  gameDate: string;
  teams: {
    home: TeamData;
    away: TeamData;
  };
  venue?: {
    name: string;
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

interface SeriesData {
  dates?: Array<{
    games: Game[];
  }>
}

interface SeriesListProps {
  seriesList: SeriesData | null;
}

export default function SeriesList({ seriesList }: SeriesListProps): JSX.Element | null {
    const [totalSeries, setTotalSeries] = useState(1);
    const [seriesComplete, setSeriesComplete] = useState(false);
    const [currentSeriesGame, setCurrentSeriesGame] = useState(1);
    const [home, setHome] = useState(true);

    const seriesArr = groupGameBySeries(seriesList);
 
  return (
    <>
    {console.log("Game Series by Group", groupGameBySeries(seriesList))}
      <ul className='grid grid-cols-1 lg:grid-cols-2 gap-4'>
      {seriesArr.map((series, idx) => (
        <SeriesBox series={series} key={idx} />
      ))}
      </ul>
    </>
  )
}
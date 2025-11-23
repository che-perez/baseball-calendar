'use client'
 
import React, { JSX } from 'react'
import { groupGameBySeries } from '../utils/gameUtils';

import SeriesBox from './SeriesBox';

interface Game {
  gamePk: number;
  officialDate: string;
  teams: {
    home: TeamData;
    away: TeamData;
  };
  venue: Venue;
}

interface Venue {
  name: string
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
  teamId: number;
}

export default function SeriesList({ seriesList, teamId }: SeriesListProps): JSX.Element | null {
    const seriesArr = groupGameBySeries(seriesList, teamId);
    console.log('problem????',seriesArr);
 
  return (
    <>
    {console.log("Game Series by Group", groupGameBySeries(seriesList, teamId))}
      <ul className='grid grid-cols-1 lg:grid-cols-2 gap-4'>
      {seriesArr.map((series, idx) => (
        <SeriesBox series={series} key={idx} teamID={teamId}/>
      ))}
      </ul>
    </>
  )
}
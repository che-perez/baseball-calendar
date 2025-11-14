'use client'
 
import { useState } from 'react'
 
export default function SeriesList(gamesList) {
    const [totalSeries, setTotalSeries] = useState(1);
    const [seriesComplete, setSeriesComplete] = useState(false);
    const [currentSeriesGame, setCurrentSeriesGame] = useState(1);
    const [home, setHome] = useState(true);

    const convertDate = (date: string | number | Date) => {
        date = Date.parse(`${date}T00:00:00.000`);
        const newDate = new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric' });

        return newDate.format(date);
    };
 
  return (
    <ul>
    {gamesList.gamesList.dates.map((g) => (
        <li key={g.games.gamePK}>
            <span>{convertDate(g.date)}</span>
            <span>{g.games[0].teams.away.team.abbreviation}-{g.games[0].teams.away.score}</span>
            /<span>{g.games[0].teams.home.team.abbreviation}-{g.games[0].teams.home.score}</span>
        </li>
    ))}
    </ul>
    // <>{console.log(gamesList)}</>
  )
}
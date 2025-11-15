import { convertDate } from "../utils/gameUtils";

interface SeriesBoxProps {
    series: Series;
}

export default function SeriesBox({ series }: SeriesBoxProps): JSX.Element {

    return (
        <li>
            <span>{series.isHome ? "VS." : "@"} {series.opponent}</span>
            {series.games.map((game, idx) => (
                <div key={game.gamePk}>
                <span>{convertDate(game.officialDate)}</span>/
                <span>{game.teams.away.team.abbreviation}-{game.teams.away.score}</span> / 
                <span>{game.teams.home.team.abbreviation}-{game.teams.home.score}</span>
                </div>
            ))}
        </li>
    )
}
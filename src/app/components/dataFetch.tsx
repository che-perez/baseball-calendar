
export default async function Data() {
    const data = await fetch('https://statsapi.mlb.com/api/v1/schedule?hydrate=team,lineups&sportId=1&startDate=2025-03-27&endDate=2025-09-28&teamId=121');
    const gamesList = await data.json();

    const convertDate = (date: string | number | Date) => {
        date = Date.parse(`${date}T00:00:00.000`);
        const newDate = new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric' });

        return newDate.format(date);
    };

    return (
        <ul>
            {gamesList.dates.map((g) => (
                <li key={g.date}>
                    <span>{convertDate(g.date)}</span>
                    <span>{g.games[0].teams.away.team.abbreviation}-{g.games[0].teams.away.score}</span>
                    /<span>{g.games[0].teams.home.team.abbreviation}-{g.games[0].teams.home.score}</span>
                </li>
            ))}
        </ul>
    )
}
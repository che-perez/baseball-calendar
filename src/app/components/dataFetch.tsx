import SeriesList from "./seriesList";

export default async function Data() {
    const data = await fetch('https://statsapi.mlb.com/api/v1/schedule?hydrate=team,lineups&sportId=1&startDate=2025-03-27&endDate=2025-09-28&teamId=121');
    const gamesList = await data.json();

    return (
        <SeriesList gamesList={gamesList} />
    )
}
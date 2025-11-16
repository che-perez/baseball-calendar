const MLB_API_BASE = 'https://statsapi.mlb.com/api/v1';

interface TeamData {
    team: {
        id: number;
        name: string;
        abbreviation: string;
    };
    score?: number;
}

interface Venue {
    name?: string;
}

interface Game {
    gamePk: number;
    gameType: string;
    officialDate: string;
    status: {
        statusCode?: string;
        abstractGameState?: string;
        detailedSate?: string;
    }
    teams: {
        away: TeamData;
        home: TeamData;
    };
    venue?: Venue;
}

interface DateEntry {
    date: string;
    games: Game[];
}

interface SeriesData {
    dates?: DateEntry[];
    totalGames?: number;
}

interface StandingsData {
    records?: Array<{
        division?: {
            id: number;
            name: string;
        }
        teamRecords: Array<{
            team: {
                id: number;
                name: string;
            };
            wins: number;
            losses: number;
        }>;
    }>;
}

// Fetch Series Data by Season and filter by Regular season games only
export async function fetchMlbSeriesData(season: number = 2025): Promise<SeriesData> {
    const response = await fetch(`${MLB_API_BASE}/schedule?hydrate=team,linescore&sportId=1&season=${season}&teamId=121`);

    if(!response.ok) {
        throw new Error(`Failed to fetch data: ${response.statusText}`);
    }

    const data: SeriesData = await response.json();

    // Filter for regular season only
    if(data.dates) {
        data.dates = data.dates.map(date =>({
            ...date,
            games: date.games.filter(game => game.gameType === 'R')
        })).filter(date => date.games.length > 0);
    }

    return data;
}

// Fetch Standings Data to use on Divison and League Standings Components
export async function fetchMLBStandings(leagueId: number, season: number = 2025): Promise<StandingsData> {
    const response = await fetch(`${MLB_API_BASE}/standings?leagueId=${leagueId}&season=${season}&standingsTypes=regularSeason`);

    if(!response.ok) {
        throw new Error(`Failed to fetch standings: ${response.statusText}`);
    }

    return response.json();
}
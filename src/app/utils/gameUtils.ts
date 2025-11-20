interface Game {
    teams: {
        home: TeamData;
        away: TeamData;
    };
    status: {
        statusCode?: string;
        abstractGameState?: string;
        detailedState?: string;
    }
    venue?: Venue;
}

interface Venue {
    name: string;
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
    }>;
}

interface Series {
    opponent: string;
    oppnentAbbr: string;
    opponentId: number;
    isHome: boolean;
    games: Game[];
    venue?: Venue;
}

export function isCurrTeamHomeTeam(game: Game, teamId: number): boolean {
    return game.teams.home.team.id === teamId;
}

export function getOppoTeamFromGame(game: Game, teamId: number): TeamData {
    return game.teams.away.team.id === teamId ? game.teams.home : game.teams.away;
}

export function groupGameBySeries(seriesData: SeriesData | null, teamId: number): Series[] {
    if(!seriesData?.dates) {
        return [];
    }

    const seriesGroups: Series[] = [];
    let currSeries: Series | null = null;

    seriesData.dates.forEach(date => {
        date.games.forEach(game => {
            const oppoTeam = getOppoTeamFromGame(game, teamId);
            const isHome = isCurrTeamHomeTeam(game, teamId);

            if(!currSeries || currSeries.opponent !== oppoTeam.team.name || currSeries.isHome !== isHome) {
                currSeries = {
                    opponent: oppoTeam.team.name,
                    oppnentAbbr: oppoTeam.team.abbreviation,
                    opponentId: oppoTeam.team.id,
                    isHome: isHome,
                    games: [],
                    venue: game.venue
                };
                seriesGroups.push(currSeries);
            }

            currSeries.games.push(game);

        });
    });

    return seriesGroups;
}

export const currentYear = new Date().getFullYear();

    export function convertDate(date: string | number | Date) {
    date = Date.parse(`${date}T00:00:00.000`);
    const newDate = new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric' });

    return newDate.format(date);
};
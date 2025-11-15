interface Game {
    teams: {
        home: TeamData;
        away: TeamData;
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
    }>;
}

interface Series {
    opponent: string;
    oppnentAbbr: string;
    opponentId: number;
    isHome: boolean;
    games: Game[];
}

export const MLB_TEAM_IDS = {
    METS: 121
} as const;

export function isMetsHomeTeam(game: Game): boolean {
    return game.teams.home.team.id === MLB_TEAM_IDS.METS;
}

export function getOppoTeamFromGame(game: Game): TeamData {
    return game.teams.away.team.id === MLB_TEAM_IDS.METS ? game.teams.home : game.teams.away;
}

export function groupGameBySeries(seriesData: SeriesData | null): Series[] {
    if(!seriesData?.dates) {
        return [];
    }

    const seriesGroups: Series[] = [];
    let currSeries: Series | null = null;

    seriesData.dates.forEach(date => {
        date.games.forEach(game => {
            const oppoTeam = getOppoTeamFromGame(game);
            const isHome = isMetsHomeTeam(game);

            if(!currSeries || currSeries.opponent !== oppoTeam.team.name || currSeries.isHome !== isHome) {
                currSeries = {
                    opponent: oppoTeam.team.name,
                    oppnentAbbr: oppoTeam.team.abbreviation,
                    opponentId: oppoTeam.team.id,
                    isHome: isHome,
                    games: []
                };
                seriesGroups.push(currSeries);
            }

            currSeries.games.push(game);

        });
    });

    return seriesGroups;
}

    export function convertDate(date: string | number | Date) {
    date = Date.parse(`${date}T00:00:00.000`);
    const newDate = new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric' });

    return newDate.format(date);
};
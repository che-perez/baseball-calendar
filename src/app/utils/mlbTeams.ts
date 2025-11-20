export const MLB_TEAMS_IDS: Record<string, number> = {
    METS: 121,
    YANKEES: 147,
    RED_SOX: 111,
    ORIOLES: 110,
    RAYS: 139,
    BLUE_JAYS: 141,
    WHITE_SOX: 145,
    GUARDIANS: 114,
    TIGERS: 116,
    ROYALS: 118,
    TWINS: 142,
    ASTROS: 117,
    ANGELS: 108,
    ATHLETICS: 133,
    MARINERS: 136,
    RANGERS: 140,
    BRAVES: 144,
    MARLINS: 146,
    PHILLIES: 143,
    NATIONALS: 120,
    CUBS: 112,
    REDS: 113,
    BREWERS: 158,
    PIRATES: 134,
    CARDINALS: 138,
    DIAMONDBACKS: 109,
    ROCKIES: 115,
    DODGERS: 119,
    PADRES: 135,
    GIANTS: 137
};

export const MLB_LEAGUE_IDS: Record<string, number> = {
  AMERICAN_LEAGUE: 103,
  NATIONAL_LEAGUE: 104,
};

interface LeagueDivisionName {
  name: string;
}

export const MLB_LEAGUE_DIVISION_NAMES: Record<number, LeagueDivisionName> = {
  201: { name: "AL East" },
  202: { name: "AL Central" },
  200: { name: "AL West" },
  204: { name: "NL East" },
  205: { name: "NL Central" },
  203: { name: "NL West" },
  103: { name: "American League" },
  104: { name: "National League" }
};

export function getLeagueDivisionName(divisionId: number): LeagueDivisionName {
  return MLB_LEAGUE_DIVISION_NAMES[divisionId];
}

interface TeamColor {
  primary: string;
  secondary: string;
  name: string;
}

export const TEAM_COLORS: Record<number, TeamColor> = {
  110: { primary: '#DF4601', secondary: '#000000', name: 'Orioles' },
  111: { primary: '#BD3039', secondary: '#0C2340', name: 'Red Sox' },
  147: { primary: '#003087', secondary: '#E4002C', name: 'Yankees' },
  139: { primary: '#092C5C', secondary: '#8FBCE6', name: 'Rays' },
  141: { primary: '#134A8E', secondary: '#1D2D5C', name: 'Blue Jays' },
  145: { primary: '#27251F', secondary: '#C4CED4', name: 'White Sox' },
  114: { primary: '#00385D', secondary: '#E50022', name: 'Guardians' },
  116: { primary: '#0C2C56', secondary: '#FA4616', name: 'Tigers' },
  118: { primary: '#004687', secondary: '#BD9B60', name: 'Royals' },
  142: { primary: '#002B5C', secondary: '#D31145', name: 'Twins' },
  117: { primary: '#002D62', secondary: '#EB6E1F', name: 'Astros' },
  108: { primary: '#BA0021', secondary: '#003263', name: 'Angels' },
  133: { primary: '#003831', secondary: '#EFB21E', name: 'Athletics' },
  136: { primary: '#0C2C56', secondary: '#005C5C', name: 'Mariners' },
  140: { primary: '#003278', secondary: '#C0111F', name: 'Rangers' },
  144: { primary: '#CE1141', secondary: '#13274F', name: 'Braves' },
  146: { primary: '#00A3E0', secondary: '#EF3340', name: 'Marlins' },
  121: { primary: '#003D82', secondary: '#FF5910', name: 'Mets' },
  143: { primary: '#E81828', secondary: '#002D72', name: 'Phillies' },
  120: { primary: '#AB0003', secondary: '#14225A', name: 'Nationals' },
  112: { primary: '#0E3386', secondary: '#CC3433', name: 'Cubs' },
  113: { primary: '#C6011F', secondary: '#000000', name: 'Reds' },
  158: { primary: '#12284B', secondary: '#FFC52F', name: 'Brewers' },
  134: { primary: '#27251F', secondary: '#FDB827', name: 'Pirates' },
  138: { primary: '#C41E3A', secondary: '#0C2340', name: 'Cardinals' },
  109: { primary: '#A71930', secondary: '#E3D4AD', name: 'Diamondbacks' },
  115: { primary: '#33006F', secondary: '#C4CED4', name: 'Rockies' },
  119: { primary: '#005A9C', secondary: '#EF3E42', name: 'Dodgers' },
  135: { primary: '#2F241D', secondary: '#FFC425', name: 'Padres' },
  137: { primary: '#FD5A1E', secondary: '#27251F', name: 'Giants' },
};

export function getTeamColors(teamId: number): TeamColor {
  return TEAM_COLORS[teamId] || { primary: '#000000', secondary: '#FFFFFF', name: 'Unknown' };
}
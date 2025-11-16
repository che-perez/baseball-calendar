import React from "react";

interface TeamLogoProps {
    teamId: number;
    teamName: string;
    size?: string;
    className?: string;
}

export default function TeamLogo({ teamId, teamName, size = "w-5 h-5", className = ""}: TeamLogoProps): JSX.Element {
    return (
        <img src={`https://www.mlbstatic.com/team-logos/${teamId}.svg`}
            className={`${size} ${className}`}
            alt={teamName}
            onError={(e: React.SyntheticEvent<HTMLImageElement>) => ((e.target as HTMLImageElement).style.display = 'none')} />
    )
}
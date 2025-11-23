import React, { type JSX } from "react";

interface TeamLogoProps {
    teamId: number;
    teamName: string;
    size?: string;
    className?: string;
    onDark?: boolean;
}

export default function TeamLogo({ teamId, teamName, size = "w-5 h-5", className = "", onDark = false}: TeamLogoProps): JSX.Element {
    const logoUrl = onDark ? `https://midfield.mlbstatic.com/v1/team/${teamId}/spots/60` : `https://www.mlbstatic.com/team-logos/${teamId}.svg`;
    
    return (
        <img src={logoUrl}
            className={`${size} ${className}`}
            alt={teamName}
            onError={(e: React.SyntheticEvent<HTMLImageElement>) => ((e.target as HTMLImageElement).style.display = 'none')} />
    )
}
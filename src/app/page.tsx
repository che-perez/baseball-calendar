"use client"

import React, { JSX } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import dynamic from "next/dynamic";

const DynamicComponentWithNoSSRHome = dynamic(() => import('./pages/HomePage'),{ ssr: false });
const DynamicComponentWithNoSSRTeam = dynamic(() => import('./pages/TeamPage'),{ ssr: false });

export default function App(): JSX.Element {
    return (
        <Routes>
            <Route path="/" element={<DynamicComponentWithNoSSRHome/>}/>
            <Route path="/team/:id" element={<DynamicComponentWithNoSSRTeam/>}/>
            {/* Redirect all 404 pages to Home Page */}
            <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
    )
}
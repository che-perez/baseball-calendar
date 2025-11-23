"use client"

import { type JSX } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import HomePage from "./pages/HomePage";
import TeamPage from "./pages/TeamPage";

export default function App(): JSX.Element {
    return (
        <Routes>
            <Route path="/" element={<HomePage />}/>
            <Route path="/team/:id" element={<TeamPage/>}/>
            {/* Redirect all 404 pages to Home Page */}
            <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
    )
}
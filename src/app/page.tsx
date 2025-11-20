"use client"

import React, { JSX } from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./HomePage";
import TeamPage from "./TeamPage"

export default function App(): JSX.Element {
    return (
        <Routes>
            <Route path="/" element={<HomePage/>}/>
            <Route path="/team/:id" element={<TeamPage/>}/>
        </Routes>
    )
}
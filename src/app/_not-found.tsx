"use client"

import { JSX } from "react";
import Link from "next/link";

export default function NotFound(): JSX.Element {
    return (
        <div className="min-h-screen bg-[#041E42] flex items-center justify-center">
            <div className="text-center bg-white border-4 border-black p-8 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]">
                <p className="text-black pb-5 font-black text-2xl uppercase">404 | Page Not Found...</p>
                <Link href="/" className="w-full p-2 mt-4 hover:text-white font-black text-sm uppercase border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:bg-[#041E42] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-2px] hover:translate-y-[-2px] transition-all">Go back Home</Link>
            </div>
        </div>
    )
}
"use client";
import { Gem } from "lucide-react";
import * as React from "react";
import Chip from "@root/components/Chip";

const tags = [
    {icon: <Gem />, body: 'text'},
    {icon: <Gem />, body: 'text'},
    {icon: <Gem />, body: 'text'}
]

export default function ProjectLayout({children}: {children: React.ReactNode}) {
    return (
        <>
            <header>
                <h4>LMI : ATIS Design System</h4>
                <h1>Over 50% raise in layout design speed, with improved developer handoff</h1>
            </header>
            <ol>
                
            </ol>
            {tags.map(tag => {
                return (
                    <li key={tag.body}>
                        <Chip icon={tag.icon} body={tag.body}/>
                    </li>
                )
            })}
            <main>
                {children}
            </main>
        </>
    )
}
"use client"
import React, { PureComponent, useEffect, useState } from 'react';
import { BarChart, Bar, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LabelList } from 'recharts';

type TCharData = {
    Nome: string
    oldTestament: number
    newTestament: number
    total: number
}[]


export default function DashboardGeneralChapterTestamentChart({ oldTestament, newTestament, chapters }: { oldTestament: number, newTestament: number, chapters: number }) {
    const [userReadingsCount, setUserReadingCount] = useState<TCharData>([])

    useEffect(() => {

        const data = {
            Nome: 'Page',
            oldTestament,
            newTestament,
            total: chapters
        }
        setUserReadingCount([data])
    }, [])

    return (
        <ResponsiveContainer width="50%" height="100%">
            <BarChart barSize={44} data={userReadingsCount}>
                <Bar name='Antigo Testamento' dataKey="oldTestament" fill="#8884d8">
                </Bar>
                <Bar name='Novo Testamento' dataKey="newTestament" fill="#f25178">
                </Bar>
            </BarChart>
        </ResponsiveContainer>
    )
}

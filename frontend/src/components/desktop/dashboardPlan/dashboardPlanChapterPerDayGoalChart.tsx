"use client"
import { ThemeContext } from '@/context/themeContex';
import React, { PureComponent, useContext, useEffect, useState } from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { EThemeColor } from '../../../../types/enums-color-theme';

type TChartDataRequest = {
    [key: string]: {
        readings: number,
        chapters: number,
        duration: number
    }
}

type TChartDataResponse = {
    name: string
    chapters: string
}

export default function DashboardPlanChapterPerDayGoalChart({ data }: { data: TChartDataRequest[] }) {
    const [readingsCount, setReadingsCount] = useState<TChartDataResponse[]>([])

    const { themeValue } = useContext(ThemeContext)

    useEffect(() => {
        const result: TChartDataResponse[] = []

        for (const item of data) {
            const [key, value] = Object.entries(item)[0]
            const chapters = (value as any).chapters

            const newElement = {
                name: key,
                chapters: chapters
            }
            result.push(newElement)
        }

        setReadingsCount(result)

    }, [])

    return (
        <ResponsiveContainer width="100%" height={140}>
            <AreaChart
                width={500}
                height={300}
                data={readingsCount}
                margin={{
                    top: 10,
                    right: 30,
                    left: 0,
                    bottom: 0,
                }}
            >
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Area type="monotone" dataKey="chapters" name="Capítulos" stroke={themeValue === EThemeColor.Blue ? '#6266f5' : '#f25178'} fill={themeValue === EThemeColor.Blue ? '#6266f5' : '#f25178'} />
            </AreaChart>
        </ResponsiveContainer>
    )
}

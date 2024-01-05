"use client"
import React, { PureComponent, useContext, useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { EThemeColor } from '../../../../types/enums-color-theme';
import { ThemeContext } from '@/context/themeContex';


type TChartDataRequest = {
    [key: string]: {
        readings: number,
        chapters: number,
        duration: number
    }
}

type TChartDataResponse = {
    name: string
    duration: string
}

export default function DashboardPlanReadingAvarageDuarition({ data }: { data: TChartDataRequest[] }) {
    const [readingsCount, setReadingsCount] = useState<TChartDataResponse[]>()

    const { themeValue } = useContext(ThemeContext)

    useEffect(() => {
        const result: TChartDataResponse[] = []

        for (const item of data) {
            const [key, value] = Object.entries(item)[0]
            const duration = (value as any).duration

            const newElement = {
                name: key,
                duration: duration
            }
            result.push(newElement)
        }

        setReadingsCount(result)

    }, [])

    return (
        <ResponsiveContainer width="100%" height="80%">
            <LineChart
                width={500}
                height={300}
                data={readingsCount}
                margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                }}
            >
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line name='Duração' type="monotone" dataKey="duration" stroke={themeValue === EThemeColor.Blue ? '#6266f5' : '#f25178'} strokeWidth={3} activeDot={{ r: 8 }} />
            </LineChart>
        </ResponsiveContainer>
    )
}

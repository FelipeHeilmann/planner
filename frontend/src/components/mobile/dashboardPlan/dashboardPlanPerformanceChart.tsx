"use client"
import { ThemeContext } from '@/context/themeContex'
import { useContext, useEffect, useState } from 'react'
import { LineChart, Line, YAxis, Tooltip, ResponsiveContainer } from 'recharts'
import { EThemeColor } from '../../../../types/enums-color-theme'

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

export default function DashboardPlanPerformanceChart({ data }: { data: TChartDataRequest[] }) {
    const { themeValue } = useContext(ThemeContext)
    const [readingsCount, setReadingsCount] = useState<TChartDataResponse[]>()
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
        <>
            <section className="relative flex mb-16 items-center w-full h-[50vh] bg-white shadow-sm rounded-[12px]">
                <div className="absolute top-2 left-16 text-weirdBlack">Tempo de leitura</div>
                <ResponsiveContainer width="100%" height="80%" className="">
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
                        <YAxis tickLine={false} />
                        <Tooltip />
                        <Line name='Duração' type="monotone" dataKey="duration" stroke={themeValue === EThemeColor.Blue ? '#6266f5' : '#f25178'} strokeWidth={2.5} dot={<></>} />
                    </LineChart>
                </ResponsiveContainer>
            </section>
        </>
    )
}

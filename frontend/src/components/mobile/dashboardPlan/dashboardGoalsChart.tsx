"use client"
import { AreaChart, Area, YAxis, ResponsiveContainer, ReferenceLine, Line, LineChart, XAxis } from 'recharts';
import CustomizedLabel from "./dashboardPlanGoalsCustomLabel"
import { TReadingPlanReadingGroupByDay } from '../../../../types/reading-plan-types';
import { useContext, useEffect, useState } from 'react';
import { ThemeContext } from '@/context/themeContex';
import { EThemeColor } from '../../../../types/enums-color-theme';


type TChartDataResponse = {
    name: string
    chapters: string
}

export default function DashboardGoalsChart({ data }: { data: TReadingPlanReadingGroupByDay }) {
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
        <>
            <section className="relative h-3/5 shadow-sm bg-white rounded-[18px]">
                <div className='absolute left-5 text-weirdBlack'>Capítulos por mês</div>
                <ResponsiveContainer className="absolute auto -left-[42px] bottom-14" width="100%" height="60%" >
                    <LineChart
                        width={500}
                        height={400}
                        data={readingsCount}
                        margin={{
                            top: 14,
                            right: 10,
                            bottom: 0,
                        }}

                    >
                        <YAxis stroke="transparent" tick={false} />
                        <Line type="monotone" dataKey="chapters" stroke="" label={<CustomizedLabel />} />
                    </LineChart>
                </ResponsiveContainer>
                <ResponsiveContainer className="absolute auto -left-[42px] bottom-14" width="110%" height="60%" >
                    <AreaChart
                        width={500}
                        height={400}
                        data={readingsCount}
                        margin={{
                            top: 14,
                            right: 10,
                            bottom: 0,
                        }}
                    >
                        <Area type="monotone" dataKey="chapters" stroke={themeValue === EThemeColor.Blue ? '#6266f5' : '#f25178'} fill={themeValue === EThemeColor.Blue ? '#6266f5' : '#f25178'} />
                        {/* Average line */}
                        <ReferenceLine y={2.5} stroke="#575353" strokeWidth={2} strokeDasharray="6 7" label={{ value: "4", position: "left", stroke: "#575353", strokeWidth: 0.3, fontWeight: 400, fontSize: 14, fontFamily: "Inter" }} />
                        <ReferenceLine y={2.42} stroke="#57535333" strokeWidth={2} strokeDasharray="6 7" />
                        <YAxis stroke="transparent" tick={false} />
                    </AreaChart>
                </ResponsiveContainer>
                <ResponsiveContainer className="absolute auto bottom-1" width="100%" height="60%" >
                    <LineChart
                        width={500}
                        height={400}
                        data={readingsCount}
                        margin={{
                            right: 10,
                            bottom: 0,
                        }}
                    >
                        <YAxis />
                        <XAxis dataKey="name" stroke="#575353" tickLine={false} />
                    </LineChart>
                </ResponsiveContainer>
                <ResponsiveContainer className="absolute auto -left-[42px] bottom-1" width="110%" height="60%" >
                    <LineChart
                        width={500}
                        height={400}
                        data={readingsCount}
                        margin={{
                            right: 10,
                            bottom: 0,
                        }}
                    >
                        <YAxis />
                        <XAxis stroke="gainsboro" strokeWidth={"1px"} tick={false} />
                    </LineChart>
                </ResponsiveContainer>
                {/* Chart gradient */}
                {/* 
                        <div className="absolute z-50 bottom-14 border-red-900 w-full left-[4%] h-[40%] bg-gradient-to-b" />
                    */}
            </section>
        </>
    )
}

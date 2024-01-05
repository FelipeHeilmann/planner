"use client"
import { axiosInstanceClient } from '@/libs/axiosAPICaller';
import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import Cookies from 'js-cookie'

type TChart = {
    name: string
    oldTestament: number
    newTestament: number
}

export default function DashboardGeneralChapterPerMonthChartMobile() {
    const [userReadings, setUserReading] = useState<TChart[]>([])

    const fetchData = async () => {
        try {
            const { data: readingsCount } = await axiosInstanceClient.get('/readings/count', {
                headers: {
                    Authorization: `Bearer ${Cookies.get('token')}`
                }
            })

            const result: TChart[] = []

            for (const item of readingsCount) {
                const [key, value] = Object.entries(item)[0]
                const newTestament = (value as any).newTestamentChapters
                const oldTestament = (value as any).oldTestamentChapters

                const newElement = {
                    name: key,
                    newTestament,
                    oldTestament
                }
                result.unshift(newElement)
            }
            setUserReading(result)
        } catch (err) {
            console.error(err)
        }
    }

    useEffect(() => {
        fetchData()
    }, [])
    return (
        <ResponsiveContainer width="100%" height="105%" >
            <BarChart
                data={userReadings}
                margin={
                    {
                        top: 20,
                        right: 30,
                        left: 20,
                        bottom: 5,
                    }}
                barSize={15}
            >
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar name='Antigo Testamento' dataKey="oldTestament" stackId="a" fill="#6266f5" />
                <Bar name='Novo Testamento' dataKey="newTestament" stackId="a" fill="#f25178" />
            </BarChart>
        </ResponsiveContainer>
    )
}

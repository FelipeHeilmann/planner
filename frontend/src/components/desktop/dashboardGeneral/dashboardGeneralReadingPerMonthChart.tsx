"use client"
import { axiosInstanceClient } from '@/libs/axiosAPICaller';
import React, { useContext, useEffect, useState } from 'react'
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'
import Cookies from 'js-cookie'
import { ThemeContext } from '@/context/themeContex';
import { EThemeColor } from '../../../../types/enums-color-theme';

type TChart = {
    name: string
    duration: number
}

export default function DashboardGeneralReadingPerMonthChart({ height = 100 }: { height?: number }) {

    const { themeValue } = useContext(ThemeContext)

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
                const duration = (value as any).duration

                const newElement = {
                    name: key,
                    duration
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
        <ResponsiveContainer width="95%" height="100%">
            <LineChart
                width={500}
                height={200}
                data={userReadings}
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
                <Line name='Duração' type="monotone" dataKey="duration" stroke={`${themeValue === EThemeColor.Blue ? '#6266f5' : '#f25178'}`} fill={`${themeValue === EThemeColor.Blue ? '#6266f5' : '#f25178'}`} />
            </LineChart>
        </ResponsiveContainer>
    )
}

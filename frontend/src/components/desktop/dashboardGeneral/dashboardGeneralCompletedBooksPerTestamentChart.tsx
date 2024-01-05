"use client"
import { useEffect, useState } from 'react';
import { PieChart, Pie } from 'recharts';

type Props = {
    booksCompleted: number,
    whichTestament: 'old testament' | 'new testament',
    totalTestaments: number,
}

export default function DashboardGeneralCompletedBooksPerTestamentChart({ booksCompleted, whichTestament, totalTestaments }: Props) {

    const nullColor = '#F3F6FD'
    const whichTestamentColor = whichTestament === 'new testament' ? '#f25178' : '#6266f5'

    const colors = [nullColor, whichTestamentColor];

    let propNum = (booksCompleted / totalTestaments) * 100

    // Prettyfing the chart
    propNum <= 5 && propNum > 0 ? propNum = 5 : propNum
    propNum === 0 ? propNum : null
    propNum >= 95 && propNum < 100 ? propNum = 90 : null

    const dataOld = [
        { name: 'Group B', value: propNum === 0 ? 100 : 100 - propNum, fill: colors[0] }, // Total
        { name: 'Group B', value: propNum, fill: colors[1] }, // Partial
    ]

    const dataNew = [
        { name: 'Group B', value: propNum, fill: colors[1] }, // Partial
        { name: 'Group B', value: propNum === 0 ? 100 : 100 - propNum, fill: colors[0] }, // Total
    ]

    const whichData = whichTestament === 'new testament' ? dataNew : dataOld

    const [value, setValue] = useState<any>()

    useEffect(() => {
        setValue(whichData)
    }, [])

    return (
        <PieChart width={80} height={80}>
            <Pie
                cx={35}
                cy={35}
                innerRadius={25}
                outerRadius={35}
                cornerRadius={10}
                paddingAngle={-15}
                fill="#8884d8"
                dataKey="value"
                data={value}
            >
            </Pie>
        </PieChart>
    )
}


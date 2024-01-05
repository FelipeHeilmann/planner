"use client"
import { axiosInstanceClient } from "@/libs/axiosAPICaller"
import { TReadingPlanZodFormSchema } from "@/libs/readingPlanZodFormSchema"
import { useContext, useEffect, useState } from "react"
import Cookies from 'js-cookie'
import { useRouter } from "next/navigation"
import { ThemeContext } from "@/context/themeContex"
import { EThemeColor } from "../../../../types/enums-color-theme"

type TReadingPlan = {
    id: string
    name: string
    planOf: string
    status: string
    readingGoalPerDay: number
    testament: string
    endDate: string
    book: string | null
}

export default function DashboardSelect({ planArr, planInfo }: { planArr: any[], planInfo: { name: string, id: string } }) {
    const [planValue, setPlanValue] = useState<string>()
    const [canLoad, setCanLoad] = useState<boolean>()

    const { themeValue } = useContext(ThemeContext)

    const router = useRouter()

    const onChangePlan = (e: string) => {
        setPlanValue(e)
        router.push(`/dashboard-plano/${e}`)
    }

    const toLoad = () => {
        setPlanValue(planInfo.id)
        setCanLoad(true)
    }

    useEffect(() => {
        toLoad()
    }, [])

    return (
        <>
            {canLoad &&
                <select
                    onChange={e => onChangePlan(e.target.value)}
                    value={planValue}
                    className={`${themeValue === EThemeColor.Blue ? 'bg-mainBlue' : 'bg-mainPink'}  p-2 box-border text-white rounded`}>
                    {
                        planArr?.map((item: any, i: number) => (
                            <option key={i} value={item.id}>{item.name}</option>
                        ))
                    }
                </select>
            }
        </>
    )
}
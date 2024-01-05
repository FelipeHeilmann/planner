"use client"
import { useEffect, useState } from "react";
import { EThemeColor } from "../../../../types/enums-color-theme";
import { useRouter } from "next/navigation";

export default function DashboardPlanNavClient({ theme, planArr, planInfo }: { theme: EThemeColor, planArr: any[], planInfo: { name: string, id: string } }) {

    const [planValue, setPlanValue] = useState<string>()
    const [canLoad, setCanLoad] = useState<boolean>()

    const router = useRouter()

    const onChangePlan = (e: string) => {
        setPlanValue(e)
        router.push(`/dashboard-plano/${e}/desempenho`)
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
                    className={`${theme === EThemeColor.Blue ? 'bg-mainBlue' : 'bg-mainPink'}  w-[110px] p-[2px] box-border text-white rounded`}>
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

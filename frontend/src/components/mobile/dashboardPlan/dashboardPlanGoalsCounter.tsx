"use client"
import { Minus, Plus } from "lucide-react";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { timestampToUser } from "@/utils/dateParser";
import { axiosInstanceClient } from "@/libs/axiosAPICaller";
import { useRouter } from "next/navigation";

const incrementValue = 'increase'
const decrementValue = 'decrease'

export default function DashboardPlanGoalsCounter({ id, counter: readingGoalPerDayFromServer, endDate, totalChapters }: { id: string, counter: number, endDate: string, totalChapters: number }) {
    const router = useRouter()

    const [finishDate, setFinishDate] = useState<string>()
    const [counter, setCounter] = useState<number>(readingGoalPerDayFromServer)
    const [disabled, setDisabled] = useState<boolean>(false)

    const [animationMinus, setAnimationMinus] = useState<boolean>(false)
    const [animationPlus, setAnimationPlus] = useState<boolean>(false)

    const delay = async (ms: number = 500) => {
        setDisabled(true)
        await new Promise(resolve => setTimeout(resolve, ms))
            .catch(err => console.error(err))
        setDisabled(false)
    }

    const onClickIncrement = async (e: any) => {
        setAnimationPlus(true)
        delay()
        await axiosInstanceClient.patch(`/reading-plans/${id}/${e}`,
            {}, { headers: { Authorization: `Bearer ${Cookies.get('token')}` } })
            .catch(err => console.error(err))
        setCounter(prev => prev + 1)
        setAnimationPlus(false)
        router.refresh()
    }

    const onClickDecrement = async (e: any) => {
        setAnimationMinus(true)
        delay()
        setCounter((prev: number) => (
            (prev <= 1) ? 1 : (prev - 1)
        ))
        if (counter !== 1)
            await axiosInstanceClient.patch(`/reading-plans/${id}/${e}`,
                {}, { headers: { Authorization: `Bearer ${Cookies.get('token')}` } })
                .catch(err => console.error(err))
        setAnimationMinus(false)
        router.refresh()
    }

    const calculateFinishedDate = () => {
        const dateFinish = new Date(endDate)

        const daysToComplete = totalChapters / counter

        dateFinish.setDate(dateFinish.getDate() + daysToComplete)

        setFinishDate(dateFinish.toISOString())
    }

    useEffect(() => {
        calculateFinishedDate()
    }, [counter])

    return (
        <>

            <section className="flex flex-col justify-center items-center w-auto h-1/2">
                <span className="text-md text-white">Meta de cap/dia</span>
                <div className="flex items-center gap-6">
                    <button disabled={disabled} onClick={_ => onClickDecrement(decrementValue)} className={`w-fit transition-all ${animationMinus || counter <= 1 ? 'shadow-none' : 'shadow-md'} rounded-lg p-1 flex justify-center items-center h-fit`}>
                        <Minus className="text-white" size={28} strokeWidth={3} />
                    </button>
                    <span className="text-4xl font-medium text-white">{counter}</span>
                    <button disabled={disabled || counter >= 50} onClick={_ => onClickIncrement(incrementValue)} className={`w-fit transition-all ${animationPlus || counter >= 50 ? 'shadow-none' : 'shadow-md'} rounded-lg p-1 flex justify-center items-center h-fit`}>
                        <Plus className="text-white" size={28} strokeWidth={3} />
                    </button>
                </div>
            </section >
            <section className="flex flex-col text-center">
                <span className="text-sm">Término do plano:</span>
                <div className="w-fit self-center text-center px-3 py-2 mt-1 border-b">
                    <span className="block w-full text-3xl max-w-[200px] text-ellipsis overflow-x-hidden whitespace-nowrap">
                        {finishDate ?
                            timestampToUser(finishDate!).replaceAll('-', '/')
                            : 'dd/mm/aa'
                        }
                    </span>
                </div>
            </section>
        </>
    )
}

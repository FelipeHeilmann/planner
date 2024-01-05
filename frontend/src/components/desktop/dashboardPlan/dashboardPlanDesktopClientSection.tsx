"use client"
import { timestampToUser } from "@/utils/dateParser";
import DashboardPlanChapterPerDayGoalChart from "./dashboardPlanChapterPerDayGoalChart";
import { Minus, Plus, StepForward } from "lucide-react";
import DashboardPlanReadingAvarageDuarition from "./dashboardPlanReadingAvarageDuarition";
import rapaz from '../../../../public/assets/rapaz1.png'
import menina from '../../../../public/assets/menina.png'
import Image from "next/image";
import { useContext, useEffect, useState } from "react";
import Cookies from 'js-cookie'
import { axiosInstanceClient } from "@/libs/axiosAPICaller";
import { ThemeContext } from "@/context/themeContex";
import { EThemeColor } from "../../../../types/enums-color-theme";

const incrementValue = 'increase'
const decrementValue = 'decrease'

type TChartDataRequest = {
    [key: string]: {
        readings: number,
        chapters: number,
        duration: number
    }
}

export default function DashboardPlanDesktioClientSection(
    {
        readingsPlanId,
        readingGoalPerDay,
        endDate,
        totalChapters,
        readingsGroupByDay,
        chaptersPerDay,
        readingsFilteredByMonth,
        readingPerDayAverage
    }:
        {
            readingsPlanId: string,
            readingGoalPerDay: number,
            endDate: string,
            totalChapters: number,
            readingsGroupByDay: TChartDataRequest[],
            chaptersPerDay: number,
            readingsFilteredByMonth: TChartDataRequest[],
            readingPerDayAverage: number
        }
) {

    const [counter, setCounter] = useState<number>(readingGoalPerDay)
    const [disabled, setDisabled] = useState<boolean>(false)
    const [finishDate, setFinishDate] = useState<string>()

    const { themeValue } = useContext(ThemeContext)

    const delay = async (ms: number = 500) => {
        setDisabled(true)
        await new Promise(resolve => setTimeout(resolve, ms))
            .catch(err => console.error(err))
        setDisabled(false)
    }

    const onClickIncrement = async (e: any) => {
        delay()
        await axiosInstanceClient.patch(`/reading-plans/${readingsPlanId}/${e}`,
            {}, { headers: { Authorization: `Bearer ${Cookies.get('token')}` } })
            .catch(err => console.log(err))
        setCounter(prev => prev + 1)
    }

    const onClickDecrement = async (e: any) => {
        delay()
        setCounter((prev: number) => (
            (prev <= 1) ? 1 : (prev - 1)
        ))
        if (counter !== 1)
            await axiosInstanceClient.patch(`/reading-plans/${readingsPlanId}/${e}`,
                {}, { headers: { Authorization: `Bearer ${Cookies.get('token')}` } })
                .catch(err => console.log(err))
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
            <section className="w-full flex items-center gap-1">
                <div className={`flex flex-col h-full w-[350px] px-2 py-3 box-border border ${themeValue === EThemeColor.Blue ? 'bg-dashboardCard' : 'bg-dashboardCardPink'} h-fit items-center rounded-lg`}>
                    <h3 className="text-lg text-white">Escolha sua meta</h3>
                    <section className="flex flex-col justify-center items-center w-auto h-fit">
                        <span className="text-md text-white">Meta de cap/dia</span>
                        <div className="flex items-center gap-6">
                            <button disabled={disabled} onClick={_ => onClickDecrement(decrementValue)} className="w-fit h-fit">
                                <Minus className={`${themeValue === EThemeColor.Blue ? 'text-mainPink' : 'text-mainBlue'}`} size={28} strokeWidth={3} />
                            </button>
                            <span className="text-4xl font-medium text-white">{counter}</span>
                            <button disabled={disabled} onClick={_ => onClickIncrement(incrementValue)} className="w-fit h-fit">
                                <Plus className={`${themeValue === EThemeColor.Blue ? 'text-mainPink' : 'text-mainBlue'}`} size={28} strokeWidth={3} />
                            </button>
                        </div>
                    </section>
                    <span className="text-sm font-light text-weirdWhite">capítulos/dia</span>
                    <span className="text-sm font-light text-weirdWhite">Você finalizará seu plano em</span>
                    <div className={`px-8 rounded-lg ${themeValue === EThemeColor.Blue ? 'bg-mainBlue' : 'bg-mainPink'} bg-opacity-50`}>
                        <p className="text-center font-semibold text-white">{timestampToUser(finishDate!).replaceAll('-', '/')}</p>
                    </div>
                </div>
                <div className="flex-1 bg-white rounded-lg h-fit">
                    <header className="flex w-full p-2">
                        <p className="text-weirdBlack text-xl font-light">Média diária capítulos</p>
                    </header>
                    <DashboardPlanChapterPerDayGoalChart data={readingsGroupByDay} />
                </div>
            </section >

            <section className="w-full h-full flex items-center gap-1">
                <div className="flex relative w-[350px] p-2 h-full bg-white rounded-lg">
                    <figure className="h-full w-1/4 relative">
                        <Image src={themeValue === EThemeColor.Blue ? rapaz : menina} className="absolute left-0 w-full h-full object-contain" alt="Rapaz com livro na mão" />
                    </figure>
                    <article className="flex flex-col items-center justify-center gap-1">
                        <h3 className="text-weirdBlack font-normal text-[1vw]">Média diária de capítulos</h3>
                        <span className={`${themeValue === EThemeColor.Blue ? 'text-mainBlue' : 'text-mainPink'} font-bold text-[1.2vw]`}>{readingPerDayAverage}</span>
                        <span className={`${themeValue === EThemeColor.Blue ? 'text-mainBlue' : 'text-mainPink'} text-[1vw]`}>Capítulos/dia</span>
                        <p className="w-full flex justify-center items-center text-weirdBlack font-ligh text-sm">Você está {counter > readingPerDayAverage ? 'abaixo da média' : 'acima da média'}
                            <span className="ml-[6px]"><StepForward fill={`${counter > readingPerDayAverage ? '#f25178' : '#6266f5'}`} width={20} color={`${counter > readingPerDayAverage ? '#f25178' : '#6266f5'}`} className={`${counter > readingPerDayAverage ? 'rotate-90' : '-rotate-90'}`} /></span>
                        </p>
                    </article>
                </div>
                <div className="flex-1 flex flex-col justify-between bg-white rounded-lg h-full">
                    <header className="flex w-full p-2">
                        <p className="text-weirdBlack text-xl font-light">Média tempo leitura</p>
                    </header>
                    <DashboardPlanReadingAvarageDuarition data={readingsFilteredByMonth} />
                </div>
            </section>
        </>
    )
}

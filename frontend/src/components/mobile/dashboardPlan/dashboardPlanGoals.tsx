import { BookMarkedIcon } from "lucide-react";
import Image from "next/image";
import rapaz from '../../../../public/assets/rapaz1.png'
import menina from '../../../../public/assets/menina.png'
import DashboardGoalsChart from "./dashboardGoalsChart";
import { TReadingPlanReadingGroupByDay } from "../../../../types/reading-plan-types";
import DashboardPlanGoalsCounter from "./dashboardPlanGoalsCounter";
import FetchUserInfo from "@/api/fetchUserInfo";
import { EThemeColor } from "../../../../types/enums-color-theme";

export default async function DashboardPlanGoals(
    {
        readingsPlanId,
        readingPlanReadingsCountGroupByDay,
        readingGoalPerDay,
        endDate,
        totalChapters,
        chaptersPerDay,
        readingPerDayAverage
    }:
        {
            readingsPlanId: string,
            readingPlanReadingsCountGroupByDay: TReadingPlanReadingGroupByDay,
            readingGoalPerDay: number,
            endDate: string,
            totalChapters: number,
            chaptersPerDay: number,
            readingPerDayAverage: number
        }
) {

    const { theme } = await FetchUserInfo()

    const isUnderAvarage = readingGoalPerDay > readingPerDayAverage

    return readingsPlanId && (
        <>
            <div className="lg:hidden flex flex-col gap-2 bg-weirdWhite mb-20 overflow-x-hidden w-screen min-h-screen pt-32">
                {/* Card boy + counter */}
                <section className={`${theme === EThemeColor.Blue ? 'bg-mainBlue' : 'bg-mainPink'} flex justify-center w-full gap-5 rounded-tl-2xl`}>
                    <Image placeholder="empty" className="object-cover w-[20vw]" priority width={150} height={50} src={theme === EThemeColor.Blue ? rapaz : menina} alt='Rapaz jovem segurando a Bíblia na mão' />
                    <div className="w-[60vw] h-full text-white p-2">
                        {readingsPlanId && <DashboardPlanGoalsCounter endDate={endDate} totalChapters={totalChapters} id={readingsPlanId} counter={readingGoalPerDay} />}

                    </div>
                </section>
                {readingsPlanId && <DashboardGoalsChart data={readingPlanReadingsCountGroupByDay} />}
                {/* Last card */}
                <section className="flex items-center justify-between bg-white w-full h-1/4 rounded-[18px] shadow-sm p-2">
                    <div className="flex gap-3">
                        <figure className={`${theme === EThemeColor.Blue ? 'bg-mainBlue' : 'bg-mainPink'} w-fit h-fit py-3 px-4 rounded-[13px] shadow-md`}>
                            <BookMarkedIcon color="white" strokeWidth={1.5} />
                        </figure>
                        <article className="text-weirdBlack">
                            <p className="text-lg">Média diária capítulos</p>
                            <p className="flex items-center gap-1">Você está {isUnderAvarage ? 'abaixo da média' : 'acima da média'}
                                <svg width="12" height="7" viewBox="0 0 12 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M5.4748 5.80227C5.86566 6.12477 6.43565 6.10433 6.80179 5.7547L10.9895 1.75576C11.6462 1.1287 11.1934 0.0209325 10.2851 0.0323263L1.38613 0.143954C0.454908 0.155636 0.0449001 1.32199 0.763564 1.91497L5.4748 5.80227Z" fill={`${isUnderAvarage ? '#f25178' : '#6266f5'}`} />
                                </svg>
                            </p>
                        </article>
                    </div>
                    <div className={`flex flex-col h-full justify-center items-center pr-3 text-center ${isUnderAvarage ? 'text-mainPink' : 'text-mainBlue'}`}>
                        <span className="font-bold text-3xl">{chaptersPerDay}</span>
                        <span className="text-sm">cap/dia</span>
                    </div>
                </section>
            </div>
        </>
    )
}

import { BookMarkedIcon, BookOpenCheck } from "lucide-react";
import { cookies } from "next/headers";
import { EThemeColor } from "../../../../types/enums-color-theme";
import DashboardPlanPerformanceChart from "./dashboardPlanPerformanceChart";
import FetchUserInfo from "@/api/fetchUserInfo";
import { TReading } from "../../../../types/readings-types";
import { TReadingPlan, TReadingPlanCount, TReadingPlanReadingGroupByDay } from "../../../../types/reading-plan-types";


type TFilterdData = {
    [key: string]: {
        readings: number
        chapters: number
        duration: number
    }
}

export default async function DashboardPlanPerformance(
    {
        readingsPlanId,
        readingsPlans,
        readingPlan,
        readingPlanReadingsCountGroupByDay,
        readingPlanCount,
        readings,
        verses,
        chapterReadPercentage,
        verseReadPercentage,
        booksReadPercentage,
        daysIncompletePlanPercentage,
        dataFilteredByMonth,
    }
        :
        {
            readingsPlanId: string,
            readingsPlans: TReadingPlan[],
            readingPlan: TReadingPlan,
            readingPlanReadingsCountGroupByDay: TReadingPlanReadingGroupByDay,
            readingPlanCount: TReadingPlanCount,
            readings: TReading[],
            verses: number,
            chapterReadPercentage: string,
            verseReadPercentage: string,
            booksReadPercentage: string,
            daysIncompletePlanPercentage: number | string,
            dataFilteredByMonth: TFilterdData[]
        }
) {

    const { theme } = await FetchUserInfo()


    return readingPlan && (
        <>
            <div className={`lg:hidden w-screen min-w-iphoneSEWidth overflow-x-hidden shadow-xl ${theme === EThemeColor.Blue ? 'bg-mainBlue' : 'bg-mainPink'}  mt-[120px] rounded-[12px]`}>
                {/* Card progress bar */}
                <section className="text-white h-[20vh]">
                    <div className="flex flex-col justify-between h-full py-2 px-5">
                        <section className="flex flex-col">
                            <h2 className=" text-2xl font-semibold">Plano {readingPlan.name}</h2>
                            <span className="text-white font-light">{readingPlan.status}</span>
                        </section>
                        <section>
                            <div className="flex justify-between w-full text-white">
                                <span className="font-semibold">{booksReadPercentage}</span>
                                <p>Livros concluídos <span className="text-2xl pl-[7px]">{readingPlanCount.completedBooks}</span></p>
                            </div>
                            <div className="bg-white w-full h-[7px] rounded-full overflow-hidden">
                                <div style={{ width: `${booksReadPercentage}%` }} className="h-full bg-mainYellow" />
                            </div>
                            <span className="text-[14px] font-light">Faltam {readingPlanCount.totalBooks - readingPlanCount.completedBooks} livros</span>
                            <div>
                            </div>
                        </section>
                    </div>
                </section>
                {/* Other cards */}
                <section className="flex flex-col gap-2 bg-weirdWhite h-full w-full rounded-[12px]">
                    <article className="flex justify-between shadow-md items-center w-full min-h-[14vh] bg-white px-3 rounded-[12px]">
                        <div className="w-full h-full flex items-center gap-4">
                            <figure className={`${theme === EThemeColor.Blue ? 'bg-mainBlue' : 'bg-mainPink'} w-fit h-fit py-3 px-4 rounded-[8px]`}>
                                <BookOpenCheck color="white" strokeWidth={1.5} />
                            </figure>
                            <section className="text-weirdBlack min-w-[170px] w-[60%]">
                                <h3 className="font-medium">Capítulos concluidos</h3>
                                <span className="font-light text-xs">{chapterReadPercentage}%</span>
                                <div className="w-full h-[4px] overflow-hidden bg-gray-200 rounded-full">
                                    <div style={{ width: `${chapterReadPercentage}%` }} className={`h-full ${theme === EThemeColor.Blue ? 'bg-mainBlue' : 'bg-mainPink'}`} />
                                </div>
                                <span className="font-light text-xs">Faltam {readingPlanCount.totalChapters - readingPlanCount.chapters} capítulos</span>
                            </section>
                        </div>
                        <span className="text-3xl text-end px-3 min-w-[120px]">{readingPlanCount.chapters}</span>
                    </article>
                    <article className="flex justify-between shadow-md  items-center w-full min-h-[14vh] bg-white px-3 rounded-[12px]">
                        <div className="w-full h-full flex items-center gap-4">
                            <figure className={`${theme === EThemeColor.Blue ? 'bg-mainBlue' : 'bg-mainPink'} w-fit h-fit py-3 px-4 rounded-[8px]`}>
                                <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" /><path d="m9 9.5 2 2 4-4" /></svg>
                            </figure>
                            <section className="text-weirdBlack min-w-[170px] w-[60%]">
                                <h3 className="font-medium">Versículos concluidos</h3>
                                <span className="font-light text-xs">{verseReadPercentage}%</span>
                                <div className="w-full h-[4px] overflow-hidden bg-gray-200 rounded-full">
                                    <div style={{ width: `${verseReadPercentage}%` }} className={`h-full ${theme === EThemeColor.Blue ? 'bg-mainBlue' : 'bg-mainPink'}`} />
                                </div>
                                <span className="font-light text-xs">Faltam {readingPlanCount.totalVerses - verses} versículos</span>
                            </section>
                        </div>
                        <span className="text-3xl text-end px-3 min-w-[120px]"> {verses} </span>
                    </article>
                    <article className="flex shadow-md items-center w-full min-h-[14vh] bg-white px-3 rounded-[12px]">
                        <div className="w-full h-full flex items-center gap-4">
                            <figure className={`${theme === EThemeColor.Blue ? 'bg-mainBlue' : 'bg-mainPink'} w-fit h-fit py-3 px-4 rounded-[8px]`}>
                                <BookMarkedIcon color="white" strokeWidth={1.5} />
                            </figure>
                            <section className="text-weirdBlack w-[60%]">
                                <h3 className=" font-medium">Dias de leitura</h3>
                                <span className="font-light text-xs">{daysIncompletePlanPercentage}% dos dias você não realizou devocional</span>
                            </section>
                        </div>
                        <span className="text-3xl text-end px-3 min-w-[120px]">{readingPlanReadingsCountGroupByDay.length}</span>
                    </article>

                    <DashboardPlanPerformanceChart data={dataFilteredByMonth} />

                </section>
            </div>
        </>
    )
}

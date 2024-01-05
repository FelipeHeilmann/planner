import { Album, Calendar } from "lucide-react";
import VersesDashboardIcon from "../../../../public/icons/versesDashboardIcon";
import DashboardSelect from "./dashboardPlanSelect";

import { TReading } from "../../../../types/readings-types";
import DashboardPlanDesktioClientSection from "./dashboardPlanDesktopClientSection";
import { TReadingPlan, TReadingPlanCount, TReadingPlanReadingGroupByDay } from "../../../../types/reading-plan-types";
import DashboardPlanDesktopToggleColor from "./dashboardPlanDesktopToggleColor";

type TFilterdData = {
    [key: string]: {
        readings: number
        chapters: number
        duration: number
    }
}

export default async function DashboardPlanDesktop(
    {
        readingsPlanId,
        readingsPlans,
        readingPlan,
        readingPlanReadingsCountGroupByDay,
        readingPlanCount,
        verses,
        chapterReadPercentage,
        verseReadPercentage,
        booksReadPercentage,
        daysIncompletePlanPercentage,
        dataFilteredByMonth,
        chaptersPerDay,
        readingPerDayAverage
    }
        :
        {
            readingsPlanId: string,
            readingsPlans: TReadingPlan[],
            readingPlan: TReadingPlan,
            readingPlanReadingsCountGroupByDay: TReadingPlanReadingGroupByDay,
            readingPlanCount: TReadingPlanCount,
            verses: number,
            chapterReadPercentage: string,
            verseReadPercentage: string,
            booksReadPercentage: string,
            daysIncompletePlanPercentage: number | string,
            dataFilteredByMonth: TFilterdData[],
            chaptersPerDay: number,
            readingPerDayAverage: number
        }
) {


    const endDate = new Date().toISOString()

    return (
        <>
            <main className={`hidden lg:flex flex-col gap-1 flex-1 h-[89vh] overflow-y-hidden px-10 box-content `}>
                <header className="w-full flex items-center gap-2">
                    <DashboardSelect planInfo={{ id: readingsPlanId, name: readingPlan.name }} planArr={readingsPlans} />
                    <h2 className="text-weirdBlack text-2xl font-normal">Esse é o seu desempenho nesse plano de leitura</h2>
                </header>
                <section className="w-full h-[27%] flex gap-1">
                    <div className="flex flex-col w-[350px] p-2 h-full overflow-hidden rounded-lg relative isolate">
                        {/* Toggle color compo */}
                        <DashboardPlanDesktopToggleColor whichElement="box" />
                        <div className="w-full flex flex-col ">
                            <h3 className="text-white text-xl">{readingPlan.name}</h3>
                            <p className="text-weirdWhite text-sm">{readingPlan.status}</p>
                        </div>
                        <div className="w-full flex flex-row-reverse ">
                            <p className="text-white text-[1vw]">Livros concluidos <span className="text-white font-semibold text-[1.3vw]">{readingPlanCount.completedBooks}</span></p>
                        </div>
                        <div className="w-full flex flex-col gap-1">
                            <span className="ml-2 text-weirdWhite font-normal text-[1vw]">{booksReadPercentage}%</span>
                            <div className="w-full flex justify-center">
                                {/* Progress bar */}
                                <div className="w-[95%] h-1 bg-gray-400 rounded-lg">
                                    <div style={{
                                        width: `${Number(booksReadPercentage) > 100 ? 100 : Number(booksReadPercentage) < 5 ? 5 : booksReadPercentage
                                            }%`
                                    }} className="bg-mainYellow rounded-lg h-full"></div>
                                </div>
                            </div>
                            <span className="ml-2 text-weirdWhite font-normal text-[0.9vw]">Faltam {readingPlanCount.totalBooks - readingPlanCount.completedBooks} livros</span>
                        </div>
                    </div>
                    <div className="flex-1 flex items-center gap-1">
                        <div className="w-1/3 h-full flex flex-col items-center pt-1 px-3 pb-3 rounded-lg bg-white">
                            <div className="w-10 h-10 flex justify-center items-center rounded-lg relative isolate overflow-hidden">
                                {/* Toggle color compo */}
                                <DashboardPlanDesktopToggleColor whichElement="icon" />
                                <Album width={20} color="#fff" />
                            </div>
                            <span className="text-weirdBlack font-normal text-center text-sm">Capítulos concluidos</span>
                            <span className="text-black font-semibold text-[1.3vw]">{readingPlanCount.chapters}</span>
                            <div className="w-full flex items-center gap-7">
                                <span className="text-weirdBlack font-semibold text-[1.0vw] w-[4%]">{chapterReadPercentage}%</span>
                                <div className="w-full h-1 bg-gray-400 rounded-lg">
                                    {/*progress bar*/}
                                    <DashboardPlanDesktopToggleColor chapterReadPercentage={chapterReadPercentage} whichElement="progressBar" />
                                </div>
                            </div>
                            <span className="text-weirdBlack font-light text-center text-[1vw] w-full self-end">Faltam {readingPlanCount.totalChapters - readingPlanCount.chapters} capítulos</span>
                        </div>
                        <div className="w-1/3 h-full flex flex-col items-center pt-1 px-3 pb-3 rounded-lg bg-white">
                            <div className="w-10 h-10 flex justify-center items-center rounded-lg relative isolate overflow-hidden">
                                {/* Toggle color compo */}
                                <DashboardPlanDesktopToggleColor whichElement="icon" />
                                <VersesDashboardIcon width={20} color="#fff" />
                            </div>
                            <span className="text-weirdBlack font-normal text-center text-sm">Versículos concluidos</span>
                            <span className="text-black font-semibold text-[1.3vw]">{verses}</span>
                            <div className="w-full flex items-center gap-7">
                                <span className="text-weirdBlack font-semibold text-[1vw] w-[4%]">{verseReadPercentage}%</span>
                                {/*progress bar*/}
                                <div className="w-full h-1 bg-gray-400 rounded-lg">
                                    <DashboardPlanDesktopToggleColor chapterReadPercentage={verseReadPercentage} whichElement="progressBar" />
                                </div>
                            </div>
                            <span className="text-weirdBlack font-light text-[1vw] text-center self-end">Faltam {readingPlanCount.totalVerses - verses} versículos</span>
                        </div>
                        <div className="w-1/3 h-full flex flex-col items-center pt-1 px-3 pb-3 rounded-lg bg-white">
                            <div className="w-10 h-10 flex justify-center items-center rounded-lg relative isolate overflow-hidden">
                                {/* Toggle color compo */}
                                <DashboardPlanDesktopToggleColor whichElement="icon" />
                                <Calendar width={20} color="#fff" />
                            </div>
                            <span className="text-weirdBlack font-normal text-center text-sm">Dias de leitura no plano</span>
                            <span className="text-black font-semibold text-[1.3vw]">{readingPlanReadingsCountGroupByDay.length}</span>
                            <p className="text-weirdBlack text-center font-light text-[1vw]"><span className="text-weirdBlack font-semibold font-sm">{daysIncompletePlanPercentage}%</span> dos dias você não realizou leitura do plano</p>
                        </div>
                    </div>
                </section>
                <DashboardPlanDesktioClientSection readingPerDayAverage={readingPerDayAverage} readingsFilteredByMonth={dataFilteredByMonth} chaptersPerDay={chaptersPerDay} readingsGroupByDay={readingPlanReadingsCountGroupByDay} readingsPlanId={readingsPlanId} endDate={endDate} readingGoalPerDay={readingPlan.readingGoalPerDay} totalChapters={readingPlanCount.totalChapters} />
            </main>
        </>
    )
}

import DashboardGeneralReadingPerMonthChart from "@/components/desktop/dashboardGeneral/dashboardGeneralReadingPerMonthChart";
import DashboardGeneralHeader from "./dashboardGeneralHeader";
import DashboardGeneralChapterPerMonthChart from "@/components/desktop/dashboardGeneral/dashboardGeneralChapterPerMonthChart";
import DashboardGeneralHourChart from "@/components/desktop/dashboardGeneral/dashboardGeneralHourChart";
import DashboardGeneralChapterPerMonthChartMobile from "./dashboardGeneralChapterPerMonthChartMobile";
import DashboardGeneralHourChartMobile from "./dashboardGeneralHourChartMobile";
import DashboardGeneralReadingPerMonthChartMobile from "./dashboardGeneralReadingPerMonthChartMobile";
import FetchUserInfo from "@/api/fetchUserInfo";


export default async function DashboardGeneralDetail({
    newTestamentHourReadings,
    oldTestamentHourReadings
}: {
    newTestamentHourReadings: number,
    oldTestamentHourReadings: number
}) {

    const { imageUrl } = await FetchUserInfo()

    return (
        <>
            <main className="block relative lg:hidden w-full">
                <DashboardGeneralHeader img={imageUrl} />
                <section className="w-full flex flex-col gap-2 p-3">
                    <div className="w-full flex flex-col gap-2 h-[22vh] bg-white rounded-lg">
                        <header className="w-full p-2">
                            <h3 className="text-weirdBlack">Capítulos lidos X mês</h3>
                        </header>
                        <DashboardGeneralChapterPerMonthChartMobile />
                    </div>
                    <div className="w-full h-[23vh] flex flex-col bg-white rounded-lg">
                        <header className="w-full p-2">
                            <h3 className="text-weirdBlack">Horas de leitura</h3>
                        </header>
                        <div className="w-ful flex h-full">
                            <div className="w-1/2 flex flex-col items-center h-full">
                                <DashboardGeneralHourChartMobile newTestamentHour={Number(((newTestamentHourReadings) / 60).toFixed(2))} oldTestamentHour={Number(((oldTestamentHourReadings) / 60).toFixed(2))} />
                                <p className="flex gap-1 max-w-[calc(140%)] overflow-hidden whitespace-nowrap">
                                    <span className="font-semibold text-weirdBlack max-w-[calc(140%)] overflow-hidden whitespace-nowrap text-ellipsis pl-5">
                                        {(Number(((newTestamentHourReadings) / 60)) + Number(((oldTestamentHourReadings) / 60))).toFixed(2)}
                                    </span>
                                    <span className="font-semibold text-weirdBlack">hrs</span>
                                </p>
                            </div>
                            <div className="w-1/2 h-full flex items-center justify-center flex-col">
                                <div className="flex items-center gap-1">
                                    <div className="w-4 h-3 bg-mainBlue rounded-[4px]" />
                                    <p className="text-md whitespace-nowrap text-weirdBlack">Antigo testamento</p>
                                </div>
                                <span className="text-weirdBlack font-semibold">{((oldTestamentHourReadings) / 60).toFixed(2)}</span>
                                <div className="flex items-center gap-1">
                                    <div className="w-4 h-3 bg-mainPink rounded-[4px]" />
                                    <p className="text-md whitespace-nowrap text-weirdBlack">Novo testamento</p>
                                </div>
                                <span className="text-weirdBlack font-semibold">{((newTestamentHourReadings) / 60).toFixed(2)}</span>
                            </div>
                        </div>
                    </div>
                    <div className="w-full h-[22vh] flex flex-col bg-white rounded-lg">
                        <header className="w-full p-2">
                            <h3 className="text-weirdBlack">Horas por mês</h3>
                        </header>
                        <DashboardGeneralReadingPerMonthChartMobile />
                    </div>
                </section>
            </main >
        </>
    )
}

import { Album } from "lucide-react";
import VersesDashboardIcon from "../../../../public/icons/versesDashboardIcon";
import DashboardGeneralReadingPerMonthChart from "./dashboardGeneralReadingPerMonthChart";
import DashboardGeneralChapterPerMonthChart from "./dashboardGeneralChapterPerMonthChart";
import DashboardGeneralHourChart from "./dashboardGeneralHourChart";
import Image from "next/image";
import Logo from '../../../../public/assets/logo-planner.png'
import DashboardGeneralCompletedBooksPerTestamentChart from "./dashboardGeneralCompletedBooksPerTestamentChart";
import { TReading } from "../../../../types/readings-types";
import DashboardGeneralToggleTheme from "./dashboardGeneralCardToggleTheme";
import DashboardGeneralDesktopToggleColor from "./dashboardGeneralDesktopToggleColor";

type TCompletedBook = {
    book: string
    completed: number
    finishedAt: string[]
}[]

export default async function DashboardGeneralDesktop({
    completedBook,
    // readings,
    numOfChaptersNewTestament,
    numOfChaptersOldTestament,
    // comparedBooks,
    // completedBooksByTestament,
    newTestamentCompletedBooks,
    oldTestamentCompletedBooks,
    totalCompletedBooksTestaments,
    // newTestament,
    // oldTestament,
    newTestamentHourReadings,
    oldTestamentHourReadings,
    chapters,
    verses,
    words,
    name,
    completedBible
}: {
    completedBook: TCompletedBook,
    readings: [] | TReading[],
    numOfChaptersNewTestament: number,
    numOfChaptersOldTestament: number,
    comparedBooks: string[][],
    completedBooksByTestament: string[][],
    newTestamentCompletedBooks: number,
    oldTestamentCompletedBooks: number,
    totalCompletedBooksTestaments: number,
    newTestament: TReading[],
    oldTestament: TReading[],
    newTestamentHourReadings: number,
    oldTestamentHourReadings: number,
    chapters: number,
    verses: number,
    words: number,
    name: string
    completedBible: number
}) {

    const miniCards = [
        {
            Icon: Album,
            text: 'Capítulos lidos',
            data: chapters,
        },
        {
            Icon: VersesDashboardIcon,
            text: 'Versículos lidos',
            data: verses,
        },
        {
            Icon: Album,
            text: 'Palavras lidas',
            data: words,
        },
    ] as const

    return completedBook && (
        <>
            {/*
            <header className="flex justify-between items-center w-full p-2 px-3 bg-white rounded-lg">
                <div className="">
                    <h1 className="text-2xl text-weirdBlack font-semibold">Dashboard geral</h1>
                    <p className="text-md text-weirdBlack font-light">Esse é status das suas devocionais desde que você iniciou seu Planner Bíblico.</p>
                </div>
                <DashboardGeneralFilter />
            </header >*/}
            <main className={`hidden overflow-hidden lg:flex flex-col flex-1 gap-1 px-2 `}>
                <section className="w-full flex gap-1">
                    {/*<figure className="w-1/6 relative ">
                        <Image src={man} alt="Homem" className="w-full h-full bg-white rounded-lg object-contain absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2" />
                    </figure>*/}

                    <div className="flex h-full gap-1">
                        <div className="relative isolate overflow-hidden h-full flex flex-col rounded-lg justify-center">
                            {/* Theme color */}
                            <DashboardGeneralToggleTheme />
                            <h3 className="text-xl text-white w-[15vw] whitespace-nowrap overflow-hidden pr-1 pl-2">
                                {
                                    name.split(" ")[0] + ','
                                }
                            </h3>
                            <p className="text-white text-[15px] whitespace-nowrap pr-1 pl-2">Você já concluiu <span className="font-bold">
                                {
                                    completedBook.length >= 1000 ? '+999' : completedBook.length
                                }
                            </span> livros</p>
                            <p className="text-white text-[15px] pr-1 pl-2">e leu <span className="font-bold">
                                {
                                    completedBible! >= 1000 ? '+999' : completedBible
                                }
                            </span> vezes a bíblia completa</p>
                        </div>
                        <div className="flex gap-1">
                            <div className="bg-white flex items-center rounded-lg">
                                <div className="flex items-center p-[.5vw] gap-1">
                                    <div className="flex flex-col gap-1">
                                        <p className="max-w-[100px] font-light text-weirdBlack">Antigo Testamento</p>
                                        <p className="text-[12px] font-light text-weirdBlack">Livros concluidos</p>
                                    </div>
                                    <div className="w-[2px] h-[70px] bg-mainBlue"></div>
                                    { /*rounded chart*/}
                                    <div className="relative">
                                        <span className="text-md text-weirdBlack font-semibold absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2">
                                            {
                                                oldTestamentCompletedBooks > 9999 ? '+9999' : oldTestamentCompletedBooks
                                            }
                                        </span>
                                        <DashboardGeneralCompletedBooksPerTestamentChart
                                            booksCompleted={oldTestamentCompletedBooks}
                                            totalTestaments={totalCompletedBooksTestaments}
                                            whichTestament="old testament"
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="bg-white flex items-center rounded-lg">
                                <div className="flex items-center p-[.5vw] gap-1">
                                    <div className="flex flex-col gap-1">
                                        <p className="max-w-[100px] font-light text-weirdBlack">Novo Testamento</p>
                                        <p className="text-[12px] font-light text-weirdBlack">Livros concluidos</p>
                                    </div>
                                    <div className="w-[2px] h-[70px] bg-mainPink"></div>
                                    { /*rounded chart*/}
                                    <div className="relative">
                                        <span className="text-md text-weirdBlack font-semibold absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2">
                                            {
                                                newTestamentCompletedBooks > 9999 ? '+9999' : newTestamentCompletedBooks
                                            }
                                        </span>
                                        <DashboardGeneralCompletedBooksPerTestamentChart
                                            booksCompleted={newTestamentCompletedBooks}
                                            totalTestaments={totalCompletedBooksTestaments}
                                            whichTestament="new testament"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    {miniCards.map(({ Icon, text, data, }, i) => {
                        return (
                            <div key={i} className="flex flex-1 h-full rounded-lg items-center justify-evenly bg-white flex-col">
                                <div className="w-[3vw] h-[3vw] flex justify-center items-center p-2 rounded-lg relative isolate overflow-hidden">
                                    {/* Toggle color compo*/}
                                    <DashboardGeneralDesktopToggleColor whichElement="icon" />
                                    <Icon width={20} color="#fff" />
                                </div>
                                <p className="text-sm text-weirdBlack px-1 text-center">{text}</p>
                                <p className="text-sm font-semibold text-weirdBlack w-[7vw] text-center overflow-hidden">{data}</p>
                            </div>
                        )
                    })}
                </section>
                <section className="flex w-full gap-1">
                    <div className="flex flex-col w-[23vw] gap-1 rounded-lg bg-white">
                        <header className="w-full p-2 pl-4">
                            <h4 className="font-semibold text-weirdBlack">Capítulos por Testamento</h4>
                        </header>
                        <div className="flex pl-6 justify-between">
                            <div className="h-[28vh]">
                                <section className="flex h-[85%] gap-3">
                                    {/* Old testament bar */}
                                    <div className="flex items-end w-[4.2vw] h-full">
                                        <div style={{
                                            height:
                                                Number(((numOfChaptersOldTestament / chapters) * 100).toFixed()) <= 20 || isNaN(Number(((numOfChaptersOldTestament / chapters) * 100).toFixed()))
                                                    ? '20%'
                                                    : `${((numOfChaptersOldTestament / chapters) * 100).toFixed()}%`
                                        }}
                                            className="flex justify-center items-center w-full bg-mainBlue rounded-lg shadow-lg">
                                            <span className="text-sm text-white font-medium">
                                                {
                                                    isNaN(Number(((numOfChaptersOldTestament / chapters) * 100).toFixed())) ? '0' : ((numOfChaptersOldTestament / chapters) * 100).toFixed()
                                                }%
                                            </span>
                                        </div>
                                    </div>
                                    {/* New testament bar */}
                                    <div className="w-[4.2vw] flex items-end h-full">
                                        <div style={{
                                            height:
                                                Number(((numOfChaptersNewTestament / chapters) * 100).toFixed()) <= 20 || isNaN(Number(((numOfChaptersNewTestament / chapters) * 100).toFixed()))
                                                    ? '20%'
                                                    : `${((numOfChaptersNewTestament / chapters) * 100).toFixed()}%`
                                        }}
                                            className="flex justify-center items-center w-full bg-mainPink rounded-lg shadow-lg">
                                            <span className="text-sm text-white font-medium">
                                                {
                                                    isNaN(Number(((numOfChaptersNewTestament / chapters) * 100).toFixed())) ? '0' : ((numOfChaptersNewTestament / chapters) * 100).toFixed()
                                                }%
                                            </span>
                                        </div>
                                    </div>
                                </section>
                            </div>
                            <div className="p-1">
                                <div className="flex flex-col gap-6">
                                    <section className="flex flex-col">
                                        <div className="flex items-center gap-1">
                                            <div className="w-4 h-3 rounded-[4px] bg-mainBlue" />
                                            <p className="text-weirdBlack whitespace-nowrap text-[0.9vw]">Antigo testamento</p>
                                        </div>
                                        <p className="text-weirdBlack text-[1vw] whitespace-nowrap"><span className="font-semibold text-weirdBlack">
                                            {
                                                numOfChaptersOldTestament > 9999 ? '+9999' : numOfChaptersOldTestament
                                            }
                                        </span> Capítulos lidos</p>
                                    </section>
                                    <section className="flex flex-col">
                                        <div className="flex items-center gap-1">
                                            <div className="w-4 h-3 rounded-[4px] bg-mainPink" />
                                            <p className="text-weirdBlack whitespace-nowrap text-[0.9vw]">Novo testamento</p>
                                        </div>
                                        <p className="text-weirdBlack text-[1vw] whitespace-nowrap"><span className="font-semibold text-weirdBlack">
                                            {
                                                numOfChaptersNewTestament > 9999 ? '+9999' : numOfChaptersNewTestament
                                            }
                                        </span> Capítulos lidos</p>
                                    </section>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex-1 bg-white rounded-lg">
                        <header className="w-full flex justify-between gap-5 p-2 px-3">
                            <h4 className="font-semibold text-weirdBlack">Capítulos lidos por mês</h4>
                            <div className="flex gap-3  items-center">
                                <span className="flex gap-1 text-md items-center">
                                    <div className="w-2 h-2 rounded-full  bg-mainPink"></div>
                                    Novo Testamento
                                </span>
                                <span className="flex gap-1 text-md items-center">
                                    <div className="w-2 h-2 rounded-full bg-mainBlue"></div>
                                    Antigo Testamento
                                </span>
                            </div>
                        </header>
                        <DashboardGeneralChapterPerMonthChart />
                    </div>
                </section>
                <section className="flex flex-1 gap-1 bg-white rounded-lg p-2">
                    <div className="flex w-[23vw] relative justify-center gap-3 items-center">
                        <h4 className="absolute top-0 left-0 whitespace-nowrap font-semibold text-weirdBlack">Horas de leitura</h4>
                        <section className="relative w-full h-full">
                            <DashboardGeneralHourChart newTestamentHour={Number(((newTestamentHourReadings) / 60).toFixed(2))} oldTestamentHour={Number(((oldTestamentHourReadings) / 60).toFixed(2))} />
                            <Image src={Logo} alt="Logo do Planner" width={30} height={30} className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2" />
                            <p className="absolute flex gap-1 max-w-[calc(140%)] overflow-hidden bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap">
                                <span className="font-semibold text-weirdBlack max-w-[calc(140%)] overflow-hidden whitespace-nowrap text-ellipsis">
                                    {(Number(((newTestamentHourReadings) / 60)) + Number(((oldTestamentHourReadings) / 60))).toFixed(2)}
                                </span>
                                <span className="font-semibold text-weirdBlack">hrs</span>
                            </p>
                        </section>
                        <div className="">
                            <div className="flex flex-col pb-3 justify-between items-center">
                                <section className="flex items-center gap-1">
                                    <div className="w-4 h-3 bg-mainBlue rounded-[4px]" />
                                    <p className="text-sm whitespace-nowrap text-weirdBlack">Antigo testamento</p>
                                </section>
                                <span className="text-weirdBlack font-semibold">{((oldTestamentHourReadings) / 60).toFixed(2)}</span>
                            </div>
                            <div className="flex flex-col w-full justify-between items-center">
                                <section className="flex items-center gap-1">
                                    <div className="w-4 h-3 bg-mainPink rounded-[4px]" />
                                    <p className="text-sm whitespace-nowrap text-weirdBlack">Novo testamento</p>
                                </section>
                                <span className="text-weirdBlack font-semibold">{((newTestamentHourReadings) / 60).toFixed(2)}</span>
                            </div>
                        </div>
                    </div>
                    {/*<div className="h-full w-[1px] bg-black" />*/}
                    <div className="flex-1 flex flex-col justify-between px-4">
                        <header>
                            <h4 className="font-semibold text-weirdBlack">Minutos de leitura mensal</h4>
                        </header>
                        <DashboardGeneralReadingPerMonthChart />
                    </div>
                </section>
            </main >
        </>
    )

}

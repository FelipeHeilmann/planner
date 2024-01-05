import Image from "next/image";
import { Album, Book, Brain, HelpingHand, Pencil } from "lucide-react";
import { TUserData } from "../../../../types/user-data-type";
import { TBooksCompleted } from "../../../../types/readings-types";
import ScoreDesktopCharacterChange from "./scoreDesktopCharacterChange";
import { TLevelsInfo } from "../../../../types/level-types";
import { axiosInstanceClient } from "@/libs/axiosAPICaller";
import { cookies } from "next/headers";
import ScoreDesktopToggleColor from "./scoreDesktopToggleColor";
import dynamic from "next/dynamic";

type Props = {
    userData: TUserData,
    booksCompleted: TBooksCompleted,
}

export default async function ScoreDesktop({ userData, booksCompleted }: Props) {

    let levelsInfo: null | TLevelsInfo = null
    try {
        const { data } = await axiosInstanceClient.get('/levels',
            { headers: { Authorization: `Bearer ${cookies().get('token')?.value}` } }) as { data: TLevelsInfo }
        levelsInfo = data
    } catch (err) {
        console.error('err score desktop: ' + err)
    }

    const levelListConst = levelsInfo && levelsInfo.sort((a, b) => a.id - b.id)

    const part = levelListConst && (userData.points - levelListConst[userData.level.id - 1].minPoints)
    const final = levelListConst && levelListConst[userData.level.id].minPoints
    const percentage = part && final && (((part / final) * 100).toFixed().toString())

    const setProgressBar = (percentage: number) => {
        if (percentage <= 0) return 0
        if (percentage <= 7) return 7
        if (percentage >= 100) return 100
        return percentage
    }
    const booksCompletedValue = booksCompleted.map(item => item.completed).reduce((acc, curr) => acc + curr, 0)
    const tableContent = [
        {
            Icon: Book,
            text: 'Capítulos lidos',
            points: userData.readings
        },
        {
            Icon: Pencil,
            text: 'Devocionals',
            points: userData.devotionals
        },
        {
            Icon: HelpingHand,
            text: 'Orações',
            points: userData.prayers
        },
        {
            Icon: Brain,
            text: 'Versículos memorizados',
            points: userData.memorizations,
        },
        {
            Icon: Album,
            text: 'Bônus livros concluídos',
            points: booksCompletedValue
        },
    ] as const

    const DynamicScoreDesktopModal = dynamic(() => import('./scoreDesktopModal'))

    return (
        <main className={`mx-2 hidden lg:flex w-full h-[89vh] relative isolate overflow-hidden  rounded-lg`}>
            {/* Toggle color compo*/}
            <ScoreDesktopToggleColor whichElement="bgGradient" />
            <section className="w-[40%] flex flex-col justify-between p-3 pt-5">
                <div className="w-full flex justify-center">
                    <div className="bg-zinc-100/30 text-white w-fit flex items-center gap-4 p-2 px-8 rounded">
                        <span className="text-3xl font-semibold">{userData.level.id}</span>
                        <span className="text-xl font-light">Nível {userData.level.name}</span>
                    </div>
                </div>

                <div className="flex justify-center h-[63vh]">
                    <Image src={userData.level.imageUrl} alt="Personagem que representa o nível do usuário" width={800} height={800} className="w-[40vw] object-contain" />
                </div>

                <div className="w-full flex justify-center h-full items-center text-center text-zinc-800">
                    <p className="w-[calc(100%-30px)] text-sm">
                        {userData.level.description}
                    </p>
                </div>
            </section>

            <section className="flex flex-col rounded-l-[44px] bg-zinc-100/40 flex-1 h-full">
                <div className="w-full p-4">
                    <section className="flex pl-4 justify-between w-full">
                        <div className="flex-1 flex mt-5 gap-4 items-end text-white">
                            <p className="text-lg">Pontuação total</p>
                            <div className="flex items-end">
                                <span className="text-4xl">
                                    {userData.prayers === 0 && userData.memorizations === 0
                                        && userData.readings === 0 && userData.devotionals === 0 &&
                                        booksCompletedValue === 0 ? 0 :
                                        userData.points
                                    }</span>
                                <span className="">
                                    {
                                        userData.points > 1 ? 'pontos'
                                            : userData.points == 0 ? 'pontos'
                                                : 'ponto'
                                    }
                                </span>
                            </div>
                        </div>
                        <DynamicScoreDesktopModal userData={userData} />
                    </section>
                </div>

                <section className="w-4/5 mx-auto flex">
                    <div className="flex flex-col gap-2 flex-1">
                        {tableContent.map(({ Icon, text }, i) => {
                            return (
                                <div key={i} className="flex w-full justify-between">
                                    <section className="flex w-full gap-2">
                                        <figure className="bg-mainBlue relative isolate overflow-hidden shadow-md rounded-lg w-8 h-8 flex items-center justify-center">
                                            {/* Toggle color compo*/}
                                            <ScoreDesktopToggleColor whichElement="box" />
                                            <Icon color="#fff" className="text-sm" width={20} />
                                        </figure>
                                        <p className="flex-1 flex items-end pb-1 border-b border-weirdBlack">
                                            <span className="w-full text-black">
                                                {text}
                                            </span>
                                        </p>
                                    </section>
                                </div>
                            )
                        })}
                    </div>
                    <div className="flex flex-col justify-between">
                        {tableContent.map(({ points }, i) => {
                            return (
                                <div key={i} className="flex items-end gap-[1px] justify-end">
                                    <span className="min-w-[2.5vw] text-end text-xl">
                                        {points}
                                    </span>
                                    <span className="">
                                        {
                                            points > 1 ? 'pts' : 'pt'
                                        }
                                    </span>
                                </div>
                            )
                        })}
                    </div>
                </section>
                <div className="flex w-5/5 ml-[45px] h-full">
                    <div className="flex flex-col pt-4 w-[40%] mx-auto h-full">
                        <div className="flex flex-col items-center mb-[4vh] text-black">
                            <h2 className="text-black text-center">Pontos no nível atual</h2>
                            <span className="relative text-black text-3xl font-medium">
                                {userData.prayers === 0 && userData.memorizations === 0
                                    && userData.readings === 0 && userData.devotionals === 0 &&
                                    booksCompletedValue === 0 ? 0 :

                                    part?.toString()
                                }
                            </span>
                        </div>
                        <div className="flex w-full h-fit">
                            <div className="relative w-full">
                                <div className="rounded-full h-[3.5vh] overflow-hidden bg-white">
                                    {/* Toggle color compo */}
                                    <ScoreDesktopToggleColor percentage={setProgressBar(Number(percentage))} whichElement="progressBar" />
                                    <span className="text-black text-sm absolute -top-5 right-0">
                                        {
                                            percentage
                                        }%
                                    </span>
                                    <span className="text-black text-sm absolute">Nível {userData.level.id}</span>
                                    <span className="text-black text-sm absolute right-0">Nível
                                        {' '}{
                                            userData.level.id === 10 ? '' : userData.level.id + 1
                                        }
                                    </span>
                                </div>
                            </div>
                        </div>
                        <p className="text-black text-center mt-[5vh] text-sm">
                            <span className="">{
                                userData.level.id === 10 ? ''
                                    : levelListConst![userData.level.id]?.minPoints - part! === 1 ? 'Falta'
                                        : 'Faltam'
                            }
                            </span>
                            {/* Toggle color compo */}
                            <ScoreDesktopToggleColor part={part!} levelListConst={levelListConst} userData={userData} whichElement="text" />
                            <span className="">
                                {' '}{
                                    userData.level.id === 10 ? '' : 'para o próximo nível'
                                }
                            </span>
                        </p>
                    </div>
                    <ScoreDesktopCharacterChange levelsListProp={levelListConst!} userData={userData} />
                </div>
            </section>
        </main>
    )
}

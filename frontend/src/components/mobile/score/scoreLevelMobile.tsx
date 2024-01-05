"use client"
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useContext, useEffect, useState } from "react";
import { FetchUserCountData } from "@/api/fetchUserCountData";
import { FetchLevels } from "@/api/fetchLevels";
import { ThemeContext } from "@/context/themeContex";
import { EThemeColor } from "../../../../types/enums-color-theme";

enum EWhere {
    ToRight = 'to right',
    ToLeft = 'to left'
}

export default function LevelMobile() {

    const { themeValue } = useContext(ThemeContext)

    // TODO: Refactor most logic -> get rid of some states 
    const [levelsList, setLevelsList] = useState<any[]>()
    const [levelId, setLevelId] = useState<number>()
    const [currentLevel, setCurrentLevel] = useState<number>()
    const [currentPoints, setCurrentPoints] = useState<number>()
    const [percentage, setPercentage] = useState<string>()
    const [currentNextLevel, setCurrentNextLevel] = useState<number>()
    const [currentPointsInLevel, setCurrentPointsInLevel] = useState<string>()

    const fetchData = async () => {

        const { points, level } = await FetchUserCountData()
        const levelsInfo = await FetchLevels()

        // TODO: Refactor most logic -> get rid of some states 
        setLevelId(level.id)
        setCurrentPoints(points)
        setCurrentLevel(level.id)
        setCurrentNextLevel(level.id + 1)

        const levelListConst = levelsInfo.sort((a, b) => a.id - b.id)

        setLevelsList(levelListConst)

        const part = points - levelListConst[level.id - 1].minPoints
        setCurrentPointsInLevel(part.toFixed().toString())
        const final = levelListConst[level.id].minPoints
        setPercentage(((part / final) * 100).toFixed().toString())
    }

    const moveCharacter = (where: EWhere) => {
        where === EWhere.ToRight ? setLevelId(prev => prev as number + 1) : setLevelId(prev => prev as number - 1)
    }

    const setProgressBar = (percentage: number) => {
        if (percentage <= 3) return 3
        if (percentage >= 100) return 100
        return percentage
    }

    useEffect(() => {
        fetchData()
    }, [])

    return levelId && levelsList && currentPoints && percentage && (
        <>
            <main className={`${themeValue === EThemeColor.Blue ? 'bg-mainBlue' : 'bg-mainPink'} lg:hidden w-screen min-w-iphoneSEWidth h-[calc(100vh-96px)] transition-all relative -mb-[65px] flex flex-col items-center mt-[96px]`}>
                {/* To fill background */}
                <div className="absolute -top-10 w-screen bg-white h-12 -z-10" />
                {/* Name of character and minimum points */}
                <div className="w-full grid grid-cols-3 justify-items-center px-2 py-5">
                    <div />
                    <h2 className="text-3xl font-light text-white pl-1">{levelsList[levelId - 1].name}</h2>
                    <div className="opacity-70 flex flex-col gap-1 items-center justify-self-end">
                        <span className="w-16 py-1 px-2 rounded-lg bg-white text-white bg-opacity-30  flex justify-center items-center">
                            {levelsList[levelId - 1].minPoints}
                        </span>
                        <p className="text-[13px] text-white font-light">Pontos mínimos</p>
                    </div>
                </div>
                {/* Card */}
                <section className="relative flex flex-col items-center mb-[55px] mt-[44vh] bg-white/30 w-screen min-w-iphoneSEWidth h-full rounded-t-[61px]">
                    {/* Main character */}
                    <figure className="absolute z-10 -top-[365px]">
                        {
                            levelsList && levelId &&
                            <Image priority className="w-[380px] aspect-square object-contain" width={180} height={170} src={levelsList[levelId - 1]?.imageUrl && levelsList[levelId - 1]?.imageUrl} alt="Personagem Bíblico que representa o atual nível do usuário" />
                        }
                    </figure>
                    {/* Arrows */}
                    <section className="absolute z-50 -top-[270px] w-screen min-w-iphoneSEWidth h-fit flex justify-between px-3">
                        <div className="relative">
                            <button
                                onClick={_ => moveCharacter(EWhere.ToLeft)}
                                className={`${levelId === 1 ? 'hidden' : ''} absolute bg-white w-10 aspect-square flex justify-center items-center rounded-full`}
                            >
                                <ChevronLeft />
                            </button>
                        </div>
                        <div className="relative">
                            <button
                                onClick={_ => moveCharacter(EWhere.ToRight)}
                                className={`${levelId === levelsList?.length ? 'hidden' : ''} bg-white w-10 aspect-square flex justify-center items-center rounded-full`}
                            >
                                <ChevronRight />
                            </button>
                        </div>
                    </section>
                    {/* Background characters */}
                    <section className="opacity-60 absolute -top-[185px] w-screen min-w-iphoneSEWidth h-fit flex justify-between">
                        <figure className="flex justify-start pr-24">
                            {levelsList && levelId && levelId !== 1 &&
                                <Image className={`${levelId === 1 ? 'hidden' : ''} transition-all w-auto aspect-square object-contain`} width={140} height={90} src={levelId === 1 ? '/' : levelsList[levelId - 2]?.imageUrl && levelsList[levelId - 2]?.imageUrl} alt="Personagem Bíblico que representa o nível anterior do usuário" />
                            }
                        </figure>
                        <figure className="flex justify-end">
                            {levelsList && levelId && levelId !== levelsList?.length - 1 &&
                                <Image className={`${levelId === levelsList?.length ? 'hidden' : ''} transition-all w-auto aspect-square object-contain`} width={140} height={90} src={levelId === levelsList?.length ? '/' : levelsList[levelId]?.imageUrl && levelsList[levelId]?.imageUrl} alt="Personagem Bíblico que representa o próximo nível do usuário" />
                            }
                        </figure>
                    </section>
                    {/* Points + progress bar */}
                    <div className="flex flex-col items-center pt-[2vh] text-black">
                        <span className="text-black text-[2vh]">Pontos no nível atual</span>
                        <span className="relative text-black text-[4vh] font-semibold">
                            {
                                currentPointsInLevel
                            }
                            <span className="absolute text-sm bottom-2">pts</span>
                        </span>
                    </div>
                    <div className="flex items-center mb-5 justify-center w-full h-full">
                        <div className="relative px-10 py-[1vh] w-full">
                            <div className="rounded-full h-[3.5vh] bg-white">
                                <div style={{ width: `${setProgressBar(Number(percentage))}%` }} className={`${themeValue === EThemeColor.Blue ? 'bg-mainBlue border-mainBlue' : 'bg-mainPink border-mainPink'} border-2 transition-all h-full rounded-3xl`} />
                                <span className="text-black text-sm absolute -top-4 right-[35px]">
                                    {
                                        Number(percentage) >= 100 ? '100' : Number(percentage) <= 1 ? 1 : percentage
                                    }%
                                </span>
                                <span className="text-black text-sm absolute">Nível {currentLevel}</span>
                                <span className="text-black text-sm absolute right-[35px]">Nível
                                    {
                                        ' ' + currentNextLevel
                                    }
                                </span>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </>
    )
}

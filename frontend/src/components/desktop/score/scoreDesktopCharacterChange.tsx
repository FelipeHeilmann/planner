"use client"
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import { useContext, useEffect, useState } from "react";
import { TLevelsInfo } from "../../../../types/level-types";
import { TUserData } from "../../../../types/user-data-type";
import { ThemeContext } from "@/context/themeContex";
import { EThemeColor } from "../../../../types/enums-color-theme";

enum EWhere {
    ToRight = 'to right',
    ToLeft = 'to left'
}

type Props = {
    levelsListProp: TLevelsInfo,
    userData: TUserData,
}

export default function ScoreDesktopCharacterChange({ levelsListProp, userData }: Props) {

    const [levelsList, setLevelsList] = useState<TLevelsInfo>()
    const [levelId, setLevelId] = useState<number>()

    const { themeValue } = useContext(ThemeContext)

    const fetchData = async () => {

        const { level } = userData
        const levelsInfo = levelsListProp

        setLevelId(level.id)
        const levelListConst = levelsInfo.sort((a, b) => a.id - b.id)
        setLevelsList(levelListConst)
    }

    const moveCharacter = (where: EWhere) => {
        where === EWhere.ToRight ? setLevelId(prev => prev as number + 1) : setLevelId(prev => prev as number - 1)
    }

    useEffect(() => {
        fetchData()
    }, [])

    return levelsList && levelId && (
        <>
            <div className="relative w-[60%] h-full">
                <h2 className="text-black p-4 text-center">Próximos níveis</h2>

                {/* Min points box */}
                <div className="right-10 top-10 absolute flex items-center flex-col gap-[1px]">
                    <div className={`${themeValue === EThemeColor.Blue ? 'bg-mainBlue' : 'bg-mainPink'} w-fit text-sm text-[10px] px-3 rounded text-white`}>
                        {levelsList[levelId].minPoints}
                    </div>
                    <span className="text-black text-[10px]">Pontos mínimos</span>
                </div>

                {/* Arrows */}
                <section className="absolute z-50 w-3/4 left-1/2 -translate-x-1/2 top-20 h-fit flex justify-between">
                    <div className="relative">
                        <button
                            tabIndex={2}
                            onClick={_ => moveCharacter(EWhere.ToLeft)}
                            className={` ${levelId === 1 ? 'hidden' : ''} hover:bg-white/50 absolute bg-white w-8 aspect-square flex justify-center items-center rounded-full`}
                        >
                            <ChevronLeft />
                        </button>
                    </div>
                    <div className="relative">
                        <button
                            tabIndex={3}
                            onClick={_ => moveCharacter(EWhere.ToRight)}
                            className={`${levelsList?.length && levelId === levelsList?.length - 1 ? 'hidden' : ''} hover:bg-white/50 bg-white w-8 aspect-square flex justify-center items-center rounded-full`}
                        >
                            <ChevronRight />
                        </button>
                    </div>
                </section>

                {/* Main character */}
                <span className="absolute left-1/2 -translate-x-1/2 w-fit flex justify-center top-9">
                    {levelsList && levelId &&
                        levelsList[levelId].name
                    }
                </span>
                <figure className="absolute left-1/2 -translate-x-1/2 w-fit flex justify-center top-11">
                    {levelsList && levelId &&
                        <Image src={levelsList[levelId - 1]?.imageUrl && levelsList[levelId]?.imageUrl} alt="Personagem que representa o próximo nível usuário" width={150} height={200} className="object-contain w-[150px] h-[200px]" />
                    }
                </figure>

                {/* Background characters */}
                <section className="opacity-60 absolute bottom-0 h-fit w-full flex justify-between">
                    <figure className="flex justify-start">
                        {levelsList && levelId && levelId !== 1 &&
                            <Image className={`${levelId === 1 ? 'hidden' : ''} w-auto aspect-square object-contain`} width={100} height={90} src={levelId === 1 ? '/' : levelsList[levelId - 1]?.imageUrl && levelsList[levelId - 1]?.imageUrl} alt="Personagem que representa o nível atual do usuário" />
                        }
                    </figure>
                    <figure className="flex justify-end">
                        {levelsList && levelId && levelId !== levelsList?.length - 1 &&
                            < Image className={`${levelsList.length && levelId === levelsList?.length - 1 ? 'hidden' : ''} w-auto aspect-square object-contain`} width={100} height={90} src={levelId === levelsList?.length - 1 ? '/' : levelsList[levelId + 1]?.imageUrl && levelsList[levelId + 1]?.imageUrl} alt="Personagem que representa o dois níveis à frent do usuário" />
                        }
                    </figure>
                </section>
            </div>
        </>
    )
}

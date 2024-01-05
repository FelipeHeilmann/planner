"use client"
import { ThemeContext } from "@/context/themeContex"
import { useContext } from "react"
import { EThemeColor } from "../../../../types/enums-color-theme"
import { TUserData } from "../../../../types/user-data-type"

type Props = {
    whichElement: 'bgGradient' | 'box' | 'progressBar' | 'text',
    percentage?: number,
    userData?: TUserData,
    part?: number,
    levelListConst?: any,
}

export default function ScoreDesktopToggleColor({ whichElement, percentage, userData, levelListConst, part }: Props) {

    const { themeValue } = useContext(ThemeContext)

    switch (whichElement) {
        case 'bgGradient':
            return <div className={`absolute -z-10 w-full h-full ${themeValue === EThemeColor.Blue ? 'bg-gradient-to-b from-mainBlue' : 'bg-gradient-to-b from-mainPink'} `} />
        case 'box':
            return <div className={`absolute -z-10 w-full h-full ${themeValue === EThemeColor.Blue ? 'bg-mainBlue' : 'bg-mainPink'}`} />
        case 'progressBar':
            return <div style={{ width: `${percentage}%` }} className={`${themeValue === EThemeColor.Blue ? 'bg-mainBlue border-mainBlue' : 'bg-mainPink border-mainPink'} ${percentage === 0 && 'border-white bg-white'} border-2  transition-all h-full rounded-3xl`} />
        case 'text':
            return <span className={`${themeValue === EThemeColor.Blue ? 'text-mainBlue' : 'text-mainPink'}`}>
                {' '}{
                    userData?.level.id === 10 ? 'Parabéns você chegou no último nível até agora!'
                        : levelListConst[userData!.level.id].minPoints - part! > 1 ? levelListConst[userData!.level.id].minPoints - part! + ' pontos'
                            : levelListConst[userData!.level.id].minPoints - part! + ' ponto'
                }
            </span>
    }
}

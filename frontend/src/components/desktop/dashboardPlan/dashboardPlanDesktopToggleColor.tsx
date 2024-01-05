"use client"
import { ThemeContext } from "@/context/themeContex"
import { useContext } from "react"
import { EThemeColor } from "../../../../types/enums-color-theme"

type Props = {
    whichElement: 'icon' | 'box' | 'progressBar',
    chapterReadPercentage?: string,
}
export default function DashboardPlanDesktopToggleColor({ whichElement, chapterReadPercentage }: Props) {

    const { themeValue } = useContext(ThemeContext)

    switch (whichElement) {
        case 'icon':
            return <div className={`absolute -z-10 ${themeValue === EThemeColor.Blue ? 'bg-mainBlue' : 'bg-mainPink'} w-full h-full`} />
        case 'box':
            return <div className={`absolute top-0 left-0 -z-10 rounded-lg ${themeValue === EThemeColor.Blue ? 'bg-dashboardCard' : 'bg-dashboardCardPink'} w-full h-full`} />
        case 'progressBar':
            return <div style={{
                width: `${Number(chapterReadPercentage) > 100 ? 100 : Number(chapterReadPercentage) < 5 ? 5 : chapterReadPercentage}%`
            }} className={`${themeValue === EThemeColor.Blue ? 'bg-mainBlue' : 'bg-mainPink'} rounded-lg h-full`}></div>
    }

}

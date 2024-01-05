"use client"
import { useContext } from "react"
import { ThemeContext } from "@/context/themeContex"
import { EThemeColor } from "../../../../types/enums-color-theme"

type Props = {
    whichElement: 'bgCardUserImage' | 'bgTableHeader'
}

export default function HomeDesktopToggleTheme({ whichElement }: Props) {

    const { themeValue } = useContext(ThemeContext)

    switch (whichElement) {
        case 'bgCardUserImage':
            return <div className={`absolute -z-10 w-full h-full rounded-xl ${themeValue === EThemeColor.Blue ? 'bg-dashboardCard' : 'bg-dashboardCardPink'} `} />
        case 'bgTableHeader':
            return <div className={`absolute -z-10 w-full h-full rounded-t-lg ${themeValue === EThemeColor.Blue ? 'bg-mainBlue' : 'bg-mainPink'}`} />
    }
}

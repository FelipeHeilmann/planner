"use client"
import { ThemeContext } from "@/context/themeContex"
import { useContext } from "react"
import { EThemeColor } from "../../../../types/enums-color-theme"

type Props = {
    whichElement: 'bg' | 'border'
}

export default function MenuMobileToggleColor({ whichElement }: Props) {

    const { themeValue } = useContext(ThemeContext)

    switch (whichElement) {
        case "bg":
            return <div className={`absolute w-full h-full -z-10 ${themeValue === EThemeColor.Blue ? 'bg-dashboardCard' : 'bg-dashboardCardPink'}`} />
        case "border":
            return <div className={`absolute rounded-full w-[80px] h-[80px] -z-10 top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 border-[3px] ${themeValue === EThemeColor.Blue ? 'border-mainBlue' : 'border-mainPink'}`} />
    }

}

"use client"

import { ThemeContext } from "@/context/themeContex"
import { useContext } from "react"
import { EThemeColor } from "../../../../types/enums-color-theme"

export default function DashboardGeneralToggleTheme() {

    const { themeValue } = useContext(ThemeContext)

    return (
        <div className={`absolute -z-10 w-full h-full rounded-lg ${themeValue === EThemeColor.Blue ? 'bg-dashboardCard' : 'bg-dashboardCardPink'}`} />
    )
}

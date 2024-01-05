"use client"

import { ThemeContext } from "@/context/themeContex"
import { useContext } from "react"
import { EThemeColor } from "../../../../types/enums-color-theme"

type Props = {
    whichElement: "icon"
}
export default function DashboardGeneralDesktopToggleColor({ whichElement }: Props) {

    const { themeValue } = useContext(ThemeContext)

    switch (whichElement) {
        case 'icon':
            return <div className={`absolute -z-10 w-full h-full ${themeValue === EThemeColor.Blue ? 'bg-mainBlue' : 'bg-mainPink'}`} />
    }
}

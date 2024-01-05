"use client"
import { useContext, useEffect } from "react"
import { EThemeColor, theme } from "../../types/enums-color-theme"
import { useLocalStorage } from "./useLocalStorage"
import { ThemeContext } from "@/context/themeContex"
import { EnumsUrlPath } from "../../types/enums-url-path"
import { axiosInstace } from "@/libs/axiosAPICaller"
import Cookies from "js-cookie"

type Prop = {
    themeProp: EThemeColor
}

export default function useToggleTheme({ themeProp }: Prop) {

    const { getItem, setItem } = useLocalStorage(theme)

    const { themeValue: whichTheme, setThemeValue: setWhichTheme } = useContext(ThemeContext)

    const toggleHandler = async () => {
        setWhichTheme((prev) => prev == EThemeColor.Pink ? EThemeColor.Blue : EThemeColor.Pink)
        if (getItem() == EThemeColor.Blue) {
            setItem(EThemeColor.Pink)
            setWhichTheme(EThemeColor.Pink)
            axiosInstace.masterReq({ url: EnumsUrlPath().ToggleTheme, headerAuth: `Bearer ${Cookies.get('token')}` })
                .catch(err => console.error(err))
            return
        }
        axiosInstace.masterReq({ url: EnumsUrlPath().ToggleTheme, headerAuth: `Bearer ${Cookies.get('token')}` })
            .catch(err => console.error(err))
        setWhichTheme(EThemeColor.Blue)
        setItem(EThemeColor.Blue)
    }

    useEffect(() => {
        setWhichTheme(themeProp)
        setItem(themeProp)
    }, [])


    return { whichTheme, toggleHandler }
}

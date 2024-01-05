"use client"
import { createContext, Dispatch, FC, ReactNode, SetStateAction, useState } from "react";
import { EThemeColor } from "../../types/enums-color-theme";

type TThemeContext = {
    themeValue: EThemeColor
    setThemeValue: Dispatch<SetStateAction<EThemeColor>>
}

export const ThemeContext = createContext<TThemeContext>({
    themeValue: EThemeColor.Blue,
    setThemeValue: () => void {}
})

type Props = {
    children: ReactNode,
    initial?: EThemeColor,
}

export const ThemeContextProvider: FC<Props> = ({ children, initial = EThemeColor.Blue }) => {

    const [themeValue, setThemeValue] = useState(initial)

    return (
        <ThemeContext.Provider value={{ themeValue, setThemeValue }}>
            {children}
        </ThemeContext.Provider>
    )
}


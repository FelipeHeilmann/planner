"use client"
import { EThemeColor } from "../../../../types/enums-color-theme";
import useToggleTheme from "@/hooks/useToggleTheme";

type Props = {
    themeProp: EThemeColor
}

export default function HeaderToggleTheme({ themeProp }: Props) {

    const { toggleHandler, whichTheme } = useToggleTheme({ themeProp })

    return (
        <>
            <button onClick={toggleHandler} className="w-full h-full rounded-3xl absolute z-10 top-0 bottom-0 left-0 right-0" />
            <div className={`transition-all absolute -z-10 cursor-pointer ${whichTheme == EThemeColor.Blue ? 'translate-x-1 bg-mainBlue' : 'translate-x-8 bg-mainPink'} top-1/2 -translate-y-1/2 rounded-full h-4/6 aspect-square`} />
        </>
    )
}

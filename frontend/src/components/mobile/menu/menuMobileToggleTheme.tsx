"use client"
import useToggleTheme from "@/hooks/useToggleTheme"
import { EThemeColor } from "../../../../types/enums-color-theme"
import { useState } from "react"
import { useRouter } from "next/navigation"

type Prop = {
    themeProp: any
}

export default function MenuMobileToggleTheme({ themeProp }: Prop) {

    const router = useRouter()

    const { whichTheme, toggleHandler } = useToggleTheme({ themeProp })

    const [disabled, setDisabled] = useState<boolean>(false)

    const delay = async (ms: number = 350) => {
        setDisabled(true)
        await new Promise(resolve => setTimeout(resolve, ms))
            .catch(err => console.error(err))
        setDisabled(false)
    }

    const clickHandler = async () => {
        await delay()
        await toggleHandler()
            .then(_ => router.refresh())
            .catch(err => console.error(err))
    }

    return (
        <>
            <div className={`w-3/4 ${whichTheme === EThemeColor.Blue ? 'bg-mainBlue' : 'bg-mainPink'} p-2 gap-1 flex rounded-3xl justify-between mb-[65px]`}>
                <button
                    disabled={disabled}
                    onClick={clickHandler}
                    className={`w-1/2 p-1 ${whichTheme === EThemeColor.Blue ? 'bg-white' : 'bg-mainPink'} rounded-full flex items-center gap-2`}
                >
                    <div className={`w-[18px] h-[18px] ${whichTheme === EThemeColor.Pink ? 'bg-white' : 'bg-mainBlue'} rounded-full`} />
                    <p className={`${whichTheme === EThemeColor.Blue ? 'text-black' : 'text-white'}`} >Azul</p>
                </button>
                <button
                    disabled={disabled}
                    onClick={clickHandler}
                    className={`w-1/2 p-1 ${whichTheme == EThemeColor.Blue ? 'bg-mainBlue' : 'bg-white'} rounded-full flex items-center gap-2`}
                >
                    <div className={`w-[18px] h-[18px] ${whichTheme === EThemeColor.Blue ? 'bg-white' : 'bg-mainPink'} rounded-full`} />
                    <p className={`${whichTheme === EThemeColor.Pink ? 'text-black' : 'text-white'}`} >Rosa</p>
                </button>
            </div>
        </>
    )
}

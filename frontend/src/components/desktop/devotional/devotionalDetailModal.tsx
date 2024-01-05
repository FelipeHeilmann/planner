"use client"
import { useContext, useEffect, useLayoutEffect, useRef, useState } from "react"
import Cookies from 'js-cookie'
import { axiosInstanceClient } from "@/libs/axiosAPICaller"
import { TDevotional } from "../../../../types/devotinal-types"
import { modalProps } from "../../../../types/utils-types"
import { X } from "lucide-react"
import { ThemeContext } from "@/context/themeContex"
import { EThemeColor } from "../../../../types/enums-color-theme"

export default function DevotionalDetailMobile({ open, onClose, id }: modalProps) {

    const { themeValue } = useContext(ThemeContext)

    const [devotional, setDevotional] = useState<TDevotional>()

    const ref = useRef<HTMLDialogElement>(null)

    const fetchData = async () => {
        try {
            const { data } = await axiosInstanceClient.get(`/devotionals/${id}`, {
                headers: {
                    Authorization: `Bearer ${Cookies.get('token')}`
                }
            })
            setDevotional(data)
        } catch (err) {
            console.error(err)
        }
    }

    useEffect(() => {
        fetchData()
    }, [])

    useLayoutEffect(() => {
        if (open && !ref.current?.open) {
            ref.current?.showModal()
        } else if (!open && ref.current?.open) {
            ref.current?.close()
        }
    }, [open])

    window.addEventListener("keydown", (e) => {
        if (!open) return
        if (e.key !== 'Escape') return
        onClose()
    })

    return (
        <dialog ref={ref} className="backdrop:bg-black backdrop:opacity-75 rounded-lg">
            <div className="w-[50vw] h-[80vh] bg-white rounded-lg">
                <header className={`flex items-center justify-between p-3 ${themeValue === EThemeColor.Blue ? 'bg-dashboardCard' : 'bg-dashboardCardPink'} `}>
                    <h2 className="text-white text-2xl font-semibold">Detalhe Devocional</h2>
                    <button onClick={onClose} className="w-8 h-8 rounded-full flex justify-center items-center bg-white bg-opacity-40 text-white text-xl font-semibold">
                        <X width={20} />
                    </button>
                </header>
                <div className="flex flex-col w-full gap-5">
                    <div className="p-4 flex flex-col gap-2">
                        <div className="w-full flex items-center gap-1 ">
                            <span className="block w-[50px] text-center text-3xl text-white font-bold bg-mainBlue p-2 rounded-xl">T</span>
                            <p className="text-base font-semibold">ema abordado</p>
                        </div>
                        <p className="font-light">{devotional?.subject}</p>
                    </div>

                    <div className="p-4 flex flex-col gap-2">
                        <div className="w-full flex items-center gap-1 ">
                            <span className="block w-[50px] text-center text-3xl text-white font-bold bg-mainBlue p-2 rounded-xl">O</span>
                            <p className="text-base font-semibold">que eu aprendi com essa pasagem?</p>
                        </div>
                        <p className="font-light">{devotional?.learned}</p>
                    </div>

                    <div className="p-4 flex flex-col gap-2">
                        <div className="w-full flex items-center gap-1 ">
                            <span className="block w-[50px] text-center text-3xl text-white font-bold bg-mainBlue p-2 rounded-xl">C</span>
                            <p className="text-base font-semibold">omo aplicar em minha vida?</p>
                        </div>
                        <p className="font-light">{devotional?.application}</p>
                    </div>
                </div>
            </div>
        </dialog >
    )
}

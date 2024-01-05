"use client"
import { ThemeContext } from "@/context/themeContex"
import { Album, Book, Brain, HelpingHand, Pencil } from "lucide-react";
import { X } from "lucide-react"
import { useContext, useLayoutEffect, useRef, useState } from "react"
import { EThemeColor } from "../../../../types/enums-color-theme"
import { TUserData } from "../../../../types/user-data-type";

const tableContent = [
    {
        Icon: Book,
        text: 'Capítulos lidos',
        points: 1,
    },
    {
        Icon: Pencil,
        text: 'Devocionals',
        points: 1,
    },
    {
        Icon: HelpingHand,
        text: 'Orações',
        points: 1,
    },
    {
        Icon: Brain,
        text: 'Versículos memorizados',
        points: 1,
    },
    {
        Icon: Album,
        text: 'Bônus livros concluídos',
        points: 4,
    },
] as const

type Props = {
    userData: TUserData
}
export default function ScoreDesktopModal({ userData }: Props) {

    const ref = useRef<HTMLDialogElement>(null)

    const [open, setOpen] = useState<boolean>(false)

    const { themeValue } = useContext(ThemeContext)

    useLayoutEffect(() => {
        if (open && !ref.current?.open) {
            ref.current?.showModal()
        } else if (!open && ref.current?.open) {
            ref.current?.close()
        }

        window.addEventListener("keydown", (e) => {
            if (!open) return
            if (e.key !== 'Escape') return
            setOpen(false)
        })
    }, [open])

    return (
        <>
            {/* Button to open modal */}
            <div className="flex items-center mt-1 mr-12">
                <button
                    tabIndex={1}
                    onClick={_ => setOpen(true)}
                    type="button"
                    className="h-fit"
                >
                    <div className="relative flex flex-col gap-1 group">
                        <figure className="group-hover:bg-white/50 flex justify-center items-center w-8 h-8 bg-white rounded-full">
                            ?
                        </figure>
                        <span className="absolute whitespace-nowrap text-[10px] -bottom-4 -left-4">Como pontuar?</span>
                    </div>
                </button>
            </div>

            {/* Actual modal */}
            <dialog ref={ref} className="backdrop:bg-black backdrop:opacity-75 rounded-lg">
                <section className="w-[40vw] h-[60vh] overflow-hidden bg-white rounded-lg">
                    <header className={`flex items-center justify-between p-3 ${themeValue === EThemeColor.Blue ? 'bg-dashboardCard' : 'bg-dashboardCardPink'}`}>
                        <h2 className="text-white text-2xl font-semibold">Como pontuar?</h2>
                        <button onClick={_ => setOpen(false)} className="w-8 h-8 rounded-full bg-white bg-opacity-40 hover:opacity-75 flex items-center justify-center text-white text-xl font-semibold">
                            <X width={20} />
                        </button>
                    </header>
                    <div className="w-full h-[50vh] flex items-center">
                        <section className="w-4/5 mx-auto flex">
                            <div className="flex flex-col gap-3 flex-1">
                                {tableContent.map(({ Icon, text }, i) => {
                                    return (
                                        <div key={i} className="flex w-full justify-between">
                                            <section className="flex w-full gap-2">
                                                <figure className={`${themeValue === EThemeColor.Blue ? 'bg-mainBlue' : 'bg-mainPink'} shadow-md rounded-lg w-10 h-10 flex items-center justify-center`}>
                                                    <Icon color="#fff" className="" width={30} />
                                                </figure>
                                                <p className="flex-1 flex items-end pb-1 border-b border-weirdBlack">
                                                    <span className="w-full text-black">
                                                        {text}
                                                    </span>
                                                </p>
                                            </section>
                                        </div>
                                    )
                                })}
                            </div>
                            <div className="flex flex-col justify-between">
                                {tableContent.map(({ points }, i) => {
                                    return (
                                        <div key={i} className="flex items-end gap-[1px] justify-end">
                                            <span className="min-w-[2.5vw] text-end text-xl">
                                                {points}
                                            </span>
                                            <span className="">
                                                {
                                                    points > 1 ? 'pts' : 'pt'
                                                }
                                            </span>
                                        </div>
                                    )
                                })}
                            </div>
                        </section>
                    </div>
                </section>
            </dialog>
        </>
    )
}

"use client"
import { Album, Book, Brain, HelpingHand, Pencil, ChevronUp } from "lucide-react";
import Image from "next/image";
import { useContext, useState } from "react";
import { TBooksCompleted } from "../../../../types/readings-types";
import { ThemeContext } from "@/context/themeContex";
import { EThemeColor } from "../../../../types/enums-color-theme";

type TUserData = {
    level: {
        id: number,
        name: string,
        description: string,
        minPoints: number,
        imageUrl: string
    }
    readings: number,
    devotionals: number,
    prayers: number,
    points: number,
    memorizations: number,
}

export default function ScoreMobileExpand({ userData, booksCompleted }: { userData: TUserData, booksCompleted: TBooksCompleted }) {

    const { themeValue } = useContext(ThemeContext)

    const [isOpen, setIsOpen] = useState<boolean>(false)
    const [changeArrow, setChangeArrow] = useState<boolean>(false)
    const [changeQuestionMark, setChangeQuestionMark] = useState<boolean>(false)

    const [booksCompletedValue] = useState<number>(booksCompleted.map(item => item.completed).reduce((acc, curr) => acc + curr, 0))

    const onClickExpandHowToScore = () => {
        isOpen ? setIsOpen(false) : setIsOpen(true)
        if (!changeQuestionMark && !isOpen) changeQuestionMark ? setChangeQuestionMark(false) : setChangeQuestionMark(true)
        setChangeArrow(false)
    }

    const onClickExpandPointDetails = () => {
        isOpen ? setIsOpen(false) : setIsOpen(true)
        if (!changeArrow && !isOpen) changeArrow ? setChangeArrow(false) : setChangeArrow(true)
        setChangeQuestionMark(false)
    }

    return userData && (
        <>
            <figure className={`${isOpen ? 'h-2/5' : 'h-4/6'} transition-all`}>
                <Image priority src={userData.level.imageUrl} height={400} width={400} className='h-full w-auto object-cover' alt='imagem' />
            </figure>
            <div className={`${themeValue === EThemeColor.Blue ? 'bg-mainBlue' : 'bg-mainPink'} w-full h-[37vh] max-h-[460px] absolute transition-all ${isOpen ? 'bottom-[40px] border-t-white' : '-bottom-[100px]'} border-2 border-transparent p-3 rounded-t-xl`}>
                <section className="relative grid grid-cols-3 justify-items-center">
                    <div className="flex flex-col items-center justify-center relative -top-2/4">
                        <button
                            onClick={onClickExpandHowToScore}
                            className={`w-7 ${changeQuestionMark && isOpen
                                ? themeValue === EThemeColor.Blue
                                    ? 'bg-mainBlue text-white border-2'
                                    : 'bg-mainPink text-white border-2'
                                : 'bg-white'} transition-all duration-300 aspect-square rounded-full flex items-center justify-center`}
                        >
                            ?
                        </button>
                        <p className="text-[12px] font-light text-white">Como pontuar?</p>
                    </div>

                    <div className='flex flex-col mt-3 items-center'>
                        <h3 className='font-bold text-[3.4vh] text-white'>{userData.points}</h3>
                        <p className='font-light text-md whitespace-nowrap text-white'>Pontuação total</p>
                    </div>

                    <div className="flex flex-col items-center justify-center relative -top-2/4">
                        <button
                            onClick={onClickExpandPointDetails}
                            className={`w-7 ${isOpen ? 'rotate-180 ' : 'rotate-0 '} ${changeArrow && isOpen
                                ? themeValue === EThemeColor.Blue
                                    ? 'bg-mainBlue text-white border-2'
                                    : 'bg-mainPink text-white border-2'
                                : 'bg-white'} transition-all duration-300 aspect-square rounded-full flex items-center justify-center`}
                        >
                            <ChevronUp />
                        </button>
                        <p className="text-[12px] font-light text-white">Detalhes pontos</p>
                    </div>
                </section>

                {isOpen &&
                    <section className="flex flex-col pt-1 gap-[1px] justify-between w-full h-[73%] pb-6 overflow-y-scroll">
                        <div className="text-weirdBlack flex justify-between w-full bg-white h-fit py-1 px-2 rounded-md">
                            <section className="flex gap-4">
                                <figure className={`flex justify-center items-center w-[30px] aspect-square ${themeValue === EThemeColor.Blue ? 'bg-mainBlue' : 'bg-mainPink'} rounded`}>
                                    <Book className="text-white" />
                                </figure>
                                <span className="whitespace-nowrap">
                                    Leituras finalizadas
                                </span>
                            </section>
                            <p className="whitespace-nowrap flex">
                                <span className="block px-1 w-[70px] text-end overflow-x-hidden text-ellipsis whitespace-nowrap">
                                    {
                                        isOpen && changeArrow ? userData.readings : 1
                                    }
                                </span>
                                <span className="">
                                    {
                                        ((isOpen && changeArrow && userData.readings > 1) || (isOpen && changeArrow)) ? 'pts' : 'pt'
                                    }
                                </span>
                            </p>
                        </div>

                        <div className="text-weirdBlack flex justify-between w-full bg-white h-fit py-1 px-2 rounded-md">
                            <section className="flex gap-4">
                                <figure className={`flex justify-center items-center w-[30px] aspect-square ${themeValue === EThemeColor.Blue ? 'bg-mainBlue' : 'bg-mainPink'} rounded`}>
                                    <Pencil className="text-white" />
                                </figure>
                                <span className="whitespace-nowrap">
                                    Devocionais registrados
                                </span>
                            </section>
                            <p className="whitespace-nowrap flex">
                                <span className="block px-1 w-[70px] text-end overflow-x-hidden text-ellipsis whitespace-nowrap">
                                    {
                                        isOpen && changeArrow && userData.devotionals ? userData.devotionals : 1
                                    }
                                </span>
                                <span className="">
                                    {
                                        isOpen && changeArrow && userData.devotionals > 1 ? 'pts' : 'pt'
                                    }
                                </span>
                            </p>
                        </div>

                        <div className="text-weirdBlack flex justify-between w-full bg-white h-fit py-1 px-2 rounded-md">
                            <section className="flex gap-4">
                                <figure className={`flex justify-center items-center w-[30px] aspect-square ${themeValue === EThemeColor.Blue ? 'bg-mainBlue' : 'bg-mainPink'} rounded`}>
                                    <HelpingHand className="text-white" />
                                </figure>
                                <span className="whitespace-nowrap">
                                    Orações registradas
                                </span>
                            </section>
                            <p className="whitespace-nowrap flex">
                                <span className="block px-1 w-[70px] text-end overflow-x-hidden text-ellipsis whitespace-nowrap">
                                    {
                                        isOpen && changeArrow && userData.prayers ? userData.prayers : 1
                                    }
                                </span>
                                <span className="">
                                    {
                                        isOpen && changeArrow && userData.prayers > 1 ? 'pts' : 'pt'
                                    }
                                </span>
                            </p>
                        </div>

                        <div className="text-weirdBlack flex justify-between w-full bg-white h-fit py-1 px-2 rounded-md">
                            <section className="flex gap-4">
                                <figure className={`flex justify-center items-center w-[30px] aspect-square ${themeValue === EThemeColor.Blue ? 'bg-mainBlue' : 'bg-mainPink'} rounded`}>
                                    <Brain className="text-white" />
                                </figure>
                                <span className="whitespace-nowrap">
                                    Versículos memorizados
                                </span>
                            </section>
                            <p className="whitespace-nowrap flex">
                                <span className="block px-1 w-[70px] text-end overflow-x-hidden text-ellipsis whitespace-nowrap">
                                    {
                                        isOpen && changeArrow ? userData.memorizations : 1
                                    }
                                </span>
                                <span className="">
                                    {
                                        isOpen && changeArrow && userData.memorizations > 1 ? 'pts' : 'pt'
                                    }
                                </span>
                            </p>
                        </div>

                        <div className="text-weirdBlack flex justify-between w-full bg-white h-fit py-1 px-2 rounded-md">
                            <section className="flex gap-4">
                                <figure className={`flex justify-center items-center w-[30px] aspect-square ${themeValue === EThemeColor.Blue ? 'bg-mainBlue' : 'bg-mainPink'} rounded`}>
                                    <Album className="text-white" />
                                </figure>
                                <span className="whitespace-nowrap">
                                    Livros concluídos
                                </span>
                            </section>
                            <p className="whitespace-nowrap flex">
                                <span className="block px-1 w-[70px] text-end overflow-x-hidden text-ellipsis whitespace-nowrap">
                                    {
                                        isOpen && changeArrow ?
                                            booksCompletedValue
                                            : 4
                                    }
                                </span>
                                <span className="">
                                    {
                                        (isOpen && changeArrow && booksCompletedValue > 1) || (isOpen && !changeArrow) ?
                                            'pts' : 'pt'
                                    }
                                </span>
                            </p>
                        </div>
                    </section>
                }
            </div>
        </>
    )
}

"use client"
import { useContext, useEffect, useState } from 'react'
import Link from "next/link";
import Cookies from 'js-cookie'
import { Plus } from "lucide-react";
import MemorizationMobileCard from "./memorizationMobileCard";
import { axiosInstanceClient } from '@/libs/axiosAPICaller';
import deleteResource from '@/api/deleteResources';
import finishResource from '@/api/finishResource';
import { ThemeContext } from '@/context/themeContex';
import { EThemeColor } from '../../../../types/enums-color-theme';

export default function MemorizationClientMobileContent() {

    const [finished, setFinished] = useState(false)
    const [initialMemorizations, setInitialMemorizations] = useState<any[]>()
    const [memorizations, setMemorizations] = useState<any>()
    const [isFinishedModalOpen, setIsFinishedModalOpen] = useState(false)
    const [theme, setTheme] = useState<string>('mainBlue')

    let fromDelete = false

    const filterMemorizations = (finished: boolean): void => {
        setFinished(finished)

        if (finished) {
            setMemorizations(initialMemorizations?.filter(memorization => memorization.status === 'Finalizado'))

        } else {
            setMemorizations(initialMemorizations?.filter(memorization => memorization.status !== 'Finalizado'))
        }
    }

    const handleDelete = async (id: string) => {
        fromDelete = true
        await deleteResource('memorizations', id)
            .catch(err => console.error(err))
        fetchData()

    }

    const handleModal = (isOpen: boolean) => {
        setIsFinishedModalOpen(isOpen)
    }

    const handleFinished = async (id: string) => {
        await finishResource('memorizations', id)
            .catch(err => console.error(err))
        handleModal(false)
        fetchData()
        {/* reload page */ }
    }

    const fetchData = async () => {
        await axiosInstanceClient.get('/memorizations',
            { headers: { Authorization: `Bearer ${Cookies.get('token')}` } })
            .then(({ data }: { data: [] }) => {
                setInitialMemorizations(data)
                const finishedMemorizations = data?.filter((memorization: any) => {
                    return fromDelete ? memorization.status === 'Finalizado' : memorization.status !== 'Finalizado'
                })
                setMemorizations(finishedMemorizations)
                fromDelete = false
            })
            .catch(err => console.error(err))
    }

    const { themeValue } = useContext(ThemeContext)
    const validadeTheme = () => {
        if (themeValue === EThemeColor.Blue && !finished || themeValue === EThemeColor.Pink && finished) {
            setTheme('mainBlue')
        } else {
            setTheme('mainPink')
        }
    }

    const onClickMemorized = async (isClicked: boolean) => {
        if (!isClicked) return
        await fetchData()
    }

    useEffect(() => {
        validadeTheme()
    }, [finished])


    useEffect(() => {
        fetchData()
    }, [])

    return (
        <>
            <section className={`w-full h-[calc(100vh-95px)] overflow-hidden flex flex-col bg-${theme} `}>
                <div className="w-full p-4">
                    <div className="w-full flex py-3">
                        <button onClick={() => filterMemorizations(false)} className={`w-1/2 h-full transition-all ${finished !== true ? 'text-white' : 'text-[#D2D2D2]'} border-b-2 ${finished !== true ? 'border-white' : 'border-[#D2D2D2]'} font-light uppercase`}>Em memorização</button>
                        <button onClick={() => filterMemorizations(true)} className={`w-1/2 h-full transition-all ${finished !== false ? 'text-white' : 'text-[#D2D2D2]'} border-b-2 ${finished !== false ? 'border-white' : 'border-[#D2D2D2]'} font-light uppercase`}>Finalizadas</button>
                    </div>
                </div>
                <div className="w-full flex items-center justify-between p-3 ">
                    {finished ?
                        <h1 className="text-white font-semibold text-center text-lg ">Parabéns! Esses são os seus versículos memorizados</h1>
                        :
                        <>
                            <h1 className="text-white font-semibold text-lg w-48">Memorize versículos aqui</h1>
                            <Link
                                href={'/memorizacao/criar'}
                                prefetch={false}
                                className={`text-black bg-white shadow-lg h-10 gap-2 text-sm flex items-center rounded-3xl p-2`}
                            >
                                <Plus width={13} />
                                Novo versículo
                            </Link>
                        </>
                    }
                </div>
                <div className="w-full h-full flex flex-col items-center bg-white rounded-t-[50px]">
                    <div className="w-full p-2 flex justify-center">
                        <h2 className="text-lg text-weirdBlack font-semibold">Total: {memorizations?.length}</h2>
                    </div>
                    <div className="w-full h-[calc(100vh-313px)] overflow-y-scroll p-2 flex flex-col gap-2 ">
                        {

                            memorizations?.map((memorization: any) =>
                                <MemorizationMobileCard
                                    key={memorization.id}
                                    id={memorization.id}
                                    description={memorization.description}
                                    book={memorization.book}
                                    status={memorization.status}
                                    timesMemorized={memorization.timesMemorized}
                                    verse={memorization.verse}
                                    onClickedMemorized={onClickMemorized}
                                    handleDelete={() => handleDelete(memorization.id)}
                                    handleFinished={() => handleFinished(memorization.id)}
                                    isFinishedModalOpen={isFinishedModalOpen}
                                    handleModal={(isOpen: boolean) => handleModal(isOpen)}
                                    theme={theme}
                                />
                            )
                        }
                    </div>
                </div>
            </section>
        </>
    )
}

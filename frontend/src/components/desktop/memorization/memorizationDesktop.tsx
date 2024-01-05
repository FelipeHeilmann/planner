"use client"
import { useContext, useEffect, useState } from "react"
import MemorizationDesktopCard from "./memorizationDesktopCard"
import { axiosInstanceClient } from "@/libs/axiosAPICaller"
import Cookies from 'js-cookie'
import finishResource from "@/api/finishResource"
import deleteResource from "@/api/deleteResources"
import { ThemeContext } from "@/context/themeContex"
import { EThemeColor } from "../../../../types/enums-color-theme"
import dynamic from "next/dynamic"

export default function MemorizationDesktop() {

    const { themeValue } = useContext(ThemeContext)

    const [modalCreate, setModalCreate] = useState(false)

    const [memorizations, setMemorizations] = useState<any>()
    const [isFinishedModalOpen, setIsFinishedModalOpen] = useState(false)

    const handleModal = () => {
        setModalCreate(!modalCreate)
    }

    const handleFinishModal = (isOpen: boolean) => {
        setIsFinishedModalOpen(isOpen)
    }

    const handleFinished = async (id: string) => {
        await finishResource('memorizations', id)
            .catch(err => console.error(err))
        handleFinishModal(false)
        fetchData()
    }

    const handleDelete = async (id: string) => {
        await deleteResource('memorizations', id)
            .catch(err => console.error(err))
        fetchData()
    }

    const fetchData = async () => {
        try {
            const { data } = await axiosInstanceClient.get('/memorizations',
                { headers: { Authorization: `Bearer ${Cookies.get('token')}` } })
            setMemorizations(data)
        } catch (err) {
            console.error(err)
        }
    }

    const onClickMemorized = async (childClick: boolean) => {
        if (!childClick) return
        await fetchData()
    }

    useEffect(() => {
        fetchData()
    }, [])

    const finishedMemorization = memorizations?.filter((memorization: any) => memorization.status === 'Finalizado')
    const defaultMemorization = memorizations?.filter((memorization: any) => memorization.status !== "Finalizado")

    const DynamicMemorizationModal = dynamic(() => import('./MemorizationModal'))

    return (
        <>
            {modalCreate && <DynamicMemorizationModal open={modalCreate} onClose={() => setModalCreate(false)} />}
            <section className={`hidden lg:flex w-full h-[89vh] px-2 overflow-hidden bg-weirdWhite gap-3`}>
                <main className="bg-white w-full flex rounded-xl ">
                    <div className="flex-1">
                        <header className="w-full flex flex-col gap-3 pl-10 pt-5 justify-center">
                            <h1 className="text-3xl font-semibold text-weirdBlack">Registre aqui suas memorizações de passagens da bíblia</h1>
                            <button
                                onClick={(_) => handleModal()}
                                className={`w-64 ml-[9vw] flex justify-center items-center text-white hover:bg-opacity-90 ${themeValue === EThemeColor.Blue ? 'bg-mainBlue' : 'bg-mainPink'}  p-2 rounded-xl`}
                            >
                                Nova memorização
                            </button>
                        </header>
                        <div className="mt-5 w-3/4 mx-auto grid grid-cols-2 gap-5">
                            <div className="flex flex-col gap rounded-t-lg bg-weirdWhite">
                                <header className="text-lg flex justify-between items-center rounded-t-lg text-white p-2 bg-mainBlue font-bold uppercase">
                                    <p>Em memorização</p>
                                    <p>{defaultMemorization?.length}</p>
                                </header>
                                <div className="h-[calc(100vh-250px)] overflow-y-scroll p-3 flex flex-col gap-2">
                                    {defaultMemorization?.map((memorization: any) =>
                                        <MemorizationDesktopCard
                                            key={memorization.id}
                                            id={memorization.id}
                                            description={memorization.description}
                                            book={memorization.book}
                                            status={memorization.status}
                                            timesMemorized={memorization.timesMemorized}
                                            onClickMemorized={onClickMemorized}
                                            verse={memorization.verse}
                                            handleDelete={() => handleDelete(memorization.id)}
                                            handleFinished={() => handleFinished(memorization.id)}
                                            isFinishedModalOpen={isFinishedModalOpen}
                                            handleModal={(isOpen: boolean) => handleFinishModal(isOpen)}
                                        />
                                    )}
                                </div>
                            </div>

                            <div className="flex flex-col rounded-t-lg bg-weirdWhite">
                                <header className="text-lg flex justify-between items-center rounded-t-lg text-white p-2 bg-mainPink font-bold uppercase">
                                    <p>Finalizadas</p>
                                    <p>{finishedMemorization?.length}</p>
                                </header>
                                <div className="h-[calc(100vh-250px)] overflow-y-scroll p-3 flex flex-col gap-2">
                                    {finishedMemorization?.map((memorization: any) =>
                                        <MemorizationDesktopCard
                                            key={memorization.id}
                                            id={memorization.id}
                                            description={memorization.description}
                                            onClickMemorized={onClickMemorized}
                                            book={memorization.book}
                                            status={memorization.status}
                                            timesMemorized={memorization.timesMemorized}
                                            verse={memorization.verse}
                                            handleDelete={() => handleDelete(memorization.id)}
                                            handleFinished={() => handleFinished(memorization.id)}
                                            isFinishedModalOpen={isFinishedModalOpen}
                                            handleModal={(isOpen: boolean) => handleFinishModal(isOpen)}
                                        />
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </section >
        </>
    )
}

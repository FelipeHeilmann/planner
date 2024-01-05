"use client"
import { useContext, useEffect, useState } from "react"
import PrayerDesktopCard from "./prayerDesktopCard";
import Image from "next/image";
import man from '../../../../public/assets/prayer-man.png'
import woman from '../../../../public/assets/prayer-woman.png'
import PrayHands from "../../../../public/icons/prayHands";
import HeartHands from "../../../../public/icons/heartHands";
import Kneel from "../../../../public/icons/kneel";
import ManHandUp from "../../../../public/icons/manHandUp";
import { axiosInstanceClient } from "@/libs/axiosAPICaller";
import Cookies from 'js-cookie'
import deleteResource from "@/api/deleteResources";
import finishResource from "@/api/finishResource";
import { ECategory } from "@/components/mobile/prayer/prayerCreateMobile";
import { TPrayer } from "../../../../types/prayer-types";
import { ThemeContext } from "@/context/themeContex";
import { EThemeColor } from "../../../../types/enums-color-theme";
import dynamic from "next/dynamic";

type TrequestTypeCount = {
    request: number,
    intercede: number,
    regret: number,
    gratitude: number
}

export default function PrayerDesktop() {

    const [prays, setPrays] = useState<TPrayer[]>()
    const finishedPrays = prays?.filter((item: any) => item.status === "Finalizado")
    const defaultPrays = prays?.filter((item: any) => item.status !== "Finalizado")

    const [modalCreate, setModalCreate] = useState(false)
    const [isFinishedModalOpen, setIsFinishedModalOpen] = useState(false)
    const [finishedRequestCount, setFinishedRequestCount] = useState<any>()
    const [defaultRequestCount, setDefaultRequestCount] = useState<any>()

    const handleModal = (type: string, event: any, id: string | null) => {
        setModalCreate(true)
    }

    const countRequest = (data: TPrayer[]) => {
        const resultFinished: TrequestTypeCount = { regret: 0, gratitude: 0, intercede: 0, request: 0 }
        const resultDefault: TrequestTypeCount = { regret: 0, gratitude: 0, intercede: 0, request: 0 }
        for (const prayer of data) {
            if (prayer.request === ECategory.Regret) {
                if (prayer.status === 'Finalizado') {
                    resultFinished.regret += 1
                }
                else {
                    resultDefault.regret += 1
                }
            }
            if (prayer.request === ECategory.Intercede) {
                if (prayer.status === 'Finalizado') {
                    resultFinished.intercede += 1
                }
                else {
                    resultDefault.intercede += 1
                }
            }
            if (prayer.request === ECategory.Request) {
                if (prayer.status === 'Finalizado') {
                    resultFinished.request += 1
                }
                else {
                    resultDefault.request += 1
                }
            }
            if (prayer.request === ECategory.Gratitude) {
                if (prayer.status === 'Finalizado') {
                    resultFinished.gratitude += 1
                }
                else {
                    resultDefault.gratitude += 1
                }
            }
        }
        setFinishedRequestCount(resultFinished)
        setDefaultRequestCount(resultDefault)
    }

    const fetchData = async () => {
        try {
            const { data } = await axiosInstanceClient.get('/prayers',
                { headers: { Authorization: `Bearer ${Cookies.get('token')}` } })
            setPrays(data)
            countRequest(data)
        } catch (err) {
            console.error(err)
        }
    }

    const { themeValue } = useContext(ThemeContext)

    const handleDelete = async (id: string) => {
        await deleteResource('prayers', id)
            .catch(err => console.error(err))
        fetchData()
    }

    const handleFinishedModal = (isOpen: boolean) => {
        setIsFinishedModalOpen(isOpen)
    }

    const handleFinished = async (id: string) => {
        await finishResource('prayers', id)
            .catch(err => console.error(err))
        handleFinishedModal(false)
        fetchData()
    }

    const onClickPrayed = async (childClick: boolean) => {
        if (!childClick) return
        await fetchData()
    }

    useEffect(() => {
        fetchData()
    }, [])

    const DynamicPrayerModal = dynamic(() => import('./prayerModal'))

    return (
        <>
            {modalCreate && <DynamicPrayerModal open={modalCreate} onClose={() => setModalCreate(false)} />}
            <section className={`hidden lg:flex w-full bg-weirdWhite gap-3 px-2`}>
                <main className="bg-white w-full flex h-[89vh] overflow-hidden p-2 rounded-xl">
                    <div className="flex-1">
                        <header className="w-full flex flex-col gap-3 pl-1 pt-5 justify-center">
                            <h1 className="text-3xl font-semibold text-weirdBlack">Espaço Reservado para registrar orações</h1>
                            <button onClick={(event) => handleModal('Create', event, null)} className={`w-64 flex justify-center ${themeValue === EThemeColor.Blue ? 'bg-mainBlue' : 'bg-mainPink'} items-center text-white hover:bg-opacity-90 p-2 rounded-xl`}>Criar Nova oração</button>
                        </header>
                        <div className="mt-5 w-full pl-1 grid grid-cols-2 gap-3">
                            <div className="flex flex-col bg-weirdWhite rounded-t-lg h-fit">
                                <header className="text-lg text-center rounded-t-lg text-white p-2 bg-mainBlue font-bold uppercase">Em Oração</header>
                                <div className="h-[calc(100vh-280px)] pb-4 overflow-y-scroll overflow-x-hidden p-3 flex flex-col gap-2">
                                    {defaultPrays?.map(item =>
                                        <PrayerDesktopCard
                                            key={item.id}
                                            id={item.id}
                                            date={item.date}
                                            description={item.description}
                                            request={item.request}
                                            status={item.status}
                                            timesPrayed={item.timesPrayed}
                                            title={item.title}
                                            onClickPrayed={onClickPrayed}
                                            handleDelete={() => handleDelete(item.id)}
                                            handleFinished={() => handleFinished(item.id)}
                                            isFinishedModalOpen={isFinishedModalOpen}
                                            handleModal={(isOpen: boolean) => handleFinishedModal(isOpen)}
                                        />
                                    )}
                                </div>
                            </div>

                            <div className="flex flex-col bg-weirdWhite rounded-t-lg h-fit">
                                <header className="text-lg text-center rounded-t-lg text-white p-2 bg-mainPink font-bold uppercase">Orações Finalizadas</header>
                                <div className="h-[calc(100vh-280px)] pb-4 overflow-y-scroll overflow-x-hidden p-3 flex flex-col gap-2">
                                    {finishedPrays?.map(item =>
                                        <PrayerDesktopCard
                                            key={item.id}
                                            id={item.id}
                                            date={item.date}
                                            description={item.description}
                                            request={item.request}
                                            status={item.status}
                                            timesPrayed={item.timesPrayed}
                                            title={item.title}
                                            onClickPrayed={onClickPrayed}
                                            handleDelete={() => handleDelete(item.id)}
                                            handleFinished={() => handleFinished(item.id)}
                                            isFinishedModalOpen={isFinishedModalOpen}
                                            handleModal={(isOpen: boolean) => handleFinishedModal(isOpen)}
                                        />
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="w-fit flex gap-1 flex-col ml-2">
                        <div className="w-full h-1/2 flex justify-between relative items-center gap-2 rounded-lg bg-mainBlue p-2">
                            <Image src={man && man} className="h-[160px] w-[39px]" alt="Imagem de um homem rezando" />
                            <div className="flex flex-col justify-center h-full gap-3">
                                <h3 className="text-white absolute top-2 left-1/2 -translate-x-1/2 whitespace-nowrap font-semibold">Orações em andamento</h3>
                                <div className="grid grid-cols-2 gap-1">
                                    <div className="bg-white rounded-lg flex flex-col items-center p-2 bg-opacity-5">
                                        <PrayHands />
                                        <h4 className="text-white font-bold text-lg">{defaultRequestCount?.request}</h4>
                                        <p className="text-white font-light text-md">Pedido</p>
                                    </div>

                                    <div className="bg-white rounded-lg flex flex-col items-center p-2 bg-opacity-5">
                                        <HeartHands />
                                        <h4 className="text-white font-bold text-lg">{defaultRequestCount?.gratitude}</h4>
                                        <p className="text-white font-light text-md">Gratidão</p>
                                    </div>
                                    <div className="bg-white rounded-lg flex flex-col items-center p-2 bg-opacity-5">
                                        <Kneel color="#F3F6FD" width={25} />
                                        <h4 className="text-white font-bold text-lg">{defaultRequestCount?.regret}</h4>
                                        <p className="text-white font-light text-sm">Arrependimento</p>
                                    </div>

                                    <div className="bg-white rounded-lg flex flex-col items-center p-2 bg-opacity-5">
                                        <ManHandUp />
                                        <h4 className="text-white font-bold text-lg">{defaultRequestCount?.intercede}</h4>
                                        <p className="text-white font-light text-sm">Intercessões</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="w-full h-1/2 flex justify-between relative items-center gap-2 rounded-lg bg-mainPink p-2">
                            <div className="flex flex-col justify-center h-full">
                                <h3 className="text-white absolute top-2 left-1/2 -translate-x-1/2 whitespace-nowrap font-semibold">Orações finalizadas</h3>
                                <div className="grid grid-cols-2 gap-1">
                                    <div className="bg-white rounded-lg flex flex-col items-center p-2 bg-opacity-5">
                                        <PrayHands />
                                        <h4 className="text-white font-bold text-lg">{finishedRequestCount?.request}</h4>
                                        <p className="text-white font-light text-md">Pedido</p>
                                    </div>

                                    <div className="bg-white rounded-lg flex flex-col items-center p-2 bg-opacity-5">
                                        <HeartHands />
                                        <h4 className="text-white font-bold text-lg">{finishedRequestCount?.gratitude}</h4>
                                        <p className="text-white font-light text-md">Gratidão</p>
                                    </div>

                                    <div className="bg-white rounded-lg flex flex-col items-center p-2 bg-opacity-5">
                                        <Kneel color="#F3F6FD" width={25} />
                                        <h4 className="text-white font-bold text-lg">{finishedRequestCount?.regret}</h4>
                                        <p className="text-white font-light text-sm">Arrependimento</p>
                                    </div>

                                    <div className="bg-white rounded-lg flex flex-col items-center p-2 bg-opacity-5">
                                        <ManHandUp />
                                        <h4 className="text-white font-bold text-lg">{finishedRequestCount?.intercede}</h4>
                                        <p className="text-white font-light text-sm">Intercessões</p>
                                    </div>
                                </div>
                            </div>
                            <Image src={woman && woman} className="h-[160px] w-[45px]" alt="Imagem de uma mulher rezando" />
                        </div>
                    </div>
                </main>
            </section >
        </>
    )
}

"use client"
import { Plus } from "lucide-react";
import PrayerMobileCard from "./prayerMobileCard";
import PrayHands from "../../../../public/icons/prayHands";
import HeartHands from "../../../../public/icons/heartHands";
import Kneel from "../../../../public/icons/kneel";
import ManHandUp from "../../../../public/icons/manHandUp";
import { useContext, useEffect, useState } from "react";
import Link from "next/link";
import { axiosInstanceClient } from "@/libs/axiosAPICaller";
import Cookies from "js-cookie";
import { timestampToUser } from "@/utils/dateParser";
import { ECategory } from "./prayerCreateMobile";
import deleteResource from "@/api/deleteResources";
import finishResource from "@/api/finishResource";
import { ThemeContext } from "@/context/themeContex";
import { EThemeColor } from "../../../../types/enums-color-theme";

type TrequestTypeCount = {
    request: number,
    intercede: number,
    regret: number,
    gratitude: number
}

export default function PrayerMobileClient() {
    const [theme, setTheme] = useState<string>('mainBlue')
    const [finished, setFinished] = useState(true)
    const [prays, setPrays] = useState<any>()
    const [initialPrays, setInitialPrays] = useState<any[]>()
    const [requestTypeCount, setRequestTypeCount] = useState<TrequestTypeCount>()
    const [isFinishedModalOpen, setIsFinishedModalOpen] = useState(false)

    const filterPrays = (finished: boolean): void => {
        setFinished(finished)

        if (!finished) {
            setPrays(() => initialPrays?.filter((item: any) => item.status === 'Finalizado'))
            countRequest(initialPrays!.filter((item: any) => item.status === 'Finalizado'))
        } else {
            setPrays(() => initialPrays?.filter((item: any) => item.status !== 'Finalizado'))
            countRequest(initialPrays!.filter((item: any) => item.status !== 'Finalizado'))
        }
    }

    const countRequest = (data: any[]) => {
        const result: TrequestTypeCount = { regret: 0, gratitude: 0, intercede: 0, request: 0 }
        for (const prayer of data) {
            if (prayer.request === ECategory.Regret) {
                result.regret += 1
            }
            if (prayer.request === ECategory.Intercede) {
                result.intercede += 1
            }
            if (prayer.request === ECategory.Request) {
                result.request += 1
            }
            if (prayer.request === ECategory.Gratitude) {
                result.gratitude += 1
            }
        }
        setRequestTypeCount(result)
    }

    const handleDelete = async (id: string) => {
        await deleteResource('prayers', id)
            .catch(err => console.error(err))
        fetchData()
    }

    const handleModal = (isOpen: boolean) => {
        setIsFinishedModalOpen(isOpen)
    }

    const handleFinished = async (id: string) => {
        await finishResource('prayers', id)
            .catch(err => console.error(err))
        handleModal(false)
        fetchData()
    }

    const { themeValue } = useContext(ThemeContext)
    const validadeTheme = () => {
        if (themeValue === EThemeColor.Blue && !finished || themeValue === EThemeColor.Pink && finished) {
            setTheme('mainPink')
        } else {
            setTheme('mainBlue')
        }
    }

    const fetchData = async () => {
        try {
            const { data } = await axiosInstanceClient.get('/prayers',
                { headers: { Authorization: `Bearer ${Cookies.get('token')}` } })
            setInitialPrays(data)
            const finishedPrayers = data.filter((pray: any) => pray.status !== 'Finalizado')
            setPrays(finishedPrayers)
            countRequest(finishedPrayers)
        } catch (err) {
            console.error(err)
        }
    }

    const onClickPrayed = async (isClick: boolean) => {
        if (!isClick) return
        await fetchData()
    }

    useEffect(() => {
        fetchData()
    }, [])

    useEffect(() => {
        validadeTheme()
    })

    return (
        <>
            <section className={`w-full h-[140vh] overflow-hidden flex flex-col bg-${theme}`}>
                <div className="w-full p-4">
                    <div className="w-full flex py-3">
                        <button onClick={() => filterPrays(true)} className={`w-1/2 h-full ${finished !== false ? 'text-white' : 'text-[#D2D2D2]'} border-b-2 ${finished !== false ? 'border-white' : 'border-[#D2D2D2]'} font-light uppercase`}>Minhas orações</button>
                        <button onClick={() => filterPrays(false)} className={`w-1/2 h-full ${finished !== true ? 'text-white' : 'text-[#D2D2D2]'} border-b-2 ${finished !== true ? 'border-white' : 'border-[#D2D2D2]'} font-light uppercase`}>Finalizadas</button>
                    </div>

                    <h3 className="text-white text-xl font-semibold">Total</h3>

                    <div className="w-full flex justify-center flex-wrap gap-3 mt-2">
                        <div className="w-1/3 bg-[rgba(255, 255, 255, 0.05)] p-2 flex flex-col justify-center items-center gap-1 rounded-2xl">
                            <PrayHands />
                            <h4 className="text-white">{requestTypeCount?.request}</h4>
                            <p className="text-white text-sm">Pedido</p>
                        </div>

                        <div className="w-1/3 bg-[rgba(255, 255, 255, 0.05)] p-2 flex flex-col justify-center items-center rounded-2xl">
                            <HeartHands />
                            <h4 className="text-white">{requestTypeCount?.gratitude}</h4>
                            <p className="text-white text-sm">Gratidão</p>
                        </div>

                        <div className="w-1/3 bg-[rgba(255, 255, 255, 0.05)] p-2 flex flex-col justify-center items-center gap-1 rounded-2xl">
                            <Kneel width={25} />
                            <h4 className="text-white">{requestTypeCount?.regret}</h4>
                            <p className="text-white text-sm">Arrependimento</p>
                        </div>

                        <div className="w-1/3 bg-[rgba(255, 255, 255, 0.05)] p-2 flex flex-col justify-center items-center gap-1 rounded-2xl">
                            <ManHandUp />
                            <h4 className="text-white">{requestTypeCount?.intercede}</h4>
                            <p className="text-white text-sm">Intercessões</p>
                        </div>
                    </div>
                </div>

                <div className="w-full flex flex-col items-center bg-white rounded-t-[50px] h-[calc(100%-317px)]">
                    <div className="w-full justify-between p-5 items-center flex">
                        <h3 className="text-xl font-semibold text-[#575353]">{finished === true ? 'Sua lista' : 'Orações Respondidas'}</h3>
                        {finished &&
                            <Link
                                href={'/oracao/criar'}
                                prefetch={false}
                                className={`text-white gap-2 text-sm ${theme === EThemeColor.Blue ? 'bg-mainPink' : 'bg-mainBlue'} flex items-center rounded-3xl p-2`}
                            >
                                <Plus width={13} />
                                Criar oração
                            </Link>
                        }
                    </div>

                    <div className="w-full h-[calc(100vh-200px)] overflow-y-scroll p-2">
                        {prays?.map((item: any) =>
                            <PrayerMobileCard
                                key={item.id}
                                id={item.id}
                                date={timestampToUser(item.date)}
                                description={item.description}
                                request={item.request}
                                status={item.status}
                                timesPrayed={item.timesPrayed}
                                title={item.title}
                                onClickPrayed={onClickPrayed}
                                handleDelete={() => handleDelete(item.id)}
                                handleFinished={() => handleFinished(item.id)}
                                isFinishedModalOpen={isFinishedModalOpen}
                                handleModal={(isOpen: boolean) => handleModal(isOpen)}
                                theme={theme}
                            />
                        )}
                    </div>
                </div>
            </section>
        </>
    )
}

"use client"
import { useState, useContext, useEffect } from "react"
import ReadingPlanDesktopCard from "./readingPlanDesktopCard"
import { ThemeContext } from "@/context/themeContex"
import { EThemeColor } from "../../../../types/enums-color-theme"
import Cookies from "js-cookie"
import { axiosInstanceClient } from "@/libs/axiosAPICaller"
import dynamic from "next/dynamic"

export default function ReadingPlanDesktop() {

    const [readingsPlans, setReadingsPlan] = useState<any>()

    const [modalCreate, setModalCreate] = useState(false)

    const { themeValue } = useContext(ThemeContext)

    const fetchData = async () => {
        try {
            const { data } = await axiosInstanceClient.get('/reading-plans', {
                headers: {
                    Authorization: `Bearer ${Cookies.get('token')}`
                }
            })
            setReadingsPlan(data)
        } catch (err) {
            console.error(err)
        }
    }

    useEffect(() => {
        fetchData()
    }, [])

    const DynamicReadingPlanModal = dynamic(() => import('./readingPlanModal'))

    return readingsPlans && (
        <>
            {modalCreate && <DynamicReadingPlanModal open={modalCreate} onClose={() => setModalCreate(false)} />}
            <section className='hidden lg:flex h-[89vh] overflow-y-hidden w-full bg-weirdWhite gap-3 px-2'>
                <main className="bg-white w-full rounded-xl">
                    <header className="w-full flex box-border flex-col gap-3 pl-10 pt-5 justify-center">
                        <h1 className="text-3xl font-semibold text-weirdBlack">Esses são os seus planos de leitura</h1>
                        <button onClick={() => setModalCreate(true)} className={`w-64 flex justify-center items-center text-white ${themeValue === EThemeColor.Blue ? 'bg-mainBlue' : 'bg-mainPink'} p-2 rounded-xl`}>Criar plano de leitura</button>
                    </header>

                    <div className="w-full p-10 justify-center gap-x-20 overflow-y-scroll gap-y-8 h-full pb-28 flex flex-wrap">
                        {readingsPlans?.map((plan: any) =>
                            <ReadingPlanDesktopCard planOf={plan.planOf} id={plan.id} book={plan.book} date={plan.endDate} status={plan.status} name={plan.name} key={plan.id} testament={plan.testament} />
                        )}
                    </div>
                </main>
            </section>
        </>
    )
}

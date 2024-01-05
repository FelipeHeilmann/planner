'use client'
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import PrayHands from "../../../../public/icons/prayHands";
import HeartHands from "../../../../public/icons/heartHands";
import Kneel from "../../../../public/icons/kneel";
import ManHandUp from "../../../../public/icons/manHandUp";
import Cookies from 'js-cookie'
import { TPrayerZodFormSchema, prayerZodFormSchema } from "@/libs/prayerZodFormSchema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from 'next/navigation'
import { FormattedCurrentDate, timestampToInput } from "@/utils/dateParser";
import { ECategory } from "./prayerCreateMobile";
import { CategoryCheck } from "../../../../types/utils-types";
import { axiosInstanceClient } from "@/libs/axiosAPICaller";
import { EThemeColor } from "../../../../types/enums-color-theme";
import { ThemeContext } from "@/context/themeContex";

const { formattedCurrentDate } = FormattedCurrentDate()

export default function EditPrayerMobile({ oracaoId }: { oracaoId: string }) {
    const router = useRouter()
    const [_, setErrorMsg] = useState<string>()
    const [categoryCheck, setCategoryCheck] = useState<CategoryCheck>({
        request: false,
        intercede: false,
        regret: false,
        gratitude: false,
    })

    const { themeValue } = useContext(ThemeContext)

    const checkCategory = (event: React.ChangeEvent<HTMLInputElement>) => {
        const element = event.target.id
        const result = { ...categoryCheck }
        for (const key in result) {
            if (key !== element) {
                result[key] = false
            }
        }
        result[element] = !result[element]
        setCategoryCheck(result)
    }

    const onChangeDate = (e: string) => {
        setValue('userDate', e)
    }

    const onChangeTitle = (e: string) => {
        setValue('title', e)
    }

    const onChangeDescription = (e: string) => {
        setValue('description', e)
    }

    const { register, handleSubmit, setValue, formState: { isLoading, isValidating, isSubmitting } }
        = useForm<TPrayerZodFormSchema>({ resolver: zodResolver(prayerZodFormSchema) })

    const onSubmitCreatePrayerHandler = async (data: TPrayerZodFormSchema) => {
        if (!data.userDate
            || data.title === ''
            || data.description === ''
        ) return setErrorMsg('Certifique-se de preencher todas as informações')

        let finalCategory = ''
        for (const category in categoryCheck) {
            if (categoryCheck[category]) {
                finalCategory = String(category)
                break
            }
        }

        await axiosInstanceClient.put(`/prayers/${oracaoId}`,
            {
                request: finalCategory,
                description: data.description,
                title: data.title,
                userDate: data.userDate,
            }, {
            headers: {
                Authorization: `Bearer ${Cookies.get('token')}`
            }
        }).catch(err => console.error(err))
        router.push('/oracao')
    }
    const fetchData = async () => {
        try {
            const { data } = await axiosInstanceClient.get(`/prayers/${oracaoId}`, {
                headers: {
                    Authorization: `Bearer ${Cookies.get('token')}`
                }
            })
            setValue("title", data.title)
            setValue("description", data.description)
            setValue("userDate", timestampToInput(data.date))
            const categoryState = { ...categoryCheck }
            categoryCheck[data.request] = true
            setCategoryCheck(categoryState)
        } catch (err) {
            console.error(err)
        }
    }

    useEffect(() => {
        fetchData()
    }, [])

    return (
        <main className="w-full">
            <header className="w-full p-2 flex justify-between">
                <div className="flex gap-3 items-center">
                    <Link href={'/oracao'}>
                        <ArrowLeft />
                    </Link>
                    <h3>Editar oração</h3>
                </div>
            </header>

            <section className={`w-full p-2 pb-28 flex flex-col min-h-screen ${themeValue === EThemeColor.Blue ? 'bg-mainBlue' : 'bg-mainPink'}`}>
                <div className="w-full p-4 flex justify-center">
                    <h1 className="text-white text-xl font-semibold">Edite a sua oração</h1>
                </div>
                <div className="w-full h-5/6 p-3 bg-white rounded-[50px]">
                    <form onSubmit={handleSubmit(onSubmitCreatePrayerHandler)}>
                        <div className="w-full flex p-3 px-6 flex-col gap-1">
                            <label htmlFor="title" className="text-[#575353]">Título</label>
                            <input
                                {...register("title", { required: true })}
                                tabIndex={1}
                                onFocus={_ => setErrorMsg('')}
                                onChange={e => onChangeTitle(e.target.value)}
                                name="title"
                                type="text"
                                id="title"
                                className="w-full h-8 bg-[#F3F6FD] rounded-md px-2 text-[#2E3A59]" />
                        </div>
                        <div className="w-full flex p-3 px-6 flex-col gap-1">
                            <label htmlFor="date" className="text-[#575353]">Data</label>
                            <input
                                tabIndex={2}
                                {...register("userDate", { required: true })}
                                onChange={e => onChangeDate(e.target.value)}
                                onFocus={_ => setErrorMsg('')}
                                defaultValue={formattedCurrentDate}
                                type="date"
                                id="date"
                                name="userDate"
                                className="w-full h-8 bg-[#F3F6FD] rounded-md px-2" />
                        </div>

                        <div className="w-full flex p-3 px-6 flex-col gap-1">
                            <label className="text-[#575353]">Categoria</label>
                            <div className="border-red-800 flex flex-col gap-2 justify-between">
                                <section className="flex justify-between">
                                    <div className="flex flex-col justify-between items-center">
                                        <label tabIndex={3} className={`flex items-center justify-center w-[52px] aspect-square rounded-full border-2 ${categoryCheck['request'] ? 'bg-mainBlue border-white' : 'border-mainBlue'}`} htmlFor="request">
                                            <PrayHands color={`${categoryCheck['request'] ? '#fff' : '#6266f5'}`} />
                                        </label>
                                        <input
                                            onChange={(event) => checkCategory(event)} type="checkbox" id={ECategory.Request} className="hidden"
                                        />
                                        <p className="text-[12px]">Pedido</p>
                                    </div>

                                    <div className="flex flex-col justify-between items-center">
                                        <label tabIndex={4} className={`flex items-center justify-center w-[52px] h-[52px] rounded-full border-2 ${categoryCheck['gratitude'] ? 'bg-prayerCyan border-white' : 'border-prayerCyan'}`} htmlFor="gratitude">
                                            <HeartHands color={`${categoryCheck['gratitude'] ? '#fff' : '#62d9e6'}`} />
                                        </label>
                                        <input
                                            onChange={(event) => checkCategory(event)} type="checkbox" id={ECategory.Gratitude} className="hidden"
                                        />
                                        <p className="text-[12px]">Gratidão</p>
                                    </div>

                                    <div className="flex flex-col justify-between items-center">
                                        <label tabIndex={5} className={`flex items-center justify-center w-[52px] h-[52px] rounded-full border-2 ${categoryCheck['intercede'] ? 'bg-mainYellow border-white' : 'border-mainYellow'}`} htmlFor="intercede">
                                            <ManHandUp color={`${categoryCheck['intercede'] ? '#fff' : '#ffc56d'}`} />
                                        </label>
                                        <input
                                            onChange={(event) => checkCategory(event)} type="checkbox" id={ECategory.Intercede} className="hidden"
                                        />
                                        <p className="text-[12px]">Intercessão</p>
                                    </div>
                                </section>
                                <section>
                                    <div className="flex flex-col justify-between items-center">
                                        <label tabIndex={6} className={`flex items-center justify-center mr-3 w-[52px] h-[52px] rounded-full border-2 ${categoryCheck['regret'] ? 'bg-mainPink border-white' : 'border-mainPink'}`} htmlFor="regret">
                                            <Kneel color={`${categoryCheck['regret'] ? '#fff' : '#f25178'}`} width={25} />
                                        </label>
                                        <input
                                            onChange={(event) => checkCategory(event)} type="checkbox" id={ECategory.Regret} className="hidden"
                                        />
                                        <p className="text-[12px]">Arrependimento</p>
                                    </div>
                                </section>
                            </div>
                        </div>

                        <div className="w-full flex p-3 px-6 flex-col gap-1">
                            <label htmlFor="description" className="text-[#575353]">Descrção</label>
                            <textarea
                                {...register('description')}
                                tabIndex={6}
                                onFocus={_ => setErrorMsg('')}
                                onChange={e => onChangeDescription(e.target.value)}
                                name="description"
                                id="description"
                                className="w-full h-28 bg-[#F3F6FD] resize-none p-2 rounded-md"></textarea>
                        </div>

                        <div className="w-full flex p-3 px-6 flex-col gap-1">
                            <button
                                type="submit"
                                disabled={isLoading || isValidating || isSubmitting}
                                className={`w-full h-14 p-2 ${isSubmitting || isValidating || isLoading ? 'bg-gray-100' : `${themeValue === EThemeColor.Blue ? 'bg-mainBlue' : 'bg-mainPink'}`} text-white text-base font-semibold rounded-3xl`}
                            >Editar oração</button>
                        </div>
                    </form>
                </div>
            </section>
        </main>
    )

}

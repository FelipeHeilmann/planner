'use client'
import { ArrowLeft } from "lucide-react";
import PrayHands from "../../../../public/icons/prayHands";
import HeartHands from "../../../../public/icons/heartHands";
import Kneel from "../../../../public/icons/kneel";
import ManHandUp from "../../../../public/icons/manHandUp";
import { useContext, useState } from "react";
import Link from "next/link";
import { ThemeContext } from "@/context/themeContex";
import { EThemeColor } from "../../../../types/enums-color-theme";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TPrayerZodFormSchema, prayerZodFormSchema } from "@/libs/prayerZodFormSchema";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { CategoryCheck } from "../../../../types/utils-types";
import { FormattedCurrentDate } from "@/utils/dateParser";
import { axiosInstanceClient } from "@/libs/axiosAPICaller";

export enum ECategory {
    Request = 'request',
    Gratitude = 'gratitude',
    Intercede = 'intercede',
    Regret = 'regret',
}

const { formattedCurrentDate } = FormattedCurrentDate()

export default function PrayerCreateMobile() {

    const { themeValue } = useContext(ThemeContext)

    const [errorMsg, setErrorMsg] = useState<string>('')

    const [categoryCheck, setCategoryCheck] = useState<CategoryCheck>({
        [ECategory.Request]: true,
        [ECategory.Intercede]: false,
        [ECategory.Regret]: false,
        [ECategory.Gratitude]: false,
    })

    const router = useRouter()

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

    const { register, reset, handleSubmit, setValue, formState: { isLoading, isSubmitting, isValidating } }
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

        await axiosInstanceClient.post('/prayers',
            {
                request: finalCategory,
                description: data.description,
                title: data.title,
                userDate: data.userDate,
            }, {
            headers: {
                Authorization: `Bearer ${Cookies.get('token')}`
            }
        }).then(_ => {
            router.push('/oracao')
        }).catch(err => console.error(err))
        reset({
            userDate: '',
            title: '',
            description: ''
        })
    }

    return (
        <main className="block w-full lg:hidden">
            <header className="w-full p-2 flex justify-between">
                <div className="flex gap-3 items-center">
                    <Link href={'/oracao'}>
                        <ArrowLeft />
                    </Link>
                    <h3>Nova oração</h3>
                </div>
            </header>
            <section className={`w-full p-2 pb-28 flex flex-col min-h-screen ${themeValue === EThemeColor.Blue ? 'bg-mainBlue' : 'bg-mainPink'}`}>
                <div className="w-full p-4 flex justify-center">
                    <h1 className="text-white text-xl font-semibold">Crie uma nova oração</h1>
                </div>
                <div className="w-full p-3 bg-white rounded-[50px]">
                    <form onSubmit={handleSubmit(onSubmitCreatePrayerHandler)} noValidate className="relative" >
                        <div className="absolute left-3 -top-1 z-10 text-red-600 text-sm text-end">{errorMsg}</div>
                        <div className="w-full flex p-3 px-6 flex-col gap-1">
                            <label htmlFor="title" className="text-[#575353]">Título</label>
                            <input
                                {...register("title", { required: true })}
                                tabIndex={1}
                                onFocus={_ => setErrorMsg('')}
                                onChange={e => onChangeTitle(e.target.value)}
                                type="text" id="title" name="title" className="w-full h-8 bg-[#F3F6FD] rounded-md px-2 text-[#2E3A59]"
                            />
                        </div>
                        <div className="w-full flex p-3 px-6 flex-col gap-1">
                            <label htmlFor="date" className="text-[#575353]">Data</label>
                            <input
                                tabIndex={2}
                                {...register("userDate", { required: true })}
                                onChange={e => onChangeDate(e.target.value)}
                                onFocus={_ => setErrorMsg('')}
                                defaultValue={formattedCurrentDate}
                                type="date" id="date" name="userDate" className="w-full h-8 bg-[#F3F6FD] rounded-md px-2"
                            />
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
                            <label htmlFor="description" className="text-[#575353]">Descrição</label>
                            <textarea
                                tabIndex={6}
                                onFocus={_ => setErrorMsg('')}
                                {...register("description", { required: true })}
                                onChange={e => onChangeDescription(e.target.value)}
                                name="description" id="description" className="w-full h-28 bg-[#F3F6FD] resize-none p-2 rounded-md"
                            ></textarea>
                        </div>

                        <div className="w-full flex p-3 px-6 mb-14 flex-col gap-1">
                            <button
                                type="submit"
                                disabled={isLoading || isSubmitting || isValidating}
                                className={`w-full h-14 p-2 ${isSubmitting || isValidating || isLoading ? 'bg-gray-100' : `${themeValue === EThemeColor.Blue ? 'bg-mainBlue' : 'bg-mainPink'}`} text-white text-base font-semibold rounded-3xl`}
                            >Criar oração</button>
                        </div>
                    </form>
                </div>
            </section>
        </main>
    )
}

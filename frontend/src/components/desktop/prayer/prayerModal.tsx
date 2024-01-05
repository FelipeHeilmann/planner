import { useContext, useLayoutEffect, useRef, useState } from "react"
import PrayHands from "../../../../public/icons/prayHands"
import HeartHands from "../../../../public/icons/heartHands"
import Kneel from "../../../../public/icons/kneel"
import ManHandUp from "../../../../public/icons/manHandUp"
import { TPrayerZodFormSchema, prayerZodFormSchema } from "@/libs/prayerZodFormSchema"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import Cookies from "js-cookie"
import { X } from "lucide-react"
import { CategoryCheck, modalProps } from "../../../../types/utils-types"
import { FormattedCurrentDate } from "@/utils/dateParser"
import { ThemeContext } from "@/context/themeContex"
import { EThemeColor } from "../../../../types/enums-color-theme"
import { axiosInstanceClient } from "@/libs/axiosAPICaller"

const { formattedCurrentDate } = FormattedCurrentDate()

export default function PrayerModal({ open, onClose }: modalProps) {

    const { themeValue } = useContext(ThemeContext)

    const [_, setErrorMsg] = useState<string>('')
    const [categoryCheck, setCategoryCheck] = useState<CategoryCheck>({
        request: false,
        intercede: false,
        regret: false,
        gratitude: true,
    })

    const checkCategory = (event: any) => {
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

    const onKeyDownCategory = (e: any) => {
        e.key == 'Enter' && checkCategory(e)
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

    const { register, reset, handleSubmit, setValue, formState: { } }
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

        if (finalCategory === '') {
            finalCategory = 'gratitude'
        }

        const currentPickedDate = new Date(data.userDate)
        const iDontLikeJavascript = new Date(currentPickedDate.setDate((currentPickedDate.getDate()) + 1)).toString()

        await axiosInstanceClient.post('/prayers',
            {
                request: finalCategory,
                description: data.description,
                title: data.title,
                userDate: iDontLikeJavascript,
            }, {
            headers: {
                Authorization: `Bearer ${Cookies.get('token')}`
            }
        }).catch(err => console.error(err))
        reset()
        onClose()
    }

    const ref = useRef<HTMLDialogElement>(null)

    window.addEventListener("keydown", (e) => {
        if (!open) return
        if (e.key !== 'Escape') return
        onClose()
    })

    useLayoutEffect(() => {
        if (open && !ref.current?.open) {
            ref.current?.showModal()
        } else if (!open && ref.current?.open) {
            ref.current?.close()
        }
    }, [open])

    return (
        <dialog ref={ref} className="backdrop:bg-black backdrop:opacity-75 rounded-lg">
            <div className="w-[44vw] h-[85vh] bg-white rounded-lg">
                <header className={`flex items-center justify-between p-3 ${themeValue === EThemeColor.Blue ? 'bg-dashboardCard' : 'bg-dashboardCardPink'} `}>
                    <h2 className="text-white text-xl font-semibold">Criar Oração</h2>
                    <button tabIndex={10} onClick={onClose} className="focus:outline-black focus:bg-opacity-40 w-8 h-8 rounded-full flex bg-white bg-opacity-40 items-center hover:opacity-75 justify-center text-white text-xl font-semibold">
                        <X width={20} />
                    </button>
                </header>
                <form onSubmit={handleSubmit((data) => {
                    onSubmitCreatePrayerHandler(data)
                    window.location.reload()
                })} className="w-full flex flex-col items-center p-3">
                    <section className="flex justify-between w-full">
                        <div className="flex gap-1">
                            <div className="flex p-2 flex-col">
                                <label className="text-center text-[#575353] pl-1 pb-1 font-semibold">Categoria</label>
                                <section className="flex flex-col">
                                    <div className="flex flex-col justify-between items-center">
                                        <div
                                            className={`relative  flex cursor-pointer items-center justify-center w-[52px] h-[52px] rounded-full border-2 ${categoryCheck['request'] ? 'bg-mainBlue border-white' : 'border-mainBlue'}`}
                                        >
                                            <label
                                                tabIndex={4}
                                                onClick={(event) => checkCategory(event)}
                                                onKeyDown={e => onKeyDownCategory(e)}
                                                htmlFor="request"
                                                id="request"
                                                className="absolute focus:outline-black z-50 w-full h-full"
                                            >
                                            </label>
                                            <PrayHands color={`${categoryCheck['request'] ? '#fff' : '#6266f5'}`} />
                                        </div>
                                        <input type="checkbox" id="request" className="hidden" />
                                        <p className="text-md text-weirdBlack">Pedido</p>
                                    </div>
                                </section>

                                <section className="flex flex-col">
                                    <div className="flex flex-col justify-between items-center">
                                        <div className={`relative focus:outline-black flex cursor-pointer items-center justify-center w-[52px] h-[52px] rounded-full border-2 ${categoryCheck['gratitude'] ? 'bg-prayerCyan border-white' : 'border-prayerCyan'}`} >
                                            <label
                                                tabIndex={5}
                                                onClick={(event) => checkCategory(event)}
                                                onKeyDown={e => onKeyDownCategory(e)}
                                                htmlFor="gratitude"
                                                id="gratitude"
                                                className="absolute focus:outline-black z-50 w-full h-full"
                                            />
                                            <HeartHands color={`${categoryCheck['gratitude'] ? '#fff' : '#62d9e6'}`} />
                                        </div>
                                        <input type="checkbox" id="gratitude" className="hidden" />
                                        <p className="text-md text-weirdBlack">Gratidão</p>
                                    </div>
                                </section>

                                <section className="flex flex-col">
                                    <div className="flex flex-col justify-between items-center">
                                        <div className={`relative focus:outline-black flex cursor-pointer items-center justify-center w-[52px] h-[52px] rounded-full border-2 ${categoryCheck['regret'] ? 'bg-mainPink border-white' : 'border-mainPink'}`} >
                                            <label
                                                onClick={(event) => checkCategory(event)}
                                                tabIndex={6}
                                                onKeyDown={e => onKeyDownCategory(e)}
                                                htmlFor="regret"
                                                id="regret"
                                                className="absolute focus:outline-black z-50 w-full h-full"
                                            />
                                            <Kneel color={`${categoryCheck['regret'] ? '#fff' : '#f25178'}`} width={25} />
                                        </div>
                                        <input type="checkbox" className="hidden" />
                                        <p className="text-md text-weirdBlack">Arrependimento</p>
                                    </div>
                                </section>

                                <section className="flex flex-col">
                                    <div className="flex flex-col justify-between items-center">
                                        <div className={`relative focus:outline-black flex cursor-pointer items-center justify-center w-[52px] h-[52px] rounded-full border-2 ${categoryCheck['intercede'] ? 'bg-mainYellow border-white' : 'border-mainYellow'}`} >
                                            <label
                                                tabIndex={7}
                                                onClick={(event) => checkCategory(event)}
                                                onKeyDown={e => onKeyDownCategory(e)}
                                                htmlFor="intercede"
                                                id="intercede"
                                                className="absolute focus:outline-black z-50 w-full h-full"
                                            />
                                            <ManHandUp color={`${categoryCheck['intercede'] ? '#fff' : '#ffc56d'}`} />
                                        </div>
                                        <input type="checkbox" id="intercede" className="hidden" />
                                        <p className="text-md text-weirdBlack">Intercessão</p>
                                    </div>
                                </section>
                            </div>
                        </div>
                        <section className="flex flex-1 py-2 flex-col">
                            <section className="">
                                <div className="flex flex-col gap-1">
                                    <label className="text-weirdBlack pl-1 font-semibold" htmlFor="title">Nome</label>
                                    <input
                                        tabIndex={1}
                                        {...register("title", { required: true })}
                                        onFocus={_ => setErrorMsg('')}
                                        onChange={e => onChangeTitle(e.target.value)}
                                        name="title"
                                        type="text"
                                        id="title"
                                        className="focus:outline-black py-1 px-2 text-weirdBlack rounded-md border bg-loginCardBgColor" />
                                </div>
                                <div className="flex flex-col gap-1">
                                    <label className="text-weirdBlack pl-1 font-semibold" htmlFor="date">Data</label>
                                    <input
                                        tabIndex={2}
                                        {...register("userDate", { required: true })}
                                        onChange={e => onChangeDate(e.target.value)}
                                        onFocus={_ => setErrorMsg('')}
                                        defaultValue={formattedCurrentDate}
                                        type="date"
                                        id="date"
                                        name="userDate"
                                        className="focus:outline-black py-1 px-2 text-weirdBlack rounded-md border bg-loginCardBgColor" />
                                </div>
                            </section>
                            <div className="flex flex-col gap-1 h-full">
                                <label htmlFor="description" className="pt-1 pl-1 text-weirdBlack font-semibold">Descrição</label>
                                <textarea
                                    tabIndex={3}
                                    onFocus={_ => setErrorMsg('')}
                                    onChange={e => onChangeDescription(e.target.value)}
                                    className="h-full text-[#2E3A59] p-2 border-2 rounded-lg resize-none bg-loginCardBgColor"
                                    name="descrition"
                                    id="description" />
                            </div>
                        </section>
                    </section>
                    <div className="flex pt-1 justify-center gap-1">
                        <button
                            tabIndex={8}
                            type="submit"
                            className={`focus:outline-black focus:opacity-90 h-14 py-2 px-12 hover:opacity-90 ${themeValue === EThemeColor.Pink ? 'bg-mainBlue' : 'bg-mainPink'} text-white text-xl font-semibold rounded-xl`}
                        >Criar</button>
                    </div>
                </form>
            </div>
        </dialog>
    )
}

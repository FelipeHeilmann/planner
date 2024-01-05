"use client"
import { TReadingPlanZodFormSchema, readingPlanZodFormSchema } from "@/libs/readingPlanZodFormSchema"
import { books } from "@/utils/books"
import { zodResolver } from "@hookform/resolvers/zod"
import { useLayoutEffect, useRef, useState } from "react"
import { useForm } from "react-hook-form"
import Cookies from "js-cookie"
import { X } from "lucide-react"
import { modalProps } from "../../../../types/utils-types"
import { axiosInstanceClient } from "@/libs/axiosAPICaller"

const planOfValues = {
    oldTestament: {
        id: 1,
        optionValue: 'old testament',
        textOutput: 'Antigo testamento'
    },
    newTestament: {
        id: 2,
        optionValue: 'new testament',
        textOutput: 'Novo testamento'
    },
    bible: {
        id: null,
        optionValue: 'bible',
        textOutput: 'Bíblia toda'
    },
    book: {
        id: null,
        optionValue: 'book',
        textOutput: 'Livro'
    }
} as const

const currentDate = new Date()
const defaultEndDate = new Date((new Date(currentDate)).setDate(currentDate.getDate() + 7)) // One week after current date

const dateToInputValid = (date: Date) => {
    const currentYear = date.getFullYear()
    const currentMonth = String(date.getMonth() + 1).padStart(2, '0')
    const currentDay = String(date.getDate()).padStart(2, '0')
    return `${currentYear}-${currentMonth}-${currentDay}` as const
}

const defaultPlanOf = 'Selecione um tipo de plano'
const defaultBook = 'Selecione um livro'


export default function ReadingPlanModal({ open, onClose }: modalProps) {
    const [_, setErrorMsg] = useState<string>('')

    const ref = useRef<HTMLDialogElement>(null)

    const [isPlanBook, setIsPlanBook] = useState<boolean>(false)

    const { handleSubmit, register, getValues, setValue, formState: { } }
        = useForm<TReadingPlanZodFormSchema>({ resolver: zodResolver(readingPlanZodFormSchema) })

    const onChangePlanName = (e: string) => {
        setValue('name', e)
    }

    const onChangePlanOf = (e: string) => {
        setValue('planOf', e)
        if (e === planOfValues.book.optionValue) {
            setIsPlanBook(true)
            setValue('book', defaultBook)
            return
        }
        setIsPlanBook(false)
        setValue('book', defaultBook)
    }

    const onChangeBook = (e: string) => {
        setValue('book', e)
    }

    const onChangeDate = (e: string) => {
        setValue('endDate', e)
    }

    const onSubmitCreateReadingPlanHandler = async (data: TReadingPlanZodFormSchema) => {
        if ((data.name === ''
            || data.planOf === defaultPlanOf)
            || data.planOf === planOfValues.book.optionValue && data.book === defaultBook
        ) return setErrorMsg('Certifique-se de que os campos estejam preenchidos')

        let testamentId: number | null = null
        let planOf = getValues('planOf')
        let book = getValues('book')

        const currentPickedDate = new Date(data.endDate)
        const iDontLikeJavascript = new Date(currentPickedDate.setDate((currentPickedDate.getDate()) + 1)).toString()

        switch (data.planOf) {
            case planOfValues.oldTestament.optionValue:
                testamentId = planOfValues.oldTestament.id
                planOf = 'testament'
                book = null
                break
                ;;
            case planOfValues.newTestament.optionValue:
                testamentId = planOfValues.newTestament.id
                planOf = 'testament'
                book = null
                break
                ;;
            case planOfValues.bible.optionValue:
                testamentId = planOfValues.bible.id
                book = null
                break
                ;;
            case planOfValues.book.optionValue:
                testamentId = planOfValues.book.id
                break
                ;;
        }

        const readinPlan = {
            name: data.name,
            planOf,
            testamentId,
            book,
            endDate: iDontLikeJavascript,
            readingGoalPerDay: 1,
        }

        axiosInstanceClient.post('/reading-plans',
            readinPlan, { headers: { Authorization: `Bearer ${Cookies.get('token')}` } })
            .catch(err => console.error(err))
        onClose()
        window.location.reload()
    }

    useLayoutEffect(() => {
        if (open && !ref.current?.open) {
            ref.current?.showModal()
        } else if (!open && ref.current?.open) {
            ref.current?.close()
        }
    }, [open])

    window.addEventListener("keydown", (e) => {
        if (!open) return
        if (e.key !== 'Escape') return
        onClose()
    })

    return (
        <dialog ref={ref} className="backdrop:bg-black backdrop:opacity-75 rounded-lg">
            <div className="w-[40vw] h-[70vh] overflow-hidden bg-white rounded-lg">
                <header className="flex items-center justify-between p-2 px-4 bg-dashboardCard">
                    <h2 className="text-white text-xl font-semibold">Nova Plano leitura</h2>
                    <button onClick={onClose} className="w-8 h-8 flex items-center justify-center rounded-full bg-white bg-opacity-40 text-white text-xl font-semibold">
                        <X />
                    </button>
                </header>
                <form onSubmit={handleSubmit(onSubmitCreateReadingPlanHandler)} noValidate className="w-full flex flex-col items-center gap-2 p-3">
                    <div className="w-4/5 flex flex-col gap-[2px]">
                        <label className="text-weirdBlack pl-1 font-semibold" htmlFor="title">Nome</label>
                        <input
                            tabIndex={1}
                            {...register("name")}
                            onFocus={_ => setErrorMsg('')}
                            onChange={e => onChangePlanName(e.target.value)}
                            type="text"
                            id="title"
                            className="p-2 text-weirdBlack rounded-md border bg-loginCardBgColor"
                        />
                    </div>
                    <div className="w-4/5 flex flex-col gap-[2px]">
                        <label htmlFor="planOf" className="text-weirdBlack pl-1 font-semibold">Tipo</label>
                        <select
                            {...register("planOf")}
                            tabIndex={2}
                            onChange={(event) => onChangePlanOf(event.target.value)}
                            onFocus={_ => setErrorMsg('')}
                            defaultValue={defaultPlanOf}
                            id="planOf"
                            className="p-2 text-weirdBlack rounded-md border bg-loginCardBgColor"
                        >
                            <option value={defaultPlanOf} disabled>{defaultPlanOf}</option>
                            <option value={planOfValues.oldTestament.optionValue}>{planOfValues.oldTestament.textOutput}</option>
                            <option value={planOfValues.newTestament.optionValue}>{planOfValues.newTestament.textOutput}</option>
                            <option value={planOfValues.bible.optionValue}>{planOfValues.bible.textOutput}</option>
                            <option value={planOfValues.book.optionValue}>{planOfValues.book.textOutput}</option>
                        </select>
                    </div>
                    {isPlanBook &&
                        <div className="w-4/5 flex flex-col gap-[2px]">
                            <label htmlFor="book" className="text-[#575353] font-semibold pl-1">Livro</label>
                            <select
                                tabIndex={3}
                                onFocus={_ => setErrorMsg('')}
                                onChange={e => onChangeBook(e.target.value)}
                                className="p-2 text-weirdBlack rounded-md border bg-loginCardBgColor" name="book" id="book"
                                defaultValue={defaultBook}
                            >
                                <option value={defaultBook} disabled>{defaultBook}</option>
                                {books.map((item, index) =>
                                    <option key={index} value={item}>{item}</option>
                                )}
                            </select>
                        </div>
                    }
                    <div className="w-4/5 flex flex-col gap-[2px]">
                        <label className="text-weirdBlack pl-1 font-semibold" htmlFor="goal">Meta de finalização</label>
                        <input
                            tabIndex={4}
                            {...register("endDate")}
                            onFocus={_ => setErrorMsg('')}
                            onChange={e => onChangeDate(e.target.value)}
                            defaultValue={dateToInputValid(defaultEndDate)}
                            type="date"
                            id="goal"
                            className="p-2 text-weirdBlack rounded-md border bg-loginCardBgColor"
                        />
                    </div>
                    <div className="w-4/5 flex justify-center gap-[2px]">
                        <button
                            tabIndex={5}
                            type="submit"
                            className="w-1/2 h-12 p-2 mt-1 bg-mainPink text-white text-xl font-semibold rounded-xl"
                        >
                            Criar plano
                        </button>
                    </div>
                </form>
            </div>
        </dialog>
    )
}

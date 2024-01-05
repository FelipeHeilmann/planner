"use client"
import { books } from "@/utils/books";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useContext, useState } from "react";
import { ThemeContext } from "@/context/themeContex";
import { EThemeColor } from "../../../../types/enums-color-theme";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { TReadingPlanZodFormSchema, readingPlanZodFormSchema } from "@/libs/readingPlanZodFormSchema";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { axiosInstanceClient } from "@/libs/axiosAPICaller";

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

export default function ReadingPlanCreateMobile() {

    const { themeValue } = useContext(ThemeContext)

    const [isPlanBook, setIsPlanBook] = useState<boolean>(false)

    const [errorMsg, setErrorMsg] = useState<string>('')

    const router = useRouter()

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
        console.log(e)
        setValue('endDate', e)
    }

    const { handleSubmit, register, getValues, setValue, formState: { } }
        = useForm<TReadingPlanZodFormSchema>({ resolver: zodResolver(readingPlanZodFormSchema) })

    const onSubmitCreateReadingPlanHandler = async (data: TReadingPlanZodFormSchema) => {
        if ((data.name === ''
            || data.planOf === defaultPlanOf)
            || data.planOf === planOfValues.book.optionValue && data.book === defaultBook
        ) return setErrorMsg('Certifique-se de que os campos estejam preenchidos')

        let testamentId: number | null = null
        let planOf = getValues('planOf')
        let book = getValues('book')
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

        const dumbDateObjStuff = new Date(data.endDate)
        dumbDateObjStuff.setDate(dumbDateObjStuff.getDate() + 1)

        await axiosInstanceClient.post('/reading-plans',
            {
                name: data.name,
                planOf,
                testamentId,
                book,
                endDate: String(dumbDateObjStuff),
                readingGoalPerDay: 1,
            }, { headers: { Authorization: `Bearer ${Cookies.get('token')}` } })
            .catch(err => console.error(err))
        router.push('/plano-leitura')
    }

    return (
        <main className="block w-full lg:hidden">
            <header className="w-full p-2 flex justify-between">
                <div className="flex gap-3 items-center">
                    <Link href={'/plano-leitura'}>
                        <ArrowLeft />
                    </Link>
                    <h3>Novo Plano de leitura</h3>
                </div>
            </header>
            <section className={`w-full -mb-2 p-2 py-4 flex flex-col min-h-screen ${themeValue == EThemeColor.Blue ? 'bg-mainBlue' : 'bg-mainPink'}`}>
                <div className="w-full p-4 flex justify-center">
                    <h1 className="text-white text-xl font-semibold">Crie um novo plano de leitura</h1>
                </div>
                <div className="w-full flex pt-4 flex-col gap-1 min-h-full p-3 bg-white rounded-[50px] relative">
                    <div className="absolute z-10 right-2 text-red-600 text-sm text-end">{errorMsg}</div>
                    <form onSubmit={handleSubmit(onSubmitCreateReadingPlanHandler)} noValidate className="relative" >
                        <div className="w-full flex flex-col p-2 pt-4">
                            <label htmlFor="name" className="text-[#575353]">Nome do plano</label>
                            <input
                                tabIndex={1}
                                {...register("name")}
                                onFocus={_ => setErrorMsg('')}
                                onChange={e => onChangePlanName(e.target.value)}
                                type="text"
                                className="p-2 h-8 border-2 rounded-lg bg-[#F3F6FD]" name="name" id="name"
                            />
                        </div>

                        <div className="w-full flex flex-col gap-2 p-2">
                            <label htmlFor="planOf" className="text-[#575353]">Tipo</label>
                            <select
                                {...register("planOf")}
                                tabIndex={2}
                                onChange={(event) => onChangePlanOf(event.target.value)}
                                onFocus={_ => setErrorMsg('')}
                                defaultValue={defaultPlanOf}
                                className="h-8 border-2 rounded-lg bg-[#F3F6FD]" name="planOf" id="planOf"
                            >
                                <option value={defaultPlanOf} disabled>{defaultPlanOf}</option>
                                <option value={planOfValues.oldTestament.optionValue}>{planOfValues.oldTestament.textOutput}</option>
                                <option value={planOfValues.newTestament.optionValue}>{planOfValues.newTestament.textOutput}</option>
                                <option value={planOfValues.bible.optionValue}>{planOfValues.bible.textOutput}</option>
                                <option value={planOfValues.book.optionValue}>{planOfValues.book.textOutput}</option>
                            </select>
                        </div>

                        {isPlanBook &&
                            <div className="w-full flex flex-col p-2 pt-4">
                                <label htmlFor="book" className="text-[#575353]">Livro</label>
                                <select
                                    tabIndex={3}
                                    onFocus={_ => setErrorMsg('')}
                                    onChange={e => onChangeBook(e.target.value)}
                                    className="h-8 border-2 rounded-lg text-[#2E3A59] bg-[#F3F6FD]" name="book" id="book"
                                    defaultValue={defaultBook}
                                >
                                    <option value={defaultBook} disabled>{defaultBook}</option>
                                    {books.map((item, index) =>
                                        <option key={index} value={item}>{item}</option>
                                    )}
                                </select>
                            </div>
                        }
                        <div className="w-full flex flex-col gap-2 p-2">
                            <label htmlFor="date" className="text-[#575353]">Meta de finalização</label>
                            <input
                                tabIndex={4}
                                {...register("endDate")}
                                onFocus={_ => setErrorMsg('')}
                                onChange={e => onChangeDate(e.target.value)}
                                defaultValue={dateToInputValid(defaultEndDate)}
                                type="date" className="text-[#2E3A59] p-2 h-8 border-2 rounded-lg bg-[#F3F6FD]" name="endDate" id="date"
                            />
                        </div>
                        <div className="w-full flex p-3 px-6 flex-col gap-1">
                            <button
                                tabIndex={5}
                                type="submit" className={`w-full h-14 p-2 ${themeValue === EThemeColor.Blue ? 'bg-mainBlue' : 'bg-mainPink'} text-white text-base font-semibold rounded-3xl`}
                            >Criar Plano</button>
                        </div>
                    </form>
                </div>
            </section>
        </main>
    )
}

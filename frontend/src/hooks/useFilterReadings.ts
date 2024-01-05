"use client"
import { TReadingZodFormSchema, readingsZodFormSchema } from "@/libs/readingsZodFormSchema";
import Cookies from "js-cookie";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { EReadingsAction } from "../../types/readings-types";
import { usePathname, useRouter } from "next/navigation";
import { axiosInstanceClient } from "@/libs/axiosAPICaller";
import { FormattedCurrentDate } from "@/utils/dateParser";

const defaultValueBook = 'Selecione um livro'
const defaultValueReadingPlan = 'Escolha um plano de leitura'
const placeholderValueChapters = 'Selecione um capítulo'

const { currentDate, formattedCurrentDate } = FormattedCurrentDate()

export default function useFilterReadings(action: EReadingsAction) {

    const [errorMsg, setErrorMsg] = useState<string>('')

    const [bookChaptersArr, setBookChaptersArr] = useState<{ value: number, label: number }[]>([])

    const [readingsPlanArr, setReadingsPlanArr] = useState<{ id: string, name: string }[]>([])

    const router = useRouter()

    const pathName = usePathname()

    const onChangeBook = async (e: string) => {
        setValue('bookChapters', [])
        setValue('bookName', e)
        try {
            const res = await axiosInstanceClient.get(`/books/chapters?name=${e}`, { headers: { Authorization: `Bearer ${Cookies.get('token')}` } })
            const resultArray = (Array.from({ length: await res.data.count }, (_, i) => i + 1))
            setBookChaptersArr(resultArray.map((chapter: number) => ({ value: chapter, label: chapter })))
        } catch (err) {
            console.error(err)
        }
    }

    const onChangeChapters = (e: any) => {
        setValue('bookChapters', e)
    }

    const onChangeReadingPlanName = (e: any) => {
        setValue('readingPlan', e)
    }

    const onChangeDateHandler = (e: string) => {
        setValue('userDate', e)
    }

    const onBlurDuration = (e: string) => {
        setValue('duration', Number(e))
    }

    const formatDate = (date: string) => {
        const passedDate = new Date(date)
        const passedYear = passedDate.getFullYear()
        const passedMonth = String(passedDate.getMonth() + 1).padStart(2, '0')
        const passedDay = String(passedDate.getDate()).padStart(2, '0')
        return `${passedYear}-${passedMonth}-${passedDay}`
    }

    const readingSubmitHandler = async (data: TReadingZodFormSchema, id?: string) => {
        if (data.bookName === defaultValueBook
            || data.bookChapters.length === 0
            || isNaN(data.duration)
            || data.duration < 0
        ) return setErrorMsg('Certifique-se que os campos não estejam vazios')

        const bookChaptersAsFormValue: any = data.bookChapters
        const bookChaptersArr = bookChaptersAsFormValue.map((item: any) => Number(item.value))

        let readingPlanSend = null
        data.readingPlan === defaultValueReadingPlan ? null : readingPlanSend = data.readingPlan

        data.duration === 0 ? data.duration = 1 : data.duration

        switch (action) {
            case EReadingsAction.Create:
                await axiosInstanceClient.post('/readings',
                    {
                        bookName: data.bookName,
                        bookChapters: bookChaptersArr,
                        userDate: String(new Date(data.userDate.replace(/-/g, '\/'))),
                        readingPlanId: readingPlanSend,
                        duration: data.duration
                    },
                    { headers: { Authorization: `Bearer ${Cookies.get('token')}` } })
                    .catch(err => console.error(err))

                router.push('/leitura')
                reset()
                break
                ;;
            case EReadingsAction.Edit:
                const userReadingId = id ? id : pathName.split('/')[3]
                data.readingPlan === defaultValueReadingPlan ? null : readingPlanSend = data.readingPlan
                await axiosInstanceClient.put(`/readings/${userReadingId}`,
                    {
                        bookName: data.bookName,
                        bookChapters: bookChaptersArr,
                        userDate: String(new Date(data.userDate.replace(/-/g, '\/'))),
                        readingPlanId: readingPlanSend,
                        duration: data.duration
                    },
                    { headers: { Authorization: `Bearer ${Cookies.get('token')}` } })
                    .catch(err => console.error(err))

                router.push('/leitura')
                reset()
                break
                ;;
        }
    }

    const fetchReadingsPlans = async () => {
        try {
            const res = await axiosInstanceClient.get('/reading-plans', { headers: { Authorization: `Bearer ${Cookies.get('token')}` } })
            const parseRes = res.data.map((plan: { id: string, name: string }) => ({ id: plan.id, name: plan.name }))
            return setReadingsPlanArr(parseRes)
        } catch (err) {
            console.error(err)
        }
    }

    useEffect(() => {
        fetchReadingsPlans()
    }, [])

    const { reset, register, control, setValue, handleSubmit, formState: { isLoading, isSubmitting, isValidating } }
        = useForm<TReadingZodFormSchema>({ resolver: zodResolver(readingsZodFormSchema) })

    const dateOnBlurHandler = (e: string) => {
        const dateString: string = e
        const dateArray: number[] = dateString.split("-").map(Number)
        const pickedDate = new Date(dateArray[0], dateArray[1] - 1, dateArray[2]);
        return currentDate > pickedDate ? setValue("userDate", formattedCurrentDate) : setValue("userDate", e)
    }

    return {
        book: { bookChaptersArr },
        plan: { readingsPlanArr },
        data: { formattedCurrentDate },
        hookForm: { setValue, register, control, handleSubmit, isSubmitting, isLoading, isValidating },
        functions: { onChangeBook, onChangeChapters, onChangeReadingPlanName, dateOnBlurHandler, onChangeDateHandler, readingSubmitHandler, formatDate, onBlurDuration },
        error: { errorMsg, setErrorMsg },
        defaultValues: { defaultValueBook, placeholderValueChapters, defaultValueReadingPlan },
    }
}

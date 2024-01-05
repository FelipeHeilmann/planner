"use client"
import { useState } from "react"
import Cookies from "js-cookie"
import { usePathname, useRouter } from "next/navigation"
import { SubmitHandler, useForm } from "react-hook-form"
import { TDevotionalZodFormSchema, devotionalZodFormSchema } from "@/libs/devotionalZodFormSchema"
import { zodResolver } from "@hookform/resolvers/zod"
import { EnumActionFilterDevotional } from "../../types/devotinal-types"
import { axiosInstanceClient } from "@/libs/axiosAPICaller"
import { FormattedCurrentDate } from "@/utils/dateParser"

const defaultValueBook = 'Selecione um livro'
const defaultValueChapter = 'Selecione um capítulo'
const versesPlaceholder = 'Selecione os versículos'
const defaultValueVerses: [] = []

const { currentDate, formattedCurrentDate } = FormattedCurrentDate()

export default function useFiterBooks(action: EnumActionFilterDevotional) {

    const [chaptersOptions, setChaptersOptions] = useState<number[]>([])
    const [versesOptions, setVersesOptions] = useState<{ value: number, label: number }[]>([])

    const [errorMsg, setErrorMsg] = useState<string>('')
    const [disable, setDisable] = useState<boolean>(false)

    const router = useRouter()
    const pathName = usePathname()

    const onChangeBook = async (e: string) => {
        setErrorMsg('')
        setValue("bookName", e)
        setValue("bookChapter", defaultValueChapter)
        setValue("verses", defaultValueVerses)
        try {
            const res = await axiosInstanceClient.get(`/books/chapters?name=${e}`, { headers: { Authorization: `Bearer ${Cookies.get('token')}` } })
            const resultArray = Array.from({ length: await res.data.count }, (_, i) => i + 1);
            setChaptersOptions(resultArray)
        } catch (err) {
            console.error(err)
        }
    }

    const onChangeChapter = async (e: string) => {
        setErrorMsg('')
        setValue("bookChapter", e)
        setValue("verses", defaultValueVerses)
        try {
            const res = await axiosInstanceClient.get(`/books/verses?name=${getValues().bookName}&chapter=${e}`, { headers: { Authorization: `Bearer ${Cookies.get('token')}` } })
            const resultArray = Array.from({ length: await res.data.count }, (_, i) => i + 1)
            setVersesOptions(resultArray.map((item: number) => ({ value: item, label: item })))
        } catch (err) {
            console.error(err)
        }
    }

    const onChangeVerses = (e: any) => {
        setErrorMsg('')
        setValue("verses", e)
    }

    const { reset, getValues, setValue, handleSubmit, register, control, formState: { isLoading, isSubmitting, isValidating } }
        = useForm<TDevotionalZodFormSchema>({ resolver: zodResolver(devotionalZodFormSchema) })

    const devotionalSubmitHandler = async (data: TDevotionalZodFormSchema, id?: string) => {
        if (data.bookName === defaultValueBook
            || data.bookChapter === defaultValueChapter
            || data.verses.length === 0
            || data.subject === ''
            || !devotionalZodFormSchema.safeParse(data)
        ) return setErrorMsg('Certifique-se que os campos não estejam vazios ou com textos muito grande')

        const dataVerses: any = data.verses

        switch (action) {
            case EnumActionFilterDevotional.Create:
                axiosInstanceClient.post(`/devotionals`,
                    {
                        userDate: String(new Date(getValues().userDate.split('-').map(Number)[0], getValues().userDate.split('-').map(Number)[1] - 1, getValues().userDate.split('-').map(Number)[2])),
                        bookName: data.bookName,
                        bookChapter: data.bookChapter,
                        subject: data.subject,
                        learned: data.learned,
                        application: data.application,
                        verses: dataVerses.map((verses: any) => Number(verses.value)),
                    }, { headers: { Authorization: `Bearer ${Cookies.get('token')}` } })
                    .then(_ => {
                        setDisable(isValidating || isSubmitting || isLoading)
                        return router.push('/devocional')
                    })
                    .catch(err => console.log(err))
                break
                ;;
            case EnumActionFilterDevotional.Edit:
                const userDevotionalId = id ? id : pathName.split('/')[3]
                axiosInstanceClient.put(`/devotionals/${userDevotionalId}`,
                    {
                        userDate: String(new Date(getValues().userDate.split('-').map(Number)[0], getValues().userDate.split('-').map(Number)[1] - 1, getValues().userDate.split('-').map(Number)[2])),
                        bookName: data.bookName,
                        bookChapter: data.bookChapter,
                        subject: data.subject,
                        learned: data.learned,
                        application: data.application,
                        verses: dataVerses.map((verses: any) => Number(verses.value)),
                    }, { headers: { Authorization: `Bearer ${Cookies.get('token')}` } })
                    .then(_ => {
                        setDisable(isValidating || isSubmitting || isLoading)
                        return router.push('/devocional')
                    })
                    .catch(err => console.log(err))
                break
                ;;
        }
        reset({
            bookName: defaultValueBook,
            bookChapter: defaultValueChapter,
            verses: defaultValueVerses,
            userDate: '',
            subject: '',
            learned: '',
            application: '',
        })
    }

    const onChangeDate = (e: string) => {
        setValue('userDate', e)
    }

    const formatDate = (date: string) => {
        const passedDate = new Date(date)
        const passedYear = passedDate.getFullYear()
        const passedMonth = String(passedDate.getMonth() + 1).padStart(2, '0')
        const passedDay = String(passedDate.getDate()).padStart(2, '0')
        return `${passedYear}-${passedMonth}-${passedDay}`
    }

    const dateOnBlurHandler = (e: string) => {
        const dateString: string = e
        const dateArray: number[] = dateString.split("-").map(Number)
        const pickedDate = new Date(dateArray[0], dateArray[1] - 1, dateArray[2]);
        return currentDate > pickedDate ? setValue("userDate", formattedCurrentDate) : setValue("userDate", e)
    }

    return {
        chapter: { chaptersOptions },
        verses: { versesOptions, versesPlaceholder },
        date: { formattedCurrentDate, formatDate },
        defaults: { defaultValueBook, defaultValueVerses, defaultValueChapter },
        functions: { onChangeBook, onChangeChapter, onChangeDate, onChangeVerses, devotionalSubmitHandler, dateOnBlurHandler },
        hookForm: { handleSubmit, register, control, setValue, getValues },
        error: { errorMsg, setErrorMsg },
        disable,
    } as const
}

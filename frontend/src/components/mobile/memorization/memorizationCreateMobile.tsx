'use client'
import { useContext, useState } from "react"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { books } from "@/utils/books"
import { useForm } from "react-hook-form";
import { TMemorizationZodFormSchema, memorizationZodFormSchema } from "@/libs/memorizationZodFormSchema"
import { zodResolver } from "@hookform/resolvers/zod"
import useFiterBooks from "@/hooks/useFilterBooks"
import { EnumActionFilterDevotional } from "../../../../types/devotinal-types"
import Cookies from 'js-cookie'
import { useRouter } from 'next/navigation'
import { axiosInstanceClient } from "@/libs/axiosAPICaller"
import { ThemeContext } from "@/context/themeContex"
import { EThemeColor } from "../../../../types/enums-color-theme"

export default function MemorizationCreateMobile() {
    const router = useRouter()

    const [errorMsg, setErrorMsg] = useState<string>('')

    const { themeValue } = useContext(ThemeContext)

    const { functions: {
        onChangeBook,
        onChangeVerses,
        onChangeChapter
    },
        defaults: {
            defaultValueBook,
            defaultValueChapter,
            defaultValueVerses
        },
        chapter: { chaptersOptions },
        verses: { versesOptions, versesPlaceholder }
    } = useFiterBooks(EnumActionFilterDevotional.Create)

    const { register, handleSubmit, setValue, formState: { isSubmitting, isValidating, isLoading } }
        = useForm<TMemorizationZodFormSchema>({ resolver: zodResolver(memorizationZodFormSchema) })

    const onChangeDescription = (e: string) => {
        setValue('description', e)
    }

    const onSubmitCreateMemorizationHandler = async (data: TMemorizationZodFormSchema) => {
        if (data.bookChapter === ''
            || data.bookName === ''
        ) return setErrorMsg('Certifique-se de preencher todas as informações')

        await axiosInstanceClient.post('/memorizations', {
            bookName: data.bookName,
            bookChapter: data.bookChapter,
            verse: data.verse,
            description: data.description !== '' ? data.description : null
        }, {
            headers: {
                Authorization: `Bearer ${Cookies.get('token')}`
            }
        }).catch(err => console.error(err))

        router.push('/memorizacao')
    }

    return (
        <main className="block w-full lg:hidden">
            <header className="w-full p-2 flex justify-between">
                <div className="flex gap-3 items-center">
                    <Link href={'/memorizacao'}>
                        <ArrowLeft />
                    </Link>
                    <h3>Nova memorização</h3>
                </div>
            </header>

            <section className={`w-full -mb-3 p-2 flex flex-col min-h-screen ${themeValue === EThemeColor.Blue ? 'bg-mainBlue' : 'bg-mainPink'}`}>
                <div className="w-full h-5/6 p-3 bg-white rounded-[50px]">
                    <form onSubmit={handleSubmit(onSubmitCreateMemorizationHandler)} className="relative">
                        <div className="absolute left-3 -top-1 z-10 text-red-600 text-sm text-end">{errorMsg}</div>
                        <div className="w-full flex p-3 px-6 flex-col gap-1">
                            <label htmlFor="book" className="text-[#575353]">Livro</label>
                            <select
                                tabIndex={1}
                                {...register("bookName", { required: true })}
                                onChange={e => { onChangeBook(e.target.value); setValue('bookName', e.target.value) }}
                                onFocus={_ => setErrorMsg('')}
                                defaultValue={defaultValueBook}
                                className="h-8 border-2 rounded-lg text-[#2E3A59] bg-[#F3F6FD]" name="book" id="book"
                            >
                                <option disabled>{defaultValueBook}</option>
                                {books.map((item: string, i: number) =>
                                    <option key={i} value={item}>{item}</option>
                                )}
                            </select>
                        </div>
                        <div className="w-full flex p-3 px-6 flex-col gap-1">
                            <label htmlFor="book" className="text-[#575353]">Capítulo</label>
                            <select
                                tabIndex={2}
                                {...register("bookChapter", { required: true })}
                                onChange={e => { onChangeChapter(e.target.value); setValue('bookChapter', e.target.value) }}
                                onFocus={_ => setErrorMsg('')}
                                defaultValue={defaultValueChapter}
                                className="h-8 border-2 rounded-lg text-[#2E3A59] bg-[#F3F6FD]" name="chapter" id="chapter"
                            >
                                <option disabled>{defaultValueChapter}</option>
                                {chaptersOptions.map((item: any, i: any) =>
                                    <option key={i} value={item}>{item}</option>
                                )}
                            </select>

                        </div>
                        <div className="w-full flex p-3 px-6 flex-col gap-1">
                            <label htmlFor="book" className="text-[#575353]">Versículo</label>
                            <select
                                tabIndex={3}
                                onChange={e => { onChangeVerses(e); setValue('verse', Number(e.target.value)) }}
                                onFocus={_ => setErrorMsg('')}
                                defaultValue={versesPlaceholder}
                                placeholder={versesPlaceholder}
                                id="verses"
                                name="verses"
                                className="h-8 border-2 rounded-lg text-[#2E3A59] bg-[#F3F6FD]"
                            >
                                <option value={versesPlaceholder} disabled>{versesPlaceholder}</option>
                                {versesOptions.map((item, i) =>
                                    <option key={i} value={item.value}>{item.label}</option>
                                )}
                            </select>
                        </div>
                        <div className="w-full flex p-3 px-6 flex-col gap-1">
                            <label htmlFor="description" className="text-[#575353]">Descrição</label>
                            <textarea {...register("description")} onChange={e => onChangeDescription(e.target.value)} name="description" id="description" className="w-full h-28 bg-[#F3F6FD] resize-none p-2 rounded-md"></textarea>
                        </div>

                        <div className="w-full flex p-3 px-6 flex-col gap-1">
                            <button
                                disabled={isSubmitting || isValidating || isLoading}
                                type="submit"
                                className={`w-full h-14 p-2 ${isSubmitting || isValidating || isLoading ? 'bg-gray-400' : `${themeValue === EThemeColor.Blue ? 'bg-mainBlue' : 'bg-mainPink'}`}  text-white text-base font-semibold rounded-3xl`}
                            >Criar memorização</button>
                        </div>
                    </form>
                </div>
            </section >
        </main >
    )
}

import useFiterBooks from "@/hooks/useFilterBooks"
import { books } from "@/utils/books"
import { useContext, useLayoutEffect, useRef, useState } from "react"
import { EnumActionFilterDevotional } from "../../../../types/devotinal-types"
import { TMemorizationZodFormSchema, memorizationZodFormSchema } from "@/libs/memorizationZodFormSchema"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import Cookies from 'js-cookie'
import { X } from "lucide-react"
import { axiosInstanceClient } from "@/libs/axiosAPICaller"
import { modalProps } from "../../../../types/utils-types"
import { ThemeContext } from "@/context/themeContex"
import { EThemeColor } from "../../../../types/enums-color-theme"

export default function MemorizationModal({ open, onClose }: modalProps) {
    const ref = useRef<HTMLDialogElement>(null)

    const { themeValue } = useContext(ThemeContext)

    const [_, setErrorMsg] = useState<string>('')

    const { functions: {
        onChangeBook,
        onChangeVerses,
        onChangeChapter
    },
        defaults: {
            defaultValueBook,
            defaultValueChapter
        },
        chapter: { chaptersOptions },
        verses: { versesOptions, versesPlaceholder }
    } = useFiterBooks(EnumActionFilterDevotional.Create)

    const { register, reset, handleSubmit, setValue, formState: { isLoading, isValidating, isSubmitting } }
        = useForm<TMemorizationZodFormSchema>({ resolver: zodResolver(memorizationZodFormSchema) })

    const onChangeBookHandler = (e: string) => {
        onChangeBook(e); setValue('bookName', e)
        reset({
            bookChapter: defaultValueChapter,
            verse: versesPlaceholder as any
        })
    }

    const onChangeChapterHandler = (e: string) => {
        onChangeChapter(e); setValue('bookChapter', e)
        reset({
            verse: versesPlaceholder as any
        })
    }

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
        <dialog ref={ref} className="backdrop:bg-black backdrop:opacity-75 overflow-hidden rounded-lg">
            <div className="w-[50vw] h-[75vh] bg-white rounded-lg">
                <header className={`flex items-center justify-between p-2 px-4 ${themeValue === EThemeColor.Blue ? 'bg-dashboardCard' : 'bg-dashboardCardPink'} `}>
                    <h2 className="text-white text-lg font-semibold">Criar Memorização</h2>
                    <button onClick={onClose} className="w-8 h-8 flex items-center hover:opacity-75 justify-center rounded-full bg-white bg-opacity-40 text-white font-semibold">
                        <X width={20} />
                    </button>
                </header>
                <form onSubmit={handleSubmit(onSubmitCreateMemorizationHandler)} className="w-full flex flex-col gap-1 items-center p-2">
                    <div className="w-4/5 flex flex-col gap-1">
                        <label className="text-weirdBlack pl-1" htmlFor="book">Livro</label>
                        <select
                            tabIndex={1}
                            {...register("bookName", { required: true })}
                            onChange={e => onChangeBookHandler(e.target.value)}
                            onFocus={_ => setErrorMsg('')}
                            defaultValue={defaultValueBook}
                            className="p-2 text-weirdBlack rounded-md border bg-loginCardBgColor" name="book" id="book"
                        >
                            <option disabled>{defaultValueBook}</option>
                            {books.map((item: string, i: number) =>
                                <option key={i} value={item}>{item}</option>
                            )}
                        </select>
                    </div>
                    <div className="w-4/5 flex flex-col gap-1">
                        <label className="text-weirdBlack pl-1" htmlFor="chapter">Capítulo</label>
                        <select
                            tabIndex={2}
                            {...register("bookChapter", { required: true })}
                            onChange={e => onChangeChapterHandler(e.target.value)}
                            onFocus={_ => setErrorMsg('')}
                            defaultValue={defaultValueChapter}
                            className="p-2 text-weirdBlack rounded-md border bg-loginCardBgColor" name="chapter" id="chapter"
                        >
                            <option disabled>{defaultValueChapter}</option>
                            {chaptersOptions.map((item: any, i: any) =>
                                <option key={i} value={item}>{item}</option>
                            )}
                        </select>
                    </div>
                    <div className="w-4/5 flex flex-col gap-1">
                        <label className="text-weirdBlack pl-1" htmlFor="verse">Versículo</label>
                        <select
                            {...register("verse")}
                            tabIndex={3}
                            onChange={e => { onChangeVerses(e); setValue('verse', Number(e.target.value)) }}
                            onFocus={_ => setErrorMsg('')}
                            defaultValue={versesPlaceholder}
                            id="verses"
                            name="verses"
                            className="p-2 text-weirdBlack rounded-md border bg-loginCardBgColor"
                        >
                            <option value={versesPlaceholder} disabled>{versesPlaceholder}</option>
                            {versesOptions.map((item, i) =>
                                <option key={i} value={item.value}>{item.label}</option>
                            )}
                        </select>
                    </div>
                    <div className="w-4/5 flex flex-col gap-1">
                        <label htmlFor="subject" className="text-weirdBlack pl-1">Descrição</label>
                        <textarea {...register("description")} onChange={e => onChangeDescription(e.target.value)} className="text-[#2E3A59] p-2 h-[95px] border-2 rounded-lg resize-none bg-loginCardBgColor" name="subject" id="subject" />
                    </div>
                    <div className="w-4/5 flex justify-center pt-1 gap-1">
                        <button
                            disabled={isLoading || isSubmitting || isValidating}
                            type="submit"
                            className={`w-1/3 p-2 ${isLoading || isSubmitting || isValidating ? 'bg-gray-400' : `${themeValue === EThemeColor.Pink ? 'bg-mainBlue' : 'bg-mainPink'}`} text-white text-xl font-semibold rounded-xl`}
                        >Criar</button>
                    </div>
                </form>
            </div>
        </dialog>
    )
}

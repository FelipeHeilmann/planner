import { books } from "@/utils/books"
import { useEffect, useLayoutEffect, useRef, useState } from "react"
import Select from 'react-select'
import { EnumActionFilterDevotional } from "../../../../types/devotinal-types"
import useFiterBooks from "@/hooks/useFilterBooks"
import { Controller } from "react-hook-form"
import { NoOptionsMessage } from '@/libs/reactSelect'
import Cookies from 'js-cookie'
import { timestampToInput } from "@/utils/dateParser"
import { X } from "lucide-react"
import { axiosInstanceClient } from "@/libs/axiosAPICaller"
import { modalProps } from "../../../../types/utils-types"

export default function DevotionaEditlModal({ open, onClose, id }: modalProps) {

    const [chatper, setChapter] = useState<string>()

    const ref = useRef<HTMLDialogElement>(null)

    const {
        chapter: { chaptersOptions },
        verses: { versesOptions, versesPlaceholder },
        date: { formattedCurrentDate, formatDate },
        hookForm: { control, handleSubmit, register, setValue },
        functions: { devotionalSubmitHandler, onChangeBook, onChangeVerses, onChangeChapter, dateOnBlurHandler },
        defaults: { defaultValueBook, defaultValueChapter },
        error: { errorMsg, setErrorMsg },
        disable,
    } = useFiterBooks(EnumActionFilterDevotional.Edit)

    const fetchData = async () => {
        try {
            const { data } = await axiosInstanceClient.get(`/devotionals/${id}`, {
                headers: {
                    Authorization: `Bearer ${Cookies.get('token')}`
                }
            })

            setValue("bookName", data.book.name)
            onChangeBook(data.book.name)
            setValue("bookChapter", String(data.book.chapter))
            onChangeChapter(String(data.book.chapter))
            setChapter(String(data.book.chapter))
            setValue("verses", data.verses.map((item: number) => ({ value: item, label: item })))
            setValue("userDate", timestampToInput(data.date))
            setValue("subject", data.subject)
            setValue("learned", data.learned)
            setValue("application", data.application)
        } catch (err) {
            console.error(err)
        }
    }

    useEffect(() => {
        fetchData()
    }, [])

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
        <dialog ref={ref} className="hidden lg:block backdrop:bg-black backdrop:opacity-75 rounded-lg" >
            <div className="w-[65vw] h-[90vh] bg-white rounded-lg overflow-hidden">
                <header className="flex items-center justify-between p-2 px-4 bg-dashboardCard">
                    <h2 className="text-white text-xl font-semibold">Editar Devocional</h2>
                    <button onClick={onClose} className="w-8 h-8 rounded-full bg-white bg-opacity-40 hover:opacity-75 flex justify-center items-center text-white text-xl font-semibold">
                        <X width={20} />
                    </button>
                </header>
                <form onSubmit={handleSubmit((data) => {
                    devotionalSubmitHandler(data, id)
                    onClose()
                    window.location.reload()
                })}
                    className="w-full flex flex-col items-center justify-center gap-1" >
                    <div className="w-[95%] flex gap-2 px-4 items-center justify-center">
                        <div className="flex flex-col gap-1 py-2">
                            <label className="text-weirdBlack pl-1 font-semibold" htmlFor="book">Livro</label>
                            <select
                                tabIndex={1}
                                {...register("bookName", { required: true })}
                                onChange={e => onChangeBook(e.target.value)}
                                defaultValue={defaultValueBook}
                                className="w-full h-[40px] p-2 text-weirdBlack rounded border border-[#DCDCDC] bg-loginCardBgColor" name="chapter" id="chapter"
                            >
                                <option disabled>{defaultValueBook}</option>
                                {books.map((item: string, i: number) =>
                                    <option key={i} value={item}>{item}</option>
                                )}
                            </select>
                        </div>
                        <div className="flex flex-col gap-1 py-2">
                            <label className="text-weirdBlack pl-1 font-semibold" htmlFor="chapter">Capítulo</label>
                            <select
                                tabIndex={2}
                                {...register("bookChapter", { required: true })}
                                onChange={e => onChangeChapter(e.target.value)}
                                defaultValue={defaultValueChapter}
                                className="w-full h-[40px] p-2 text-weirdBlack rounded border border-[#DCDCDC] bg-loginCardBgColor" name="chapter" id="chapter"
                            >
                                <option disabled>{defaultValueChapter}</option>
                                {chaptersOptions.map((item: any, i: any) =>
                                    <option key={i} value={item}>{item}</option>
                                )}
                            </select>
                        </div>
                        <div className="whitespace-nowrap flex flex-col gap-1 py-2">
                            <label className="text-weirdBlack pl-1 font-semibold" htmlFor="verses">Versículos</label>
                            <Controller
                                render={({ field }) => (
                                    <Select {...field}
                                        tabIndex={3}
                                        onChange={e => onChangeVerses(e)}
                                        components={{ NoOptionsMessage }}
                                        options={versesOptions}
                                        placeholder={versesPlaceholder}
                                        isMulti
                                        styles={{
                                            control: (baseStyles) => ({
                                                ...baseStyles,
                                                color: 'white',
                                                backgroundColor: '#f3f6fd',
                                                width: '230px',
                                                height: '40px',
                                                border: '1px solid #DCDCDC',
                                            })
                                        }}
                                        id="verses"
                                        name="verses"
                                    />
                                )}
                                control={control}
                                name="verses"
                            />
                        </div>
                        <div className="flex flex-col gap-1 py-2">
                            <label className="text-weirdBlack pl-1 font-semibold" htmlFor="date">Data</label>
                            <input
                                tabIndex={4}
                                {...register("userDate", { required: true })}
                                onBlur={e => dateOnBlurHandler(e.target.value)}
                                type="date"
                                defaultValue={formattedCurrentDate}
                                className="w-full h-[40px] p-1 text-weirdBlack rounded border border-[#DCDCDC] bg-loginCardBgColor"
                            />
                        </div>
                    </div>
                    <div className="flex flex-col w-3/4">
                        <label htmlFor="subject" className="text-weirdBlack">Temas abordados na passagem</label>
                        <textarea
                            tabIndex={5}
                            {...register("subject", { required: true })}
                            className="text-[#2E3A59] w-full p-2 border-2 rounded-lg resize-none bg-loginCardBgColor" name="subject" id="subject" />
                    </div>
                    <div className="flex flex-col w-3/4">
                        <label htmlFor="learned" className="text-weirdBlack">O que aprendi com essa passagem?</label>
                        <textarea
                            tabIndex={6}
                            {...register("learned", { required: true })}
                            className="text-[#2E3A59] w-full p-2 border-2 rounded-lg resize-none bg-loginCardBgColor" name="learned" id="learned" />
                    </div>
                    <div className="flex flex-col w-3/4">
                        <label htmlFor="application" className="text-weirdBlack">Como aplicar em minha vida:</label>
                        <textarea
                            tabIndex={7}
                            {...register("application", { required: true })}
                            className=" text-[#2E3A59] w-full p-2 h-24 border-2 rounded-lg resize-none bg-loginCardBgColor" name="application" id="application" />
                    </div>
                    <div className="w-4/5 flex flex-col items-center gap-1 mt-3">
                        <button
                            disabled={disable}
                            tabIndex={8}
                            type="submit"
                            className={`w-1/2 h-14 p-2 ${disable ? 'bg-gray-400' : 'bg-mainPink'} text-white text-xl font-semibold rounded-xl`}
                        >
                            Editar
                        </button>
                    </div>
                </form>
            </div>
        </dialog >
    )
}

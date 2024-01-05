"use client"
import { books } from "@/utils/books"
import { useContext, useLayoutEffect, useRef } from "react"
import Select from 'react-select'
import { NoOptionsMessage } from '@/libs/reactSelect'
import { Controller } from "react-hook-form";
import { EReadingsAction } from "../../../../types/readings-types"
import useFilterReadings from "@/hooks/useFilterReadings"
import { X } from "lucide-react"
import { modalProps } from "../../../../types/utils-types"
import { ThemeContext } from "@/context/themeContex"
import { EThemeColor } from "../../../../types/enums-color-theme"

export default function ReadingModal({ open, onClose, }: modalProps) {

    const { themeValue } = useContext(ThemeContext)

    const ref = useRef<HTMLDialogElement>(null)

    useLayoutEffect(() => {
        if (open && !ref.current?.open) {
            ref.current?.showModal()
        } else if (!open && ref.current?.open) {
            ref.current?.close()
        }
    }, [open])

    const {
        book: { bookChaptersArr },
        data: { formattedCurrentDate },
        plan: { readingsPlanArr },
        functions: { onChangeBook, onChangeChapters, onChangeReadingPlanName, readingSubmitHandler, onBlurDuration },
        hookForm: { register, control, handleSubmit, isLoading, isSubmitting, isValidating },
        error: { setErrorMsg },
        defaultValues: { defaultValueBook, placeholderValueChapters, defaultValueReadingPlan },
    } = useFilterReadings(EReadingsAction.Create)

    window.addEventListener("keydown", (e) => {
        if (!open) return
        if (e.key !== 'Escape') return
        onClose()
    })

    return (
        <dialog ref={ref} className="hidden lg:block backdrop:bg-black backdrop:opacity-75 rounded-lg">
            <div className="w-[60vw] h-[80vh] overflow-hidden bg-white rounded-lg">
                <header className={`flex items-center justify-between p-2 px-4 ${themeValue === EThemeColor.Blue ? 'bg-dashboardCard' : 'bg-dashboardCardPink'} `}>
                    <h2 className="text-white text-xl font-semibold">Criar leitura</h2>
                    <button onClick={onClose} className="w-8 h-8 rounded-full bg-white bg-opacity-40 hover:opacity-75 flex justify-center items-center text-white text-xl font-semibold">
                        <X width={20} />
                    </button>
                </header>
                <form onSubmit={handleSubmit((data) => {
                    readingSubmitHandler(data)
                    onClose()
                    window.location.reload()
                })} className="w-full flex flex-col items-center gap-2 px-3 py-1">
                    <div className="w-4/5 flex flex-col gap-1">
                        <label className="text-weirdBlack pl-1 font-semibold" htmlFor="book">Livro</label>
                        <select
                            tabIndex={1}
                            {...register("bookName", { required: true })}
                            onChange={e => onChangeBook(e.target.value)}
                            onFocus={_ => setErrorMsg('')}
                            defaultValue={defaultValueBook}
                            id="book" className="p-2 text-weirdBlack rounded-md border bg-loginCardBgColor">
                            <option disabled>{defaultValueBook}</option>
                            {books.map((item: string, i: number) =>
                                <option key={i} value={item}>{item}</option>
                            )}
                        </select>
                    </div>
                    <div className="w-4/5 flex flex-col gap-1">
                        <label className="text-weirdBlack pl-1 font-semibold" htmlFor="chapters">Capítulos</label>
                        <Controller
                            render={({ field }) => (
                                <Select {...field}
                                    tabIndex={2}
                                    onFocus={_ => setErrorMsg('')}
                                    onChange={e => onChangeChapters(e)}
                                    components={{ NoOptionsMessage }}
                                    options={bookChaptersArr}
                                    placeholder={placeholderValueChapters}
                                    styles={{

                                        control: (baseStyles) => ({
                                            ...baseStyles,
                                            color: 'white',
                                            backgroundColor: '#f3f6fd',
                                        }),
                                    }}
                                    isMulti
                                />
                            )}
                            control={control}
                            name="bookChapters"
                        />

                    </div>
                    <div className="w-4/5 flex flex-col gap-1">
                        <label className="text-weirdBlack pl-1 font-semibold" htmlFor="date">Date</label>
                        <input
                            tabIndex={3}
                            {...register("userDate", { required: true })}
                            onFocus={_ => setErrorMsg('')}
                            defaultValue={formattedCurrentDate}
                            type="date" id="date" className=" p-1 text-weirdBlack rounded-md border bg-loginCardBgColor" />
                    </div>
                    <div className="w-4/5 flex flex-col gap-1">
                        <label className="text-weirdBlack pl-1 font-semibold" htmlFor="duration">Duração leitura(minutos)</label>
                        <input
                            tabIndex={4}
                            {...register("duration", { required: true })}
                            onBlur={e => onBlurDuration(e.target.value)}
                            type="number"
                            id="duration" className=" p-1 text-weirdBlack rounded-md border bg-loginCardBgColor" />
                    </div>
                    <div className="w-4/5 flex flex-col gap-1">
                        <label className="text-weirdBlack pl-1 font-semibold" htmlFor="duration">Plano de leitura</label>
                        <select
                            tabIndex={5}
                            {...register("readingPlan", { required: true })}
                            onChange={e => onChangeReadingPlanName(e.target.value)}
                            defaultValue={defaultValueReadingPlan}
                            className="p-2 text-weirdBlack rounded-md border bg-loginCardBgColor" name="chapter" id="chapter"
                        >
                            <option value={defaultValueReadingPlan} disabled>{defaultValueReadingPlan}</option>
                            {readingsPlanArr &&
                                readingsPlanArr.map((plan: { name: string, id: string }) => (
                                    <option key={plan.id} id={plan.id} value={plan.id}>{plan.name}</option>
                                ))}
                        </select>
                    </div>
                    <div className="w-4/5 flex justify-center gap-1">
                        <button
                            tabIndex={6}
                            disabled={isLoading || isSubmitting || isValidating}
                            type="submit"
                            className={`w-1/2 h-14 p-2 ${isLoading || isSubmitting || isValidating ? 'bg-gray-400' : `${themeValue === EThemeColor.Blue ? 'bg-mainPink' : 'bg-mainBlue'}`} text-white text-xl font-semibold rounded-xl`}
                        >
                            Criar
                        </button>
                    </div>
                </form>
            </div>
        </dialog >
    )
}

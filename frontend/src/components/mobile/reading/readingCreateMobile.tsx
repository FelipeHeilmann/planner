"use client"
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { books } from "@/utils/books";
import Select from 'react-select'
import useFilterReadings from "@/hooks/useFilterReadings";
import { NoOptionsMessage } from '@/libs/reactSelect'
import { Controller } from "react-hook-form";
import { EReadingsAction } from "../../../../types/readings-types";
import { useContext, useEffect, useState } from "react";
import { ThemeContext } from "@/context/themeContex";
import { EThemeColor } from "../../../../types/enums-color-theme";

export default function ReadingCreateMobile() {

    const { themeValue } = useContext(ThemeContext)

    const [isMounted, setIsMounted] = useState<boolean>()

    const {
        book: { bookChaptersArr },
        data: { formattedCurrentDate },
        plan: { readingsPlanArr },
        functions: { onChangeBook, onChangeChapters, onChangeDateHandler, onChangeReadingPlanName, readingSubmitHandler, onBlurDuration },
        hookForm: { register, control, handleSubmit, isLoading, isSubmitting },
        error: { setErrorMsg },
        defaultValues: { defaultValueBook, placeholderValueChapters, defaultValueReadingPlan },
    } = useFilterReadings(EReadingsAction.Create)

    useEffect(() => setIsMounted(true), [])

    return isMounted && (
        <>
            <div>
                <header className="w-full p-2 flex justify-between">
                    <div className="flex gap-3 items-center">
                        <Link href={'/leitura'}>
                            <ArrowLeft />
                        </Link>
                        <h3>Nova leitura</h3>
                    </div>
                </header>
                <section className={`w-full mb-[40px] p-2 flex flex-col min-h-screen ${themeValue === EThemeColor.Blue ? 'bg-mainBlue' : 'bg-mainPink'}`}>
                    <div className="w-full p-4 flex justify-center">
                        <h1 className="text-white text-2xl font-semibold">Adicione uma nova leitura da bíblia</h1>
                    </div>
                    <div className="w-full flex pt-4 flex-col gap-1 min-h-full p-3 bg-white rounded-[50px]">
                        <form onSubmit={handleSubmit((data) => {
                            readingSubmitHandler(data)
                        })} className="relative" >
                            <div className="w-full flex flex-col p-2 pt-4">
                                <label htmlFor="book" className="text-[#575353]">Livro</label>
                                <select
                                    tabIndex={1}
                                    {...register("bookName", { required: true })}
                                    onChange={e => onChangeBook(e.target.value)}
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
                            <div className="w-full flex flex-col gap-2 p-2">
                                <label htmlFor="chapters" className="text-[#575353]">Capítulo(s)</label>
                                <Controller
                                    render={({ field }) => (
                                        <Select {...field}
                                            tabIndex={2}
                                            onFocus={_ => setErrorMsg('')}
                                            onChange={e => onChangeChapters(e)}
                                            components={{ NoOptionsMessage }}
                                            options={bookChaptersArr}
                                            placeholder={placeholderValueChapters}
                                            isMulti
                                        />
                                    )}
                                    control={control}
                                    name="bookChapters"
                                />
                                <input id="chapters" hidden />
                            </div>
                            <div className="w-full flex flex-col gap-2 p-2">
                                <label htmlFor="date" className="text-[#575353]">Data</label>
                                <input
                                    tabIndex={3}
                                    {...register("userDate", { required: true })}
                                    onChange={e => onChangeDateHandler(e.target.value)}
                                    onFocus={_ => setErrorMsg('')}
                                    defaultValue={formattedCurrentDate}
                                    type="date" className="text-[#2E3A59] p-2 h-8 border-2 rounded-lg bg-[#F3F6FD]" name="date" id="date"
                                />
                            </div>
                            <div className="w-full flex flex-col gap-2 p-2">
                                <label htmlFor="duration" className="text-[#575353]">Duração leitura (minutos)</label>
                                <input
                                    tabIndex={4}
                                    {...register("duration", { required: true })}
                                    onBlur={e => onBlurDuration(e.target.value)}
                                    type="number" inputMode="numeric" className="p-2 h-8 border-2 rounded-lg bg-[#F3F6FD]" name="duration" id="duration"
                                />
                            </div>
                            <div className="w-full flex flex-col gap-2 p-2">
                                <label htmlFor="readingPlan" className="text-[#575353]">Plano de leitura</label>
                                <select
                                    tabIndex={5}
                                    {...register("readingPlan", { required: true })}
                                    onChange={e => onChangeReadingPlanName(e.target.value)}
                                    defaultValue={defaultValueReadingPlan}
                                    className="h-8 border-2 rounded-lg text-[#2E3A59] bg-[#F3F6FD]" name="chapter" id="readingPlan"
                                >
                                    <option value={defaultValueReadingPlan} disabled>{defaultValueReadingPlan}</option>
                                    {readingsPlanArr &&
                                        readingsPlanArr.map((plan: { name: string, id: string }) => (
                                            <option key={plan.id} id={plan.id} value={plan.id}>{plan.name}</option>
                                        ))}
                                </select>
                            </div>
                            <div className="w-full flex p-3 px-6 flex-col gap-1">
                                <button
                                    disabled={isSubmitting || isLoading}
                                    tabIndex={6}
                                    type="submit" className={`${isLoading || isSubmitting ? 'bg-gray-400' : `${themeValue === EThemeColor.Blue ? 'bg-mainBlue' : 'bg-mainPink'}`} w-full h-14 p-2  text-white text-base font-semibold rounded-3xl`}
                                >Adicionar leitura</button>
                            </div>
                        </form>
                    </div>
                </section >
            </div >
        </>
    )
}

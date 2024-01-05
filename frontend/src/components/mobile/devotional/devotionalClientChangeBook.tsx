"use client"
import Select from 'react-select'
import useFiterBooks from '@/hooks/useFilterBooks'
import { EnumActionFilterDevotional } from '../../../../types/devotinal-types'
import { TBooks } from '@/utils/books'
import { NoOptionsMessage } from '@/libs/reactSelect'
import { Controller } from 'react-hook-form'
import { useContext } from 'react'
import { ThemeContext } from '@/context/themeContex'
import { EThemeColor } from '../../../../types/enums-color-theme'

export default function DevotionalCreateMobileForm({ books }: { books: TBooks }) {
    const { themeValue } = useContext(ThemeContext)
    const {
        chapter: { chaptersOptions },
        verses: { versesOptions, versesPlaceholder },
        date: { formattedCurrentDate },
        hookForm: { control, handleSubmit, register },
        functions: { devotionalSubmitHandler, onChangeBook, onChangeDate, onChangeVerses, onChangeChapter },
        defaults: { defaultValueBook, defaultValueChapter },
        error: { errorMsg, setErrorMsg },
        disable,
    } = useFiterBooks(EnumActionFilterDevotional.Create)

    return (
        <>
            <form onSubmit={handleSubmit(data => (devotionalSubmitHandler(data)))} className="relative" >
                <div className="absolute z-10 text-red-600 text-sm text-end">{errorMsg}</div>
                <div className="w-full flex flex-col p-2 pt-4">
                    <label htmlFor="book" className="text-[#575353]">Livro</label>
                    <select
                        tabIndex={1}
                        {...register("bookName", { required: true })}
                        onChange={e => onChangeBook(e.target.value)}
                        onFocus={_ => setErrorMsg('')}
                        defaultValue={defaultValueBook}
                        className="h-8 border-2 rounded-lg bg-[#F3F6FD]" name="book" id="book"
                    >
                        <option disabled>{defaultValueBook}</option>
                        {books.map((item: string, i: number) =>
                            <option key={i} value={item}>{item}</option>
                        )}
                    </select>
                </div>
                <div className="w-full flex flex-col gap-2 p-2">
                    <label htmlFor="chapter" className="text-[#575353]">Capítulo</label>
                    <select
                        tabIndex={2}
                        {...register("bookChapter", { required: true })}
                        onChange={e => onChangeChapter(e.target.value)}
                        onFocus={_ => setErrorMsg('')}
                        defaultValue={defaultValueChapter}
                        className="h-8 border-2 rounded-lg bg-[#F3F6FD]" name="chapter" id="chapter"
                    >
                        <option disabled>{defaultValueChapter}</option>
                        {chaptersOptions.map((item: any, i: any) =>
                            <option key={i} value={item}>{item}</option>
                        )}
                    </select>
                </div>
                <div className="w-full flex flex-col p-2 gap-2">
                    <label className="text-[#575353]" htmlFor="verses">Versículo</label>
                    <Controller
                        render={({ field }) => (
                            <Select {...field}
                                tabIndex={3}
                                onChange={e => onChangeVerses(e)}
                                onFocus={_ => setErrorMsg('')}
                                components={{ NoOptionsMessage }}
                                options={versesOptions}
                                placeholder={versesPlaceholder}
                                isMulti
                                id="verses"
                                name="verses"
                            />
                        )}
                        control={control}
                        name="verses"
                    />
                </div>
                <div className="w-full flex flex-col gap-2 p-2">
                    <label htmlFor="date" className="text-weirdBlack">Data</label>
                    <input
                        tabIndex={4}
                        {...register("userDate", { required: true })}
                        onFocus={_ => setErrorMsg('')}
                        onChange={e => onChangeDate(e.target.value)}
                        defaultValue={formattedCurrentDate}
                        type="date"
                        className="p-2 h-8 border-2 rounded-lg bg-[#F3F6FD]" name="userDate" id="date"
                    />
                </div>
                <div className="w-full flex flex-col gap-2 p-2">
                    <label htmlFor="subject" className="text-weirdBlack">Temas abordados na passagem</label>
                    <textarea
                        tabIndex={5}
                        {...register("subject", { required: true })}
                        onFocus={_ => setErrorMsg('')}
                        className="text-[#2E3A59] p-2 h-14 border-2 rounded-lg resize-none bg-loginCardBgColor" name="subject" id="subject"
                    />
                </div>
                <div className="w-full flex flex-col gap-2 p-2">
                    <label htmlFor="learned" className="text-weirdBlack">O que aprendi com essa passagem?</label>
                    <textarea
                        tabIndex={6}
                        {...register("learned", { required: true })}
                        onFocus={_ => setErrorMsg('')}
                        className="text-[#2E3A59] p-2 h-20 border-2 rounded-lg resize-none bg-loginCardBgColor" name="learned" id="learned"
                    />
                </div>
                <div className="w-full flex flex-col gap-2 p-2">
                    <label htmlFor="application" className="text-weirdBlack">Como aplicar em minha vida:</label>
                    <textarea
                        tabIndex={7}
                        {...register("application", { required: true })}
                        onFocus={_ => setErrorMsg('')}
                        className=" text-[#2E3A59] p-2 h-20 border-2 rounded-lg resize-none bg-loginCardBgColor" name="application" id="application"
                    />
                </div>
                <div className="w-full flex p-3 px-6 flex-col gap-1">
                    <button
                        disabled={disable}
                        tabIndex={8}
                        type="submit" className={`w-full h-14 p-2 ${disable ? 'bg-gray-400' : `${themeValue === EThemeColor.Blue ? 'bg-mainBlue' : 'bg-mainPink'}`}  text-white text-base font-semibold rounded-3xl`}
                    >Criar devocional</button>
                </div>
            </form>
        </>
    )
}

"use client"
import { Plus, RotateCw } from "lucide-react";
import ReadingDesktopCard from "./readingDesktopCard";
import { useContext, useEffect, useState } from "react"
import Cookies from 'js-cookie'
import deleteResource from "@/api/deleteResources";
import { ThemeContext } from "@/context/themeContex";
import { EThemeColor } from "../../../../types/enums-color-theme";
import { axiosInstanceClient } from "@/libs/axiosAPICaller";
import { TReading } from "../../../../types/readings-types";
import dynamic from "next/dynamic";

export default function ReadingDesktop() {

    const { themeValue } = useContext(ThemeContext)

    const defaultDateFilterValue = "Ordernar por Data"
    const defaultBookFilterValue = "Livro"

    const [readingsFromServer, setReadingsServer] = useState<TReading[]>()
    const bookNamesArr = readingsFromServer?.map((items: any) => items.books.map((item: any) => item.name))
    const concatArr = bookNamesArr?.reduce((acc: any, current: any) => acc.concat(current), [])
    const cleanedUpBookNamesArr = [...new Set(concatArr)]

    const [readings, setReadings] = useState<TReading[]>()

    const [bookFilter, setBookFilter] = useState<any>()
    const [dateFilter, setDateFilter] = useState<any>()

    const [modalCreate, setModalCreate] = useState(false)

    const handleModal = () => {
        setModalCreate(!modalCreate)
    }

    const filterByBook = (event: any) => {
        const selectedBook = event.target.value
        setBookFilter(selectedBook)
        if (selectedBook === defaultBookFilterValue) {
            setReadings(readingsFromServer)
        } else {
            setReadings(readingsFromServer?.filter((item: any) => item.books.some((book: any) => book.name === selectedBook)))
        }
    }

    const filterByDate = (event: any) => {
        const filter = event.target.value
        setDateFilter(filter)
        readings?.forEach((obj: any) => {
            obj['date'] = new Date(obj.date)
        })
        switch (filter) {
            case 'Crescente':
                setReadings((prev: any) => prev.sort((a: any, b: any) => Number(a.date) - Number(b.date)))
                break
                ;;
            case 'Descrescente':
                setReadings((prev: any) => prev.sort((a: any, b: any) => Number(b.date) - Number(a.date)))
                break
                ;;
        }
    }

    const onClickRestartFilters = () => {
        setReadings(readingsFromServer)
        setBookFilter(defaultBookFilterValue)
        setDateFilter(defaultDateFilterValue)
        // router.refresh()
    }

    const handleDelete = async (id: string) => {
        await deleteResource('readings', id)
            .catch(err => console.error(err))
        fetchData()
        window.location.reload()
    }

    const fetchData = async () => {
        const token = Cookies.get('token')
        try {
            const res = await axiosInstanceClient.get('/readings', { headers: { Authorization: `Bearer ${token}` } })
            setReadingsServer(res.data)
            setReadings(res.data)
        } catch (err) {
            console.error(err)
        }
    }

    useEffect(() => {
        fetchData()
    }, [])


    const DynamicReadingModal = dynamic(() => import("./readingModal"))

    return (
        <>
            <main className="hidden mx-2 lg:flex w-full h-[89vh] overflow-hidden bg-white flex-col rounded-lg gap-3 p-3">
                {modalCreate && <DynamicReadingModal open={modalCreate} onClose={() => setModalCreate(false)} />}
                <header className="w-full flex flex-col gap-2">
                    <h1 className="text-weirdBlack font-semibold text-2xl">Esses são suas leituras da Bíblia</h1>
                    <div className="flex space-x-20">
                        <button
                            onClick={_ => handleModal()}
                            className={`flex gap-2 p-2 rounded-lg ${themeValue === EThemeColor.Pink ? 'bg-mainBlue' : 'bg-mainPink'} text-weirdWhite hover:bg-opacity-90 font-semibold`}
                        >
                            <Plus color='#F3F6FD' />
                            Nova Leitura
                        </button>
                        <div className="flex gap-3">
                            <select onChange={(event) => filterByDate(event)} value={dateFilter} className="cursor-pointer border-2 border-[#d2d2d2] rounded-xl" name="" id="">
                                <option value={defaultDateFilterValue}>{defaultDateFilterValue}</option>
                                <option value="Descrescente">Descrescente</option>
                                <option value="Crescente">Crescente</option>
                            </select>
                            <select onChange={(event) => filterByBook(event)} value={bookFilter} className="cursor-pointer border-2 border-[#d2d2d2] rounded-xl" name="" id="">
                                <option value={defaultBookFilterValue}>{defaultBookFilterValue}</option>
                                {cleanedUpBookNamesArr.map((item: any, i: number) =>
                                    <option key={i}>{item}</option>
                                )}
                            </select>
                            <div onClick={onClickRestartFilters} className="cursor-pointer border-2 flex justify-center items-center aspect-square border-[#d2d2d2] rounded-xl hover:bg-opacity-40 bg-gray-100 ">
                                <RotateCw width={20} />
                            </div>
                        </div>
                    </div>
                </header>
                <section className="w-full flex flex-col gap-2">
                    <header className="grid grid-cols-6 p-3 justify-items-center rounded-t-lg bg-navbarMobileIconColor">
                        <h2 className="text-weirdBlack font-semibold text-lg">Livro</h2>
                        <h2 className="text-weirdBlack font-semibold text-lg">Capítulos</h2>
                        <h2 className="text-weirdBlack font-semibold text-lg">Duração</h2>
                        <h2 className="text-weirdBlack font-semibold text-lg">Plano</h2>
                        <h2 className="text-weirdBlack font-semibold text-lg">Data</h2>
                        <h2 className="text-weirdBlack font-semibold text-lg">Editar</h2>
                    </header>
                    <section className="flex flex-col gap-2 h-[61vh] overflow-y-scroll ">
                        {readings?.map((reading: any) =>
                            <ReadingDesktopCard
                                handleDelete={() => handleDelete(reading.id)}
                                key={reading.id}
                                books={reading.books} date={reading.date}
                                id={reading.id} planTitle={reading.readingPlan}
                                timeSpent={reading.duration}
                            />
                        )}
                    </section>
                </section>
            </main>
        </>
    )
}

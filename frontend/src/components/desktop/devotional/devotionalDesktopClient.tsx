"use client"
import { Pencil, Plus, RotateCw } from "lucide-react";
import DevotionalDesktopCard from "./devotionalDesktopCard";
import { useContext, useEffect, useState } from 'react'
import { axiosInstanceClient } from "@/libs/axiosAPICaller";
import Cookies from 'js-cookie'
import deleteResource from "@/api/deleteResources";
import { TDevotional } from "../../../../types/devotinal-types"
import { EThemeColor } from "../../../../types/enums-color-theme";
import { ThemeContext } from "@/context/themeContex";
import dynamic from "next/dynamic";

type modalText = {
    title: string
    button: string
    id: string | null
}

export default function DevotionalDesktopClient({ devotionalsFromServer }: { devotionalsFromServer: TDevotional[] }) {

    const defaultDateFilterValue = "Ordernar por Data"
    const defaultBookFilterValue = "Livro"
    const defaultMonthFilterValue = "Mês"

    const { themeValue } = useContext(ThemeContext)

    const devotionalsBooks = devotionalsFromServer.map(item => item.book.name)
    const cleanedUpDevotionalsBooks = [...new Set(devotionalsBooks)]

    const allDates = devotionalsFromServer.map(item => new Date(item.date)).sort((a, b) => Number(a) - Number(b))
    const allDatesToUserSelect = allDates.map(date => {
        const getYear = String(date.getFullYear()).slice(2)
        const getMonth = date.toLocaleString('pt-br', { month: 'short' }).replace('.', '')
        return `${getMonth}-${getYear}`
    })
    const cleanedUpArrOfMonths = [...new Set(allDatesToUserSelect)]

    const [devotionals, setDevotionals] = useState<any[]>(devotionalsFromServer)

    const [bookFilter, setBookFilter] = useState<string>()
    const [dateFilter, setDateFilter] = useState<string>()
    const [monthFilter, setMonthFilter] = useState<string>()

    const [modalCreate, setModalCreate] = useState(false)

    const handleModal = (type: string, event: any, id: string | null) => {
        event.stopPropagation()
        setModalCreate(true)
    }

    const fetchData = async () => {
        try {
            const { data } = await axiosInstanceClient.get('/devotionals',
                { headers: { Authorization: `Bearer ${Cookies.get('token')}` } })
            setDevotionals(data)
        } catch (err) {
            console.error(err)
        }
    }

    const handleDelete = async (id: string) => {
        await deleteResource('devotionals', id)
            .catch(err => console.error(err))
        fetchData()
    }

    const filterByDate = (e: string) => {
        const filter = e
        setDateFilter(filter)
        devotionals?.forEach((obj: any) => {
            obj['date'] = new Date(obj.date)
        })
        switch (e) {
            case 'Crescente':
                setDevotionals(prev => prev.sort((a: any, b: any) => Number(a.date) - Number(b.date)))
                break
                ;;
            case 'Decrescente':
                setDevotionals(prev => prev.sort((a: any, b: any) => Number(b.date) - Number(a.date)))
                break
                ;;
            case defaultDateFilterValue:
                setDevotionals(devotionalsFromServer)
                break
                ;;
        }
    }

    const filterByMonth = (e: string) => {
        const filter = e
        setMonthFilter(filter)
        if (filter === defaultMonthFilterValue) {
            setDevotionals(devotionalsFromServer)
        } else {
            setDevotionals(devotionalsFromServer.filter(item => {
                const date = new Date(item.date)
                const getYear = String(date.getFullYear()).slice(2)
                const getMonth = date.toLocaleString('pt-br', { month: 'short' }).replace('.', '')
                const selectedDate = `${getMonth}-${getYear}`
                return selectedDate === filter
            }))
        }
    }
    const onClickRestartFilters = () => {
        setDevotionals(devotionalsFromServer)
        setBookFilter(defaultBookFilterValue)
        setDateFilter(defaultDateFilterValue)
        // router.refresh()
    }

    const filterByBook = (e: string) => {
        const selectedBook = e
        setBookFilter(selectedBook)
        if (selectedBook === defaultBookFilterValue) {
            setDevotionals(devotionalsFromServer)
        } else {
            setDevotionals(devotionalsFromServer.filter(item => item.book).filter(item => item.book.name === selectedBook))
        }
    }

    useEffect(() => {
        fetchData()
    }, [])

    const DyamicDevotionalModal = dynamic(() => import('./devotionalModal'), { ssr: false })

    return devotionals && (
        <>
            {modalCreate && <DyamicDevotionalModal onClose={() => setModalCreate(false)} open={modalCreate} />}
            <main className="hidden mx-2 lg:flex w-full bg-white h-[89vh] overflow-hidden flex-col rounded-lg gap-2 px-3 py-3">
                <header className="w-full flex flex-col gap-2">
                    <h1 className="text-weirdBlack font-semibold text-2xl">Registre aqui seus aprendizados devocionais</h1>
                    <div className="flex space-x-20">
                        <button
                            tabIndex={1}
                            onClick={(event) => handleModal('Create', event, null)}
                            className={`flex gap-2 p-2 rounded-lg ${themeValue === EThemeColor.Blue ? 'bg-mainBlue' : 'bg-mainPink'} hover:bg-opacity-90 text-weirdWhite font-semibold`}
                        >
                            <Plus color="#F3F6FD" />
                            Novo devocional
                        </button>
                        <div className="flex gap-3">
                            <select
                                tabIndex={2}
                                onChange={e => filterByDate(e.target.value)}
                                className="p-1 border rounded-lg" name="" id=""
                            >
                                <option value={defaultDateFilterValue}>{defaultDateFilterValue}</option>
                                <option value="Crescente">Crescente</option>
                                <option value="Decrescente">Descrescente</option>
                            </select>
                            <select
                                tabIndex={3}
                                onChange={e => filterByBook(e.target.value)}
                                value={bookFilter}
                                className="p-1 border rounded-lg" name="" id=""
                            >
                                <option value={defaultBookFilterValue}>{defaultBookFilterValue}</option>
                                {cleanedUpDevotionalsBooks.map((item: any, i: number) =>
                                    <option key={i}>{item}</option>
                                )}
                            </select>

                            <select
                                tabIndex={4}
                                onChange={e => filterByMonth(e.target.value)}
                                value={monthFilter}
                                className="p-1 border rounded-lg" name="" id=""
                            >
                                <option value={defaultMonthFilterValue}>{defaultMonthFilterValue}</option>
                                {cleanedUpArrOfMonths && cleanedUpArrOfMonths.map((item, i) => {
                                    return <option key={i} value={item}>{item}</option>
                                })
                                }
                            </select>
                            <div
                                tabIndex={5}
                                onClick={onClickRestartFilters}
                                onKeyDown={e => e.key === 'Enter' ? onClickRestartFilters() : null}
                                className="cursor-pointer border flex justify-center items-center aspect-square rounded-lg hover:bg-opacity-40 bg-gray-100 "
                            >
                                <RotateCw width={20} />
                            </div>
                        </div>
                    </div>
                </header>
                <section className="bg-white w-full p-2 grid grid-cols-4">
                    <div className="flex gap-2 border-l border-b border-t p-1 items-center">
                        <div className={`w-7 aspect-square flex items-center rounded-md justify-center ${themeValue === EThemeColor.Blue ? 'bg-mainBlue' : 'bg-mainPink'}`}>
                            <Pencil color="#F3F6FD" className="w-5" />
                        </div>
                        <h2 className="text-weirdBlack font-semibold text-md">Devocional</h2>
                    </div>
                    <div className="w-full flex gap-1 items-center border-b border-t p-1">
                        <span className={`w-7 aspect-square flex items-center text-weirdWhite text-xl font-semibold rounded-md justify-center ${themeValue === EThemeColor.Blue ? 'bg-mainBlue' : 'bg-mainPink'}`}>
                            T
                        </span>
                        <h2 className="text-weirdBlack font-semibold text-[1vw]">ema aborado</h2>
                    </div>
                    <div className="w-full flex gap-1 items-center border-b border-t p-1">
                        <span className={`w-7 aspect-square flex items-center text-weirdWhite text-xl font-semibold rounded-md justify-center ${themeValue === EThemeColor.Blue ? 'bg-mainBlue' : 'bg-mainPink'}`}>
                            O
                        </span>
                        <h2 className="text-weirdBlack font-semibold text-[1vw]">que eu  aprendi com essa passagem?</h2>
                    </div>

                    <div className="w-full flex gap-1 items-center border-b border-r border-t p-1">
                        <span className={`w-7 aspect-square flex items-center text-weirdWhite text-xl font-semibold rounded-md justify-center ${themeValue === EThemeColor.Blue ? 'bg-mainBlue' : 'bg-mainPink'}`}>
                            C
                        </span>
                        <h2 className="text-weirdBlack font-semibold text-[1vw]">omo aplicar em minha vida?</h2>
                    </div>
                </section>
                <div className="flex flex-col gap-y-1 h-[61vh] overflow-y-scroll">
                    {
                        devotionals?.map(devotional =>
                            <DevotionalDesktopCard
                                key={devotional.id}
                                id={devotional.id} book={devotional.book}
                                application={devotional.application}
                                date={devotional.date}
                                learned={devotional.learned}
                                subject={devotional.subject}
                                verses={devotional.verses}
                                handleDelete={() => handleDelete(devotional.id)}
                            />
                        )}
                </div>
            </main>
        </>
    )
}

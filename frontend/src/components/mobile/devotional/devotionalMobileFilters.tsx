"use client"
import { ChevronRight, FileEdit, Trash, RotateCcw } from "lucide-react"
import { useContext, useEffect, useState } from 'react'
import Link from "next/link"
import { ExclamationCircleFilled } from '@ant-design/icons';
import { TDevotional } from "../../../../types/devotinal-types"
import { ThemeContext } from "@/context/themeContex"
import { EThemeColor } from "../../../../types/enums-color-theme"
import { useRouter } from "next/navigation";

export default function DevotionalMobileContent({ devotionalsArrayProp }: { devotionalsArrayProp: TDevotional[] }) {

    const devotionalsFromServer = devotionalsArrayProp

    const defaultDateFilterValue = "Ordernar por Data"
    const defaultBookFilterValue = "Livro"

    const bookNamesArr = devotionalsFromServer.map((item: any) => item.book.name)
    const cleanedUpBookNamesArr = [...new Set(bookNamesArr)]

    const [devotionals, setDevotionals] = useState<TDevotional[]>()

    const [bookFilter, setBookFilter] = useState<any>('')
    const [dateFilter, setDateFilter] = useState<any>('')

    const [stateFlag, setStateFlag] = useState<boolean>(false)

    const router = useRouter()

    const filterByBook = (event: any): void => {
        setStateFlag(true)
        const book = event.target.value
        setBookFilter(book)
        if (book === defaultBookFilterValue) {
            setDevotionals(devotionalsFromServer)
        } else {
            setDevotionals(devotionalsFromServer.filter((item: any) => item.book.name === book))
        }
    }

    const filterByDate = (event: any) => {
        setStateFlag(true)
        const filter = event.target.value
        setDateFilter(filter)
        devotionals?.forEach((obj: any) => {
            obj['date'] = new Date(obj.date)
        })
        switch (filter) {
            case 'Crescente':
                setDevotionals(devotionals?.sort((a: any, b: any) => Number(a.date) - Number(b.date)))
                break
                ;;
            case 'Descrescente':
                setDevotionals(devotionals?.sort((a: any, b: any) => Number(b.date) - Number(a.date)))
        }
    }

    const handleDelete = async (id: string) => {
        const deleteResource = (await (import("@/api/deleteResources"))).default
        await deleteResource('devotionals', id)
            .catch(err => console.error(err))
        window.location.reload()
    }

    const showDeleteModal = async (id: string) => {
        const Modal = (await (import('antd'))).Modal
        Modal.confirm({
            title: 'Deseja mesmo excluir essa devocional?',
            icon: <ExclamationCircleFilled />,
            okText: 'Sim',
            okType: 'danger',
            cancelText: 'Cancelar',
            onOk() {
                handleDelete(id);
            },
            onCancel() {
            },
        })
    }

    const onClickRestartFilters = () => {
        setDevotionals(devotionalsFromServer)
        setBookFilter(defaultBookFilterValue)
        setDateFilter(defaultDateFilterValue)
    }

    const parseDate = (value: string) => {
        const date = new Date(value)
        const year = String(date.getFullYear()).slice(2)
        const month = date.getMonth() + 1
        const day = date.getDate()
        return `${day}-${month}-${year}`
    }

    useEffect(() => {
        setDevotionals(devotionalsFromServer)
        router.refresh()
    }, [])

    const { themeValue } = useContext(ThemeContext)

    return (
        <>
            <div className="w-full flex p-3 justify-between">
                <select onChange={(event) => filterByDate(event)} value={dateFilter} className="border-2 border-[#d2d2d2] rounded-xl" name="" id="">
                    <option value={defaultDateFilterValue}>{defaultDateFilterValue}</option>
                    <option value="Descrescente">Descrescente</option>
                    <option value="Crescente">Crescente</option>
                </select>

                <select onChange={(event) => filterByBook(event)} value={bookFilter} className="border-2 border-[#d2d2d2] rounded-xl" name="" id="">
                    <option value={defaultBookFilterValue}>{defaultBookFilterValue}</option>
                    {cleanedUpBookNamesArr.map((item: any) =>
                        <option key={item}>{item}</option>
                    )}
                </select>
                <button >
                    <RotateCcw width={20} onClick={onClickRestartFilters} />
                </button>
            </div>
            <div className="mb-[56px] h-[calc(100vh-270px)] overflow-y-scroll w-full flex flex-col gap-2">
                {!stateFlag ?
                    devotionalsArrayProp?.map((item: any) =>
                        <div key={item.id} >
                            <div className="w-full flex border-2 p-2 border-[#d2d2d2] rounded-xl">
                                <div className="w-1/4 flex flex-col gap-2">
                                    <h4 className={`${themeValue === EThemeColor.Blue ? 'text-mainBlue' : 'text-mainPink'}`}>{item.book.name}</h4>
                                    <p className={`${themeValue === EThemeColor.Blue ? 'text-mainBlue' : 'text-mainPink'}`}>{item.book.chapter}:{item.verses[0]}-{item.verses[item.verses.length - 1]}</p>
                                    <nav className="w-full flex gap-2">
                                        <button className="" onClick={() => showDeleteModal(item.id)}>
                                            <Trash width={18} />
                                        </button>
                                    </nav>
                                </div>
                                <div className="flex-1 flex gap-3 items-center">
                                    <p className="text-sm max-w-[140px] whitespace-nowrap overflow-x-hidden text-ellipsis"><span className="font-semibold text-sm">Tema: </span>{item.subject}</p>
                                    <section className="flex-1 h-full flex flex-col gap-2">
                                        <Link className="w-full flex justify-end" href={`/devocional/editar/${item.id}`}><FileEdit width={18} /></Link>
                                        <Link href={`/devocional/${item.id}`} className="flex-1 h-full flex justify-between flex-col">
                                            <div className={`w-7 aspect-square self-end rounded-full flex items-center justify-center ${themeValue === EThemeColor.Blue ? 'bg-mainBlue' : 'bg-mainPink'}`}> <ChevronRight color="white" /> </div>
                                            <p className="text-sm self-end">{parseDate(item.date)}</p>
                                        </Link>
                                    </section>
                                </div>
                            </div>
                        </div>
                    ) :
                    devotionals?.map((item: any) =>
                        <div key={item.id}>
                            <div className="w-full flex border-2 p-2 border-[#d2d2d2] rounded-xl">
                                <div className="w-1/4 flex flex-col gap-2">
                                    <h4 className={`${themeValue === EThemeColor.Blue ? 'text-mainBlue' : 'text-mainPink'}`}>{item.book.name}</h4>
                                    <p className={`${themeValue === EThemeColor.Blue ? 'text-mainBlue' : 'text-mainPink'}`}>{item.book.chapter}:{item.verses[0]}-{item.verses[item.verses.length - 1]}</p>
                                    <nav className="w-full flex gap-2">
                                        <button className="" onClick={() => showDeleteModal(item.id)}>
                                            <Trash width={18} />
                                        </button>
                                    </nav>
                                </div>
                                <div className="flex-1 flex gap-3 items-center">
                                    <p className="text-sm max-w-[140px] whitespace-nowrap overflow-x-hidden text-ellipsis"><span className="font-semibold text-sm">Tema: </span>{item.subject}</p>
                                    <section className="flex-1 h-full flex flex-col gap-2">
                                        <Link className="w-full flex justify-end" href={`/devocional/editar/${item.id}`}><FileEdit width={18} /></Link>
                                        <Link href={`/devocional/${item.id}`} className="flex-1 h-full flex justify-between flex-col">
                                            <div className={` w-7 aspect-square self-end rounded-full flex items-center justify-center ${themeValue === EThemeColor.Blue ? 'bg-mainBlue' : 'bg-mainPink'}`}> <ChevronRight color="white" /> </div>
                                            <p className="text-sm self-end">{parseDate(item.date)}</p>
                                        </Link>
                                    </section>
                                </div>
                            </div>
                        </div>
                    )}
            </div>
        </>
    )
}

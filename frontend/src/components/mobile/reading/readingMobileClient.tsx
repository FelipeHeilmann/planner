"use client"
import { Book, FileEdit, RotateCw, Trash } from "lucide-react";
import { ExclamationCircleFilled } from '@ant-design/icons';
import { useContext, useEffect, useState } from "react";
import Link from "next/link";
import { timestampToUser } from "@/utils/dateParser";
import deleteResource from "@/api/deleteResources";
import { useRouter } from "next/navigation";
import Cookies from 'js-cookie'
import { axiosInstanceClient } from "@/libs/axiosAPICaller";
import { ThemeContext } from "@/context/themeContex";
import { EThemeColor } from "../../../../types/enums-color-theme";

export default function ReadingMobileClient() {

    const defaultDateFilterValue = "Ordernar por Data"
    const defaultBookFilterValue = "Livro"

    const [readingsFromServer, setReadingsServer] = useState<any>()
    const bookNamesArr = readingsFromServer?.map((items: any) => items.books.map((item: any) => item.name))
    const concatArr = bookNamesArr?.reduce((acc: any, current: any) => acc.concat(current), [])
    const cleanedUpBookNamesArr = [...new Set(concatArr)]

    const { themeValue } = useContext(ThemeContext)

    const router = useRouter()

    const [readings, setReadings] = useState<any>()

    const [bookFilter, setBookFilter] = useState<any>()
    const [dateFilter, setDateFilter] = useState<any>()

    const [_, setDeleteFlag] = useState<boolean>(false)

    const filterByBook = (event: any) => {
        const selectedBook = event.target.value
        setBookFilter(selectedBook)
        if (selectedBook === defaultBookFilterValue) {
            setReadings(readingsFromServer)
        } else {
            setReadings(readingsFromServer.filter((item: any) => item.books.some((book: any) => book.name === selectedBook)))
        }
    }

    const filterByDate = (event: any) => {
        const filter = event.target.value
        setDateFilter(filter)
        readings.forEach((obj: any) => {
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
        setDeleteFlag(true)
        fetchData()
    }

    const showDeleteModal = async (id: string) => {
        const { Modal } = await (import('antd'))
        Modal.confirm({
            title: 'Deseja mesmo excluir essa leitura?',
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

    const fetchData = async () => {
        try {
            const token = Cookies.get('token')
            const res = await axiosInstanceClient.get('/readings', { headers: { Authorization: `Bearer ${token}` } })
            setReadingsServer(res.data)
            setReadings(res.data)
        } catch (err) {
            console.error(err)
        }
    }

    useEffect(() => {
        fetchData()
        router.refresh()
    }, [])

    return (
        <>
            <div className="w-full flex p-3 justify-between">
                <select onChange={(event) => filterByDate(event)} value={dateFilter} className="border-2 border-[#d2d2d2] rounded-xl" name="dateFilter" id="dateFilter">
                    <option value={defaultDateFilterValue}>{defaultDateFilterValue}</option>
                    <option value="Descrescente">Descrescente</option>
                    <option value="Crescente">Crescente</option>
                </select>

                <select onChange={(event) => filterByBook(event)} value={bookFilter} className="border-2 border-[#d2d2d2] rounded-xl" name="bookFilter" id="bookFilter">
                    <option value={defaultBookFilterValue}>{defaultBookFilterValue}</option>
                    {cleanedUpBookNamesArr.map((item: any, i: number) =>
                        <option key={i}>{item}</option>
                    )}
                </select>
                <RotateCw width={20} onClick={onClickRestartFilters} />
            </div>
            <section className="h-full mb-[9vh] w-full overflow-x-hidden overflow-y-scroll">
                {readings &&
                    readings.map((item: any) =>
                        <div key={item.id} className="w-full flex mb-2 justify-between">
                            <section className="flex gap-2" >
                                <div className={`h-2/3 aspect-square p-2 ${themeValue === EThemeColor.Blue ? 'bg-mainBlue' : 'bg-mainPink'} rounded-lg flex self-center justify-center items-center`}>
                                    <Book color="white" />
                                </div>
                                <div className="flex self-center flex-col w-[140px]">
                                    <h3 className="text-[#575353] text-lg font-semibold text-ellipsis overflow-hidden">{item.books[0].name}</h3>
                                    <p className="font-light w-full whitespace-nowrap text-ellipsis overflow-hidden">{(item.books.map((book: any, i: number) => {
                                        if (item.books.length - 1 === i) {
                                            return `${book.chapter}`
                                        }
                                        return `${book.chapter}-`
                                    }))}</p>
                                </div>
                            </section>
                            <section className="flex justify-between flex-1 items-center">
                                <div className="flex flex-col">
                                    {item.readingPlan && <p className="w-[110px] whitespace-nowrap text-ellipsis overflow-hidden"><span className="font-semibold">Plano: </span>{item.readingPlan.name}</p>}
                                    <p className="text-weirdBlack flex gap-[2px]"><span className="max-w-[50px] overflow-hidden whitespace-nowrap text-ellipsis">{item.duration}</span><span className="pl-1 justify-self-end">min</span></p>
                                </div>
                                <div className="flex flex-col justify-self-end justify-between h-full">
                                    <nav className="flex justify-end gap-6">
                                        <button onClick={() => showDeleteModal(item.id)}>
                                            <Trash width={15} />
                                        </button>
                                        <Link
                                            href={`/leitura/editar/${item.id}`}
                                            prefetch={false}
                                        >
                                            <FileEdit width={15} />
                                        </Link>
                                    </nav>
                                    <p className="text-weirdBlack text-xs">{timestampToUser(item.date)}</p>
                                </div>
                            </section>
                        </div>
                    )}
            </section>
        </>
    )
}

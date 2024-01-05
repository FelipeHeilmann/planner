import { Edit, Trash } from "lucide-react";
import { ExclamationCircleFilled } from '@ant-design/icons'
import { useContext, useState } from "react";
import { timestampToUser } from "@/utils/dateParser";
import { ThemeContext } from "@/context/themeContex";
import { EThemeColor } from "../../../../types/enums-color-theme";
import dynamic from "next/dynamic";

type CardProps = {
    id: string,
    verses: number[]
    book: {
        id: number
        name: string,
        chapter: number
        verses: number
        words: number
        testamentId: number
    },
    subject: string
    learned: string
    application: string
    date: string
    handleDelete: (id: string) => void
}

export default function DevotionalDesktopCard({ id, verses, book, subject, learned, application, date, handleDelete }: CardProps) {

    const { themeValue } = useContext(ThemeContext)

    const [modalEdit, setModalEdit] = useState(false)
    const [_, setDetailModal] = useState(false)

    //  87k de js só essa merda aqui socorro
    const showDeleteModal = async (event: any) => {
        event.stopPropagation()
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

    const showEditModal = (event: any) => {
        event.stopPropagation()
        setModalEdit(true)
    }

    const showDetailModal = (event: any) => {
        event.stopPropagation()
        setDetailModal(true)
    }

    const DyamicDevotionaEditModal = dynamic(() => import('./devotionalEditModal'), { ssr: false })

    return (
        <>
            {modalEdit && <DyamicDevotionaEditModal id={id} onClose={() => setModalEdit(false)} open={modalEdit} />}
            <div
                onClick={((event) => showDetailModal(event))}
                className="py-1 w-full cursor-pointer grid grid-cols-4 pl-4 pr-2"
            >
                <div className="flex flex-col border p-2">
                    <div className="flex justify-between">
                        <nav className="flex gap-3 items-center">
                            <button
                                onClick={(event) => showEditModal(event)}
                            >
                                <Edit width={20} className="#d2d2d2" />
                            </button>
                            <button
                                onClick={(event) => showDeleteModal(event)}
                            >
                                <Trash width={20} className="#d2d2d2" />
                            </button>
                        </nav>
                        <p className="text-sm text-[#d2d2d2] font-light">{timestampToUser(date)}</p>
                    </div>
                    <div className="flex flex-col">
                        <h3 className={`${themeValue === EThemeColor.Blue ? 'text-mainBlue' : 'text-mainPink'} font-semibold text-lg`}>{book.name}</h3>
                        <h3 className={`${themeValue === EThemeColor.Blue ? 'text-mainBlue' : 'text-mainPink'} font-semibold text-lg`}>{book.chapter}:{verses[0]}-{verses[verses.length - 1]}</h3>
                    </div>
                </div>
                <div className="flex items-center p-2 border h-[25vh]">
                    <p className="text-weirdBlack font-light text-base whitespace-nowrap overflow-hidden text-ellipsis">{subject}</p>
                </div>
                <div className="flex items-center p-2 border h-[25vh]">
                    <p className="text-weirdBlack font-light w-full h-full text-base overflow-hidden">{learned}</p>
                </div>
                <div className="flex items-center p-2 border h-[25vh]">
                    <p className="text-weirdBlack font-light w-full h-full text-base overflow-hidden">{application}</p>
                </div>
            </div>
        </>
    )
}

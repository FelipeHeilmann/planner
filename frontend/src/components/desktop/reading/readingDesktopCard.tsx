"use client"
import { Book, Edit, Trash } from "lucide-react";
import { ExclamationCircleFilled } from '@ant-design/icons'
import { timestampToUser } from "@/utils/dateParser";
import { useContext, useState } from "react";
import { ThemeContext } from "@/context/themeContex";
import { EThemeColor } from "../../../../types/enums-color-theme";
import dynamic from "next/dynamic";

export default function ReadingDesktopCard({ id, books, date, planTitle, timeSpent, handleDelete }: any) {

    const { themeValue } = useContext(ThemeContext)

    const [modalEdit, setModalEdit] = useState(false)
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

    const DynamicReadingEditModal = dynamic(() => import('./readingEditDesktop'))

    return (
        <>
            {modalEdit && <DynamicReadingEditModal id={id} onClose={() => setModalEdit(false)} open={modalEdit} />}
            <div className="grid grid-cols-6 border p-2 rounded-md">
                <div className="flex gap-2 items-center">
                    <div className={`w-7 h-7 rounded-md ${themeValue === EThemeColor.Blue ? 'bg-mainBlue' : 'bg-mainPink '}  flex items-center justify-center`}>
                        <Book color="#F3F6FD" />
                    </div>
                    <p className="font-semibold text-weirdBlack text-md">{books[0].name}</p>
                </div>
                <p className="font-semibold text-weirdBlack text-md text-center">{books[0].chapter}-{books[books.length - 1].chapter}</p>
                <p className="font-normal text-weirdBlack text-md text-center whitespace-nowrap overflow-hidden text-ellipsis">{timeSpent} {timeSpent > 1 ? 'minutos' : 'minuto'}</p>
                <p className="font-normal text-weirdBlack text-md text-center whitespace-nowrap overflow-hidden text-ellipsis">{planTitle !== null && planTitle.name}</p>
                <p className="font-normal text-weirdBlack text-md text-center">{timestampToUser(date)}</p>
                <div className="flex gap-2 items-center justify-center">
                    <button onClick={(event) => setModalEdit(true)}>
                        <Edit color="#d2d2d2" />
                    </button>
                    <button onClick={() => showDeleteModal(id)}>
                        <Trash color="#d2d2d2" />
                    </button>
                </div>
            </div>
        </>
    )
}

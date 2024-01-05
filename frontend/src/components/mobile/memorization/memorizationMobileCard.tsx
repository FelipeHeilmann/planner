import { CheckCircle2, FileEdit, History, Plus, Trash } from "lucide-react";
import Link from "next/link";
import { timestampToUser } from "@/utils/dateParser";
import { ExclamationCircleFilled } from '@ant-design/icons'
import { useState } from "react";
import addResourceDate from "@/api/addResourceDate";

type memorizationProps = {
    id: string
    description: string
    verse: number
    book: {
        id: number
        name: string
        chapter: number
        verses: number
        words: number
        testamentId: number
    },
    timesMemorized: string[]
    status: string
    onClickedMemorized: (isClicked: boolean) => Promise<void>
    handleFinished: (id: string) => void
    handleDelete: (id: string) => void
    handleModal: (isOpen: boolean) => void
    isFinishedModalOpen: boolean
    theme: string
}

export default function MemorizationMobileCard({ id, description, book, verse, timesMemorized, status, isFinishedModalOpen, onClickedMemorized, handleModal, handleDelete, handleFinished, theme }: memorizationProps) {
    const [timesMemorizedCounter, setTimesMemorizedCounter] = useState(timesMemorized.length)
    const [disabled, setDisabled] = useState<boolean>(false)

    const delay = async (ms: number = 500) => {
        setDisabled(true)
        await new Promise(resolve => setTimeout(resolve, ms))
            .catch(err => console.error(err))
        setDisabled(false)
    }

    const handleAddMemorizedDate = async () => {
        delay()
        await addResourceDate('memorizations', id, 'memorized', new Date())
            .catch(err => console.error(err))
        setTimesMemorizedCounter(prev => prev + 1)
        onClickedMemorized(true)
    }

    const showDeleteModal = async (id: string) => {
        const { Modal } = await (import('antd'))
        Modal.confirm({
            title: 'Deseja mesmo excluir essa memorização?',
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

    const showHisotryModal = async () => {
        const { Modal } = await (import('antd'))
        Modal.info({
            title: 'Histórico de memorizações',
            okText: 'Sim',
            okType: "default",
            content: (
                <ul className="flex flex-col gap-2">
                    {timesMemorized?.map((date, i) =>
                        <li className="text-md" key={i + 1}>{timestampToUser(date)} - <span className="font-semibold">{i + 1}ª vez</span></li>
                    )}
                </ul>
            ),
        })
    }

    const confirmDeleteModal = async () => {
        const { Modal } = await (import('antd'))
        Modal.info({
            title: "Deseja mesmo concluir essa memorização?",
            open: isFinishedModalOpen,
            onOk: () => handleFinished(id),
            okType: "default",
            onCancel: () => handleModal(false),
            okText: "Sim",
            cancelText: "Cancelar",
        })
    }

    return (
        <div className="w-full flex flex-col gap-2 p-2 border rounded shadow-lg">
            <div className="w-full justify-between items-center flex">
                <h3 className={`text-${theme} font-normal text-lg`}>{book.name} {book.chapter}:{verse}</h3>
                <nav className="flex items-center justify-end gap-8">
                    <button onClick={() => showDeleteModal(id)}>
                        <Trash width={18} color="#D2D2D2" />
                    </button>
                    {status !== 'Finalizado' &&
                        <Link
                            href={`/memorizacao/editar/${id}`}
                            prefetch={false}
                        >
                            <FileEdit width={18} color="#D2D2D2" />
                        </Link>
                    }
                </nav>
            </div>
            <div className="w-full">
                <p className="text-weirdBlack w-[calc(100%-20px)] whitespace-nowrap overflow-hidden text-ellipsis text-sm font-light">{description}</p>
            </div>
            <div className="flex flex-col gap-1">
                <div className="flex flex-col">
                    <p className="text-sm text-weirdBlack">Vezes memorizadas</p>
                    <div className={`w-16 flex items-center ${status === 'Finalizado' && 'justify-center'} text-md rounded-lg font-semibold bg-weirdWhite text-weirdBlack gap-1`}>
                        {status !== 'Finalizado' &&
                            <button disabled={disabled} onClick={handleAddMemorizedDate} className={`text-sm p-1 rounded-lg flex gap-1 items-center bg-${theme}`}>
                                <Plus color="#F3F6FD" width={20} />
                            </button>
                        }
                        {timesMemorizedCounter}
                    </div>
                </div>
                <section className="flex justify-between">
                    <button onClick={() => showHisotryModal()} className={`text-sm bg-${theme} p-1 rounded-lg gap-1 flex items-center text-white font-semibold`}>
                        <History width={20} />
                        Histórico
                    </button>
                    {status === 'Finalizado' ?
                        null :
                        <button onClick={() => confirmDeleteModal()} className={`text-sm bg-${theme} p-1 rounded-lg gap-1 flex text-white font-semibold`}>
                            <CheckCircle2 color="#F3F6FD" />
                            Marcar finalizada
                        </button>
                    }
                </section>
            </div>
        </div>
    )
}

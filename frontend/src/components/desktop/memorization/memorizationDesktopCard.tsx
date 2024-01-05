import { CheckCircle2, FileEdit, History, Plus, Trash } from "lucide-react";
import { ExclamationCircleFilled } from '@ant-design/icons'
import { timestampToUser } from "@/utils/dateParser";
import { useState } from "react";
import addResourceDate from "@/api/addResourceDate";
import dynamic from "next/dynamic";

type memorizationProps = {
    id: string,
    description: string,
    verse: number,
    book: {
        id: number,
        name: string,
        chapter: number,
        verses: number,
        words: number,
        testamentId: number,
    },
    timesMemorized: string[],
    status: string,
    handleFinished: (id: string) => void,
    handleDelete: (id: string) => void,
    handleModal: (isOpen: boolean) => void,
    onClickMemorized: (childClik: boolean) => Promise<void>,
    isFinishedModalOpen: boolean,
}

export default function MemorizationDesktopCard({ id, description, book, verse, timesMemorized, status, onClickMemorized, isFinishedModalOpen, handleDelete, handleFinished, handleModal }: memorizationProps) {

    const [modalEdit, setModalEdit] = useState(false)
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
        onClickMemorized(true)
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

    const DynamicMemorizationEditModal = dynamic(import('./memorizationEditModal'))

    return (
        <>
            {modalEdit && <DynamicMemorizationEditModal id={id} open={modalEdit} onClose={() => setModalEdit(false)} />}
            <div className="shadow-sm w-full flex flex-col gap-2 p-2 bg-white rounded-lg">
                <div className="w-full justify-between items-center flex">
                    <h3 className="text-mainBlue font-normal text-lg">{book.name} {book.chapter}:{verse}</h3>
                    <nav className="flex items-center justify-end gap-1">
                        {status !== "Finalizado" &&
                            <button onClick={() => setModalEdit(true)}>
                                <FileEdit width={20} color="#D2D2D2" />
                            </button>
                        }
                        <button onClick={() => showDeleteModal(id)}>
                            <Trash width={20} color="#D2D2D2" />
                        </button>
                    </nav>
                </div>
                <div className="w-full">
                    <p className="text-weirdBlack text-sm font-light">{description}</p>
                </div>
                <div className="w-full">
                    <p className="text-sm text-weirdBlack">Vezes memorizadas</p>
                </div>
                <div className="flex w-ful items-end flex-wrap gap-1">
                    <div className="flex flex-col">
                        <div className={`w-16 h-8 flex items-center ${status === 'Finalizado' && 'justify-center'} text-md rounded-lg font-semibold bg-weirdWhite text-weirdBlack gap-1`}>
                            {status !== 'Finalizado' &&
                                <button disabled={disabled} onClick={handleAddMemorizedDate} className="text-sm p-1 rounded-lg flex gap-1 hover:bg-opacity-90 items-center bg-mainBlue" >
                                    <Plus color="#F3F6FD" width={20} />
                                </button>
                            }
                            {timesMemorizedCounter}
                        </div>
                    </div>
                    <section className="w-full flex justify-between">
                        <button onClick={() => showHisotryModal()} className="text-md bg-mainBlue p-1 rounded-lg gap-1 flex hover:bg-opacity-90  items-center text-white font-semibold">
                            <History width={20} />
                            Histórico
                        </button>
                        {status === 'Finalizado' ?
                            null
                            :
                            <button onClick={() => handleFinished(id)} className="text-sm bg-mainBlue p-1 hover:bg-opacity-90  rounded-lg gap-1 flex text-white font-semibold">
                                <CheckCircle2 color="#F3F6FD" />
                                Marcar finalizada
                            </button>
                        }
                    </section>
                </div>
            </div >
        </>
    )
}

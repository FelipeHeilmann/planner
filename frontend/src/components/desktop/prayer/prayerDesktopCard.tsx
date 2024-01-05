import { CheckCircle2, FileEdit, History, Plus, Trash } from "lucide-react"
import Kneel from "../../../../public/icons/kneel"
import { ExclamationCircleFilled } from '@ant-design/icons'
import { ECategory } from "@/components/mobile/prayer/prayerCreateMobile"
import addResourceDate from "@/api/addResourceDate"
import { useState } from "react";
import { timestampToUser } from "@/utils/dateParser"
import dynamic from "next/dynamic"
import { useRouter } from "next/navigation"

type prayProps = {
    id: string
    title: string
    date: string
    description: string
    status: string
    request: string
    timesPrayed: string[]
    handleFinished: (id: string) => void
    handleDelete: (id: string) => void
    handleModal: (isOpen: boolean) => void
    isFinishedModalOpen: boolean
    onClickPrayed: (childClick: boolean) => Promise<void>
}

export default function PrayerDesktopCard({ id, title, date, request, status, timesPrayed, description, handleDelete, handleFinished, onClickPrayed, handleModal, isFinishedModalOpen }: prayProps) {

    const [modalEdit, setModalEdit] = useState(false)
    const [timesPrayedCounter, setTimePrayedCounter] = useState(timesPrayed.length)
    const [disabled, setDisabled] = useState<boolean>(false)

    const delay = async (ms: number = 500) => {
        setDisabled(true)
        await new Promise(resolve => setTimeout(resolve, ms))
            .catch(err => console.error(err))
        setDisabled(false)
    }

    const handleAddPrayerDate = async () => {
        delay()
        await addResourceDate('prayers', id, 'prayed', new Date())
            .catch(err => console.error(err))
        setTimePrayedCounter(prev => prev + 1)
        onClickPrayed(true)

    }

    const showDeleteModal = async (id: string) => {
        const { Modal } = await (import('antd'))
        Modal.confirm({
            title: 'Deseja mesmo excluir essa oração?',
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
            title: 'Histórico de orações',
            okText: 'Sim',
            okType: "default",
            content: (
                <ul className="flex flex-col gap-2">
                    {timesPrayed.map((date, i) =>
                        <li className="text-lg" key={i + 1}>{timestampToUser(date)} - <span className="font-semibold">{i + 1}ª vez</span></li>
                    )}
                </ul>
            ),
        })
    }

    const checkRequest = (request: string): string => {
        switch (request) {
            case ECategory.Request:
                return 'bg-mainBlue'
            case ECategory.Regret:
                return 'bg-mainPink'
            case ECategory.Intercede:
                return 'bg-mainYellow'
            case ECategory.Gratitude:
                return 'bg-prayerCyan'
            default:
                return 'bg-mainBlue'
        }
    }

    const DynamicPrayerEditModal = dynamic(() => import('./prayerEditModal'))

    return (
        <>
            {modalEdit && <DynamicPrayerEditModal id={id} onClose={() => setModalEdit(false)} open={modalEdit} />}
            <div className="border bg-white shadow-sm rounded-r-lg grid grid-cols-[20px,1fr] mt-2">
                <aside className={`w-full h-full ${(checkRequest(request))}`}></aside>
                <div className="flex py-3 flex-col gap-2">
                    <div className="px-3">
                        <nav className={`flex items-center ${status !== 'Finalizado' ? 'justify-between' : 'justify-end'} `}>
                            {status !== 'Finalizado' &&
                                <button onClick={() => setModalEdit(true)}>
                                    <FileEdit color="#D2D2D2" />
                                </button>
                            }
                            <div className="flex items-center">
                                <button onClick={() => showDeleteModal(id)}>
                                    <Trash color="#D2D2D2" />
                                </button>
                            </div>
                        </nav>
                    </div>
                    <div className="p-2 px-3">
                        <h3 className="text-weirdBlack w-[18vw] text-2xl overflow-hidden whitespace-nowrap">{title}</h3>
                        <p className="text-weirdBlack whitespace-nowrap font-light text-md">{timestampToUser(date)}</p>
                    </div>
                    <div className="w-full p-3">
                        <p className="text-weirdBlack text-lg font-light max-w-[21vw] overflow-hidden whitespace-nowrap text-ellipsis">{description}</p>
                    </div>
                    <div className="flex w-ful items-end px-1 flex-wrap gap-3">
                        <div className="flex flex-col">
                            <p className="text-weirdBlack">Vezes oradas</p>
                            <div className={`flex h-8 ${status === 'Finalizado' && 'justify-center'} items-center text-md rounded-lg font-semibold bg-weirdWhite text-weirdBlack gap-1`}>
                                {status !== 'Finalizado' &&
                                    <button onClick={handleAddPrayerDate} className="w-4/6 p-1 rounded-lg hover:bg-opacity-90 flex gap-1 item-center bg-mainBlue" >
                                        <Plus color="#fff" />
                                        <Kneel color="#fff" width={20} />
                                    </button>
                                }
                                {timesPrayedCounter}
                            </div>
                        </div>
                        <button onClick={() => showHisotryModal()} className="bg-mainBlue p-1 rounded-lg gap-1 flex hover:bg-opacity-90 text-white font-semibold">
                            <History />
                            Histórico
                        </button>
                        {status !== 'Finalizado' &&
                            <button disabled={disabled} onClick={() => handleFinished(id)} className="bg-mainBlue p-1 hover:bg-opacity-90 rounded-lg gap-1 flex text-white font-semibold">
                                <CheckCircle2 />
                                Marcar finalizada
                            </button>
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

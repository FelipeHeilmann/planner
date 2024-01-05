import { FileEdit, Plus, Trash } from "lucide-react"
import Kneel from "../../../../public/icons/kneel"
import { ExclamationCircleFilled } from '@ant-design/icons'
import { useState } from "react"
import Link from "next/link"
import { ECategory } from "./prayerCreateMobile"
import { timestampToUser } from "@/utils/dateParser"
import addResourceDate from "@/api/addResourceDate"

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
    onClickPrayed: (isClicked: boolean) => Promise<void>
    isFinishedModalOpen: boolean
    theme: string
}


export default function PrayerMobileCard({ id, title, date, request, status, timesPrayed, description, isFinishedModalOpen, onClickPrayed, handleDelete, handleFinished, handleModal, theme }: prayProps) {

    const [disabled, setDisabled] = useState<boolean>(false)
    const [timesPrayedCounter, setTimePrayedCounter] = useState(timesPrayed.length)

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
                        <li className="text-md" key={i + 1}>{timestampToUser(date)} - <span className="font-semibold">{i + 1}ª vez</span></li>
                    )}
                </ul>
            ),
        })
    }

    const confirmConcludePrayer = async () => {
        const { Modal } = await (import('antd'))
        Modal.info({
            title: "Deseja mesmo concluir essa oração?",
            open: isFinishedModalOpen,
            onOk: () => handleFinished(id),
            okType: "default",
            onCancel: () => handleModal(false),
            okText: "Sim",
            cancelText: "Cancelar",
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

    return (
        <div className="grid grid-cols-[11px,1fr] pb-3 overflow-hidden">
            <aside className={`col-span-1 ${checkRequest(request)}`}></aside>
            <div className="col-span-1 p-3 px-2">
                <nav className="w-full flex justify-end gap-7">
                    <button onClick={() => showDeleteModal(id)}>
                        <Trash color="#D2D2D2" width={18} />
                    </button>
                    <Link
                        href={`/oracao/editar/${id}`}
                        prefetch={false}
                    >
                        <FileEdit color="#D2D2D2" width={18} />
                    </Link>
                </nav>
                <div className="w-full mt-2 flex justify-between">
                    <h3 className="text-[#575353] font-bold text-lg w-[60vw] overflow-hidden whitespace-nowrap">{title}</h3>
                    <p>{date}</p>
                </div>
                <p className="w-[67vw] overflow-hidden whitespace-nowrap text-ellipsis">{description}</p>
                <div className="flex mt-2 justify-between items-center">
                    <div className="flex flex-col items-center">
                        <p className="text-[12px]">Vezes oradas</p>
                        <p className={`text-[12px] text-${theme}`}>{timesPrayedCounter}</p>
                    </div>
                    <button disabled={disabled} onClick={handleAddPrayerDate} className={`w-[40px] flex gap-1 p-1 rounded-xl bg-${theme}`}>
                        <Kneel width={20} />
                        <Plus width={15} color="white" />
                    </button>
                    <button onClick={() => showHisotryModal()} className={`w-[76px] bg-${theme} text-white text-sm rounded-2xl p-1`}>Histórico</button>
                    {status !== 'Finalizado' &&
                        <button onClick={() => confirmConcludePrayer()} className={`w-[76px] bg-${theme} text-white text-sm rounded-2xl p-1 whitespace-nowrap`}>Finalizar</button>
                    }
                </div>
            </div>
        </div>
    )
}

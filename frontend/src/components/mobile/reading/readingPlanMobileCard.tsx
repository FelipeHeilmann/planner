import { PieChart } from "lucide-react"
import Link from "next/link"
import { EThemeColor } from "../../../../types/enums-color-theme"
import { timestampToUser } from "@/utils/dateParser"

type planProps = {
    id: string
    name: string
    book: string | null
    date: string
    status: string
    theme: EThemeColor
}

export default async function ReadingPlanMobileCard({ id, name, date, status, book, theme }: planProps) {

    const checkStatus = (status: string): string => {
        switch (status) {
            case 'Em andamento':
                return 'bg-mainYellow'
            case 'Finalizado':
                return theme === EThemeColor.Blue ? 'bg-mainBlue' : 'bg-mainPink'
            default:
                return theme === EThemeColor.Blue ? 'bg-mainBlue' : 'bg-mainPink'
        }
    }

    return (
        <main className="block w-full lg:hidden">
            <div className='grid grid-cols-[12px,1fr]' >
                <aside className={`col-span-1 ${checkStatus(status)}`}>
                </aside>
                <div className='w-full pl-2'>
                    <div className='w-full'>
                        <h4 className={`font-semibold text-weirdBlack `}>{name}</h4>
                    </div>
                    <div className='flex justify-between'>
                        <ul>
                            {book && <li><span className='font-semibold'>Livro: </span>{book}</li>}
                            <li className="text-weirdBlack"><span className='font-semibold text-black'>Meta: </span>{timestampToUser(date)}</li>
                            <li className="text-weirdBlack"><span className='font-semibold text-black'></span>{status}</li>
                        </ul>
                        <div className='flex items-center'>
                            <Link
                                href={`dashboard-plano/${id}/desempenho`}
                                className={`flex gap-1 h-8 text-[12px] text-white shadow-sm items-center ${theme === EThemeColor.Blue ? 'bg-mainBlue' : 'bg-mainPink'} p-1 rounded-lg`}
                            >
                                <PieChart color={theme === EThemeColor.Blue ? '#6266f5' : '#f25178'} fill='white' />
                                Meu desempenho
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    )
}

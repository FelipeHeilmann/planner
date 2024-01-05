import { PieChart } from "lucide-react";
import Link from "next/link";
import { useContext } from "react";
import { ThemeContext } from "@/context/themeContex"
import { EThemeColor } from "../../../../types/enums-color-theme"
import { timestampToUser } from "@/utils/dateParser";

export default function ReadingPlanDesktopCard({
    id,
    name,
    date,
    planOf,
    status,
    // book,
    testament
}: any) {

    const { themeValue } = useContext(ThemeContext)

    const checkStatus = (status: string): string => {
        switch (status) {
            case 'Finalizado':
                return 'bg-mainBlue'
            case 'Em andamento':
                return 'bg-mainYellow'
            case 'Não iniciado':
                return 'bg-mainPink'
            default:
                return 'bg-mainBlue'
        }
    }

    const colorPlanOf = (planOf: string): string => {
        switch (planOf) {
            case 'bible':
                return 'bg-mainBlue'
            case 'book':
                return 'bg-mainYellow'
            case 'testament':
                return 'bg-mainPink'
            default:
                return 'bg-mainBlue'
        }
    }

    const displayPlanOf = () => {
        switch (planOf) {
            case 'book':
                return 'Livro'
            case 'bible':
                return 'Bíblia'
            case 'testament':
                return testament
            default:
                return planOf
        }
    }

    return (
        <div className="w-1/3 h-fit flex flex-col gap-1 p-2 py-6 shadow-md border rounded-sm border-black">
            <div className="w-full flex justify-between mb-1 items-center">
                <h3 className="text-xl whitespace-nowrap overflow-x-hidden text-ellipsis text-weirdBlack">{name}</h3>
                <div className={`${checkStatus(status)} p-1 whitespace-nowrap rounded-xl text-white font-light`}>{status}</div>
            </div>
            <div className="w-full flex justify-start">
                <div className="flex w-fit gap-2 ml-2 justify-evenly items-center border border-black p-1 my-1 rounded-lg">
                    <div className={`w-4 aspect-square whitespace-nowrap ${colorPlanOf(planOf)} rounded-full`} />
                    <p className="whitespace-nowrap ">{displayPlanOf()}</p>
                </div>
            </div>
            <div className="w-full">
                <div className="flex items-center gap-2 p-2">
                    <label htmlFor="">Meta:</label>
                    <div className="w-2/3 rounded-lg flex items-center font-semibold bg-weirdWhite p-2 py-1 ">{timestampToUser(date)}</div>
                </div>
            </div>
            <div className="w-full flex justify-start ml-3">
                <Link href={`/dashboard-plano/${id}`} className={`flex whitespace-nowrap justify-center  
                ${themeValue === EThemeColor.Blue ? 'bg-mainBlue' : 'bg-mainPink'} w-fit px-2 py-1 text-white rounded-lg`}>
                    <PieChart width={35} fill="#fff" stroke={themeValue === EThemeColor.Blue ? '#6266f5' : '#f25178'} color="#6266f5" />
                    Ver desempenho
                </Link>
            </div>
        </div >
    )
} 

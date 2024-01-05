import { EThemeColor } from "../../../../types/enums-color-theme"

type TCompletdBook = {
    book: string
    completed: number
    finishedAt: string[]
    startedAt: string[]
    completedPercentage: string
    theme: EThemeColor
}

export default function DashboardPlanStatusBookCompleted({ book, completedPercentage, theme }: TCompletdBook) {
    return (
        <>
            <div className="p-1 grid grid-cols-3 justify-evenly items-center rounded-t-lg">
                <h3 className="text-weirdBlack font-semibold text-sm">{book}</h3>
                <h3 className={`p-1 ${Number(completedPercentage) >= 100 ? theme === EThemeColor.Blue ? 'bg-mainBlue' : 'bg-mainPink' : 'bg-mainYellow'} text-white rounded-lg text-sm`}>
                    {
                        Number(completedPercentage) >= 100 ? 'Completo' : 'Andamento'
                    }
                </h3>
                <h3 className="text-weirdBlack text-center font-semibold text-sm">
                    {
                        Number(completedPercentage) >= 100 ? 100 : completedPercentage
                    }%
                </h3>
            </div>
        </>
    )
}

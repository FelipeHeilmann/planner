import FetchUserInfo from "@/api/fetchUserInfo"
import { EThemeColor } from "../../../../types/enums-color-theme"
import DashboardPlanStatusBookCompleted from "./dashboardPlanStatusBooksCompleted"
import FetchCompletedBooks from "@/api/fetchCompletedBooks"

// type TCompletdBooks = {
//     book: string
//     completed: number
//     finishedAt: string[]
//     startedAt: string[]
//     completedPercentage: string
// }[]

export default async function DashboardPlanStatus() {

    const { theme } = await FetchUserInfo()

    const completedBooks = await FetchCompletedBooks()

    return (
        <>
            <main className="lg:hidden bg-white w-screen min-w-iphoneSEWidth h-[calc(100vh-70px)] p-1 overflow-y-scroll overflow-x-scroll">
                <div className="fle pt-28 flex-col w-full">
                    <header className={`${theme === EThemeColor.Blue ? 'bg-mainBlue' : 'bg-mainPink'} p-2 grid grid-cols-3 justify-evenly rounded-t-lg`}>
                        <h4 className="text-white text-sm font-semibold text-center">Livro</h4>
                        <h4 className="text-white text-sm font-semibold text-center">Status</h4>
                        <h4 className="text-white text-sm font-semibold whitespace-nowrap text-center">% Lida</h4>
                    </header>
                    {completedBooks?.map((completedBook, i) =>
                        <DashboardPlanStatusBookCompleted key={i} theme={theme} book={completedBook.book} completed={completedBook.completed} completedPercentage={completedBook.completedPercentage} startedAt={completedBook.startedAt} finishedAt={completedBook.finishedAt} />
                    )}
                </div>
            </main>
        </>
    )
}

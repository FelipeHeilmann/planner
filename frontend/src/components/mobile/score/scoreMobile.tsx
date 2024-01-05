import ScoreMobileExpand from './scoreMobileExpand'
import { TUserData } from "../../../../types/user-data-type";
import { TBooksCompleted } from "../../../../types/readings-types";
import { EThemeColor } from '../../../../types/enums-color-theme';

type Props = {
    userData: TUserData
    booksCompleted: TBooksCompleted
    theme: EThemeColor
}

export default async function ScoreMobile({ userData, booksCompleted, theme }: Props) {

    return userData && booksCompleted && (
        <main className={`w-screen lg:hidden min-w-iphoneSEWidth h-[calc(100vh-96px)] overflow-hidden relative -mb-[65px] flex flex-col items-center mt-[96px] pt-2 
        ${theme === EThemeColor.Blue ? 'bg-gradient-to-b from-mainBlue via-mainBlue' : 'bg-gradient-to-b from-mainPink via-mainPink'}`}>
            {/* To fill background */}
            <div className="absolute -top-10 w-screen bg-white h-12 -z-10" />
            <div className="bg-white rounded-xl flex items-center justify-center gap-2 py-2 px-3">
                <h2 className={`text-xl font-bold ${theme === EThemeColor.Blue ? 'text-mainBlue' : 'text-mainPink'}`}>{userData.level.id}</h2>
                <p className={`font-light whitespace-nowrap ${theme === EThemeColor.Blue ? 'text-mainBlue' : 'text-mainPink'}`}>Nivel {userData.level.name}</p>
            </div>
            <ScoreMobileExpand userData={userData} booksCompleted={booksCompleted} />
        </main>
    )
}

import ScoreDesktop from "@/components/desktop/score/scoreDesktop";
import ScoreMobile from "@/components/mobile/score/scoreMobile";
import ScoreNavbar from "@/components/mobile/score/scoreNavbar";
import { TUserData } from "../../../../types/user-data-type";
import { TBooksCompleted } from "../../../../types/readings-types";
import { cookies } from "next/headers";
import { axiosInstanceClient } from "@/libs/axiosAPICaller";
import FetchUserInfo from "@/api/fetchUserInfo";

export default async function ScoreRoute() {

    let userData: undefined | TUserData
    try {
        const { data } = await axiosInstanceClient.get('/users/count/data',
            { headers: { Authorization: `Bearer ${cookies().get('token')?.value}` } })
        userData = data
    } catch (err) {
        console.error(err)
    }

    let booksCompleted: undefined | TBooksCompleted
    try {
        const { data } = await axiosInstanceClient.get('/books/completed',
            { headers: { Authorization: `Bearer ${cookies().get('token')?.value}` } })
        booksCompleted = data
    } catch (err) {
        console.error(err)
    }

    const { theme } = await FetchUserInfo()

    return userData && booksCompleted && (
        <>
            <ScoreNavbar />
            <ScoreDesktop booksCompleted={booksCompleted} userData={userData} />
            <ScoreMobile booksCompleted={booksCompleted} userData={userData} theme={theme} />
        </>
    )
}

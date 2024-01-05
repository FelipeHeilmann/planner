import HomeDesktop from "@/components/desktop/home/homeDesktop"
import HomeMobile from "@/components/mobile/home/homeMenu"
import FetchUserInfo from "@/api/fetchUserInfo";
import FetchCompletedBooks from "@/api/fetchCompletedBooks";

export default async function WelcomeRoute() {

    const userData = await FetchUserInfo()

    const completedBooks = await FetchCompletedBooks()

    return userData && completedBooks && (
        <>
            <HomeDesktop completedBooks={completedBooks} userData={userData} />
            <HomeMobile userData={userData} />
        </>
    )
}

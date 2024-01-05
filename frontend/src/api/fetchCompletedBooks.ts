import { axiosInstanceClient } from "@/libs/axiosAPICaller"
import { cookies } from "next/headers"
import { TBooksCompleted } from "../../types/readings-types"

export default async function FetchCompletedBooks() {

    let completedBooks: any = null
    try {
        const { data: completedBooksData } = await axiosInstanceClient.get('books/completed', {
            headers: { Authorization: `Bearer ${cookies().get('token')?.value}` }
        })
        completedBooks = completedBooksData
    } catch (err) {
        console.error(err)
    }

    return completedBooks as TBooksCompleted
}

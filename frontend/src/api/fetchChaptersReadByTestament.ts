import { axiosInstanceClient } from "@/libs/axiosAPICaller"
import { TReadingGroupBy } from "../../types/readings-types"
import { cookies } from "next/headers"

export default async function FetchChaptersReadByTestament() {
    const chaptersReadByTestament: TReadingGroupBy = []
    try {
        const { data: count } = await axiosInstanceClient('/readings/count',
            { headers: { Authorization: `Bearer ${cookies().get('token')?.value}` } })
        chaptersReadByTestament.push(count)
    } catch (err) {
        console.error(err)
    }

    return chaptersReadByTestament
}
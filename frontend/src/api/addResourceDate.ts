"use server"
import { axiosInstanceClient } from "@/libs/axiosAPICaller";
import { cookies } from 'next/headers'

export default async function addResourceDate(resource: string, id: string, posfix: string, date: Date) {
    const url = `/${resource}/${id}/${posfix}`
    await axiosInstanceClient.patch(url, { date: date }, {
        headers: {
            Authorization: `Bearer ${cookies().get('token')?.value}`
        }
    }).catch(err => console.error(err))
} 

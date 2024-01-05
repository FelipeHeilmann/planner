"use server"
import { axiosInstanceClient } from "@/libs/axiosAPICaller";
import { cookies } from 'next/headers'

export default async function finishResource(resource: string, id: string) {
    const url = `/${resource}/${id}/finished`
    await axiosInstanceClient.patch(url, {}, {
        headers: {
            Authorization: `Bearer ${cookies().get('token')?.value}`
        }
    }).catch(err => console.error(err))
} 

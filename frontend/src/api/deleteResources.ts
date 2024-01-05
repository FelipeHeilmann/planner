"use server"
import { axiosInstanceClient } from "@/libs/axiosAPICaller";
import { cookies } from 'next/headers'

export default async function deleteResource(resource: string, id: string) {
    const url = `/${resource}/${id}`
    await axiosInstanceClient.delete(url, {
        headers: {
            Authorization: `Bearer ${cookies().get('token')?.value}`
        }
    }).catch(err => console.error(err))
} 

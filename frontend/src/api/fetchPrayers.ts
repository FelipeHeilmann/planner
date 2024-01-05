"use server"

import { axiosInstanceClient } from "@/libs/axiosAPICaller"
import { TPrayer } from "../../types/prayer-types"
import { cookies } from "next/headers"

export async function FetchPrayers() {
    let prayers: TPrayer[] | null = null
    try {
        await axiosInstanceClient.get('/prayers',
            { headers: { Authorization: `Bearer ${cookies().get('token')?.value}` } })
    }
    catch (err) {
        console.log("err", err)
    }

    return prayers
}
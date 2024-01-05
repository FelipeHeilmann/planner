"use client"
import { axiosInstanceClient } from "@/libs/axiosAPICaller"
import { TUserData } from "../../types/user-data-type"
import Cookies from "js-cookie"

async function FetchUserCountData() {

    let userData: TUserData | null = null
    try {
        const { data } = await axiosInstanceClient.get('/users/count/data',
            { headers: { Authorization: `Bearer ${Cookies.get('token')}` } }) as { data: TUserData }
        userData = data
    } catch (err) {
        console.error('err', err)
    }
    return userData as TUserData
}
export { FetchUserCountData }

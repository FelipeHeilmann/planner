"use client"
import { axiosInstanceClient } from "@/libs/axiosAPICaller"
import Cookies from "js-cookie"
import { TLevelsInfo } from "../../types/level-types"

async function FetchLevels() {

    let levelsInfo: TLevelsInfo | null = null
    try {
        const { data } = await axiosInstanceClient.get('/levels',
            { headers: { Authorization: `Bearer ${Cookies.get('token')}` } }) as { data: TLevelsInfo }
        levelsInfo = data
    } catch (err) {
        console.error('err' + err)
    }
    return levelsInfo as TLevelsInfo
}

export { FetchLevels }

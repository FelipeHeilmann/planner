import { axiosInstace, axiosInstanceClient } from "@/libs/axiosAPICaller"
import { TDevotional } from "../../types/devotinal-types"
import { cookies } from "next/headers"
import verifyAuth from "@/libs/auth"
import { EnumsUrlPath } from "../../types/enums-url-path"


export default async function FetchDevotionals() {
    const token = cookies().get('token')?.value
    const verifiedToken =
        token && (verifyAuth(token)
            .catch((err: any) => console.log('from FetchUserDevotionals: ', err)))
    if (!verifiedToken) return [{
        id: '',
        verses: [0],
        book: {
            id: 0,
            name: '',
            chapter: 0,
            verses: 0,
            words: 0,
            testament: ''
        },
        subject: '',
        learned: '',
        application: '',
        date: '',
    }] as TDevotional[]
    const cookieJar = cookies()
    try {
        const res = await axiosInstace.masterReq({ url: EnumsUrlPath().ListDevotionals, headerAuth: `Bearer ${cookieJar.get('token')?.value}` })
        return res?.data as TDevotional[]
    } catch (err) {
        console.error(err)
    }
}

export async function FetchDevotional(id: string) {
    const token = cookies().get('token')?.value
    const verifiedToken =
        token && (verifyAuth(token)
            .catch((err: any) => console.log('from FetchUserDevotionals: ', err)))
    if (!verifiedToken) return {
        id: '',
        verses: [0],
        book: {
            id: 0,
            name: '',
            chapter: 0,
            verses: 0,
            words: 0,
            testament: ''
        },
        subject: '',
        learned: '',
        application: '',
        date: '',
    } as TDevotional
    const cookieJar = cookies()
    try {
        const res = await axiosInstace.masterReq({ url: EnumsUrlPath(id).ListDevotionalById, headerAuth: `Bearer ${cookieJar.get('token')?.value}` })
        return res!.data as TDevotional
    } catch (err) {
        console.error(err)
    }

}

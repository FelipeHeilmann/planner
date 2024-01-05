import { axiosInstace } from "@/libs/axiosAPICaller"
import { EnumsUrlPath } from "../../types/enums-url-path"
import { cookies } from "next/headers"
import { EThemeColor } from "../../types/enums-color-theme"
import verifyAuth from "@/libs/auth"
import { TUserInfo } from "../../types/user-data-type"

export default async function FetchUserInfo() {
    const token = cookies().get('token')?.value
    const verifiedToken =
        token && (await verifyAuth(token)
            .catch((err: any) => console.error('from FetchUserInfo: ', err)))
    if (!verifiedToken)
        return {
            name: '',
            imageUrl: '',
            theme: EThemeColor.Blue,
            completedBible: 0,
            email: '',
            gender: null,
            birthDate: null,
            level: 0,
        } as TUserInfo
    const res = await axiosInstace.masterReq({ url: EnumsUrlPath().UserInfo, headerAuth: `Bearer ${cookies().get('token')?.value}` })
    let img = res?.data.imageUrl
    if (!img) {
        img = '/NoImage'
    }
    return {
        name: res?.data.name,
        imageUrl: img,
        theme: res?.data.theme,
        completedBible: res?.data.completedBible,
        email: res?.data.email,
        gender: res?.data.gender,
        level: res?.data.level,
        birthDate: res?.data.birthDate,
    } as TUserInfo
}


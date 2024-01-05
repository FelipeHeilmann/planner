import { EThemeColor } from "./enums-color-theme"

export type TUserInfo = {
    name: string,
    completedBible: number,
    imageUrl: string,
    theme: EThemeColor,
    level: number,
    email: string,
    gender: null | string,
    birthDate: null | string,
}

export type TUserData = {
    level: {
        id: number,
        name: string,
        description: string,
        minPoints: number,
        imageUrl: string
    }
    readings: number,
    devotionals: number,
    prayers: number,
    points: number,
    memorizations: number,
}

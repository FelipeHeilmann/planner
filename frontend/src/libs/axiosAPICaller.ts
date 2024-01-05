import axios from "axios"
import { EnumsUrlPath } from "../../types/enums-url-path"

type TAxiosConfig = {
    url: string
    headerAuth?: any
    data?: object
}


const axiosInstanceClient = axios.create({
    baseURL: 'https://app.plannerbiblico.com.br:4000'
})

class HttpsAxiosClient {

    // private readonly baseURL = 'http://85.31.234.57:3333

    private readonly baseURL = 'https://app.plannerbiblico.com.br:4000'
    // private readonly api = axios.create({
    //     baseURL: this.baseURL,
    //     headers: { 'Content-Type': 'application/json' },
    // })

    private returnMethod(path: string) {
        switch (path) {
            // case EnumsUrlPath().ListUsersAsAdmin:
            case EnumsUrlPath().ListPlans:
            case EnumsUrlPath().ListPlanById:
            case EnumsUrlPath().ListReadingsOfPlan:
            case EnumsUrlPath().ListReadings:
            case EnumsUrlPath().ListReadingById:
            case EnumsUrlPath().ListMemorizations:
            case EnumsUrlPath().ListPrayerById:
            case EnumsUrlPath().ListPrayers:
            case EnumsUrlPath().ListPrayerById:
            case EnumsUrlPath().UserInfo:
            case EnumsUrlPath().UserCountData:
            case EnumsUrlPath().ListDevotionals:
            case EnumsUrlPath().ListDevotionalById:
                // case EnumsUrlPath().BookChapters:
                // case EnumsUrlPath().BookVerses:
                return 'GET' as const
            case EnumsUrlPath().Register:
            case EnumsUrlPath().AddPlan:
            case EnumsUrlPath().Auth:
            case EnumsUrlPath().ChangeUserName:
            case EnumsUrlPath().ForgotPassword:
            case EnumsUrlPath().ResetPassword:
            case EnumsUrlPath().ChangeUserPassword:
            case EnumsUrlPath().ChangeUserIcon:
            case EnumsUrlPath().CreateDevotional:
            case EnumsUrlPath().CreatePrayer:
            case EnumsUrlPath().AddMemorization:
            case EnumsUrlPath().AddReading:
                return 'POST' as const
            case EnumsUrlPath().EditDevotional:
            case EnumsUrlPath().EditPrayer:
            case EnumsUrlPath().EditReadings:
            case EnumsUrlPath().EditPlan:
            // case EnumsUrlPath().ChangeUserPasswordAsAdmin:
            case EnumsUrlPath().EditMemorization:
                return 'PUT' as const
            case EnumsUrlPath().AddPrayerDate:
            case EnumsUrlPath().AddMemorizationDate:
            case EnumsUrlPath().IncreaseDayInGoalsPlan:
            case EnumsUrlPath().DecreaseDayInGoalsPlan:
            case EnumsUrlPath().ToggleTheme:
                return 'PATCH' as const
            case EnumsUrlPath().DeleteReadings:
            case EnumsUrlPath().DeleteMemorization:
            case EnumsUrlPath().DeleteDevotional:
            case EnumsUrlPath().DeletePrayer:
            case EnumsUrlPath().DeletePlan:

                // case EnumsUrlPath().DeleteUserAsAdmin:
                return 'DELETE' as const
        }
    }

    async masterReq({ url, data, headerAuth }: TAxiosConfig) {
        const method = this.returnMethod(url)
        const baseURL = this.baseURL

        try {
            const res = await axios({ method, url, baseURL, headers: { Authorization: headerAuth }, data })
            return res
        } catch (err) {
            console.error(err)
        }
    }
}

const axiosInstace = new HttpsAxiosClient()

export {
    axiosInstace,
    axiosInstanceClient
}

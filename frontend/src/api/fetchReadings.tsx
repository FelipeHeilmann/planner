import { cookies } from "next/headers"
import verifyAuth from "@/libs/auth"
import { axiosInstanceClient } from "@/libs/axiosAPICaller"
import { TReading } from "../../types/readings-types"
import { TReadingPlan, TReadingPlanCount, TReadingPlanReadingGroupByDay } from "../../types/reading-plan-types"


export async function FetchReadingPlans() {
    let readingsPlans: null | TReadingPlan[] = null
    try {
        const { data: readingsPlansData } = await axiosInstanceClient.get(`/reading-plans`, {
            headers: { Authorization: `Bearer ${cookies().get('token')?.value}` }
        }) as { data: TReadingPlan[] }
        readingsPlans = readingsPlansData
    }
    catch (err) {
        console.log("err", err)
    }

    return readingsPlans
}

export async function FetchReadingPlan(id: string) {
    let readingsPlan: null | TReadingPlan = null
    try {
        const { data: readingsPlansData } = await axiosInstanceClient.get(`/reading-plans/${id}`, {
            headers: { Authorization: `Bearer ${cookies().get('token')?.value}` }
        }) as { data: TReadingPlan }
        readingsPlan = readingsPlansData
    }
    catch (err) {
        console.log("err", err)
    }

    return readingsPlan
}

export async function FetchReadingPlanReadingsCountGroupByDay(readingsPlanId: string) {
    let readingPlanReadingsCountGroupByDay: null | TReadingPlanReadingGroupByDay = null
    try {
        const { data: readingPlanReadingsCountGroupByDayData } = await axiosInstanceClient.get(`reading-plans/${readingsPlanId}/readings/count/day`, {
            headers: { Authorization: `Bearer ${cookies().get('token')?.value}` }
        }) as { data: TReadingPlanReadingGroupByDay }
        readingPlanReadingsCountGroupByDay = readingPlanReadingsCountGroupByDayData
    }
    catch (err) {
        console.log("err", err)
    }

    return readingPlanReadingsCountGroupByDay
}

export async function FetchReadingPlanCount(readingsPlanId: string) {
    let readingPlanCount: null | TReadingPlanCount = null
    try {
        const { data: readingPlanCountData } = await axiosInstanceClient.get(`/reading-plans/${readingsPlanId}/count`, {
            headers: { Authorization: `Bearer ${cookies().get('token')?.value}` }
        }) as { data: TReadingPlanCount }
        readingPlanCount = readingPlanCountData
    }
    catch (err) {
        console.log("err", err)
    }

    return readingPlanCount
}

export async function FetchReadingPlanReadings(readingsPlanId: string) {
    let readings: null | TReading[] = null
    try {
        const { data: readingsData } = await axiosInstanceClient.get(`reading-plans/${readingsPlanId}/readings`, {
            headers: { Authorization: `Bearer ${cookies().get('token')?.value}` }
        }) as { data: TReading[] }
        readings = readingsData

    } catch (err) {
        console.error(err)
    }

    return readings
}

export async function FetchReadingsList() {

    let res: any = null

    try {
        const token = cookies().get('token')?.value
        const verifiedToken =
            token && (await verifyAuth(token)
                .catch((err: any) => console.log('from FetchReadingsList: ', err)))
        if (verifiedToken) {
        }
        res = await axiosInstanceClient.get('/readings', { headers: { Authorization: `Bearer ${token}` } })
    } catch (err) {
        console.log('could not fetch from FetchReadingsList', err)
    }

    return res!.data as TReading[] | []
}

export async function FetchReading(id: string) {
    let res: any = null

    try {
        const token = cookies().get('token')?.value
        const verifiedToken =
            token && (await verifyAuth(token)
                .catch((err: any) => console.log('from FetchReadingsList: ', err)))
        if (verifiedToken) {
        }
        res = await axiosInstanceClient.get(`/readings/${id}`, { headers: { Authorization: `Bearer ${token}` } })
    } catch (err) {
        console.log('could not fetch from FetchReadingsList', err)
    }

    return res.data as TReading
}
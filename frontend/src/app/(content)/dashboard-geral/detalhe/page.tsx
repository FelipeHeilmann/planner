export const dynamic = 'force-dynamic'

import { FetchReadingsList } from "@/api/fetchReadings";
import DashboardGeneralDetail from "@/components/mobile/dashboardGeneral/dashboardGeneralDetail";

export default async function DashboardGeneralDetailRouter() {

    const readings = await FetchReadingsList()

    const newTestament = readings.filter(item => item.books[0].testament === 'Novo Testamento')

    const oldTestament = readings.filter(item => item.books[0].testament === 'Antigo Testamento')

    const newTestamentHourReadings = newTestament.reduce((accumulator, reading) => {
        return accumulator + reading.duration
    }, 0)

    const oldTestamentHourReadings = oldTestament.reduce((accumulator, reading) => {
        return accumulator + reading.duration
    }, 0)

    return (
        <>
            <DashboardGeneralDetail
                newTestamentHourReadings={newTestamentHourReadings}
                oldTestamentHourReadings={oldTestamentHourReadings}

            />
        </>
    )
}
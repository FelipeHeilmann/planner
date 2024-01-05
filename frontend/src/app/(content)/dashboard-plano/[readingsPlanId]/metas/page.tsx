import DashboardPlanGoals from "@/components/mobile/dashboardPlan/dashboardPlanGoals";
import DashboardPlanNav from "@/components/mobile/dashboardPlan/dashboardPlanNav";
import { TReading } from "../../../../../../types/readings-types";
import { FetchReadingPlan, FetchReadingPlanCount, FetchReadingPlanReadings, FetchReadingPlanReadingsCountGroupByDay } from "@/api/fetchReadings";
import { getLowestDate } from "../utils";

export default async function DashboardPlanGoalsRoute({ params }: { params: { readingsPlanId: string } }) {

    const { readingsPlanId } = params

    const readingPlan = await FetchReadingPlan(readingsPlanId)
    const readingPlanReadingsCountGroupByDay = await FetchReadingPlanReadingsCountGroupByDay(readingsPlanId)
    const readingPlanCount = await FetchReadingPlanCount(readingsPlanId)
    const readings = await FetchReadingPlanReadings(readingsPlanId)

    let chaptersPerDay = 0

    if (readingPlanReadingsCountGroupByDay!.length > 0) {
        for (const item of readingPlanReadingsCountGroupByDay!) {
            const [_, value] = Object.entries(item)[0]
            const chapters = (value as any).chapters

            chaptersPerDay += chapters
        }
        chaptersPerDay = chaptersPerDay / readingPlanReadingsCountGroupByDay!.length
    }

    const lowestReadingDate = getLowestDate(readings)
    const differenceInSeconds = new Date().getTime() - new Date(lowestReadingDate).getTime()
    const differenceInDays = readingPlanCount && differenceInSeconds === 0 ? readingPlanCount.chapters : differenceInSeconds / (1000 * 3600 * 24)
    const readingPerDayAverage = readingPlanCount && readingPlanCount.chapters > 0 ? readingPlanCount.chapters / differenceInDays : 0

    const endDate = new Date().toISOString()

    return readingPlanCount &&
        readingPlan &&
        readingPlanReadingsCountGroupByDay &&
        (
            <>
                <DashboardPlanNav readingsPlanId={readingsPlanId} />
                <DashboardPlanGoals
                    readingGoalPerDay={readingPlan.readingGoalPerDay}
                    chaptersPerDay={chaptersPerDay}
                    readingPerDayAverage={readingPerDayAverage}
                    totalChapters={readingPlanCount.totalChapters}
                    endDate={endDate!}
                    readingPlanReadingsCountGroupByDay={readingPlanReadingsCountGroupByDay}
                    readingsPlanId={readingsPlanId}
                />
            </>
        )
}

import DashboardPlanDesktop from "@/components/desktop/dashboardPlan/dashboardPlanDesktop";
import { FetchReadingPlan, FetchReadingPlanCount, FetchReadingPlanReadings, FetchReadingPlanReadingsCountGroupByDay, FetchReadingPlans } from "@/api/fetchReadings";
import { aggregateDataByMonthAndYear, getLowestDate, getReadingCountProperties } from "./utils";


export default async function DashboardPlanRoute({ params }: { params: { readingsPlanId: string } }) {

    const { readingsPlanId } = params

    const readingsPlans = await FetchReadingPlans()
    const readingPlan = await FetchReadingPlan(readingsPlanId)
    const readingPlanReadingsCountGroupByDay = await FetchReadingPlanReadingsCountGroupByDay(readingsPlanId)
    const readingPlanCount = await FetchReadingPlanCount(readingsPlanId)
    const readings = await FetchReadingPlanReadings(readingsPlanId)

    const { chapters, verses } = getReadingCountProperties(readings)

    let chaptersPerDay = 0

    if (readingPlanReadingsCountGroupByDay !== null)
        if (readingPlanReadingsCountGroupByDay!.length > 0) {
            for (const item of readingPlanReadingsCountGroupByDay!) {
                const [_, value] = Object.entries(item)[0]
                const chapters = (value as any).chapters

                chaptersPerDay += chapters
            }
            chaptersPerDay = chaptersPerDay / readingPlanReadingsCountGroupByDay!.length
        }

    const dataFilteredByMonth = aggregateDataByMonthAndYear(readingPlanReadingsCountGroupByDay!)

    const chapterReadPercentage = `${(((readingPlanCount!.chapters / readingPlanCount!.totalChapters) * 100)).toFixed(1)}`

    const verseReadPercentage = `${(((verses / readingPlanCount!.totalVerses) * 100)).toFixed(1)}`

    const booksReadPercentage = `${(((readingPlanCount!.completedBooks / readingPlanCount!.totalBooks) * 100)).toFixed(1)}`

    const daysIncompletePlanPercentage = readingPlanCount!.totalDays > 0 ? (((readingPlanCount!.totalDays - readingPlanCount!.readingsDays) / readingPlanCount!.totalDays) * 100).toFixed(1) : 0

    const lowestReadingDate = getLowestDate(readings)
    const differenceInSeconds = new Date().getTime() - new Date(lowestReadingDate).getTime()
    const differenceInDays = readingPlanCount && differenceInSeconds === 0 ? readingPlanCount.chapters : differenceInSeconds / (1000 * 3600 * 24)
    const readingPerDayAverage = readingPlanCount && readingPlanCount.chapters > 0 ? readingPlanCount.chapters / differenceInDays : 0

    return readingsPlans &&
        readingPlanCount &&
        readingPlan &&
        readingPlanReadingsCountGroupByDay &&
        readings &&
        (
            <>
                <DashboardPlanDesktop
                    booksReadPercentage={booksReadPercentage}
                    chapterReadPercentage={chapterReadPercentage}
                    daysIncompletePlanPercentage={daysIncompletePlanPercentage}
                    readingPlan={readingPlan}
                    readingPlanCount={readingPlanCount}
                    readingPlanReadingsCountGroupByDay={readingPlanReadingsCountGroupByDay}
                    readingsPlans={readingsPlans}
                    verseReadPercentage={verseReadPercentage}
                    verses={verses}
                    readingsPlanId={readingsPlanId}
                    dataFilteredByMonth={dataFilteredByMonth}
                    chaptersPerDay={chaptersPerDay}
                    readingPerDayAverage={readingPerDayAverage}
                />
            </>
        )
}

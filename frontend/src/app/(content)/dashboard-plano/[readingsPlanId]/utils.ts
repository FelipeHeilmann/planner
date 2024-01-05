import { TReadingPlanReadingGroupByDay } from "../../../../../types/reading-plan-types"
import { TReading, TReadingGroupBy } from "../../../../../types/readings-types"

export function aggregateDataByMonthAndYear(data: TReadingPlanReadingGroupByDay) {
    const aggregatedData: TReadingGroupBy = []

    for (const entry of data) {
        const [dateKey, data] = Object.entries(entry)[0]
        const [_, month, year] = dateKey.split('-')
        const monthYearKey = `${month}-${year}`

        if (!aggregatedData.some((entry) => Object.keys(entry)[0] === monthYearKey)) {
            aggregatedData.push({ [monthYearKey]: { readings: 0, chapters: 0, duration: 0 } })
        }

        const currentEntry = aggregatedData.find((entry) => Object.keys(entry)[0] === monthYearKey)

        if (currentEntry) {
            currentEntry[monthYearKey].readings += data.readings
            currentEntry[monthYearKey].chapters += data.chapters
            currentEntry[monthYearKey].duration += data.duration
        }
    }

    return aggregatedData
}

export function getLowestDate(readings: TReading[] | null) {
    if (readings && readings.length > 1) {
        readings.sort((a, b) => {
            return new Date(a.date).getTime() - new Date(b.date).getTime();
        })

        return readings[0].date
    }

    return new Date().toISOString()
}

export function getReadingCountProperties(readings: TReading[] | null) {
    let chapters = 0
    let verses = 0
    let words = 0

    if (readings !== null) {
        for (const reading of readings) {
            const { books } = reading;

            chapters += books.length;
            verses += books.reduce((totalVerses, book) => totalVerses + book.verses, 0);
            words += books.reduce((totalWords, book) => totalWords + book.words, 0);
        }
    }

    return {
        chapters,
        verses,
        words
    }
} 
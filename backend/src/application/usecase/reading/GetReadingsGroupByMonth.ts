import { IReadingRepository } from '@/application/repository/IReadingRepository'
import { Reading } from '@/domain/entities/Reading'

export class GetReadingsGroupByMonth {
    private readonly readingRepository: IReadingRepository

    constructor(readingRepository: IReadingRepository) {
        this.readingRepository = readingRepository
    }

    async execute(userId: string): Promise<Output[]> {
        const readings = await this.readingRepository.getAll(userId)

        const groupedData = this.groupByMonthAndYear(readings)

        return groupedData
    }

    private groupByMonthAndYear(readings: Reading[]) {
        const result: Output[] = []

        for (const reading of readings) {
            const date = reading.getUserDate()
            const month = date.toLocaleString('pt-br', { month: 'short' }).replace('.', '')
            const year = date.getFullYear()
            const key = `${month}-${year}`

            const existingEntry = result.find(item => Object.keys(item)[0] === key)
            if (existingEntry) {
                let newTestamentChapters = existingEntry[key].newTestamentChapters
                let oldTestamentChapters = existingEntry[key].oldTestamentChapters
                let newTestament = existingEntry[key].newTestament
                let oldTestament = existingEntry[key].oldTestament
                if (reading.getBooks()[0].testamentId === 1) {
                    oldTestament++
                    oldTestamentChapters += reading.getBooks().length
                }
                else {
                    newTestament++
                    newTestamentChapters += reading.getBooks().length
                }

                existingEntry[key].readings++
                existingEntry[key].chapters += reading.getBooks().length
                existingEntry[key].duration += reading.getDuration()
                existingEntry[key].newTestament = newTestament
                existingEntry[key].oldTestament = oldTestament
                existingEntry[key].newTestamentChapters = newTestamentChapters
                existingEntry[key].oldTestamentChapters = oldTestamentChapters

            }
            else {
                let newTestamentChapters = 0
                let oldTestamentChapters = 0
                let newTestament = 0
                let oldTestament = 0
                if (reading.getBooks()[0].testamentId === 1) {
                    oldTestament++
                    oldTestamentChapters += reading.getBooks().length
                }
                else {
                    newTestament++
                    newTestamentChapters += reading.getBooks().length
                }
                const newEntry = {
                    [key]: {
                        readings: 1,
                        chapters: reading.getBooks().length,
                        duration: reading.getDuration(),
                        newTestament,
                        oldTestament,
                        oldTestamentChapters,
                        newTestamentChapters
                    }
                }
                result.push(newEntry)
            }
        }

        return result
    }
}


type Output = {
    [key: string]: {
        readings: number;
        chapters: number;
        duration: number;
        newTestament: number;
        oldTestament: number
        oldTestamentChapters: number
        newTestamentChapters: number
    }
}

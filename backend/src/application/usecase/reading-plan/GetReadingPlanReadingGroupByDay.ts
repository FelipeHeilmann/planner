import { IReadingRepository } from '@/application/repository/IReadingRepository'
import { Reading } from '@/domain/entities/Reading'
import moment from 'moment'

export class GetReadingPlanReadingGroupByDay {
    private readonly readingRepository: IReadingRepository

    constructor(
        readingRepository: IReadingRepository,
    ) {
        this.readingRepository = readingRepository
    }

    async execute(planId: string) {
        const readings = await this.readingRepository.getByPlan(planId)

        const groupedData = this.groupByMonthAndYear(readings)

        return groupedData
    }

    private async groupByMonthAndYear(readings: Reading[]) {
        const result: Output[] = []

        for (const reading of readings) {
            const date = reading.getUserDate()
            const day = moment(date).date()
            const month = date.toLocaleString('pt-br', { month: 'short' }).replace('.', '')
            const year = date.getFullYear()
            const key = `${day}-${month}-${year}`

            const existingEntry = result.find(item => Object.keys(item)[0] === key)

            if (existingEntry) {
                existingEntry[key].readings++
                existingEntry[key].chapters += reading.getBooks().length
                existingEntry[key].duration += reading.getDuration()

            } else {
                const newEntry: Output = {
                    [key]: {
                        readings: 1,
                        chapters: reading.getBooks().length,
                        duration: reading.getDuration()
                    },
                }
                result.push(newEntry)
            }
        }

        return result
    }
}

type Output = {
    [key: string]: {
        readings: number
        chapters: number
        duration: number
    }
}
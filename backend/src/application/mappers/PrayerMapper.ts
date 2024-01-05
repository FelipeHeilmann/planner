import { Prayer } from '@/domain/entities/Prayer'
import { StatusEnum } from '@/domain/enum/statusEnum'

export class PrayerMapper {

    static map(input: PrayerDBOutput) {
        return new Prayer(
            input.id,
            input.title,
            input.description,
            input.request,
            input.timesPrayed,
            input.userDate,
            input.userId,
            input.status === 'Em andamento' ? StatusEnum.OnProgress : StatusEnum.Finished,
            input.createdAt,
            input.updatedAt,
            input.isFinished
        )
    }
    static mapCollection(input: PrayerDBOutput[]) {
        const prayers: Prayer[] = []

        input.map(item => prayers.push(PrayerMapper.map(item)))

        return prayers
    }

}

type PrayerDBOutput = {
    id: string
    title: string
    description: string
    request: string
    timesPrayed: Date[]
    userDate: Date
    userId: string
    status: string
    createdAt: Date
    updatedAt: Date
    isFinished: boolean
}
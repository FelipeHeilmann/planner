import { ReadingPlan } from '@/domain/entities/ReadingPlan'

export interface IReadingPlanRepository {

    getAll(userId: string): Promise<ReadingPlan[]>

    getById(id: string): Promise<ReadingPlan>

    save(readindPlan: ReadingPlan): Promise<void>

    update(readindPlan: ReadingPlan): Promise<void>

    delete(id: string): Promise<void>

    deleteOfUser(userId: string): Promise<void>
}
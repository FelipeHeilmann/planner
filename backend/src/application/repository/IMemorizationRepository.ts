import { Memorization } from '@/domain/entities/Memorization'

export interface IMemorizationRepository {
    save(memorization: Memorization): Promise<void>

    getAll(userId: string): Promise<Memorization[]>

    getById(id: string): Promise<Memorization>

    update(memorization: Memorization): Promise<void>

    delete(id: string): Promise<void>

    deleteOfUser(userId: string): Promise<void>
}
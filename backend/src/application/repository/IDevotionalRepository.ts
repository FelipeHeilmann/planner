import { Devotional } from '../../domain/Devotional'

export interface IDevotionalRepository {

    getAll(userId: string): Promise<Devotional[]>

    getById(id: string): Promise<Devotional>

    save(devotional: Devotional): Promise<void>

    update(devotional: Devotional): Promise<void>

    delete(id: string): Promise<void>

    deleteOfUser(userId: string): Promise<void>
}
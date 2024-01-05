import { Level } from '@/domain/entities/Level'

export interface ILevelRepository {
    getAll(): Promise<Level[]>

    getById(id: number): Promise<Level | null>

    count(): Promise<number>

    save(level: Level): Promise<void>
}
import { User } from '@/domain/entities/User'
import { OriginEnum } from '@/domain/enum/originEnum'

export class UserViewModel {
    id?: string
    name?: string
    email?: string
    createdAt?: string
    isAdmin?: boolean
    isActive?: boolean
    accessDuration?: number
    gender?: string | null
    disabledAt?: Date | null
    lastLoginAt?: Date | null
    birthDate?: Date | null
    isAffiliate?: boolean
    origin?: OriginEnum | null
    static map(entity: User): UserViewModel {
        return {
            id: entity.id,
            name: entity.getName(),
            email: entity.getEmail(),
            createdAt: entity.getCreatedAt().toISOString(),
            isActive: entity.getIsActive(),
            accessDuration: entity.getAccesDuration(),
            isAdmin: entity.getIsAdmin(),
            disabledAt: entity.getDisabledAt(),
            lastLoginAt: entity.getLastLoginAt(),
            birthDate: entity.getBirthDate(),
            gender: entity.getGender(),
            isAffiliate: entity.getIsAffiliate(),
            origin: entity.getOrigin()
        }
    }

    static mapCollection(entities: User[]): UserViewModel[] {
        return entities.map(entity => UserViewModel.map(entity))
    }
}
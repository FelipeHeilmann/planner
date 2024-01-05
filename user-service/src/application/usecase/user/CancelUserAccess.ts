import { User } from "../../../domain/entities/User";
import { IUserRepostory } from "../../repository/IUserRepository";

export class CancelUserAccess {
    private readonly userRepository: IUserRepostory
    constructor(userRepository: IUserRepostory) {
        this.userRepository = userRepository
    }

    async execute(user: User) {
        user.disable()

        await this.userRepository.update(user)
    }
}
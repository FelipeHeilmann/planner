import { IUserRepostory } from "../../repository/IUserRepository";

export class GetAllUsers {
    private readonly userRepository: IUserRepostory
    constructor(userRepository: IUserRepostory) {
        this.userRepository = userRepository
    }

    async execute() {
        return await this.userRepository.getAll()
    }
}
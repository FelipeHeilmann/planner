import { BadRequestError } from '@/api/helpers/api-error'
import { IUserRepository } from '@/application/repository/IUserRepository'
import { app } from '@/server'
import bcrypt from 'bcrypt'

export class LoginAdmin {
    private readonly userRepository: IUserRepository
    constructor(userRepository: IUserRepository) {
        this.userRepository = userRepository
    }

    async execute(input: Input): Promise<string> {
        const user = await this.userRepository.getByEmail(input.email)

        if (user === null) {
            throw new BadRequestError('Usuário não encontrado')
        }

        if (!user.getIsAdmin()) {
            throw new BadRequestError('Usuário não é admin')
        }

        const checkPassword = await bcrypt.compare(
            input.password,
            user.getPassword()
        )

        if (!checkPassword) {
            throw new BadRequestError('Email ou senha inválido')
        }

        const token = app.jwt.sign(
            {
                name: user.getName(),
                email: user.getEmail(),
                iconUrl: user.getImageUrl(),
                completedBible: user.getCompletedBible(),
                levelId: user.getLevelId()
            },
            {
                sub: user.id,
                expiresIn: '1 days',
            }
        )

        return token

    }
}

type Input = {
    email: string
    password: string
}
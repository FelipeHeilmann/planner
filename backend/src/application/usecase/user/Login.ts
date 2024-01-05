import { IUserRepository } from '@/application/repository/IUserRepository'
import bcrypt from 'bcrypt'
import { BadRequestError, ForbiddenError } from '@/api/helpers/api-error'
import { app } from '@/server'

export class Login {
    private readonly userRepository: IUserRepository
    constructor(userRepository: IUserRepository) {
        this.userRepository = userRepository
    }

    async execute(email: string, password: string): Promise<string> {
        const user = await this.userRepository.getByEmail(email)

        if (user === null) {
            throw new BadRequestError('Usuário não encontrado')
        }

        const checkPassword = await bcrypt.compare(
            password,
            user.getPassword()
        )

        if (!checkPassword) {
            throw new BadRequestError('Email ou senha inválido')
        }

        if (!user.getIsActive()) {
            throw new ForbiddenError('Usuário com conta inativa!')
        }

        user.setLastLoginAt(new Date())

        await this.userRepository.update(user)

        const token = app.jwt.sign(
            {
                name: user.getName(),
                email: user.getEmail(),
                lastLoginAt: user.getLastLoginAt()
            },
            {
                sub: user.id,
                expiresIn: '1 days',
            }
        )
        return token
    }
}
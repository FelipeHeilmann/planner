import { UnprocessableError } from '@/api/helpers/api-error'
import { IUserRepository } from '@/application/repository/IUserRepository'
import { Queue } from '@/infra/queue/Queue'
import jwt from 'jsonwebtoken'

export class ForgetPassword {
    private readonly userRepository: IUserRepository
    private readonly queue: Queue
    constructor(userRepository: IUserRepository, queue: Queue) {
        this.userRepository = userRepository
        this.queue = queue
    }

    async execute(email: string): Promise<void> {
        await this.queue.connect()
        const user = await this.userRepository.getByEmail(email)

        if (!user) {
            throw new UnprocessableError('Usuário não encontado')
        }

        const SECRET = process.env.SECRET!

        const token = jwt.sign({ id: user.id }, SECRET, { expiresIn: '15m' })
        const link = `https://app.plannerbiblico.com.br/mudar-senha/${token}`

        const forgotPassword = {
            link: link,
            name: user.getName(),
            email: user.getEmail()
        }

        await this.queue.publish('forgotPassword', forgotPassword)
    }
}
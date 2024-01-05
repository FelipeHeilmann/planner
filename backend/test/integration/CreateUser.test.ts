import { UserRepositoryPrisma } from '@/infra/persistence/repository/prisma/UserRepositoryPrisma'
import { CreateUser } from '@/application/usecase/user/CreateUser'
import { prisma } from '@/infra/database'
import { RabbitMQAdapter } from '@/infra/queue/RabbitMQAdapter'


const userRepository = new UserRepositoryPrisma(prisma)
const rabbitMQ = new RabbitMQAdapter()


test('Deve criar um usuário, enviando um email e mandando para a fila', async function () {
    const createUser = new CreateUser(userRepository, rabbitMQ)
    await rabbitMQ.connect()
    await createUser.execute({
        name: 'Jonas',
        email: 'jonasfurtadoromero@email.com',
        password: 'my password',
        accessDuration: 1,
        isAdmin: false
    })
})
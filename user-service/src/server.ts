import { UserRepositoryPrisma } from './infra/repository/UserRepositoryPrisma'
import { CancelUserAccess } from './application/usecase/user/CancelUserAccess'
import { CreateUser } from './application/usecase/user/CreateUser'
import { ForgorPassword } from './application/usecase/user/ForgotPassword'
import { GetAllUsers } from './application/usecase/user/GetAllUsers'
import { SendMail } from './application/usecase/user/SendMail'
import { ValidateAccess } from './application/usecase/user/ValidateAccess'
import { prisma } from './infra/db'
import { SendMailTrapAdapter } from './infra/mail/SendMailTrapAdapter'
import { QueueController } from './infra/queue/QueueController'
import { RabbitMQAdapter } from './infra/queue/RabbitMQAdapter'
import { CreateAdmin } from './application/usecase/user/CreateAdmin'
import * as cron from 'node-cron'
import { DisableUser } from './application/usecase/user/DisableUser'
import { SendMailHostingerAdapter } from './infra/mail/SendMailHostingerAdapter'

const userRepository = new UserRepositoryPrisma(prisma)
const getAllUsers = new GetAllUsers(userRepository)
const cancelUserAccess = new CancelUserAccess(userRepository)
const mailTrapAdapter = new SendMailTrapAdapter()
const hostingerMailAdapter = new SendMailHostingerAdapter()
const rabbitMQueue = new RabbitMQAdapter()
const sendEmail = new SendMail(hostingerMailAdapter)
const createUser = new CreateUser(userRepository, sendEmail)
const validadeUserAccess = new ValidateAccess(getAllUsers, mailTrapAdapter, rabbitMQueue, cancelUserAccess)
const forgotPassword = new ForgorPassword(sendEmail)
const createAdmin = new CreateAdmin(sendEmail)
const disableUser = new DisableUser(userRepository)

async function main() {
    await rabbitMQueue.connect()
    new QueueController(rabbitMQueue, createUser, forgotPassword, createAdmin, disableUser)

    cron.schedule("0 3 * * *", async () => {
        await validadeUserAccess.execute()
    })
}


main()
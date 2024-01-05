import { CreateAdmin } from '../../application/usecase/user/CreateAdmin'
import { CreateUser } from '../../application/usecase/user/CreateUser'
import { DisableUser } from '../../application/usecase/user/DisableUser'
import { ForgorPassword } from '../../application/usecase/user/ForgotPassword'
import { Queue } from './Queue'

export class QueueController {
    private readonly queue: Queue
    private readonly createUser: CreateUser
    private readonly forgoPassword: ForgorPassword
    private readonly createAdmin: CreateAdmin
    private readonly disableUser: DisableUser

    constructor(queue: Queue, createUser: CreateUser, forgoPassword: ForgorPassword, createAdmin: CreateAdmin, disableUser: DisableUser) {
        this.queue = queue
        this.createUser = createUser
        this.forgoPassword = forgoPassword
        this.createAdmin = createAdmin
        this.disableUser = disableUser

        this.queue.on('createUser', async (event: any) => {
            await this.createUser.execute(event)
        })

        this.queue.on('forgotPassword', async (event: any) => {
            await this.forgoPassword.execute(event)
        })

        this.queue.on('createAdmin', async (event: any) => {
            await this.createAdmin.execute(event)
        })

        this.queue.on('userCanceled', async (event: any) => {
            await this.disableUser.execute(event)
        })
    }

}
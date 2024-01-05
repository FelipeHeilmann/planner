import { IMailProvider } from "../../../infra/mail/SendMail"
import { Queue } from "../../../infra/queue/Queue"
import { closeDue } from "../../../resources/mail/closeDue"
import { endAccess } from "../../../resources/mail/endAccess"
import { CancelUserAccess } from "./CancelUserAccess"
import { GetAllUsers } from "./GetAllUsers"

export class ValidateAccess {
    private readonly getAllUsers: GetAllUsers
    private readonly sendMail: IMailProvider
    private readonly queue: Queue
    private readonly cancelUserAccess: CancelUserAccess
    constructor(getAllUsers: GetAllUsers, sendMail: IMailProvider, queue: Queue, cancelUserAccess: CancelUserAccess) {
        this.getAllUsers = getAllUsers
        this.sendMail = sendMail
        this.queue = queue
        this.cancelUserAccess = cancelUserAccess
    }

    async execute() {
        const users = await this.getAllUsers.execute()
        users.filter(user => user.getIsActive())

        for (const user of users) {
            const today = new Date()
            const endDate = user.getEndDate()

            const timeDifference = today.getTime() - endDate.getTime()

            const daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24))

            if (daysDifference === 5) {
                const template = closeDue(user.getName())
                await this.sendMail.sendEmail({
                    from: {
                        name: 'Equipe Planner Bíblico',
                        email: 'contato@plannerbiblico.com'
                    },
                    to: {
                        name: user.getName(),
                        email: user.getEmail()
                    },
                    subject: 'Vencimento próximo',
                    body: template
                })

            }

            if (endDate.getFullYear() === today.getFullYear() &&
                endDate.getMonth() === today.getMonth() &&
                endDate.getDate() === today.getDate()) {
                const template = endAccess(user.getName())
                await this.sendMail.sendEmail({
                    from: {
                        name: 'Equipe Planner Bíblico',
                        email: 'contato@plannerbiblico.com'
                    },
                    to: {
                        name: user.getName(),
                        email: user.getEmail()
                    },
                    subject: 'Vencimento próximo',
                    body: template
                })

                await this.queue.publish('cancelUserAccess', user)

                await this.cancelUserAccess.execute(user)
            }
        }
    }
}
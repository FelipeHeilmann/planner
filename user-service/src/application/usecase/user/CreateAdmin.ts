import { welcomeTemplate } from "../../../resources/mail/welcome"
import { SendMail } from "./SendMail"

export class CreateAdmin {
    private readonly sendMail: SendMail

    constructor(sendMail: SendMail) {
        this.sendMail = sendMail
    }

    async execute(input: Input) {
        const template = welcomeTemplate(input.password)

        await this.sendMail.execute(input.name, input.email, 'Bem-vindo à Plataforma!', template)
    }
}

type Input = {
    id: string
    name: string
    email: string
    password: string
    createdAt: string
    accessDuration: number
    isActive: boolean
}
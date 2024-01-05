import { resetPasswordTemplate } from '../../../resources/mail/forgotPassword'
import { SendMail } from './SendMail'

export class ForgorPassword {
    private readonly sendMail: SendMail
    constructor(sendMail: SendMail) {
        this.sendMail = sendMail
    }

    async execute(input: Input) {
        const template = resetPasswordTemplate(input.link)

        await this.sendMail.execute(input.name, input.email, 'Esqueceu sua senha', template)
    }
}

type Input = {
    link: string
    name: string
    email: string
}
import { IMailProvider } from "../../../infra/mail/SendMail"

export class SendMail {
    private readonly mailProvider: IMailProvider
    constructor(mailProvider: IMailProvider) {
        this.mailProvider = mailProvider
    }

    async execute(name: string, email: string, subject: string, template: { html: string },) {

        await this.mailProvider.sendEmail({
            to: {
                name: name,
                email: email
            },
            from: {
                name: 'Equipe Planner Bíblico',
                email: 'contato@plannerbiblico.com.br'
            },
            subject: subject,
            body: template
        })
    }
}
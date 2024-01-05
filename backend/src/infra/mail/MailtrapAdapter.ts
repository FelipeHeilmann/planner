import { IMailProvider, IMessage } from './IMailProvider'
import nodemailer from 'nodemailer'

export class MailtrapProvider implements IMailProvider {
    constructor() { }
    private transporter = nodemailer.createTransport({
        host: 'sandbox.smtp.mailtrap.io',
        port: 2525,
        auth: {
            user: process.env.MAIL_TRAP_USER,
            pass: process.env.MAIL_TRAP_PASSWORD
        }
    })

    async sendEmail(message: IMessage): Promise<void> {
        await this.transporter.sendMail({
            to: {
                name: message.to.name,
                address: message.to.email
            },
            from: {
                name: message.from.name,
                address: message.from.email
            },
            subject: message.subject,
            html: message.body.html
        })
    }

}
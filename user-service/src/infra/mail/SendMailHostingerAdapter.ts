import Mail from "nodemailer/lib/mailer";
import { IMailProvider, Message } from "./SendMail"
import nodemailer from 'nodemailer'

export class SendMailHostingerAdapter implements IMailProvider {

    private transporter = nodemailer.createTransport({
        host: "smtp.hostinger.com",
        port: 465,
        auth: {
            user: process.env.HOSTINGER_MAIL_USER,
            pass: process.env.HOSTINGER_MAIL_PASSWORD
        }
    });



    async sendEmail(message: Message): Promise<void> {
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
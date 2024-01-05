type Address = {
    name: string
    email: string
}


export type Message = {
    to: Address
    from: Address
    subject: string
    body: { html: string }
}


export interface IMailProvider {
    sendEmail(message: Message): Promise<void>
}
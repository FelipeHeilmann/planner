export interface Address {
    name: string
    email: string
}


export interface IMessage {
    to: Address
    from: Address
    subject: string
    body: { html: string }
}


export interface IMailProvider {
    sendEmail(message: IMessage): Promise<void>
}
/*eslint-disable*/
export interface Queue {
    connect(): Promise<void>

    on(queueName: string, callback: (event: any) => void): Promise<void>

    publish(queueName: string, data: any): Promise<void>
}
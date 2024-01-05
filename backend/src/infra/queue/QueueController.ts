
import { CancelUserAccess } from '../../application/usecase/user/CancelUserAccess'
import { Queue } from './Queue'

export class QueueController {
    /*eslint-disable*/
    private queue: Queue
    private cancelUserAccess: CancelUserAccess

    constructor(queue: Queue, cancelUserAccess: CancelUserAccess) {
        this.queue = queue
        this.cancelUserAccess = cancelUserAccess

        this.queue.on('cancelUserAccess', async (event: any) => {
            await this.cancelUserAccess.execute(event)
        })

    }
}


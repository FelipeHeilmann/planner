export class DomainError extends Error {
    public readonly statusCode: number
    constructor(message: string, statusCode: number) {
        super(message)
        this.statusCode = statusCode
    }
}

export class PaymentValueExceedsAvaliable extends DomainError {
    constructor(message: string) {
        super(message, 400)
    }
}

export class ReadingDoesNotFitOnReadingPlan extends DomainError {
    constructor(message: string) {
        super(message, 400)
    }
}

export class InvalidPlanOf extends DomainError {
    constructor(message: string) {
        super(message, 400)
    }
}

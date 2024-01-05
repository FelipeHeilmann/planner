export class CreatedUser {
    constructor(
        readonly id: string,
        readonly name: string,
        readonly email: string,
        readonly accessDuration: number,
        readonly createdAt: Date,
        readonly isActive: boolean,
        readonly password: string) { }
}
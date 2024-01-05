export class Level {
    public id: number
    public name: string
    public description: string
    public minPoints: number
    public imageUrl: string

    constructor(id: number, name: string, description: string, minPoints: number, imageUrl: string) {
        this.id = id
        this.name = name
        this.description = description
        this.minPoints = minPoints
        this.imageUrl = imageUrl
    }
}
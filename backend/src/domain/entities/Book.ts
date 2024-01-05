export class Book {
    readonly id: number
    public readonly name: string
    public readonly chapter: number
    public readonly verses: number
    public readonly words: number
    public readonly testamentId: number

    constructor(id: number, name: string, chapter: number, verses: number, words: number, testamentId: number) {
        this.id = id
        this.name = name
        this.chapter = chapter
        this.verses = verses
        this.words = words
        this.testamentId = testamentId
    }


}
export type TDevotional = {
    id: string,
    verses: number[]
    book: {
        id: number
        name: string,
        chapter: number
        verses: number
        words: number
        testament: string
    },
    subject: string
    learned: string
    application: string
    date: string
}

export enum EnumActionFilterDevotional {
    Create = 'create',
    Edit = 'edit',
}

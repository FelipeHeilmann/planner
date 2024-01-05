export enum EPlanOfReadings {
    Book = 'Book',
    Testament = 'Testament',
    Bible = 'Bible'
}

export enum EStatusReadings {
    OnGoing = 'Em andamento',
    Finished = 'Finalizado'
}

export enum EReadingsAction {
    Create = 'create',
    Edit = 'edit',
}

export type TReadingGroupBy = {
    [key: string]: {
        readings: number,
        chapters: number,
        duration: number
    }
}[]

export type TReadingsBooksList = {
    name: string,
    chapter: number,
    words: number,
    verses: number,
    testament: string
}

export type TBooksCompleted = {
    book: string,
    completed: number,
    completedPercentage: string,
    startedAt: string[],
    finishedAt: string[]
}[]

export type TReading = {
    id: string,
    duration: number,
    userId: string,
    timeSpent: number,
    books: [TReadingsBooksList],
    readingPlan: {
        id: string,
        name: string,
        planOf: EPlanOfReadings, //-> "Book, Testament, Bible",
        status: EStatusReadings, //-> "Em andamento, Finalizado",
        readingGoalPerDay: number,
        testament: string,
        endDate: string,// timestamp
        book: string | null
    },
    date: string,
}

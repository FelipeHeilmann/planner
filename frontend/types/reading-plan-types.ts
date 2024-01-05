type planProps = {
    id: string
    title: string
    planOf: string
    book: string | null
    date: string
    status: string
}

export const planOfDisplayText: Record<planProps['planOf'], string> = {
    book: 'Livro',
    bible: 'Bíblia toda',
    testament: 'Testamento',
}

export enum EActionReadingPlan {
    Create = 'create',
    Edit = 'edit',
}

export type TReadingPlanReadingGroupByDay = {
    [key: string]: {
        readings: number,
        chapters: number,
        duration: number
    }
}[]

export type TReadingPlan = {
    id: string
    name: string
    planOf: string
    readingGoalPerDay: number
    book: string | null
    endDate: string
    status: string
    testament: string | null

}

export type TReadingPlanCount = {
    totalBooks: number,
    chapters: number,
    totalChapters: number,
    totalVerses: number,
    totalDays: number,
    completedBooks: number,
    readingsDays: number,
    readings: number
}

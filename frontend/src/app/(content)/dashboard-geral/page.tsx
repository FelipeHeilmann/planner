import DashboardGeneralDesktop from "@/components/desktop/dashboardGeneral/dashboardGeneralDesktop";
import DashboardGeneralMobile from "@/components/mobile/dashboardGeneral/dashboardGeneralMobile";
import FetchUserInfo from "@/api/fetchUserInfo";
import FetchCompletedBooks from "@/api/fetchCompletedBooks";
import { FetchReadingsList } from "@/api/fetchReadings";

export default async function DashboardGeneralRoute() {
    const { name, completedBible } = await FetchUserInfo()

    const completedBooksData = await FetchCompletedBooks()

    const readings = await FetchReadingsList()

    const completedBooks = completedBooksData?.filter(completedBook => completedBook.completed !== 0)

    let numOfChaptersNewTestament = 0
    let numOfChaptersOldTestament = 0
    for (const reading of readings) {
        if (reading.books[0].testament === 'Novo Testamento') {
            numOfChaptersNewTestament += reading.books.length
        }
        else {
            numOfChaptersOldTestament += reading.books.length

        }
    }
    // To get the completed books by testament
    const comparedBooks: string[][] = []
    for (const { books } of readings) {
        for (const book of completedBooks!) {
            const toCompareBook = book.book
            books.filter(eachBook => {
                if (eachBook.name == toCompareBook) {
                    comparedBooks?.push([eachBook.name, eachBook.testament])
                }
            })
        }
    }

    const completedBooksByTestament = ([...new Set(comparedBooks.map(String))]).map(item => item.split(','))
    const newTestamentCompletedBooks = completedBooksByTestament.filter(arrayOfBooks => arrayOfBooks[1] === 'Novo Testamento').length
    const oldTestamentCompletedBooks = completedBooksByTestament.filter(arrayOfBooks => arrayOfBooks[1] === 'Antigo Testamento').length
    const totalCompletedBooksTestaments = oldTestamentCompletedBooks + newTestamentCompletedBooks

    const newTestament = readings.filter(item => item.books[0].testament === 'Novo Testamento')

    const oldTestament = readings.filter(item => item.books[0].testament === 'Antigo Testamento')

    const newTestamentHourReadings = newTestament.reduce((accumulator, reading) => {
        return accumulator + reading.duration
    }, 0)

    const oldTestamentHourReadings = oldTestament.reduce((accumulator, reading) => {
        return accumulator + reading.duration
    }, 0)

    const { chapters, verses, words } = readings.reduce((totals, reading) => {
        const { books } = reading

        totals.chapters += books.length;
        totals.verses += books.reduce((totalVerses, book) => totalVerses + book.verses, 0)
        totals.words += books.reduce((totalWords, book) => totalWords + book.words, 0)

        return totals
    }, { chapters: 0, verses: 0, words: 0 })

    return completedBooks &&
        (

            <>
                <DashboardGeneralDesktop
                    name={name}
                    completedBible={completedBible!}
                    readings={readings}
                    completedBook={completedBooks}
                    chapters={chapters}
                    comparedBooks={comparedBooks}
                    completedBooksByTestament={completedBooksByTestament}
                    newTestament={newTestament}
                    oldTestament={oldTestament}
                    newTestamentCompletedBooks={newTestamentCompletedBooks}
                    oldTestamentCompletedBooks={oldTestamentCompletedBooks}
                    newTestamentHourReadings={newTestamentHourReadings}
                    oldTestamentHourReadings={oldTestamentHourReadings}
                    numOfChaptersNewTestament={numOfChaptersNewTestament}
                    numOfChaptersOldTestament={numOfChaptersOldTestament}
                    totalCompletedBooksTestaments={totalCompletedBooksTestaments}
                    verses={verses}
                    words={words}
                />
                <DashboardGeneralMobile
                    name={name}
                    completedBible={completedBible!}
                    readings={readings}
                    completedBook={completedBooks}
                    chapters={chapters}
                    comparedBooks={comparedBooks}
                    completedBooksByTestament={completedBooksByTestament}
                    newTestamentCompletedBooks={newTestamentCompletedBooks}
                    oldTestamentCompletedBooks={oldTestamentCompletedBooks}
                    numOfChaptersNewTestament={numOfChaptersNewTestament}
                    numOfChaptersOldTestament={numOfChaptersOldTestament}
                    totalCompletedBooksTestaments={totalCompletedBooksTestaments}
                    verses={verses}
                    words={words}
                />
            </>
        )
}


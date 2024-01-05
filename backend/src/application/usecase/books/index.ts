import { prisma } from '@/infra/database'
import { BookRepositoryPrisma } from '@/infra/repository/prisma/BookRepositoryPrisma'
import { CountBookChapterByName } from './CountBookChapterByName'
import { GetAllCompletedBooks } from './GetAllCompletedBooks'
import { GetBookById } from './GetBookById'
import { GetBookByName } from './GetBookByName'
import { GetBookByTestament } from './GetBookByTestament'
import { CountBookVerses } from './CountBookVerses'
import { UserRepositoryPrisma } from '@/infra/repository/prisma/UserRepositoryPrisma'
import { ReadingRepositoryPrisma } from '@/infra/repository/prisma/ReadingRepositoryPrisma'

const bookRepository = new BookRepositoryPrisma(prisma)
const userRepository = new UserRepositoryPrisma(prisma)
const readingRepository = new ReadingRepositoryPrisma(prisma)


const getBooksByName = new GetBookByName(bookRepository)
const getBookById = new GetBookById(bookRepository)
const getBooksByTestament = new GetBookByTestament(bookRepository)
const countBookChapterByName = new CountBookChapterByName(bookRepository)
const getAllCompletedBooks = new GetAllCompletedBooks(userRepository, readingRepository, bookRepository)
const countBooksVerse = new CountBookVerses(bookRepository)

export { getBooksByName, getBookById, getBooksByTestament, countBookChapterByName, getAllCompletedBooks, countBooksVerse }
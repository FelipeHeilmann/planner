import { countBookChapterByName, countBooksVerse, getAllCompletedBooks, getBookById, getBooksByName, getBooksByTestament } from '@/application/usecase/books'
import { createDevotional, getAllDevotional, updateDevotional, getDevotionalById, deleteDevotional } from '@/application/usecase/devotional'
import { createMemorization, getAllMemorization, updateMemorization, finishedMemorization, addTimeMemorizated, getMemorizationById, deleteMemorization } from '@/application/usecase/memorization'
import { createPrayer, updatePrayer, finisehdPrayer, addTimePrayed, getPrayerById, deletePrayer, getAllPrayers } from '@/application/usecase/prayer'
import { createReading, getReadingById, deleteReading, getAllReadings, updateReading, getReadingsGroupByMonth } from '@/application/usecase/reading'
import { createReadinPlan, decreaseReadingPlanGoalPerDay, getAllReadingsPlans, getReadingPlanReadingsGroupByMonth, getReadingPlanById, getReadingsOfReadingPlan, increaseReadingPlanGoalPerDay, updateReadingPlan, getReadingsPlanCount, getReadingPlanReadingGroupByDay } from '@/application/usecase/reading-plan'
import { checkCoupon, createPaymentLink, createRenewLink, createUser, createUserByPayment, getLevels, getInfo, getUserCountData, login, toggleTheme, updateUser, uploadImage, userForgetPassword, userResetPassword, validatePermissions, getMyCoupons } from '@/application/usecase/user'
import { BookController } from '../controllers/BookController'
import { DevotionalController } from '../controllers/DevotionalController'
import { MemorizationController } from '../controllers/MemorizationController'
import { PrayerController } from '../controllers/PrayerController'
import { ReadingController } from '../controllers/ReadingController'
import { UserController } from '../controllers/UserController'
import { ReadingPlanController } from './ReadingPlanController'
import { AdminController } from './AdminController'
import { createAffiliatePayment, createCoupon, createLevel, deleteUser, getAffiliatePayments, getAffiliates, getAllCoupons, getAllUsers, getCouponById, loginAdmin, makeUserAffiliate, resetUserPassword, uploadLevelImage } from '@/application/usecase/admin'

const userController = new UserController(createUser, login, getUserCountData, createUserByPayment, userForgetPassword, userResetPassword, createPaymentLink, uploadImage, updateUser, checkCoupon, getLevels, createRenewLink, toggleTheme, getInfo, validatePermissions, getMyCoupons)
const prayerController = new PrayerController(createPrayer, getAllPrayers, updatePrayer, finisehdPrayer, addTimePrayed, getPrayerById, deletePrayer)
const devotionalController = new DevotionalController(createDevotional, getAllDevotional, updateDevotional, getDevotionalById, deleteDevotional)
const memorizationController = new MemorizationController(createMemorization, getAllMemorization, updateMemorization, finishedMemorization, addTimeMemorizated, getMemorizationById, deleteMemorization)
const readingController = new ReadingController(createReading, getAllReadings, updateReading, getReadingById, deleteReading, getReadingsGroupByMonth)
const bookController = new BookController(countBookChapterByName, getBookById, getBooksByName, getBooksByTestament, getAllCompletedBooks, countBooksVerse)
const readingPlanController = new ReadingPlanController(createReadinPlan, getReadingsOfReadingPlan, getAllReadingsPlans, getReadingPlanById, increaseReadingPlanGoalPerDay, decreaseReadingPlanGoalPerDay, updateReadingPlan, getReadingPlanReadingsGroupByMonth, getReadingsPlanCount, getReadingPlanReadingGroupByDay)
const adminController = new AdminController(loginAdmin, getAllUsers, deleteUser, createLevel, uploadLevelImage, createCoupon, getAllCoupons, getCouponById, resetUserPassword, getAffiliates, makeUserAffiliate, createAffiliatePayment, getAffiliatePayments)

export {
    userController,
    prayerController,
    devotionalController,
    memorizationController,
    readingController,
    bookController,
    readingPlanController,
    adminController
}
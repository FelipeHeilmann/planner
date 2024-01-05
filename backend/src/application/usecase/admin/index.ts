import { UserRepositoryPrisma } from '@/infra/repository/prisma/UserRepositoryPrisma'
import { prisma } from '@/infra/database'
import { GetUsers } from './GetUsers'
import { LoginAdmin } from './LoginAdmin'
import { DeleteUser } from './DeleteUser'
import { PrayerRepositoryPrisma } from '@/infra/repository/prisma/PrayerRepositoryPrisma'
import { MemorizationRepositoryPrisma } from '@/infra/repository/prisma/MemorizationRepositoryPrisma'
import { DevotionalRepositoryPrisma } from '@/infra/repository/prisma/DevotionalRepositoryPrisma'
import { ReadingPlanRepositoryPrisma } from '@/infra/repository/prisma/ReadingPlanRepositoryPrisma'
import { ReadingRepositoryPrisma } from '@/infra/repository/prisma/ReadingRepositoryPrisma'
import { CreateLevel } from './CreateLevel'
import { LevelRepositoryPrisma } from '@/infra/repository/prisma/LevelRepositoryPrisma'
import { UploadLevelImage } from './UploadLevelmage'
import { SaveFile } from '../user/SaveFile'
import { CreateCoupon } from './CreateCoupon'
import { CouponRepositoryPrisma } from '@/infra/repository/prisma/CouponRepositoryPrisma'
import { GetAllCoupons } from './GetAllCoupons'
import { GetCouponById } from './GetCouponById'
import { RabbitMQAdapter } from '@/infra/queue/RabbitMQAdapter'
import { ResetUserPassword } from './ResetUserPassword'
import { GetAffiliates } from './GetAffiliates'
import { MakeUserAffiliate } from './MakeUserAffiliate'
import { CreateAffiliatePayment } from './CreateAffiliatePayment'
import { AffiliatePaymentRepositoryPrisma } from '@/infra/repository/prisma/AffiliatePaymentRepositoryPrisma'
import { GetAffiliatePayments } from './GetAffiliatePayments'


const userRepository = new UserRepositoryPrisma(prisma)
const AffiliatePaymentRepository = new AffiliatePaymentRepositoryPrisma(prisma)
const prayerRepository = new PrayerRepositoryPrisma(prisma)
const memorizationRepository = new MemorizationRepositoryPrisma(prisma)
const devotionalRepository = new DevotionalRepositoryPrisma(prisma)
const readingPlanRepository = new ReadingPlanRepositoryPrisma(prisma)
const readingRepository = new ReadingRepositoryPrisma(prisma)
const levelRepository = new LevelRepositoryPrisma(prisma)
const couponRepository = new CouponRepositoryPrisma(prisma)
const saveFile = new SaveFile()
const rabbitMQ = new RabbitMQAdapter()

const createCoupon = new CreateCoupon(couponRepository)
const createLevel = new CreateLevel(levelRepository)
const getAllUsers = new GetUsers(userRepository)
const getCouponById = new GetCouponById(couponRepository, userRepository)
const loginAdmin = new LoginAdmin(userRepository)
const getAllCoupons = new GetAllCoupons(couponRepository, userRepository)
const deleteUser = new DeleteUser(userRepository, readingPlanRepository, memorizationRepository, devotionalRepository, readingRepository, prayerRepository, rabbitMQ)
const uploadLevelImage = new UploadLevelImage(levelRepository, saveFile)
const resetUserPassword = new ResetUserPassword(userRepository)
const getAffiliates = new GetAffiliates(userRepository)
const makeUserAffiliate = new MakeUserAffiliate(userRepository)
const createAffiliatePayment = new CreateAffiliatePayment(AffiliatePaymentRepository, couponRepository)
const getAffiliatePayments = new GetAffiliatePayments(AffiliatePaymentRepository)

export {
    getAllUsers,
    loginAdmin,
    deleteUser,
    createLevel,
    uploadLevelImage,
    createCoupon,
    getAllCoupons,
    getCouponById,
    resetUserPassword,
    getAffiliates,
    makeUserAffiliate,
    createAffiliatePayment,
    getAffiliatePayments
}
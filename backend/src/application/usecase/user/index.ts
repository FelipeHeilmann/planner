import { prisma } from '@/infra/database'
import { RabbitMQAdapter } from '@/infra/queue/RabbitMQAdapter'
import { LevelRepositoryPrisma } from '@/infra/repository/prisma/LevelRepositoryPrisma'
import { UserRepositoryPrisma } from '@/infra/repository/prisma/UserRepositoryPrisma'
import { CancelUserAccess } from './CancelUserAccess'
import { CreatePaymentLink } from './CreatePaymentLink'
import { CreateUser } from './CreateUser'
import { CreateuserByPayment } from './CreateUserByPayment'
import { ForgetPassword } from './ForgetPassword'
import { GetById } from './GetById'
import { GetUserCountData } from './GetUserCountData'
import { Login } from './Login'
import { ResetPassword } from './ResetPassword'
import { UpdateUserPoints } from './UpdateUserPoints'
import { UploadImage } from './UploadImage'
import { UpdateUser } from './UpdateUser'
import { SaveFile } from './SaveFile'
import { CheckCoupon } from './CheckCoupon'
import { CouponRepositoryPrisma } from '@/infra/repository/prisma/CouponRepositoryPrisma'
import { GetLevels } from './GetLevels'
import { CreateRenewLink } from './CreateRenewLink'
import { PagarmeGateway } from '@/infra/gateway/PagarmeGateway'
import { ToggleTheme } from './ToggleTheme'
import { GetInfo } from './GetInfo'
import { Permissions } from './Permissions'
import { GetMyCoupons } from './GetMyCoupons'

const pagarmeGateway = new PagarmeGateway()
const userRepository = new UserRepositoryPrisma(prisma)
const levelRepository = new LevelRepositoryPrisma(prisma)
const couponRepository = new CouponRepositoryPrisma(prisma)
const rabbitMQueueAdapter = new RabbitMQAdapter()
const saveFile = new SaveFile()
const uploadImage = new UploadImage(userRepository, saveFile)

const createUser = new CreateUser(userRepository, rabbitMQueueAdapter)
const updatePoints = new UpdateUserPoints(userRepository, levelRepository)
const getUserById = new GetById(userRepository)
const login = new Login(userRepository)
const createUserByPayment = new CreateuserByPayment(userRepository, rabbitMQueueAdapter, couponRepository)
const userForgetPassword = new ForgetPassword(userRepository, rabbitMQueueAdapter)
const userResetPassword = new ResetPassword(userRepository)
const getUserCountData = new GetUserCountData(userRepository)
const cancelUserAccess = new CancelUserAccess(userRepository)
const checkCoupon = new CheckCoupon(couponRepository)
const updateUser = new UpdateUser(userRepository)
const getLevels = new GetLevels(levelRepository)
const toggleTheme = new ToggleTheme(userRepository)
const createPaymentLink = new CreatePaymentLink(couponRepository, pagarmeGateway)
const createRenewLink = new CreateRenewLink(userRepository, pagarmeGateway)
const getInfo = new GetInfo(userRepository)
const validatePermissions = new Permissions(userRepository)
const getMyCoupons = new GetMyCoupons(couponRepository, userRepository)

export {
    createUser,
    updatePoints,
    login,
    getUserCountData,
    createUserByPayment,
    userForgetPassword,
    userResetPassword,
    createPaymentLink,
    getUserById,
    uploadImage,
    cancelUserAccess,
    updateUser,
    checkCoupon,
    getLevels,
    createRenewLink,
    toggleTheme,
    getInfo,
    validatePermissions,
    getMyCoupons
}


import { FastifyRequest, FastifyReply } from 'fastify'
import { LoginAdmin } from '@/application/usecase/admin/LoginAdmin'
import { GetUsers } from '@/application/usecase/admin/GetUsers'
import { DeleteUser } from '@/application/usecase/admin/DeleteUser'
import { CreateLevel } from '@/application/usecase/admin/CreateLevel'
import { levelSchema } from '../schemas/levelSchema'
import { UploadLevelImage } from '@/application/usecase/admin/UploadLevelmage'
import { BadRequestError } from '../helpers/api-error'
import { affiliatePaymentSchema, couponSchema } from '../schemas/couponSchema'
import { CreateCoupon } from '@/application/usecase/admin/CreateCoupon'
import { GetAllCoupons } from '@/application/usecase/admin/GetAllCoupons'
import { GetCouponById } from '@/application/usecase/admin/GetCouponById'
import { ResetUserPassword } from '@/application/usecase/admin/ResetUserPassword'
import { GetAffiliates } from '@/application/usecase/admin/GetAffiliates'
import { MakeUserAffiliate } from '@/application/usecase/admin/MakeUserAffiliate'
import { CreateAffiliatePayment } from '@/application/usecase/admin/CreateAffiliatePayment'
import { GetAffiliatePayments } from '@/application/usecase/admin/GetAffiliatePayments'

export class AdminController {
    private readonly loginAdmin: LoginAdmin
    private readonly getAllUsers: GetUsers
    private readonly deleteUser: DeleteUser
    private readonly createLevel: CreateLevel
    private readonly uploadLevelImage: UploadLevelImage
    private readonly createCoupon: CreateCoupon
    private readonly getAllCoupons: GetAllCoupons
    private readonly getCouponById: GetCouponById
    private readonly resetUserPassword: ResetUserPassword
    private readonly getAffiliates: GetAffiliates
    private readonly makeUserAffiliate: MakeUserAffiliate
    private readonly createAffiliatePayment: CreateAffiliatePayment
    private readonly getAffiliatePayments: GetAffiliatePayments
    constructor(
        loginAdmin: LoginAdmin,
        getAllUsers: GetUsers,
        deleteUser: DeleteUser,
        createLevel: CreateLevel,
        uploadLevelImage: UploadLevelImage,
        createCoupon: CreateCoupon,
        getAllCoupons: GetAllCoupons,
        getCouponById: GetCouponById,
        resetUserPassword: ResetUserPassword,
        getAffiliates: GetAffiliates,
        makeUserAffiliate: MakeUserAffiliate,
        createAffiliatePayment: CreateAffiliatePayment,
        getAffiliatePayments: GetAffiliatePayments
    ) {
        this.getAllUsers = getAllUsers
        this.loginAdmin = loginAdmin
        this.deleteUser = deleteUser
        this.createLevel = createLevel
        this.uploadLevelImage = uploadLevelImage
        this.createCoupon = createCoupon
        this.getAllCoupons = getAllCoupons
        this.getCouponById = getCouponById
        this.resetUserPassword = resetUserPassword
        this.getAffiliates = getAffiliates
        this.makeUserAffiliate = makeUserAffiliate
        this.createAffiliatePayment = createAffiliatePayment
        this.getAffiliatePayments = getAffiliatePayments
    }

    async handleLogin(req: FastifyRequest, reply: FastifyReply) {
        const authHeader = req.headers && req.headers.authorization
        const [, hash] = authHeader ? authHeader.split(' ') : []
        const [email, password] = Buffer.from(hash, 'base64').toString().split(':')

        const token = await this.loginAdmin.execute({ email, password })

        reply.status(200).send({ token })
    }
    async handleGetAllUsers(req: FastifyRequest, reply: FastifyReply) {
        const users = await this.getAllUsers.execute()

        reply.status(200).send(users)
    }
    async handleDelete(req: FastifyRequest, reply: FastifyReply) {
        const { id } = req.params as { id: string }

        await this.deleteUser.execute(id)

        reply.status(200).send()
    }
    async handleCreateLevel(req: FastifyRequest, reply: FastifyReply) {
        const { name, description, minPoints, imageUrl } = levelSchema.parse(req.body)

        const level = await this.createLevel.execute({ name, description, minPoints, imageUrl })

        reply.header('Localtion', `/levels/${level}`)

        reply.status(201).send()
    }
    async handleResetPassword(req: FastifyRequest, reply: FastifyReply) {
        const { id } = req.params as { id: string }

        await this.resetUserPassword.execute(id)

        reply.status(200).send()
    }
    async handleUploadLevelImage(req: FastifyRequest, reply: FastifyReply) {
        const upload = await req.file({
            limits: {
                fileSize: 5_242_880, // 5mb
            },
        })

        if (!upload) {
            throw new BadRequestError('Tamanho de arquivo não suportado')
        }

        const fileUrl = await this.uploadLevelImage.execute(upload, req.protocol, req.hostname)

        reply.status(200).send({ fileUrl })
    }
    async handleCreateCoupon(req: FastifyRequest, reply: FastifyReply) {
        const { name, isValid, value, dueAt, affiliateId, percentageToAffiliate } = couponSchema.parse(req.body)

        const coupon = await this.createCoupon.execute({ name, isValid, value, dueAt, affiliateId, percentageToAffiliate })

        reply.header('Location', `/coupons/${coupon.id}`)

        reply.status(201).send()
    }
    async handleGetAllCoupons(req: FastifyRequest, reply: FastifyReply) {
        const coupons = await this.getAllCoupons.execute()

        reply.status(200).send(coupons)
    }
    async handleGetCouponById(req: FastifyRequest, reply: FastifyReply) {
        const { id } = req.params as { id: string }
        const coupon = await this.getCouponById.execute(id)

        reply.status(200).send(coupon)
    }
    async handleMakeAffiliate(req: FastifyRequest, reply: FastifyReply) {
        const { id } = req.params as { id: string }

        await this.makeUserAffiliate.execute(id)

        reply.status(200).send()
    }
    async handleGetAffiliates(req: FastifyRequest, reply: FastifyReply) {
        const affiliates = await this.getAffiliates.execute()

        reply.status(200).send(affiliates)
    }
    async handleGetPayments(req: FastifyRequest, reply: FastifyReply) {
        const { id } = req.params as { id: string }
        const payments = await this.getAffiliatePayments.execute(id)

        reply.status(200).send(payments)
    }
    async handleMakePayment(req: FastifyRequest, reply: FastifyReply) {
        const { id } = req.params as { id: string }
        const { value, date } = affiliatePaymentSchema.parse(req.body)
        await this.createAffiliatePayment.execute({ couponId: id, date, value })

        reply.status(201).send()
    }
}
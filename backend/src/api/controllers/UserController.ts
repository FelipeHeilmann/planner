import { FastifyReply, FastifyRequest } from 'fastify'
import { CreateUser } from '@/application/usecase/user/CreateUser'
import { Login } from '../../application/usecase/user/Login'
import { updateUserSchema, userSchema } from '../schemas/userSchema'
import { GetUserCountData } from '@/application/usecase/user/GetUserCountData'
import { CreateuserByPayment } from '@/application/usecase/user/CreateUserByPayment'
import { ForgetPassword } from '@/application/usecase/user/ForgetPassword'
import { ResetPassword } from '@/application/usecase/user/ResetPassword'
import { BadRequestError, UnauthorizedError } from '../helpers/api-error'
import { createLinkPaymentUserSchema } from '../schemas/createLinkPaymentUsersSchema'
import { CreatePaymentLink } from '@/application/usecase/user/CreatePaymentLink'
import { UploadImage } from '@/application/usecase/user/UploadImage'
import { UpdateUser } from '@/application/usecase/user/UpdateUser'
import jwt from 'jsonwebtoken'
import { CheckCoupon } from '@/application/usecase/user/CheckCoupon'
import { GetLevels } from '@/application/usecase/user/GetLevels'
import { CreateRenewLink } from '@/application/usecase/user/CreateRenewLink'
import { ToggleTheme } from '@/application/usecase/user/ToggleTheme'
import { GetInfo } from '@/application/usecase/user/GetInfo'
import { Permissions } from '@/application/usecase/user/Permissions'
import { GetMyCoupons } from '@/application/usecase/user/GetMyCoupons'

type PagarmeResponse = {
    data: {
        amount: number,
        items: [
            {
                code: string
            }
        ],
        customer: {
            id: string
            name: string
            email: string
            document: string
            document_type: string
            type: string
        }
    }
}

export class UserController {
    private readonly createUser: CreateUser
    private readonly userlogin: Login
    private readonly getUserCountData: GetUserCountData
    private readonly createUserByPayment: CreateuserByPayment
    private readonly userForgetPassword: ForgetPassword
    private readonly userResetPassword: ResetPassword
    private readonly createPaymentLink: CreatePaymentLink
    private readonly uploadImage: UploadImage
    private readonly updateUser: UpdateUser
    private readonly checkCoupon: CheckCoupon
    private readonly getLevels: GetLevels
    private readonly createRenewLink: CreateRenewLink
    private readonly toggleTheme: ToggleTheme
    private readonly getInfo: GetInfo
    private readonly validatePermissions: Permissions
    private readonly getMyCoupons: GetMyCoupons
    constructor(
        createUser: CreateUser,
        login: Login,
        getUserCountData: GetUserCountData,
        createUserByPayment: CreateuserByPayment,
        userForgetPassword: ForgetPassword,
        userResetPassword: ResetPassword,
        createPaymentLink: CreatePaymentLink,
        uploadImage: UploadImage,
        updateUser: UpdateUser,
        checkCoupon: CheckCoupon,
        getLevels: GetLevels,
        createRenewLink: CreateRenewLink,
        toggleTheme: ToggleTheme,
        getInfo: GetInfo,
        validatePermissions: Permissions,
        getMyCoupons: GetMyCoupons
    ) {
        this.createUser = createUser
        this.userlogin = login
        this.getUserCountData = getUserCountData
        this.createUserByPayment = createUserByPayment
        this.userForgetPassword = userForgetPassword
        this.userResetPassword = userResetPassword
        this.createPaymentLink = createPaymentLink
        this.uploadImage = uploadImage
        this.updateUser = updateUser
        this.checkCoupon = checkCoupon
        this.getLevels = getLevels
        this.createRenewLink = createRenewLink
        this.toggleTheme = toggleTheme
        this.getInfo = getInfo
        this.validatePermissions = validatePermissions
        this.getMyCoupons = getMyCoupons
    }

    async handleCreate(req: FastifyRequest, reply: FastifyReply) {
        const { name, email, password, accessDuration, isAdmin } = userSchema.parse(req.body)

        const user = await this.createUser.execute({ name, email, password, accessDuration, isAdmin })

        reply.header('Location', `/users/${user.id}`)

        reply.status(201).send()
    }
    async handleLogin(req: FastifyRequest, reply: FastifyReply) {
        const authHeader = req.headers && req.headers.authorization
        const [, hash] = authHeader ? authHeader.split(' ') : []
        const [email, password] = Buffer.from(hash, 'base64').toString().split(':')

        const token = await this.userlogin.execute(email, password)

        reply.status(200).send({ token })
    }
    async handleGetCountData(req: FastifyRequest, reply: FastifyReply) {
        const users = await this.getUserCountData.execute(req.user.sub)

        reply.status(201).send(users)
    }
    async handleForgetPassword(req: FastifyRequest, reply: FastifyReply) {
        const { email } = req.body as { email: string }

        await this.userForgetPassword.execute(email)

        reply.status(200).send({ message: `Email enviado para ${email}` })
    }
    async handleResetPassword(req: FastifyRequest, reply: FastifyReply) {
        const token = req.headers.authorization!.split(' ')[1]

        const { password, confirmPassword } = req.body as { password: string, confirmPassword: string }

        const decode = jwt.verify(token, process.env.SECRET!)

        if (!decode) {
            throw new UnauthorizedError('Token inválido')
        }

        /*eslint-disable*/
        const { id } = jwt.decode(token) as any


        await this.userResetPassword.execute({ id, password, confirmPassword })

        reply.status(200).send()
    }
    async handleCheckCoupon(req: FastifyRequest, reply: FastifyReply) {
        const { name } = req.params as { name: string }

        const coupon = await this.checkCoupon.execute(name)

        reply.status(200).send({ value: coupon.getValue() })
    }
    async handleCreatePaymentLink(req: FastifyRequest, reply: FastifyReply) {
        const { name, email, telephone, cpf, plan, couponName } = createLinkPaymentUserSchema.parse(req.body)

        const checkoutUrl = await this.createPaymentLink.execute({ name, email, telephone, cpf, plan, couponName })

        reply.status(200).send(checkoutUrl)
    }
    async handleUploadImage(req: FastifyRequest, reply: FastifyReply) {
        const upload = await req.file({
            limits: {
                fileSize: 2 * 5_242_880, // 10mb
            },
        })

        if (!upload) {
            throw new BadRequestError('Tamanho de arquivo não suportado')
        }

        await this.uploadImage.execute(upload, req.protocol, req.hostname, req.user.sub)

        reply.status(200).send()
    }
    async handleUpdate(req: FastifyRequest, reply: FastifyReply) {
        const { newPassword, oldPassword, name, birthDate, gender } = updateUserSchema.parse(req.body)

        await this.updateUser.execute({ newPassword, oldPassword, userId: req.user.sub, name, birthDate, gender })

        reply.status(200).send()
    }
    async handleGetAllLevels(req: FastifyRequest, reply: FastifyReply) {
        const levels = await this.getLevels.execute()

        reply.status(200).send(levels)
    }
    async handleCreateUserByPayment(req: FastifyRequest, reply: FastifyReply) {
        await this.createUserByPayment.execute(req.body as PagarmeResponse)

        reply.status(201).send()
    }
    async handleCreateRenewLink(req: FastifyRequest, reply: FastifyReply) {
        const { plan } = req.body as { plan: string }

        const checkoutUrl = await this.createRenewLink.execute({ plan, userId: req.user.sub })

        reply.status(200).send(checkoutUrl)
    }
    async handleToggleTheme(req: FastifyRequest, reply: FastifyReply) {
        const theme = await this.toggleTheme.execute(req.user.sub)

        reply.status(200).send(theme)
    }
    async handleGetInfo(req: FastifyRequest, reply: FastifyReply) {
        const output = await this.getInfo.execute(req.user.sub)

        reply.status(200).send(output)
    }
    async handleValidatePermissions(req:FastifyRequest, reply: FastifyReply){
        const output = await this.validatePermissions.execute(req.user.sub)

        reply.status(200).send(output)
    }
    async handleGetMyCoupons(req: FastifyRequest, reply: FastifyReply){
        const coupons = await this.getMyCoupons.execute(req.user.sub)

        reply.status(200).send(coupons)
    }
}
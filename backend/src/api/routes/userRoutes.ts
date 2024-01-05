import { userController } from '../controllers'
import { FastifyInstance } from 'fastify/types/instance'
import { isUserActive } from '../middlewares/isUserActive'

export const userRoutes = (app: FastifyInstance) => {
    app.get('/users/count/data', async function (req, reply) {
        await isUserActive(req)
        return userController.handleGetCountData(req, reply)
    })
    app.get('/levels', async function (req, reply) {
        await isUserActive(req)
        return userController.handleGetAllLevels(req, reply)
    })
    app.get('/users/info', async function (req, reply) {
        await isUserActive(req)
        return userController.handleGetInfo(req, reply)
    })
    app.get('/payment/coupon/:name', async function (req, reply) {
        return userController.handleCheckCoupon(req, reply)
    })
    app.get('/permissions', async function(req,reply){
        await isUserActive(req)
        return userController.handleValidatePermissions(req,reply)
    })
    app.get('/affiliates/coupons', async function(req,reply) {
        await isUserActive(req)
        return userController.handleGetMyCoupons(req,reply)
    })
    app.post('/auth', async function (req, reply) {
        return userController.handleLogin(req, reply)
    })
    app.post('/register', async function (req, reply) {
        return userController.handleCreate(req, reply)
    })
    app.post('/payment', async function (req, reply) {
        return userController.handleCreatePaymentLink(req, reply)
    })
    app.post('/renew', async function (req, reply) {
        await isUserActive(req)
        return userController.handleCreateRenewLink(req, reply)
    })
    app.post('/payment/users/create', async function (req, reply) {
        return userController.handleCreateUserByPayment(req, reply)
    })
    app.post('/forget-password', async function (req, reply) {
        return userController.handleForgetPassword(req, reply)
    })
    app.patch('/reset-password', async function (req, reply) {
        return userController.handleResetPassword(req, reply)
    })
    app.patch('/users/update', async function (req, reply) {
        await isUserActive(req)
        return userController.handleUpdate(req, reply)
    })
    app.patch('/users/icon', async function (req, reply) {
        await isUserActive(req)
        return userController.handleUploadImage(req, reply)
    })
    app.patch('/theme', async function (req, reply) {
        await isUserActive(req)
        return userController.handleToggleTheme(req, reply)
    })
}
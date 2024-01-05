import { FastifyInstance } from 'fastify/types/instance'
import { isUserAdmin } from '../middlewares/isUserAdmin'
import { adminController } from '../controllers'
import { isUserActive } from '../middlewares/isUserActive'

export const adminRoutes = (app: FastifyInstance) => {
    app.get('/admin/users', async function (req, reply) {
        await isUserAdmin(req)
        return adminController.handleGetAllUsers(req, reply)
    })
    app.get('/coupons', async function (req, reply) {
        await isUserAdmin(req)
        return adminController.handleGetAllCoupons(req, reply)
    })
    app.get('/coupons/:id', async function (req, reply) {
        await isUserActive(req)
        return adminController.handleGetCouponById(req, reply)
    })
    app.get('/affiliates', async function (req, reply) {
        await isUserAdmin(req)
        return adminController.handleGetAffiliates(req, reply)
    })
    app.get('/coupons/:id/payments', async function (req, reply) {
        await isUserAdmin(req)
        return adminController.handleGetPayments(req, reply)
    })
    app.post('/auth/admin', async function (req, reply) {
        return adminController.handleLogin(req, reply)
    })
    app.post('/coupons', async function (req, reply) {
        await isUserAdmin(req)
        return adminController.handleCreateCoupon(req, reply)
    })
    app.post('/levels', async function (req, reply) {
        await isUserAdmin(req)
        return adminController.handleCreateLevel(req, reply)
    })
    app.post('/levels/image', async function (req, reply) {
        await isUserAdmin(req)
        return adminController.handleUploadLevelImage(req, reply)
    })
    app.post('/coupons/:id/payments', async function (req, reply) {
        await isUserAdmin(req)
        return adminController.handleMakePayment(req, reply)
    })
    app.patch('/admin/users/:id', async function (req, reply) {
        await isUserAdmin(req)
        return adminController.handleResetPassword(req, reply)
    })
    app.patch('/admin/users/:id/disable', async function (req, reply) {
        await isUserAdmin(req)
        return adminController.handleDelete(req, reply)
    })
    app.patch('/admin/users/:id/affiliate', async function (req, reply) {
        await isUserAdmin(req)
        return adminController.handleMakeAffiliate(req, reply)
    })
}
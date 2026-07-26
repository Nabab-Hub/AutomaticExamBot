const express = require('express')
const router = express.Router()
const authMiddleware = require('../middlewares/auth-middleware')
const qrPaymentController = require('../controllers/qr-payment-controller')
const adminMiddleware = require('../middlewares/admin-middleware')


router.route('/send_coin_request').post(authMiddleware, qrPaymentController.sendPaymentRequest)

module.exports = router;
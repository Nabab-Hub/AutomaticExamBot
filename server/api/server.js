require('dotenv').config()
const express = require("express")
const serverless = require('serverless-http')
const cors = require('cors')
const app = express()

const authRoute = require('../router/auth.router')
const contactRoute = require('../router/contact-router')
const otpRoute = require('../router/otp-router')
const adminRoute = require('../router/admin-router')
const APIRoute = require('../router/api-router')
const CoinsRoute = require('../router/coins-router')
const PaymentRoute = require('../router/payment-router')
const VersionRoute = require('../router/app-router')
const connectDb = require('../utils/db')
const errorMiddleware = require('../middlewares/error-middleware')

const REQ_URL = 'https://automatic-exam-bot.vercel.app'
const corsOption = {
    origin: REQ_URL,
    methods: 'GET, POST, PUT, DELETE, PATCH, HEAD',
    credentials: true,
}
app.use(cors(corsOption))

app.use(express.json())

app.use("/api/auth", authRoute)
app.use("/api/form", contactRoute)
app.use("/api/otp", otpRoute)
app.use('/api/admin', adminRoute)
app.use('/api/api_key', APIRoute)
app.use('/api/coins', CoinsRoute)
app.use('/api/payments', PaymentRoute)
app.use('/api/versions', VersionRoute)

app.use(errorMiddleware)

// Connect to the database
connectDb()

module.exports = serverless(app)  // Export app as serverless function

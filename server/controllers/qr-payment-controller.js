const QRPaymentModel = require('../models/QR-payment-model')

const sendPaymentRequest = async (req, res) => {
    const {email, price, coins, img, time} = req.body

    try {
        await QRPaymentModel.create({email, price, coins, img, time})
        res.status(200).json({message: 'Coins Request Successfully !!'})
    } catch (error) {
        res.status(400).json({ message: 'Internal Server Error !!' });
    }
}

module.exports = {sendPaymentRequest};
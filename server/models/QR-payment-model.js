const mongoose = require('mongoose');

// Define the schema
const QRPaymentSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    validate: {
      validator: function(v) {
        return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(v);
      },
      message: props => `${props.value} is not a valid email!`
    },
  },
  price: {
    type: Number,
    required: true
  },
  coins:{
    type: Number,
    required: true
  },
  img: {
    type: String,
    required: true
  },
  time: {
    type: Date,
    required: true,
    default: Date.now
  }
});



// Create the model
const QRPaymentModel = mongoose.model('qrpayment', QRPaymentSchema);

module.exports = QRPaymentModel;

import mongoose from 'mongoose';

const TransactionSchema = new mongoose.Schema({
    transactionId: {
        type: String,
        default: null
    },
    orderId: {
        type: String,
        default: null
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'realusers',
        required: true
    },
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'producties',
        required: true
    },

    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    zipCode: {
        type: String,
        required: true
    },
    productname: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        default: 'pending'
    },

}, { timestamps: true });

const Transaction = mongoose.model('Transaction', TransactionSchema);

export default Transaction;

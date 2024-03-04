import mongoose from 'mongoose';

const addcardshema = new mongoose.Schema({
    userid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'realuser',
        unique: true
    },
    
    cartItems: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
    }]
});

const AddtoCard = mongoose.model('addtocard', addcardshema);

export default AddtoCard;

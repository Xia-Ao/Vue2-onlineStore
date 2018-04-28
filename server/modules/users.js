let mongoose = require('mongoose');
let Schema = mongoose.Schema;

let userSchema = new Schema({
    'userId': String,
    'userName': String,
    'userPwd': String,
    'orderList': Array,
    'cartList': [
        {
            'productId': String,
            'productName': String,
            'salePrice': Number,
            'productImage': String,
            'checked': Boolean,
            'productNum': Number
        }
    ],
    'addressList': [
        {
            'addressId': String,
            'nickName': String,
            'userPhone': String,
            'userPost': String,
            'userAddress': String,
            'defaultAddress': String,
            'checked': Boolean
        }
    ]
});

module.exports = mongoose.model('User', userSchema, 'users');

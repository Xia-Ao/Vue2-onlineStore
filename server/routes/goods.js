let express = require('express');
let router = express.Router();
let mongoose = require('mongoose');
let Goods = require('../modules/goods');


mongoose.connect('mongodb://35.200.14.97:27017/store');

mongoose.connection.on('connected', () => {
    console.log('connect success');
});
mongoose.connection.on('error', () => {
    console.log('connect fail');
});
mongoose.connection.on('disconnected', () => {
    console.log('connect disconnected');
});

router.get('/', (req, res, next) => {
    // 获取接口请求参数
    let sort = parseInt(req.param('sort'));
    let page = parseInt(req.param('page'));
    let pageSize = parseInt(req.param('pageSize'));
    let skip = (page - 1) * pageSize;
    let params = {};
    // 价格过滤
    let priceLevel = req.param('priceLevel');
    let priceStart = '';
    let priceEnd = '';
    if (priceLevel !== 'all') {
        switch (priceLevel) {
            case '0':
                priceStart = 0;
                priceEnd = 100;
                break;
            case '1':
                priceStart = 100;
                priceEnd = 500;
                break;
            case '2':
                priceStart = 500;
                priceEnd = 1000;
                break;
            case '3':
                priceStart = 1000;
                priceEnd = 2000;
                break;
            case '4':
                priceStart = 2000;
                priceEnd = 10000;
                break;
        }
        params = {
            salePrice: {
                $gt: priceStart,
                $lte: priceEnd
            }
        };
    }

    let goodsModel = Goods.find(params).skip(skip).limit(pageSize);
    goodsModel.sort({'salePrice': sort});
    goodsModel.exec((err, doc) => {
        if (err) {
            res.json({
                status: '1',
                msg: err.message
            });
        } else {
            res.json({
                status: '0',
                msg: '',
                result: {
                    count: doc.length,
                    list: doc
                }
            });
        }
    });
});

module.exports = router;

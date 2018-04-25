var express = require('express');
var router = express.Router();

var User = require('./../modules/users');

/* GET users listing. */
router.get('/', function (req, res, next) {
    res.send('respond with a resource');
});

router.post('/login', function (req, res, next) {
    let param = {
        userName: req.body.userName,
        userPwd: req.body.userPwd
    };
    User.findOne(param, (err, doc) => {
        if (err) {
            res.json({
                status: '1',
                msg: err.message
            });
        } else {
            if (doc) {
                res.cookie('userId', doc.userId, {
                    path: '/',
                    maxAge: 2000 * 60 * 60
                });
                res.cookie('userName', doc.userName, {
                    path: '/',
                    maxAge: 2000 * 60 * 60
                });
                // res.session.user = doc;
                res.json({
                    status: '0',
                    msg: '',
                    result: {
                        userName: doc.userName
                    }
                });
            } else {
                res.json({
                    status: '1',
                    msg: '账号密码错误'
                });
            }
        }
    });
});

// 登出
router.post('/loginOut', (req, res, next) => {
    res.cookie('userId', '', {
        path: '/',
        maxAge: -1
    });
    res.json({
        status: '0',
        msg: '',
        result: ''
    });
});


// 登录校验
router.get('/loginCheck', (req, res, next) => {
    if (req.cookies.userId) {
        res.json({
            status: '0',
            msg: '',
            result: req.cookies.userName || ''
        });
    } else {
        res.json({
            status: '1',
            msg: '未登录',
            result: ''
        });
    }
});

// 查询购物车列表
router.get('/cartList', (req, res, next) => {
    let userId = req.cookies.userId;
    User.findOne({userId: userId}, (err, userDoc) => {
        if (err) {
            res.json({
                status: '1',
                msg: err.message,
                result: ''
            });
        } else {
            if (userDoc) {
                res.json({
                    status: '0',
                    msg: '获取购物车列表成功',
                    result: userDoc.cartList
                });
            }
        }
    });
});

// 删除购物车商品
router.post('/cartDel', (req, res, next) => {
    let userId = req.cookies.userId;
    let productId = req.body.productId;
    User.update({userId: userId}, {
        $pull: {
            'cartList': {
                'productId': productId
            }
        }
    }, (err, userDoc) => {
        if (err) {
            res.json({
                status: '1',
                msg: err.message,
                result: '删除失败'
            });
        } else {
            if (userDoc) {
                res.json({
                    status: '0',
                    msg: '',
                    result: '删除成功'
                });
            }
        }
    });
});

// 修改购物车商品数量
router.post('/cartEdit', (req, res, next) => {
    let userId = req.cookies.userId;
    let productId = req.body.productId;
    let productNum = req.body.productNum;
    User.update({userId: userId, 'cartList.productId': productId},
        {
            'cartList.$.productNum': productNum
        }, (err, userDoc) => {
            if (err) {
                res.json({
                    status: '1',
                    msg: err.message,
                    result: '修改失败'
                });
            } else {
                if (userDoc) {
                    res.json({
                        status: '0',
                        msg: '',
                        result: 'success'
                    });
                }
            }
        });
});

module.exports = router;

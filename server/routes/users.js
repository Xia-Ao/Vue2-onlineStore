var express = require('express');
var router = express.Router();

var User = require('./../modules/users');
var SaveDoc = require('./../public/javascripts/doc');
require('./../public/javascripts/util');

/* GET users listing. */
router.get('/', function (req, res, next) {
    res.send('respond with a resource');
});

/*************************** 登录注册 ********************************/

// 登录
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
                        userName: doc.userName,
                        cartList: doc.cartList
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


// 登录校验  刷新网页时使用
router.get('/loginCheck', (req, res, next) => {
    if (req.cookies.userId) {
        User.findOne({userId: req.cookies.userId}, (err, userDoc) => {
            if (err) {
                res.json({
                    status: '1',
                    msg: '请重新登录',
                    result: ''
                });
            } else {
                if (userDoc) {
                    res.json({
                        status: '0',
                        msg: '',
                        result: {
                            userName: req.cookies.userName || '',
                            cartList: userDoc.cartList
                        }
                    });
                }
            }
        });
    } else {
        res.json({
            status: '1',
            msg: '请重新登录',
            result: ''
        });
    }
});

// 新用户注册
router.post('/register', (req, res, next) => {
    let userId = req.body.userId;
    let userName = req.body.userName;
    let userPwd = req.body.userPwd;
    User.find({userId: userId}, (err, doc) => {
        if (err) {
            res.json({
                status: '1',
                msg: err.message,
                result: '未知错误'
            });
        } else {
            // 注册新用户
            if (!doc.length) {
                User.create({
                    userId: userId,
                    userName: userName,
                    userPwd: userPwd,
                    orderList: [],
                    cartList: [],
                    addressList: []
                }, (err2, doc2) => {
                    if (err2) {
                        res.json({
                            status: '1',
                            msg: err.message,
                            result: '未知错误'
                        });
                    } else {
                        if (doc2) {
                            res.json({
                                status: '0',
                                msg: '注册成功',
                                result: doc2
                            });
                        }
                    }
                });
            } else {
                res.json({
                    status: '2',
                    msg: '该用户ID已存在',
                    result: ''
                });
            }
        }
    });
});


/*************************** 购物车 ********************************/

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

//提交选中审核
router.post('/checkOut', (req, res, next) => {
    let userId = req.cookies.userId;
    let idList = req.body.idList;
    User.findOne({userId: userId}, (err, userDoc) => {
        if (err) {
            res.json({
                status: '1',
                msg: err.message
            });
        } else {
            let cartList = userDoc.cartList;
            cartList.forEach((item) => {
                let check = (id) => {
                    return id === item.productId;
                };
                if (idList.some(check)) {
                    item.checked = true;
                } else {
                    item.checked = false;
                }
            });
            SaveDoc.saveDoc(userDoc, res);
        }
    });
});


/*************************** 地址接口 ********************************/
router.get('/address', (req, res, next) => {
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
                    msg: '获取地址列表成功',
                    result: {
                        address: userDoc.addressList,
                        defaultAddress: userDoc.defaultAddress
                    }
                });
            }
        }
    });
});

// 新增地址
router.post('/addAddress', (req, res, next) => {
    let userId = req.cookies.userId;
    let address = req.body.address;
    User.findOne({userId: userId}, (err, userDoc) => {
            if (err) {
                res.json({
                    status: '1',
                    msg: err.message
                });
            } else {
                // 获取到用户的所有地址
                console.log('cartList', userDoc.addressList);
                if (userDoc) {
                    let addressItem = '';
                    // 遍历查找用户地址里面是否有相同的地址
                    userDoc.addressList.forEach((item) => {
                        if (item.addressId === address.addressId) {
                            addressItem = item;
                        }
                    });
                    if (addressItem) {
                        res.json({
                            status: '2',
                            msg: '地址ID已存在'
                        });
                    } else {
                        if (address.defaultAddress) {
                            userDoc.defaultAddress = address.addressId;
                        }
                        userDoc.addressList.push(address);
                        SaveDoc.saveDoc(userDoc, res);
                    }
                }
            }
        }
    );
});

// 修改地址
router.post('/editAddress', (req, res, next) => {
    let userId = req.cookies.userId;
    let address = req.body.address;
    User.findOne({userId: userId}, (err, userDoc) => {
        if (err) {
            res.json({
                status: '1',
                msg: err.message
            });
        } else {
            if (address.defaultAddress) {
                let addressList = userDoc.addressList;
                addressList.forEach((item) => {
                    if (item.addressId === address.addressId) {
                        item.defaultAddress = '1';
                    } else {
                        item.defaultAddress = '0';
                    }
                });
                userDoc.save();
            }
            User.update({userId: userId, 'addressList.addressId': address.addressId},
                {
                    'addressList.$.nickName': address.nickName,
                    'addressList.$.userPhone': address.userPhone,
                    'addressList.$.userPost': address.userPost,
                    'addressList.$.userAddress': address.userAddress
                }, (err, doc) => {
                    if (err) {
                        res.json({
                            status: '1',
                            msg: err.message,
                            result: '修改失败'
                        });
                    } else {
                        if (doc) {
                            res.json({
                                status: '0',
                                msg: '',
                                result: 'success'
                            });
                        }
                    }
                });
        }
    });
});

// 删除地址
router.post('/addressDel', (req, res, next) => {
    let userId = req.cookies.userId;
    let addressId = req.body.addressId;
    User.update({userId: userId}, {
        $pull: {
            'addressList': {
                'addressId': addressId
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

// 选中地址
router.post('/addressSelect', (req, res, next) => {
    let userId = req.cookies.userId;
    let addressId = req.body.addressId;
    User.findOne({userId: userId}, (err, userDoc) => {
        if (err) {
            res.json({
                status: '1',
                msg: err.message
            });
        } else {
            let addressList = userDoc.addressList;
            addressList.forEach((item) => {
                if (item.addressId === addressId) {
                    item.checked = true;
                } else {
                    item.checked = false;
                }
            });
            SaveDoc.saveDoc(userDoc, res);
        }
    });
});


/*******************   Order   *****************************/
// 查询选中购物车列表
router.get('/checkedCart', (req, res, next) => {
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
                let list = [];
                let cartList = userDoc.cartList;
                cartList.forEach((item) => {
                    if (item.checked) {
                        list.push(item);
                    }
                });
                res.json({
                    status: '0',
                    msg: '获取购物车列表成功',
                    result: list
                });
            }
        }
    });
});

// 生成订单
router.post('/payMent', (req, res, next) => {
    let userId = req.cookies.userId;
    let orderTotal = req.body.orderTotal;
    let addressId = req.body.addressId;
    let discount = req.body.discount;
    let tax = req.body.tax;
    User.findOne({userId: userId}, (err, userDoc) => {
        if (err) {
            res.json({
                status: '1',
                msg: err.message,
                result: ''
            });
        } else {
            // 获取地址
            let address = '';
            let goodsList = [];
            userDoc.addressList.forEach((item) => {
                if (addressId === item.addressId) {
                    address = item;
                }
            });

            // 获取商品信息
            userDoc.cartList.forEach((item) => {
                if (item.checked === true) {
                    goodsList.push(item);
                }
            });

            // 生成订单ID
            let platform = '521';
            let r1 = Math.floor(Math.random() * 10);
            let r2 = Math.floor(Math.random() * 10);

            let sysDate = new Date().Format('yyyyMMddhhmmss');
            let createDate = new Date().Format('yyyy-MM-dd hh:mm:ss');
            let orderId = platform + r1 + sysDate + r2;

            // order信息
            let order = {
                orderId: orderId,
                orderTotal: orderTotal,
                addressInfo: address,
                goodsList: goodsList,
                orderStatus: '1',
                createDate: createDate,
                discount: discount,
                tax: tax
            };
            userDoc.orderList.push(order);

            userDoc.save(function (err1, doc1) {
                if (err1) {
                    res.json({
                        status: '1',
                        msg: err.message,
                        result: ''
                    });
                } else {
                    // 购物车中删除刚刚提交的商品
                    let deleteNum = 0;
                    userDoc.cartList.forEach((item) => {
                        if (item.checked) {
                            deleteNum++;
                            User.update({userId: userId}, {
                                $pull: {
                                    'cartList': {
                                        'productId': item.productId
                                    }
                                }
                            }, (err2, doc2) => {
                            });
                        }
                    });
                    // 返回数据
                    res.json({
                        status: '0',
                        msg: '',
                        result: {
                            orderId: order.orderId,
                            orderTotal: order.orderTotal,
                            goodsNum: deleteNum
                        }
                    });
                }
            });
        }
    });
});


// 查询订单详情
router.get('/orderDetail', (req, res, next) => {
    let userId = req.cookies.userId;
    let orderId = req.query.orderId;
    User.findOne({userId: userId}, (err, userDoc) => {
        if (err) {
            res.json({
                status: '1',
                msg: err.message,
                result: ''
            });
        } else {
            if (userDoc) {
                let orderDetail = '';
                userDoc.orderList.forEach((item) => {
                    if (item.orderId === orderId) {
                        orderDetail = item;
                    }
                });
                if (orderDetail) {
                    res.json({
                        status: '0',
                        msg: '获取订单详情成功',
                        result: orderDetail
                    });
                } else {
                    res.json({
                        status: '2',
                        msg: '该用户没有订单',
                        result: ''
                    });
                }

            }
        }
    });
});

module.exports = router;

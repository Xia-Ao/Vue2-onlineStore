<template>
    <div>
        <nav-bread>
            <span>cart</span>
        </nav-bread>
        <div class="cart">
            <div class="title"><span>MY CART</span></div>
            <div class="cartList">
                <div class="cart-header">
                    <ul>
                        <li class="items">ITEMS</li>
                        <li class="price">PRICE</li>
                        <li class="quantity">QUANTITY</li>
                        <li class="subtotal">SUBTOTAL</li>
                        <li class="edit">EDIT</li>
                    </ul>
                </div>
                <div class="cart-content">
                    <div class="goods" v-for="(item,index) in goods" :key="index">
                        <ul>
                            <li class="items">
                                <div class="checkbox">
                                    <el-checkbox v-model="item.checked"
                                                 @change="checkChange(totalPrices)"></el-checkbox>
                                </div>
                                <div class="product-img">
                                    <img v-lazy="'./../static/img/'+item.productImage" alt="">
                                </div>
                                <div class="productName">
                                    <span>{{item.productName}}</span>
                                </div>
                            </li>
                            <li class="price">{{item.salePrice}}</li>
                            <li class="quantity">
                                <el-input-number v-model="item.productNum" @change="productNumChange(item)" :min="1"
                                                 label="描述文字" size="small">
                                </el-input-number>
                            </li>
                            <li class="subtotal">{{item.salePrice * item.productNum}}</li>
                            <li class="edit"><a @click="deleteGoods(item.productId)"><i
                                class="el-icon-delete"></i></a>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="cart-footer">
                    <div class="checkAll">
                        <el-checkbox v-model="checkAll" @change="CheckAllChange"></el-checkbox>
                        <span class="tips">Select ALL</span>
                    </div>
                    <div class="checkout" v-bind:class="{'notCheck':!totalPrices}" @click="checkOut(totalPrices)">
                        <span>CHECK OUT</span>
                    </div>
                    <div class="total-price">
                        <span>Total Price:</span>
                        <span class="price">{{totalPrices}}</span>
                    </div>

                </div>
            </div>
        </div>

    </div>
</template>

<script>
    import axios from 'axios';
    import NavBread from '@/components/navBread/navBread';

    export default {
        data () {
            return {
                goods: [],
                checkAll: true
            };
        },
        mounted () {
            this.init();
        },
        computed: {
            totalPrices () {
                let totalPrice = 0;
                this.goods.forEach((item, index) => {
                    if (item.checked) {
                        totalPrice += item.salePrice * item.productNum;
                    }
                });
                return totalPrice;
            }
        },
        methods: {
            init () {
                axios.get('users/cartList')
                    .then((response) => {
                        let res = response.data;
                        if (res.status === '0') {
                            this.goods = res.result;
                            console.log(this.goods[0].checked, typeof (this.goods[0].checked));
                            console.log('购物车列表', res.result);
                        } else {
                            console.log('购物车获取失败');
                        }
                    });
            },
            deleteGoods (productId) {
                this.$confirm('此操作将删除该商品, 是否继续?', '删除商品', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    confirmButtonClass: 'confirmDelete',
                    type: 'error'
                }).then(() => {
                    axios.post('/users/cartDel', {productId: productId}).then((res) => {
                        res = res.data;
                        if (res.status === '0') {
                            this.$message({
                                type: 'warning',
                                message: '删除成功!'
                            });
                            this.init();
                        } else {
                            this.$message({
                                type: 'warning ',
                                message: '删除失败'
                            });
                        }
                    });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消'
                    });
                });
            },
            productNumChange (goods) {
                axios.post('/users/cartEdit',
                    {
                        productId: goods.productId,
                        productNum: goods.productNum
                    }).then((res) => {
                    res = res.data;
                    if (res.status === '0') {
                        console.log('shuliang gaibian');
                    }
                });
            },
            CheckAllChange (val) {
                this.goods.forEach((item, index) => {
                    item.checked = val;
                });
            },
            checkChange (value) {
                if (value) {
                    this.checkAll = true;
                } else {
                    this.checkAll = false;
                }
            },
            checkOut (totalPrice) {
                if (totalPrice) {
                    let goodsList = [];
                    this.goods.forEach((item, index) => {
                        if (item.checked) {
                            goodsList.push(item);
                        }
                    });
                    // 也可以用router-link
                    this.$router.push({
                        name: 'address',
                        params: {goodsList}
                    });
                }
            }

        },

        components: {
            'nav-bread': NavBread
        }
    };
</script>

<style lang="stylus">
    .cart {
        box-sizing: content-box
        width: 1200px
        margin: auto
    }

    .title {
        height: 100px
        background: #ccc
        line-height: 150px
        font-size: 2em;
        font-weight: 700
        letter-spacing: 0.3em
    }

    .cartList {
        .cart-header {

            height: 40px
            background: #605f5f
            color: #ffffff
            font-size: 16px
            line-height: 40px
            width: 100%
            ul > li {
                letter-spacing: 4px
                border-right: 1px solid #a2a2a2
            }
        }
        ul {
            margin: 0
            padding: 0
            width: 100%
            li {
                display: inline-block
                text-align: center
            }
            li:nth-child(1) {
                width: 38%
            }
            li:nth-child(2) {
                width: 15%
            }
            li:nth-child(3) {
                width: 20%
            }
            li:nth-child(4) {
                width: 15%
            }
            li:nth-child(5) {
                width: 10%
                border: none
            }
        }

        .cart-content {
            .goods {
                height: 120px
                box-sizing: content-box
                border-bottom: 1px solid #cccccc
                padding: 20px 0
                background: #ffffff
            }
            .goods:last-child {
                border: none
            }
            ul {
                height: 100%

                position: relative
                li {
                    height: 100%
                    line-height 120px
                }
                li:first-child {
                    float: left
                    text-align: left
                    div {
                        display: inline-block
                        margin-left: 20px
                    }
                    .product-img {
                        height: 100%
                        img {
                            width: 80px
                            height: 80px
                            display: inline-block
                            vertical-align: middle
                            border: 1px solid #cccccc
                        }

                    }
                }
                .checkbox {

                }
                .subtotal {
                    color: #f93737
                }
                .edit {
                    font-size: 2em
                }
            }
        }

        .cart-footer {
            margin: 40px 0
            height: 50px
            border: 1px solid #cccccc
            background: #ffffff
            div {
                display: inline-block
                line-height: 50px
                font-size: 16px
            }
            .checkAll {
                margin-left: 20px
                .tips {
                    margin-left: 20px
                }
            }
            .checkout {
                float: right
                width: 200px
                margin-left: 30px
                transition: all 0.5s ease-out
                background: rgba(249, 55, 55, 0.7)
                text-align: center
                font-size: 18px
                color: #ffffff
            }
            .checkout:hover {
                transition: all 0.5s ease-out
                background: rgba(249, 55, 55, 1)
                color: #ffffff
                cursor: pointer
            }
            .notCheck, notCheck:hover {
                background: rgba(249, 55, 55, 0.2) !important
                cursor: not-allowed !important
            }
            .total-price {
                float: right
                .price {
                    color: #ff1810
                    font-size: 18px
                    font-weight: 700
                }
            }
        }

    }

    /*input {
        vertical-align: middle
        height: 20px
        width: 20px
    }*/

    .confirmDelete {
        background: #f56c6c
        border-color: #f56c6c
    }

    .confirmDelete:hover {
        background: #f44d43
        border-color: #f44d43
    }
</style>

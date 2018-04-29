<template>
    <div>
        <nav-bread>
            <span>Order Confirm</span>
        </nav-bread>
        <div class="order">
            <check-process>
                <span>Order Confirm</span>
            </check-process>
            <div class="content">
                <div class="cartList">
                    <div class="cart-table">
                        <div class="cart-header">
                            <ul>
                                <li class="items">ITEMS</li>
                                <li class="price">PRICE</li>
                                <li class="quantity">QUANTITY</li>
                                <li class="subtotal">SUBTOTAL</li>
                            </ul>
                        </div>
                        <div class="cart-content">
                            <div class="goods" v-for="(item,index) in goods" :key="index">
                                <ul>
                                    <li class="items">
                                        <div class="product-img">
                                            <img v-lazy="'./../static/img/'+item.productImage" alt="">
                                        </div>
                                        <div class="productName">
                                            <span>{{item.productName}}</span>
                                        </div>
                                    </li>
                                    <li class="price">{{item.salePrice | currency('￥')}}</li>
                                    <li class="quantity">
                                        <span>x {{item.productNum}}</span>
                                    </li>
                                    <li class="subtotal">{{item.salePrice * item.productNum | currency('￥')}}</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div class="order-list">
                        <div class="settlement">
                            <li class="">
                                <span class="info-title">Item subtotal :</span>
                                <span class="info-content">{{subtotal | currency('￥')}}</span>
                            </li>
                            <li class="">
                                <span class="info-title">Discount :</span>
                                <span class="info-content">{{discount | currency('￥')}}</span>
                            </li>
                            <li class="">
                                <span class="info-title">Tax :</span>
                                <span class="info-content">{{tax | currency('￥')}}</span>
                            </li>
                            <li class="">
                                <span class="info-title">Order total :</span>
                                <span class="info-content totalPrice">{{totalPrice | currency('￥')}}</span>
                            </li>
                        </div>
                    </div>
                    <div class="btnClick">
                        <el-button type="danger" class="previous" @click="previous">Previous</el-button>
                        <el-button type="danger" class="next" @click="pay">Next</el-button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import NavBread from '@/components/navBread/navBread';
    import CheckProcess from '@/components/checkProcess/checkProcess';
    import axios from 'axios';
    import {mapMutations} from 'vuex';

    export default {
        data () {
            return {
                goods: [],
                addressInfo: {},
                discount: -20,
                tax: 80
            };
        },
        mounted () {
            if (!this.util.refresh()) {
                this.$router.push({path: '/'});
            }
            this.menuShow(0);
            this.menuShow(1);
            this.menuHidden(2);
            this.menuHidden(3);
            this.orderInit();
            this.addressInfo = this.$route.params.address;
        },
        computed: {
            subtotal () {
                let totalPrice = 0;
                this.goods.forEach((item, index) => {
                    if (item.checked) {
                        totalPrice += item.salePrice * item.productNum;
                    }
                });
                return totalPrice;
            },
            totalPrice () {
                return Number(this.subtotal) + Number(this.discount) + Number(this.tax);
            }
        },
        methods: {
            ...mapMutations(['menuShow', 'menuHidden', 'reduce']),
            orderInit () {
                axios.get('users/checkedCart')
                    .then((response) => {
                        let res = response.data;
                        if (res.status === '0') {
                            this.goods = res.result;
                            console.log('购物车列表', res.result);
                        } else {
                            console.log('购物车获取失败');
                        }
                    });
            },
            previous () {
                this.$router.push({
                    name: 'address'
                });
            },
            pay () {
                axios.post('/users/payMent', {
                    orderTotal: this.totalPrice,
                    addressId: this.addressInfo.addressId,
                    discount: this.discount,
                    tax: this.tax
                }).then((res) => {
                    res = res.data;
                    if (res.status === '0') {
                        this.$message({
                            type: 'success',
                            message: '提交成功！'
                        });
                        this.reduce(res.result.goodsNum);    // 购物车数量变化
                        this.$router.push({
                            name: 'orderFinish',
                            params: {
                                orderId: res.result.orderId,
                                orderTotal: res.result.orderTotal
                            }
                        });
                    }
                });
            }
        },
        components: {
            'nav-bread': NavBread,
            'check-process': CheckProcess
        }

    };
</script>

<style lang="stylus">
    .order {
        width: 1200px
        margin: auto
        .cartList {
            .cart-table {
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
                        width: 43%
                    }
                    li:nth-child(2) {
                        width: 15%
                    }
                    li:nth-child(3) {
                        width: 20%
                    }
                    li:nth-child(4) {
                        width: 20%
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
                            font-size: 16px
                        }
                        li:first-child {
                            float: left
                            text-align: left
                            font-size: 14px
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
                        .subtotal {
                            color: #f93737
                        }
                        .edit {
                            font-size: 2em
                        }
                    }
                }

            }
            .order-list {
                .settlement {
                    text-align: right
                    margin: 40px 0 20px
                    font-size: 18px
                    li {
                        list-style: none
                        margin: 10px 0
                        .info-title {
                            color: #a2a2a2
                        }
                        .info-content {
                            display: inline-block
                            vertical-align: middle
                            width: 100px
                            color: #605F5F
                        }
                        .totalPrice {
                            color: #d1434a
                        }
                    }
                }
            }
            .btnClick {
                margin: 20px 0 20px
                border: none
                button {
                    width: 200px
                    border-radius: 0
                    font-size: 20px
                }
                .previous {
                    background: #fff
                    color: #d1434a
                }
                .previous:hover {
                    background: #ffbcb5
                }
                .next {
                    float: right
                }
                .next:hover {
                    background: #f44d43
                }
            }

        }
    }
</style>

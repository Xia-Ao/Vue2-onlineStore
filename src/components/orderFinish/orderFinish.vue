<template>
    <div class="orderFinish">
        <nav-bread>
            <span>Order Finish</span>
        </nav-bread>
        <check-process>
            <span>Order Finish</span>
        </check-process>
        <div class="content">
            <div class="orderInfo">
                <div class="ok-img">
                    <img src="./../../../static/img/ok-2.png" alt="">
                </div>
                <div class="congratulations">
                    Congratulations! <br>
                    Your order is under processing!
                </div>
                <div class="order-id">
                    <div class="id">
                        <span>Order ID：{{orderInfo.orderId}}</span>
                        <a @click="orderDetailShow=true">查看详情</a>
                    </div>
                    <div class="order-total">
                        <span>Order total：{{orderInfo.orderTotal | currency('￥')}}</span>
                    </div>
                </div>
                <div class="order-detail" v-if="orderDetailShow">
                    <ul>
                        <li class="info-item orderId">
                            <div class="info-title">Order ID: </div>
                            <div class="info-content">{{orderDetail.orderId}}</div>
                        </li>
                        <li class="info-item addressInfo">
                            <div class="info-title">addressInfo: </div>
                            <div class="info-content">
                                {{orderDetail.addressInfo.nickName}},
                                {{orderDetail.addressInfo.userPhone}}<br>
                                {{orderDetail.addressInfo.userAddress}}
                            </div>
                        </li>
                        <li class="info-item orderTotal">
                            <div class="info-title">Order Total: </div>
                            <div class="info-content">{{orderDetail.orderTotal | currency('￥')}}</div>
                        </li>
                        <li class="info-item goodsList">
                            <div class="info-title">goodsList: </div>
                            <div class="info-content">
                                <div class="goos" v-for="(item,index) in orderDetail.goodsList" :key="index">
                                    <span>{{item.productName}}</span>
                                    <span>{{item.salePrice | currency('￥')}}</span> x
                                    <span>{{item.productNum}}</span>
                                    <span>{{item.salePrice * item.productNum | currency('￥')}}</span>
                                </div>
                            </div>
                        </li>
                        <li class="info-item discount">
                            <div class="info-title">Discount: </div>
                            <div class="info-content">{{orderDetail.discount | currency('￥')}}</div>
                        </li>
                        <li class="info-item tax">
                            <div class="info-title">Freight: </div>
                            <div class="info-content">{{orderDetail.tax | currency('￥')}}</div>
                        </li>
                        <li class="info-item orderStatus">
                            <div class="info-title">Order Status: </div>
                            <div class="info-content">{{orderDetail.orderStatus ? 'Finished' : 'unFinished'}}</div>
                        </li>
                        <li class="info-item createDate">
                            <div class="info-title">Create Date: </div>
                            <div class="info-content">{{orderDetail.createDate}}</div>
                        </li>
                    </ul>
                    <div class="hiddenDetail" @click="orderDetailShow=false">
                        收起
                    </div>
                </div>
            </div>
            <div class="router-link">
                <router-link to="/cart" class="link to-cart">去购物车</router-link>
                <router-link to="/goodsList" class="link to-goods">回到商品列表</router-link>
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
                orderInfo: {},
                orderDetailShow: false,
                orderDetail: {}
            };
        },
        mounted () {
            this.menuShow(0);
            this.menuShow(1);
            this.menuShow(2);
            this.menuShow(3);
            this.init();
        },
        computed: {},
        methods: {
            ...mapMutations(['menuShow', 'menuHidden']),
            init () {
                this.orderInfo = this.$route.params;
                axios.get('users/orderDetail', {
                    params: {
                        orderId: this.orderInfo.orderId
                    }
                }).then((res) => {
                    res = res.data;
                    if (res.status === '0') {
                        this.orderDetail = res.result;
                    } else {
                    }
                });
            },
            showDetail () {
                this.orderDetailShow = true;
            },
            hiddenDetail () {
                this.orderDetailShow = false;
            }
        },
        components: {
            'nav-bread': NavBread,
            'check-process': CheckProcess
        }

    };
</script>

<style lang="stylus">
    .orderFinish {
        width: 1200px
        margin: auto
        .content {
            .orderInfo {
                text-align: center
                font-size: 18px
                line-height: 30px
                .ok-img {
                    img {
                        width: 100px
                    }
                }
                .congratulations {
                    margin-top: 30px
                    font-weight: 100
                    letter-spacing: 2px
                }
                .order-id {
                    div {
                        display: inline-block
                        color: #7d7d7d
                    }
                    .id {
                        a {
                            color: #ff6c15
                        }
                    }
                }
                .order-detail {
                    ul {
                        width: 50%
                        margin: auto
                        border-radius: 5px
                        background: #ffffff
                        li {
                            width: 100%
                            text-align: left
                            .info-title {
                                display: inline-block
                                width: 30%
                                text-align: right
                                vertical-align: top
                            }
                            .info-content {
                                width: 65%
                                display: inline-block
                                text-align: left
                                word-break: break-all
                            }
                        }
                        .goodsList {
                            .goos {
                                span {
                                    margin: 0 10px
                                }
                                span:last-child {
                                    color: #fe6962
                                    /*text-align: right*/
                                    float: right
                                }

                            }

                        }
                    }
                    .hiddenDetail {
                        height: 50px
                        width: 50%
                        margin: auto
                        line-height: 50px
                        border-bottom-right-radius: 5px
                        border-bottom-left-radius: 5px
                        background: #dfdfdf
                        color: #ff6c15
                    }
                    .hiddenDetail:hover {
                        background: #cccccc
                        cursor: pointer
                    }
                }
            }
            .router-link {
                margin-top: 30px
                margin-bottom :30px
                text-align: center
                .link {
                    display: inline-block
                    line-height: 50px
                    width: 200px
                    height: 50px
                    font-size: 16px
                    border: 1px solid #d1434a
                }
                .to-cart {
                    background: #ffffff
                    margin-right: 50px
                }
                .to-cart:hover {
                    background: #ffbcb5
                }
                .to-goods {
                    background: #e75f6a
                    color: #ffffff
                }
                .to-goods:hover {
                    background: #de4747
                }
            }

        }

    }
</style>

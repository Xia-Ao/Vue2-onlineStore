<template>
    <div class="goods">
        <nav-bread>
            <span>goodsList</span>
        </nav-bread>
        <div class="filter-nav">
            <div class="sort">
                <span>Sort by: </span>
                <a @click="sortGoods()" class="defaultPrice">Default</a>
                <a class="price-sort" @click="sortGoods(true)">Price
                    <i class="fa" v-bind:class="{'fa-long-arrow-up' :sortFlag,'fa-long-arrow-down':!sortFlag}">
                    </i>
                </a>
            </div>
        </div>
        <div class="goods-container">
            <div class="price-filter">
                <div class="price-title"><span>PRICE:</span></div>
                <ul>
                    <li class="price" v-bind:class="{'curPrice':priceChecked==='all'}"
                        @click="setPriceFilter('all')"><span
                        class="price-list">ALL</span></li>
                    <li class="price" v-for="(price,index) in priceFilter" :key="price.index"
                        @click="setPriceFilter(index)" v-bind:class="{'curPrice':priceChecked===index}">
                        <span class="price-list">{{price.startPrice}} - {{price.endPrice}}</span>
                    </li>
                </ul>
            </div>
            <div class="goodsList">
                <div class="goodsList-container">
                    <li v-for="(item) in goodsList" :key="item.id">
                        <div class="pic">
                            <a href="#"><img v-lazy="'./../static/img/'+item.productImage" alt=""></a>
                        </div>
                        <div class="main">
                            <div class="name">{{item.productName}}</div>
                            <div class="price">{{item.salePrice | currency('￥')}}</div>
                            <div class="addCart">
                                <a class="btn-area" @click="addCart(item.productId)">加入购物车</a>
                            </div>
                        </div>
                    </li>
                </div>
                <div v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="10"
                     class="imgLoading">
                    <img src="./../../../static/img/loading-svg/loading-spinning-bubbles.svg" v-show="imgLoading"
                         alt="">
                </div>
            </div>
        </div>
        <!--购物车dialog-->
        <el-dialog title="添加购物车" :visible.sync="cartDialogShow" width="30%" :before-close="handleClose"
                   class="cart-dialog" center>
            <div class="noLogin" v-if="!login">
                <div class="tips"><span>{{cartTips}}</span></div>
                <div>
                    <span slot="footer" class="dialog-footer">
                        <el-button type="warning" @click="handleClose">关闭</el-button>
                    </span>
                </div>

            </div>
            <div class="alreadyLogin" v-if="login">
                <div class="tips"><i class="el-icon-success"></i><span>{{cartTips}}</span></div>
                <div>
                    <span slot="footer" class="dialog-footer">
                        <el-button type="primary" @click="handleClose">继续购物</el-button>
                        <el-button type="danger"><router-link to="/cart" class="toCart">查看购物车</router-link></el-button>
                    </span>
                </div>

            </div>
        </el-dialog>
    </div>
</template>

<script>
    import axios from 'axios';
    import NavBread from '@/components/navBread/navBread';
    import Dialog from '@/components/dialog/dialog';
    import {mapMutations} from 'vuex';

    export default {
        data () {
            return {
                goodsList: [],
                priceFilter: [
                    {
                        startPrice: '0',
                        endPrice: '100'
                    },
                    {
                        startPrice: '100',
                        endPrice: '500'
                    }, {
                        startPrice: '500',
                        endPrice: '1000'
                    }, {
                        startPrice: '1000',
                        endPrice: '2000'
                    }
                ],
                priceChecked: 'all',
                sortFlag: true,
                page: 1,
                pageSize: 8,
                sort: 1,
                busy: true,
                imgLoading: true,
                cartDialogShow: false,
                login: false,
                cartTips: ''
            };
        },
        mounted: function () {
            this.getGoodsList();
        },
        methods: {
            ...mapMutations(['add', 'reduce']),
            getGoodsList (flag) {
                let param = {
                    page: this.page,
                    pageSize: this.pageSize,
                    sort: this.sort,
                    priceLevel: this.priceChecked
                };
                this.imgLoading = true;
                axios.get('/goods/list', {
                    params: param
                }).then(result => {
                    let res = result.data;
                    this.imgLoading = false;
                    if (res.status === '0') {
                        if (flag) {
                            this.goodsList = this.goodsList.concat(res.result.list);
                            if (res.result.count === 0) {
                                this.busy = true;
                            } else {
                                this.busy = false;
                            }
                        } else {
                            this.goodsList = res.result.list;
                            this.busy = false;
                        }
                    } else {
                        this.goodsList = [];
                    }
                }).catch(err => {
                    console.log('error' + err);
                });
            },
            setPriceFilter (index) {
                this.priceChecked = index;
                this.page = 1;
                this.getGoodsList();
            },
            sortGoods (sort) {
                if (sort) {
                    this.sortFlag = !this.sortFlag;
                    if (this.sortFlag) {
                        this.sort = 1;
                    } else {
                        this.sort = -1;
                    }
                    this.page = 1;
                }
                this.getGoodsList();
            },
            loadMore () {
                this.busy = true;
                setTimeout(() => {
                    this.page++;
                    this.getGoodsList(true);
                }, 100);
            },
            addCart (productId) {
                axios.post('/goods/addCart', {
                    productId: productId
                }).then((res) => {
                    let result = res.data;
                    this.cartDialogShow = true;
                    if (result.status === '0') {
                        this.login = true;
                        this.cartTips = result.msg;
                        this.add(1);    // 购物车数量变化
                    } else if (result.status === '10001') {
                        this.login = false;
                        this.cartTips = result.msg;
                    }
                }).catch((err) => {
                    console.log(err);
                });
            },
            handleClose (done) {
                this.cartDialogShow = false;
            }
        },
        components: {
            'nav-bread': NavBread,
            'cart-dialog': Dialog
        }
    };
</script>

<style lang="stylus">
    .goods {
        width: 1200px
        margin: auto
        /*background: #666*/
        .filter-nav {
            box-sizing: content-box
            margin: 60px auto 40px
            padding: 0 10px
            width: 100%
            height: 55px
            background: #ffffff
            .sort {
                line-height: 55px
                float: right
                font-size: 16px
                color: #605f5f
                .defaultPrice {
                    color: #ee7a23
                }
                a {
                    margin: 0 5px
                }
            }
        }
        .goods-container {
            box-sizing: content-box
            display: flex
            /*padding-right: 40px*/
            width: 100%
            .price-filter {
                box-sizing: content-box
                flex: 0 1 200px
                margin-right: 20px
                padding: 0 20px
                color: #605f5f
                font-size: 1.5rem
                .price-title {
                    font: bold 1.6rem sans-serif
                    letter-spacing: 5px
                }
                .price {
                    margin: 20px 0
                    transition: padding-left 0.3s ease-out
                    padding-left: 0
                }
                .price:hover, .curPrice {
                    border-left: 2px solid #ee7a23
                    color: #ee7a23
                    transition: padding-left 0.3s ease-out
                    padding-left: 15px
                    font-weight: bold
                }
            }
            .goodsList {
                box-sizing: content-box
                /*background: yellow*/
                flex: 0 1 100%
                .goodsList-container {
                    display: flex
                    flex-wrap: wrap
                    justify-content: flex-start
                    > li:hover {
                        transition: all 0.5s ease-out
                        border-color: #ee7a23
                        transform: translateY(-5px)
                        box-shadow: 0 0 10px #999
                    }
                    > li {
                        transition: all 0.5s ease-out
                        flex: 0 1 230px
                        border: 2px solid #e9e9e9
                        box-shadow: none
                        /*margin-bottom: 20px*/
                        margin: 0 5px 20px
                        background: #fff
                        list-style: none
                        .pic, .pic img {
                            width: 100%
                            height: 230px
                        }
                        .main {
                            padding-left: 10px
                            .name {
                                height: 3em
                                line-height: 1.25em
                                padding-bottom: 10px
                                font-family: moderat, sans-serif
                                font-weight: 700
                                overflow: hidden
                            }
                            .price {
                                line-height: 30px
                                font-size: 1.25em
                                color: #d1434a
                            }
                            .btn-area {
                                display: block
                                margin: 10px 10px 10px 0
                                height: 40px
                                padding: 0 10px
                                line-height: 40px
                                transition: all 0.5s ease-out
                                background: #fff
                                border: 1px solid #d1434a
                                text-align: center
                                color: #d1434a
                                font-size: 14px
                                font-weight: bold

                            }
                            .btn-area:hover {
                                transition: all 0.5s ease-out
                                background: #fb9f96
                            }
                        }
                    }
                }
                .imgLoading {
                    margin: auto
                    width: 200px
                }
            }
        }
        .cart-dialog {
            .noLogin, .alreadyLogin {
                .tips {
                    height: 50px
                    color: #959595
                    font-size: 18px
                    i {
                        color: #ff6c15
                        margin-right: 20px
                    }
                }
                div {
                    text-align: center
                }
                button {
                    width: 40%
                }
            }
            .alreadyLogin {
                .toCart:hover {
                    color: #fff
                }
            }
        }
    }
</style>

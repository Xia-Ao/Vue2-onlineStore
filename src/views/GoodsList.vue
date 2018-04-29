<template>
  <div>
    <nav-header></nav-header>
    <nav-bread>
      <span>Goods</span>
    </nav-bread>
    <!--<div class="accessory-result-page accessory-page">-->
    <div class="container">
      <!--价格升降序按钮-->
      <div class="filter-nav">
        <span class="sortby">Sort by:</span>
        <a href="javascript:;" class="default cur">Default</a>
        <!-- 价格排序箭头 -->
        <a href="javascript:;" class="price sort-up" @click="sortGoods">
          Price
          <svg class="icon icon-arrow-short" v-bind:class="{'sort-up':!sortFlag}">
            <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-arrow-short">
              <svg id="icon-arrow-short" viewBox="0 0 25 32" width="100%" height="100%"><title>arrow-short</title>
                <path
                  d="M24.487 18.922l-1.948-1.948-8.904 8.904v-25.878h-2.783v25.878l-8.904-8.904-1.948 1.948 12.243 12.243z"
                  class="path1"></path>
              </svg>
            </use>
          </svg>
        </a>

        <a href="javascript:;" class="filterby stopPop" @click="showFilterPop">Filter by</a>
      </div>
      <div class="accessory-result">
        <!-- 价格过滤按钮 -->
        <!--<div class="price-wrap">-->
        <div id="filter" class="filter stopPop" v-bind:class="{'filterby-show':filterBy}">
          <dl class="filter-price">
            <dt>Price:</dt>
            <dd>
              <a href="javascript:;" v-bind:class="{'cur':priceChecked=='all'}" @click="priceChecked=='all'">All</a>
            </dd>
            <dd v-for="(price,index) in priceFilter">
              <a href="javascript:;" v-bind:class="{'cur':priceChecked==index}"
                 @click="setPriceFilter(index)">{{price.startPrice}} - {{price.endPrice}}</a>
            </dd>
          </dl>
        </div>
        <!--</div>-->


        <!-- 商品流列表 -->
        <div class="accessory-list-wrap">
          <div class="accessory-list col-4">
            <ul>
              <li class='item' v-for="item in goodsList">
                <div class="pic">
                  <a href="javascript:;">
                    <img v-lazy="'/static/'+item.productImage">
                  </a>
                </div>
                <div class="main">
                  <div class="name">{{item.productName}}</div>
                  <div class="price">{{item.salePrice | currency('￥')}}</div>
                  <div class="btn-area">
                    <a href="javascript:;" class="btn btn--m" @click="addCart(item.productId)">加入购物车</a>
                  </div>
                </div>
              </li>
            </ul>
            <!--infiniteScroll滚动加载插件-->
            <div class="load-more" v-infinite-scroll="loadMore" infinite-scroll-disabled="busy"
                 infinite-scroll-distance="30">
              <img src="./../assets/loading-spinning-bubbles.svg" v-show="loading">
            </div>
          </div>
        </div>
      </div>
    </div>
    <!--</div>-->
    <div class="md-overlay" v-show="overLayFlag" @click="closePop"></div>
    <modal v-bind:mdShow="mdShow" v-on:close="closeModal">
      <p slot="message">请先登录后再加入购物车</p>
      <div slot="btnGroup">
        <a href="javascript:;" class="btn btn--m" @click="mdShow=false">关闭</a>
      </div>
    </modal>
    <modal v-bind:mdShow="mdShowCart" v-on:close="closeModal">
      <p slot="message">
        <svg class="icon-status-ok">
          <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-status-ok"></use>
        </svg>
        <span>加入购物车成功!</span>
      </p>
      <div slot="btnGroup">
        <a href="javascript:;" class="btn btn--m" @click="mdShowCart=false">继续购物</a>
        <router-link href="javascript:;" class="btn btn--red" to="/cart">查看购物车</router-link>
      </div>
    </modal>
    <nav-footer></nav-footer>
  </div>
</template>
<style>
  /*.accessory-list-wrap ul::after{*/
  /*clear:both;*/
  /*content:'';*/
  /*height:0;*/
  /*display: block;*/
  /*visibility: hidden;*/
  /*}*/
  /*.accessory-list-wrap .item{*/
  /*width:23.80952%;*/
  /*float:left;*/
  /*margin-right:1.5%;*/
  /*margin-bottom: 1.5%;*/
  /*}*/

  .btn {
    height: 40px;
    line-height: 40px;
  }

  .load-more {
    height: 100px;
    line-height: 100px;
    text-align: center;
  }

  .sort-up {
    transform: rotate(180deg);
    transition: all .3s ease-out;
  }
</style>
<script>
  //  import './../assets/css/product.css'
  import NavHeader from '@/components/NavHeader'
  import NavFooter from '@/components/NavFooter'
  import NavBread from '@/components/NavBread'
  import Modal from '@/components/Modal'
  import axios from 'axios'

  export default {
    data () {
      return {
        goodsList: [],
        sortFlag: true,
        page: 1,
        pageSize: 8,
        busy: true,
        loading: false,
        mdShow: false,
        mdShowCart: false,
        priceFilter: [
          {
            startPrice: 0.00,
            endPrice: 100.00
          },
          {
            startPrice: 100.00,
            endPrice: 500.00
          },
          {
            startPrice: 500.00,
            endPrice: 1000.00
          },
          {
            startPrice: 1000.00,
            endPrice: 5000.00
          }
        ],
        priceChecked: 'all',
        filterBy: false,
        overLayFlag: false
      }
    },
    mounted () {
      this.getGoodsList();
    },
    components: {
      NavHeader,
      NavFooter,
      NavBread,
      Modal
    },
    methods: {
      getGoodsList (flag) {
        var param = {
          page: this.page,
          pageSize: this.pageSize,
          sort: this.sortFlag ? 1 : -1,
          priceLevel: this.priceChecked
        }
        this.loading = true;
        axios.get('/goods/list', {
          params: param
        }).then((response) => {
          let res = response.data;
          this.loading = false;
          if (res.status == '0') {
            if (flag) {
              this.goodsList = this.goodsList.concat(res.result.list);

              if (res.result.count == 0) {
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
        });
      },
      sortGoods () {
        this.sortFlag = !this.sortFlag;
        this.page = 1;
        this.getGoodsList();
      },
      setPriceFilter (index) {
        this.priceChecked = index;
        this.page = 1;
        this.getGoodsList();
        this.closePop();
      },
      loadMore () {
        this.busy = true;
        setTimeout(() => {
          this.page++;
          this.getGoodsList(true);
        }, 500);
      },
      addCart (productId) {
        axios.post('/goods/addCart', {
          productId: productId
        }).then((res) => {
          var res = res.data;
          if (res.status == 0) {
            this.mdShowCart = true;
            this.$store.commit('updateCartCount', 1)
          } else {
            this.mdShow = true;
          }
        });
      },
      closeModal () {
        this.mdShow = false;
        this.mdShowCart = false;
      },
      showFilterPop () {
        this.filterBy = true;
        this.overLayFlag = true;
      },
      closePop () {
        this.filterBy = false;
        this.overLayFlag = false;
      }
    }
  }
</script>

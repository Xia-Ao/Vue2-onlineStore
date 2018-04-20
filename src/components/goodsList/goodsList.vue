<template>
  <div class="goods">
    <div class="filter-nav">
      <div class="sort">
        <span>Sort by: <span>Default</span></span>
        <span class="price-sort">Price <span></span></span>
      </div>
    </div>
    <div class="goods-container">
      <div class="price-filter">
        <div class="price-title"><span>PRICE:</span></div>
        <ul>
          <li class="price" v-bind:class="{'curPrice':priceChecked==='all'}"><span class="price-list">ALL</span></li>
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
              <div class="price">{{item.salePrice}}</div>
              <div class="btn-area">
                <a href="">加入购物车</a>
              </div>
            </div>
          </li>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios';

  export default {
//    name: 'GoodsList',
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
        priceChecked: 'all'
      };
    },
    mounted: function () {
      this.getGoodsList();
    },
    methods: {
      getGoodsList () {
        axios.get('/goods').then(result => {
          let res = result.data;
          this.goodsList = res.result.list;
          console.log(this.goodsList);
        }).catch(err => {
          console.log('error' + err);
        });
      },
      setPriceFilter (index) {
        this.priceChecked = index;
      }
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
        span {
          padding: 0 5px
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
          justify-content space-between
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
            margin-bottom: 20px
            background: #fff
            list-style: none
            .pic img {
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
                margin: 10px 10px 10px 0
                height: 40px
                padding: 0 10px
                line-height: 40px
                border: 1px solid #d1434a
                text-align: center
                color: #d1434a
                font-size: 14px
                font-weight: bold
              }
            }
          }
        }
      }
    }
  }
</style>

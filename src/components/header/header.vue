<template>
  <div class="header-container">
    <div class="header">
      <div class="navbar">
        <div class="navbar-left-container">
          <a href="/">
            <img class="navbar-brand-logo" src="./logo.png"></a>
        </div>
        <div class="navbar-right-container">
          <!--<span class="item user" v-if="1">用户</span>-->
          <a href="javascript:void(0)" class="item navbar-link login">Login</a>
          <a href="javascript:void(0)" class="item navbar-link logout">Logout</a>
          <div class="item navbar-cart-container">
            购物车
          </div>
        </div>
      </div>
    </div>
    <div class="bread">
      <div class="nav-bread">
        <a href="/" class="slot">Home</a>
        <span>/</span>
        <span slot="name">GoodsList</span>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Header',
    data () {
      return {
        msg: 'Welcome to Your header'
      };
    }
  };
</script>

<style lang="stylus">
  .header-container {
    background: #ffffff
  }

  .header {
    box-sizing: content-box
    margin: auto
    width: 1200px
    height: 55px
    padding: 5px 20px 10px 20px
    position: relative
    /*background: #ccc*/
    .navbar {
      .navbar-left-container {
        position: absolute
        top: -10px
        left: 0
      }
      .navbar-right-container {
        float: right
        display: flex
        .item {
          flex: 0 1 auto
          padding-right: 10px
          line-height: 60px
        }
        .navbar-link {
          font-family: moderat, sans-serif
          font-size: 16px
          text-decoration: none
          /*color: #605f5f*/
        }
      }
    }
  }

  .bread {
    width: 100%
    height: 45px
    background: #f0f0f0
    .nav-bread {
      width: 1260px
      margin: auto
      line-height: 45px
      padding-left: 20px
      font-size: 16px
      /*background: #aaa*/
      .slot {
        padding: 0 5px 0 5px
      }
    }
  }
</style>

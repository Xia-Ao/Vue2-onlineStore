<template>
  <div>
    这是购物车页面
    <span>{{$route.params.goodsId}}</span><br>
    <span>{{$route.params.name}}</span>
    <router-link to="/goods/title">显示商品标题</router-link>
    <router-link to="/goods/img">显示商品图片</router-link>
    <div>
      <router-view></router-view>
    </div>
    <router-link :to="{name:'cart',params:{cardId:123}}">跳转到购物车页面</router-link>
    <button @click="jump">button--跳转到购物车页面</button>

  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    data (){
      return {
        msg: 'hello vue'
      }
    }
  }
</script>

<style>

</style>

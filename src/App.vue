<template>
  <div id="app">
    <v-header></v-header>
    <router-link to="/"></router-link>
    <!--<router-link to="/">Go to hello word</router-link>-->
    <router-view></router-view>
  </div>
</template>

<script>
  import Header from '@/components/header/header';

  export default {
    name: 'App',
    components: {
      'v-header': Header
    }
  };
</script>

<style lang="stylus">
  @import "assets/css/base.css"

  body, html {
    margin: 0px;
    background: #f5f7fc
  }

  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    /*text-align: center;*/
    color: #2c3e50;
    margin: auto;
  }
</style>

<template>
    <div id="app">
        <v-header class="v-header"></v-header>
        <!--<router-link to="/"></router-link>-->
        <!--<router-link to="/">Go to hello word</router-link>-->
        <router-view class="v-view"></router-view>
        <v-footer class="v-footer"></v-footer>
    </div>
</template>

<script>
    import Header from '@/components/header/header';
    import Footer from '@/components/footer/footer';

    export default {
        name: 'App',
        components: {
            'v-header': Header,
            'v-footer': Footer
        }
    };
</script>

<style lang="stylus">
    @import "assets/css/base.css"

    body, html {
        margin: 0px;
        background: #f5f7fc
        height: 100%
    }

    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        /*text-align: center;*/
        color: #2c3e50;
        margin: auto
        display: flex
        flex-direction: column
        height: 100%
        .v-header, .v-footer {
            flex: 0 0 auto
        }
        .v-view {
            flex: 1 0 auto
        }
    }
</style>

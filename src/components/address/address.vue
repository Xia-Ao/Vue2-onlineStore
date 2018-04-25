<template>
    <div>
        <nav-bread>
            <span>Address</span>
        </nav-bread>

    </div>
</template>

<script>
    import axios from 'axios';

    export default {
        data () {
            return {
                goodsList: []
            };
        },
        mounted () {
            this.goodsList = this.$route.params;
        },
        methods: {
            init () {
//                axios.get('/users/address');
            }
        }
    };
</script>

<style lang="stylus">

</style>

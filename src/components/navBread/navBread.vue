<template>
    <div class="bread">
        <div class="nav-bread">
            <router-link to="/" class="home">Home</router-link>
            <span>/</span>
            <slot class="slot"></slot>
        </div>
    </div>
</template>

<script>

    export default {};
</script>

<style lang="stylus">
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
            .home {
                padding: 0 5px 0 5px
            }
            span:nth-child(3) {
                color: #f94d4a
            }
        }

    }
</style>

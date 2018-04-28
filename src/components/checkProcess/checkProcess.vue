<template>
    <div class="check-process">
        <div class="title">
            <slot class="slot"></slot>
        </div>
        <ul class="process">
            <li v-bind:class="{'active':menuFlag[0]}">
                <div class="text">Confirm Address</div>
                <div class="point"></div>
            </li>
            <li v-bind:class="{'active':menuFlag[1]}">
                <div class="text">View Your Order</div>
                <div class="point"></div>
            </li>
            <li v-bind:class="{'active':menuFlag[2]}">
                <div class="text">Make Payment</div>
                <div class="point"></div>
            </li>
            <li v-bind:class="{'active': menuFlag[3]}">
                <div class="text">Order confirmation</div>
                <div class="point"></div>
            </li>
        </ul>
    </div>
</template>

<script>
    import {mapState} from 'vuex';

    export default {
        computed: {
            ...mapState({
                menuFlag: state => state.global.menuFlag
            })
        }
    };
</script>

<style lang="stylus">
    .check-process {
        box-sizing: content-box
        width: 1200px
        margin: auto
        .title {
            height: 50px
            /*background: #ccc*/
            line-height: 80px
            font-size: 2em;
            font-weight: 700
            letter-spacing: 0.3em
        }
        .process {
            box-sizing: content-box
            width: 100%
            margin-top: 30px
            margin-bottom: 30px
            padding: 0
            li {
                display: inline-block
                position: relative
                margin: -2px
                width: 25%
                padding-bottom: 10px
                text-align: center
                border-bottom: 3px solid #ccc
                font-size: 20px
                .text {
                    color: #999
                }
                .point {
                    position: absolute
                    bottom: -9.5px
                    left: 50% - 4px
                    width: 16px
                    height: 16px
                    border-radius: 50%
                    background: #ccc
                }
            }
            .active {
                border-color: #fe6962
                .text {
                    color: #fe6962
                }
                .point {
                    background: #fe6962
                }
            }
        }
    }

</style>

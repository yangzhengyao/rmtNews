<template>
    <!-- 因为mint-ui的header不符合我需求，只能自己封装了 -->
    <header class="myHeader" :class="{ 'fixed': fixed }">
        <!-- 这里是为了打包后，native在IOS上有沉浸式状态栏的效果而预留的空间 -->
        <div class="iosStatus" v-if="ios()"></div>
        <div class="top_bar">
            <div class="abs_l"><slot name="left"></slot></div>
            <div class="abs_m">{{title}}<slot name="mid"></slot></div>
            <div class="abs_r"><slot name="right"></slot></div>
        </div>
    </header>
</template>
<script>
export default {
    props: {
        fixed: Boolean,
        title: String
    },
    methods: {
        ios() {
            if (this.$store.state.device === 'ios') {
                return true
            } else {
                return false
            }
        }
    }
}
</script>
<style lang='less'>
.myHeader{
    display: block;
    position: relative;
    overflow: hidden;
    background-color: @dominantColor;
    color: #fff;
    font-size: 20px;
    &.fixed {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        z-index: 666;
    }
    .iosStatus {
        width: 100%;
        height: 0.535rem;
    }
    .top_bar {
        position: relative;
        height: 1.335rem;
        user-select: none;
        display: flex;
        align-items: center;
        a {
            display: table-cell;
            width: 1.335rem;
            height: 1.335rem;
            color: inherit;
            font-size: inherit;
            font-weight: inherit;
            text-decoration: none;
            vertical-align: middle;
        }
        .abs_l,.abs_r {
            width: 1.335rem;
            height: 1.335rem;
            font-size: inherit;
            color: inherit;
            text-align: center;
        }
        .abs_m {
            flex: 1;
            font-weight: 700;
            text-align: center;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        }
    }
}
</style>

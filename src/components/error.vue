<template>
    <div class='error' v-if='visible' :class="{ 'fixed': fixed }">
        <div class="container">
            <img src="~@/assets/img/default_error.png" alt="shibai" class="error_img">
            <p class="error_text">内容加载失败，请检查网络</p>
            <mt-button type='primary' class="error_btn" @click.stop='method'>重新加载</mt-button>
        </div>
    </div>
</template>
<script>
export default {
    name:'Error',
    props: {
        visible: {
            type: Boolean,
            default: false
        },
        method: Function,
        fixed: Boolean
    }
}
</script>
<style scoped lang='less'>
.error {
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    z-index: 559;
    background: #fff;
    overflow: hidden;
    font-size: 18px;
    &.fixed{
        position: fixed;
    }
    .container {
        position: absolute;
        left: 0;
        right: 0;
        top: 30%;
        text-align: center;
        line-height: 30px;
        .error_text {
            color: #aaa;
            margin-bottom: 10px;
            font-size: 12px;
        }
        .error_btn {
            width: 90px;
            height: 30px;
            border-radius: 25px;
            background-color: #fff; 
            color: #666;
            font-size: 14px;
            border: 1px solid #666666;
        }
        .error_img{
            width: 200px;
            height: 110px;
        }
    }
}
</style>

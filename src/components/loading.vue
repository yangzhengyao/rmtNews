<template>
    <div id="spinnerLoad" v-if="visible" :class="{'absolute': type === 'absolute'? true : false}">
        <!-- <mt-spinner :type="3" :color="color" :size='size'></mt-spinner> -->
        <div class="loading-box">
            <div class="loading-animate" style="z-index: 10;">
                <img src="~@/assets/img/loading_animate.png">
            </div>
            <div class="logo_transparent" style="z-index: 100;">
                <img :src='"~@/assets/img/"+apis.getTheme()+"/transparent.png"'>
            </div>
        </div>
        <!-- <div class="loading-box">
            <img src="~@/assets/img/logo_loading.png">
            <div class="loading-animate">
                <img src="~@/assets/img/loading_logo.png">
            </div>
        </div> -->
    </div>
</template>
<script>
export default {
    props: {
        visible: {
            type: Boolean,
            default: false
        },
        type: {
            type: String,
            default: 'fixed'
        }
    },
    data() {
        return {
            size: 36,
            color: '#be2c1f'
        }
    }
}
</script>
<style scoped lang='less'>
#spinnerLoad {
    width: 100%;
    height: 100%;
    overflow: hidden;
    position: fixed;
    top: 0;
    background-color: #fff;
    z-index: 588;
    display: flex;
    align-items: center;
    justify-content: center;
    padding-bottom: 40%;
    span {
        position: absolute;
        top: 40%;
        left: 50%;
        margin-left: -18px;
    }
    &.absolute {
        position: absolute;
    }
    .loading-box {
        position: relative;
        height: .66rem;
        width: @loadingBgWidth;
        overflow: hidden;
        img {
            height: 100%;
        }
        .loading-animate {
            height: 100%;
            // position: absolute;
            // top: 0;
            // left: 0;
            animation: loadingAnimate 1.5s linear infinite;
            z-index: 10;
        }
        .logo_transparent {
            height: 100%;
            position: absolute;
            top: 0;
            left: 0;
            background-color: rgba(150,150,150,0.3);
            text-align: center;
            z-index: 100;
        }
    }
    // .loading-box {
    //     position: relative;
    //     height: 44px;
    //     overflow: hidden;
    //     img {
    //         height: 100%;
    //     }
    //     .loading-animate {
    //         height: 100%;
    //         position: absolute;
    //         top: 0;
    //         left: 0;
    //         animation: loadingAnimate2 1.5s linear infinite .5s;
    //         overflow: hidden;
    //     }
    // }
}
@keyframes loadingAnimate {
    0%   {
        // left: 0%;
        // transform: translate(-100%,0);
        margin-left: 0%;
    }
    100% {
        // left: 100%;
        // transform: translate(0%,0);
        margin-left: 100%;
    }
}
// @keyframes loadingAnimate2 {
//     0%   {
//         width: 0;
//     }
//     100% {
//         width: 100%;
//     }
// }
</style>
<style lang='less'>
/* #spinnerLoad{
    background: url(~@/assets/img/loading_logo.png)no-repeat center 55%;
    background-size: 200px;
}   */
</style>

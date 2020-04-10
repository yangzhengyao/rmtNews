<template>
    <div>
        <div class="loaddingview" v-if="subSpr">
            <div class="loading"></div>
        </div>
        <SubScriptList></SubScriptList>
    </div>
</template>
<script>
import SubScriptList from '../../infoList/SubScriptInfoList'
export default {
    name:'Subscript',
    props:{
        subSpr:{
            default:true
        }
    },
    data(){
        return{
        }
    },
    components: {
        SubScriptList
    }
}
</script>
<style lang="less" scoped>
    .loaddingview {
        width: 100%;
        height: 100vh;
        position: fixed;
        top: 0;
        left: 0;
        z-index: 999999999;
        background: #fff;
    }
    .loading {
        position: fixed;
        top: 35%;
        left: 50%;
        margin: -20px 0 0 -20px;
        width: 40px;
        height: 40px;
        border: 2px solid;
        border-color: #fd4d4d #fd4d4d transparent;
        border-radius: 50%;
        box-sizing: border-box;
        animation: loading 1s linear infinite;
        z-index: 99999999999999991;
        margin-top: 4rem;
    }
    @keyframes loading {
        0% {
            transform: rotate(0deg);
        }
        100% {
            transform: rotate(360deg);
        }
    }
</style>
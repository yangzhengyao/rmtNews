<template>
    <div>
        <!-- <div>
            弥勒头条免责声明
        </div> -->
        <header class="com_header headerNavFixed" style="background: #fff;border-bottom:1px solid #f2f2f2;">
            <div class="nvbt ibackBack" @click="apis.iback()"></div>
            <div class="nvtt" style="color: #1a1a1a;">{{appName}}免责声明</div>
            <div class="nvbt idoc"></div>
        </header>
        <div class="container contentNavFixed com_contentNavFixed" :class="iphonexPadding ? 'iphonexpaddingslist':''">
            1. {{appName}}不能对用户发表的视频或言论的正确性进行保证。<br/>
            2. 用户在{{appName}}发表的内容仅表明其个人的立场和观点，并不代表{{appName}}的立场或观点。作为内容的发表者，需自行对所发表内容负责，因所发表内容引发的一切纠纷，由该内容的发表者承担全部法律及连带责任。{{appName}}不承担任何法律及连带责任。<br>
            3. 因用户违反本协议所导致的{{appName}}中断或终止向用户提供本服务，{{appName}}无需为此承担任何责任。<br>
            4. {{appName}}不对{{appName}}或本服务的功能、软件、服务及其所包含内容的延误、不准确、错误、遗漏或由此产生的任何损害，以任何形式向用户或任何第三方承担任何责任。<br>
            5. 对于因不可抗力或{{appName}}不能控制的原因造成的网络服务中断或其它缺陷，{{appName}}不承担任何责任，但将尽力减少因此而给用户造成的损失和影响。此外，就因{{appName}}定期或不定期的检修或者维护而引发的合理时间的中断，{{appName}}也无需为此承担任何责任。
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return{
            iphonexPadding: false,
            appName:this.apis.theme.api.appChineseName
        }
    },
    mounted () {
        if (this.apis.iphonexPaddingFn()) {
            this.iphonexPadding = true;
        }
    }
}
</script>
<style lang="less" scoped>
.iphonexpaddingslist {
     margin-top: 1.33rem!important;
}
.container{
    margin: 0.3rem 0.2rem 0;
    font-size: 0.32rem;
    background: #fff;
}
.nvtt{
    font-size: 0.36rem;
}
</style>
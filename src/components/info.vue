<template>
    <div class='news_info'>
        <span class="news_label blue" v-if='json.playonlineurl'>视频</span>
        <span class="news_label blue" v-if='json.lives'>直播</span>
        <span class="news_label red" v-else-if="json.istop && json.istop >= 9 ">置顶</span>
        <span class="news_label blue" v-else-if="json.isgood >= 6">荐</span>
        <span class="news_label red" v-else-if="json.firsttitle >= 6">热</span>
        <span class='news_from' v-if='json.befrom'>{{json.befrom}}</span>
        <span class='news_time' v-if='json.time'>{{json.time}}</span>
        <span class='news_click' style="float: right;" v-if='json.readNum!=0'>{{json.readNum}}阅</span>
        <span class='news_plnum' v-if='json.plnum'>{{json.plnum}}评论</span>
        <span class='news_tag' v-if='json.nlist'>{{json.nlist}}</span>
    </div>
</template>
<script>
export default {
    props: ['json'],
    filters: {
        // 阅读量不够，自己加点戏哈哈哈
        watchFilter(val) {
            let randomVal = Math.floor(Math.random() * 101 + 100)   // 取100 ~ 200的随机数
            if (val) {
                return randomVal + parseInt(val)
            } else {
                return ''
            }
        }
    }
}
</script>
<style lang='less'>
.news_info {   
    white-space: normal;
    color: #8a8a8a;
    overflow: hidden;
    font-size: x-small;
    // position: absolute;
    width: 100%;
    span {
        display: inline-block;
        vertical-align: middle;
        font-size: .24rem;
        &.news_from {
            max-width: 30%;
            overflow: hidden;
            text-overflow:ellipsis;
            white-space: nowrap;
        }
    }
    span + span {
        margin-left: .12rem;
    }
    .news_label {
        border-radius: 2px;
        padding: 0px 2px 1px;
    }
    .blue {
        color: #fff;
        background: @dominantColor;
    }
    .red {
        color: #fff;
        background: #f85959;
    }
}
</style>

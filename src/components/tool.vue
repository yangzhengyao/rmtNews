<template>
    <div class='tool' :class="[{'focus': focus},{'iphonexPaddingTool':iphonexPadding}]">
        <!-- 左边 -->
        <div class="left">
            <div v-if="userstatusn">
                <div class="text" v-show='!focus'  @click.stop="inputFocus" v-if="canComment == 1">
                    <a class="icon-write">我来说两句...</a>
                </div>
            <!-- 回复可以@功能，加上placeholder属性 -->
            <textarea id='input' v-if="canComment == 1"  rows="10" cols="30" contenteditable="true" style="-webkit-user-select: auto;" :class="{ normal: !focus,inputWidth:focus }" v-model.trim='inputVal' @focus.stop="onFocus" @blur.stop="onBlur" :placeholder="placeholderVal"><br/></textarea>
        </div>
        </div>
        <!-- 右边 -->
        <div class="right" v-show='!focus' v-if='icon'>
            <!-- 内容分发 -->
            <slot name='tool_btn'></slot>
        </div>
        <!-- 发送按钮 -->
        <span v-show='focus' class="publish_btn" :class="{ hasVal: inputVal.length > 0 ? true : false }">发送</span>
    </div>
</template>
<script>
import { mapGetters, mapMutations, mapActions } from 'vuex'
import { autoTextarea } from '@/config/autoTextarea.js'
export default {
    props: {
        comment: String,    // 评论类型
        canComment:Number,  // 是否可评论
        icon: Boolean,      // 是否icon布局
        remarkid: {         // 评论数据的id，回复需要知道是哪条评论
            default: ''
        }
    },
    data() {
        return {
            focus: false,       // input是否聚焦
            inputVal: '',       // input的内容
            keepInputVal: '',   // 失焦持久的input内容
            placeholderVal: '',  // @的内容
            bfscrolltop:0,
            interval:null,
            iphonexPadding:false,
            puyang:true,
            userstatusn:true
        }
    },
    computed: {
        ...mapGetters('detail', [
            'talkReply'         // @的数据
        ]),
        ...mapGetters('login', [
            'isLogin'           // 是否登录
        ])
    },
    watch: {
        focus(val) {
            // 聚焦
            if (val) {
                // 是否有持久内容
                if (this.keepInputVal) {
                    this.inputVal = this.keepInputVal
                }
            } else {
                this.placeholderVal = ''
                this.set_talkReply('')
                if (this.inputVal) {
                    this.keepInputVal = this.inputVal
                    this.inputVal = ''
                } else {
                    this.keepInputVal = ''
                }
            }
        }
    },
    methods: {
        ...mapMutations('detail', [
            'set_talkReply'     // 设置被@的数据
        ]),
        ...mapActions('detail', [
            'post_Comment_data',    // 提交评论数据
            'post_Reply_data'       // 提交回复数据
        ]),
        // 发送评论
        sendComment() {
            let inpVal = $('#input').val();
            this.inputVal = '';
            this.$emit('detailParent',inpVal);
        },
        // 聚焦
        inputFocus() {
            $('.tool #input').focus()
        },
        // 聚焦时候的钩子
        onFocus() {
            this.focus = true
            setTimeout(() => {
                // 移动端聚焦打开键盘的时候，让tool元素位于视图中。ios系统下会被盖住。
                this.$el.scrollIntoView(true)
            }, 100)
             $('.tool').css({'bottom':'0'})
            this.bfscrolltop = document.body.scrollTop;//获取软键盘唤起前浏览器滚动部分的高度
            this.interval = setInterval(function(){//设置一个计时器，时间设置与软键盘弹出所需时间相近
              document.body.scrollTop = document.body.scrollHeight;//获取焦点后将浏览器内所有内容高度赋给浏览器滚动部分高度
            },100)
            // if (this.comment === 'reply' && this.talkReply) {
            //     this.placeholderVal = `回复 ${this.talkReply.nickname}`
            // }
            // 聚焦的时候，监听物理返回键，让input可以按物理键隐藏键盘
            // document.addEventListener('backbutton', this.backButtonFocus, false)
        },
        // 失焦时候的钩子
        onBlur() {
            this.focus = false
            var inputVal = $('#input').val();
            if( inputVal == '' ){
               $('.icon-write').text('请输入...')
            } else {
               $('.icon-write').text(inputVal)
            }
            clearInterval(this.interval)//清除计时器
            document.body.scrollTop = this.bfscrolltop; //将软键盘唤起前的浏览器滚动部分高度重新赋给改变后的高度
            // 失焦的时候，移除监听物理返回键
            // document.removeEventListener('backbutton', this.backButtonFocus, false)
        },
        // 隐藏键盘
        backButtonFocus() {
            let isFocus = $('.tool #input').is(':focus')
            if (isFocus) {
                $('.tool #input').blur()
            }
        },
        plusready(){}
    },
    created(){
        if(this.apis.getTheme() == 'puyang'){
            this.puyang=false
        }
        let userDataid = JSON.parse(localStorage.getItem("userData"));
        if(userDataid){
         if(userDataid.user_status=="0"){
            this.userstatusn=true;
         }else{
            this.userstatusn=false;
         }
        }
        
    },
    mounted() {
        // let text = this.$el.querySelector('.tool #input')
        // autoTextarea(text, 0, 80)
        let that = this;
        if (window.plus) {
            that.plusready();
        } else {
            document.addEventListener("plusready",that.plusready(),false);
        }
        var inputVal = $('#input').val();
        // 用touched来代替click，是为了解决click事件和blur事件的冲突，blur事件触发顺序比click事件早
        this.$el.querySelector('.tool .publish_btn').addEventListener('touchend', (e) => {
            let params = localStorage.getItem('userData');
            let inpVal = $('#input').val();
            if( params ){
                if( inpVal == '' ){
                    plus.nativeUI.alert("请输入评论信息", function() {}, "提示", "确定");
                } else {
                    that.sendComment()
                }
            } else {
                 this.apis.urlParams('Login')
            }
        })
        if( this.apis.iphonexPaddingFn() ){
            this.iphonexPadding = true;
        }
    }
}
</script>

<style>
/* #detail .tool {
    padding-bottom: env(safe-area-inset-bottom);
} */
</style>

<style lang='less'>
.tool {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 666;
    display: flex;
    background: #fdfdfd;
    border-top: 1px solid #ddd;
    padding-right: .32rem;
    font-size: 0;
    align-items: center;
    padding-bottom: env(safe-area-inset-bottom);
    .left {
        flex: 3;
        position: relative;
        padding-left: 16px;
        font-size: 0;
        .text {
            position: absolute;
            left: 32px;
            top: 0;
            z-index: 111;
            font-size: 12px;
            a{
                height: 42px;
                display: table-cell;
                vertical-align: middle;
                white-space: nowrap;
            }
        }
        #input {
            width: 200px;
            height: 31px;
            font-size: 14px;
            line-height: 20px;
            border-radius: 20px;
            border: 1px solid #f4f5f6;
            background: #f4f5f6;
            -webkit-appearance: none;
            outline: none;
            resize: none;
            overflow-y: auto !important;
            margin: 6px 0;
            padding: 6px 15px;
            word-break:break-all;
            &::-webkit-scrollbar {
                width: 0;
                height: 0;
                display: none;
            }
            &.normal{
                height: 31px !important;
                line-height: 20px;
            }
            &.inputWidth{
                width: 5.5rem;
            }
        }
    }
    .right {
        flex: 2.5;
        font-size: 0;
        padding-left: .3rem;
        a {
            display: inline-block;
            text-align: center;
            width: 33%;
            height: .96rem;
            font-size: .4rem;
            text-decoration: none;
            vertical-align: top;
            float: right;
        }
        .comment_btn{
            position: relative;
            .comment_num{
                position: absolute;
                top: 8px;
                padding: 2px 4px 1px;
                text-align: center;
                border-radius: 100%;
                font-size: 10px;
                color: #fff;
                background: #d43d3d;
                line-height: 1;
            }
        }
    }
    .publish_btn {
        display: table-cell;
        padding-left: 15px;
        font-size: .32rem;
        // font-weight: bold;
        color: #d9d9d9;
        user-select:none;
        vertical-align: middle;
        &.hasVal{
            color: @dominantColor
        }
    }
}
.iphonexPaddingTool{
    padding-bottom: .84rem;
}
</style>


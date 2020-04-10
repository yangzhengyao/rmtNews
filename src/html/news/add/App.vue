<template>
    <transition name='fadeIn'>
        <div id="channel">
            <!-- <my-header fixed title='栏目管理' v-goTop:click='true'>
                <a class="back-white" slot='left' @click='$router.go(-1)'></a>
            </my-header> -->
       
      <!-- <div id="head">
     
    <span class="back-white" @click="rollback">  </span>
      <span class='login'>栏目管理</span>
        
      </div> -->
        <header class="com_header headerNavFixed">
            <div class="nvbt iback" @click="apis.iback()"  :class=" apis.getTheme() == 'dongpo'?'iBlackBack':'iback'"></div>
            <div class="nvtt">栏目管理</div>
            <div class="nvbt idoc"></div>
        </header>
            <div class="contentNavFixed com_contentNavFixed content" :class="iphonexMarginTop ? 'iphonexPaddingClass':'' ">
                <div class="container" >
                    <section class="column">
                        <p class="title"><span>置顶频道</span></p>
                    <ul class="top clearfix topping" style="margin-bottom:0">
                            <!-- <li v-for='(item,index) in listColumn' :key='index' v-if="index<apis.theme.news.columnIdOrder.length" :class="[item.classpath=='5c342fd9a310d0f746b3ad20' ? 'longfontsize' : '']"> -->
                            <li v-for='(item,index) in listColumn' :key='index' v-if="index<apis.theme.news.columnIdOrder.length">
                                <a href='javascript:;' :class="[item.classpath==apis.theme.news.columnId.xijinpingshijian ||((item.classpath==apis.theme.news.columnId.zhibo|| item.classpath==apis.theme.news.columnId.duanshipin)&&apis.getTheme()=='qingtongxia') ? 'minfontsize' : '' , (item.classpath==apis.theme.news.columnId.lianghui)&&(apis.getTheme()=='qingtongxia') ? 'minminfontsize' : '', item.classpath]" ><span>{{item.classname}}</span></a>
                            </li>
                        </ul>

                        </section>
                    <!-- 原有的栏目 -->
                    <section class="column">
                        <div class="title">
                            <span>我的频道</span>{{isCompile?'点击以下栏目删除':'拖动以下栏目排序'}}
                            <div @click="compileBut" class="compile">
                                <span>{{isCompile?'完成':'编辑'}}</span>
                            </div>
                        </div>
                        
                        <!-- <ul class="top clearfix" style="display:none">
                            <li v-for='(item,index) in indexColumn' @click='remove(item,index)' :key='index' >
                                <a href='javascript:;' :class="[item.classpath=='5c188ce5a310abf163b456de' ? 'minfontsize' : '', item.classpath]">{{item.classname}}</a>
                            </li>
                        </ul> -->

                        <draggable class="top clearfix" style="margin-top:0" @end="drop" tag="ul" v-model="listColumn" filter='.5c10cfcaa310abf163b45664' draggable = ".drop">
                            <li :class="drop" v-for='(item,index) in listColumn' :key='index' v-if="apis.theme.news.columnIdOrder.length<=index"  class="reposit drop">
                                <span :class="isCompile?'delImgFa':'disNone'"  @touchend='remove(item,index)'><img class="delImg" src="./images/delClom.png" alt=""></span>
                                <a href='javascript:;' :class="[item.classpath==apis.theme.news.columnId.xijinpingshijian ||((item.classpath==apis.theme.news.columnId.zhibo|| item.classpath==apis.theme.news.columnId.duanshipin)&&apis.getTheme()=='qingtongxia') ? 'minfontsize' : '' , (item.classpath==apis.theme.news.columnId.lianghui)&&(apis.getTheme()=='qingtongxia') ? 'minminfontsize' : '', item.classpath]"><span>{{item.classname}}</span></a>
                            </li>
                        </draggable>
                    </section>
                    <!-- 可以添加的栏目 -->
                    <section class="column">
                        <p class="title"><span>热门频道</span>点击以下栏目添加</p>
                        <ul class="clearfix">
                            <li v-for='(item,index) in removeChannel' @click="add('removeChannel', index)" :key='index' style="border-radius:5px;" class="reposit">
                                <a href='javascript:;' :class="[item.classpath==apis.theme.news.columnId.xijinpingshijian ||((item.classpath==apis.theme.news.columnId.zhibo|| item.classpath==apis.theme.news.columnId.duanshipin)&&apis.getTheme()=='qingtongxia') ? 'minfontsize' : '', (item.classpath==apis.theme.news.columnId.lianghui)&&(apis.getTheme()=='qingtongxia') ? 'minminfontsize' : '']">
                                    <span class="addImgFa">
                                        <img class="addImg" src="./images/addClom.png" alt="">
                                        {{item.classname}}
                                    </span>
                                </a>
                            </li>
                        </ul>
                        <!-- <ul>
                            <li v-for='(item,index) in channel' @click="add('channel', index)" :key='index'>
                                <a href='javascript:;'>{{item.classname}}</a>
                            </li>
                        </ul> -->
                      
                    </section>
                </div>
            </div>
        </div>
    </transition>
</template>
<script>
import draggable from 'vuedraggable'
import { get_local_cache, set_local_cache } from '@/config/cache'
import { mapGetters, mapActions, mapMutations } from 'vuex'
import myHeader from '../../../../src/components/myHeader'            // header组件
import myLoading from '../../../../src/components/loading'            // loading组件
import myError from '../../../../src/components/error'                // error组件
import listInfo from '../../../../src/components/info'                // 文章列表信息组件
import listItem from '../../../../src/components/listItem'            // 文章列表组件
import commentItem from '../../../../src/components/commentItem'      // 评论列表组件
import publishItem from '../../../../src/components/publishItem'      // 后台发布列表组件
import myBanner from '../../../../src/components/banner'              // banner组件
import popupMenu from '../../../../src/components/popupMenu'          // 弹框组件
import myTool from '../../../../src/components/tool'                  // 弹框组件
import { truncate } from 'fs';
export default {
    name: 'channel',
    data() {
        return {
            channel: '',
            removeChannel: [],
            listColumn:[],
            iphonexMarginTop:false,
            isCompile:false,
            compileData:'点击以下栏目排序'
        }
    },
    components: {
    //调用组件
     draggable,
     },
    computed: {
        ...mapGetters('index', [
            'indexPage',
            'indexLocation',
            'indexColumn'
        ])
    },
    watch: {
        indexColumn() {
            this.set_indexColumn(this.indexColumn)
            // this.set_indexActive('news_recommend')
            // this.set_indexActive('5bee2294a3100d8dc42eec55')
        },
        removeChannel() {
            set_local_cache('removeChannel', this.removeChannel)
        },
        listColumn() {
            this.set_indexColumn(this.listColumn)
            // this.set_indexActive('news_recommend')
        },
    },
    methods: {
      rollback(){
         window.history.go(-1)      
      },
        ...mapMutations('index', [
            'set_indexActive',
            'set_indexPage',
            'set_indexLocation',
            'set_indexColumn'
        ]),
        ...mapActions('index', [
            'get_channel_data'
        ]),
        // 获取可以添加的栏目数据
        get_channel() {
            // this.get_channel_data()
            // .then(res => {
            //     if (res) {
            //         // this.channel = res;
            //         // this.listColumn = res;
            //         // this.set_indexColumn(this.channel)
            //         let tempColumn,tempArr,arr1=[],arr2=[]
            //         let localColumn = JSON.parse(localStorage.getItem('index_Column'))
            //         localColumn.forEach(function (item,i) {
            //             tempArr.push(item.classid);
            //         });
            //         if(localColumn!=null){
            //             res.data.forEach(function (item,i) {
            //                 if(tempArr.indexOf(item.uuid)>0){
            //                     arr1[tempArr.indexOf(item.uuid)]=item
            //                 }else {
            //                     arr2.push(item)
            //                 }
            //             });
            //         }else {

            //         }
            //     }
            // })
            this.set_indexColumn(JSON.parse(get_local_cache('index_Column')))
            this.listColumn = JSON.parse(get_local_cache('index_Column'));
            
        },
        // 获取移除的频道
        get_removeChannel() {
            let removeChannel = JSON.parse(get_local_cache('removeChannel'))
            if (removeChannel) {
                this.removeChannel = removeChannel
            }
            // console.log(this.removeChannel);
        },
        // 添加栏目
        add(type, index) {
            if (type === 'channel') {
                let addEle = this.channel.splice(index, 1)
                // this.indexColumn.push(...addEle)
                this.listColumn.push(...addEle)
            } else if (type === 'removeChannel') {
                let addEle = this.removeChannel.splice(index, 1)
                // this.indexColumn.push(...addEle)
                this.listColumn.push(...addEle)
            }
        },
        compileBut(){
            this.isCompile = !this.isCompile;
        },
        drop(){
            // set_local_cache('index_Column', this.listColumn)
            this.set_indexColumn(this.listColumn)
            // console.log(this.listColumn)
        },
        // 移除栏目
        remove(item, index) {
            // if (item.classpath !== 'news_recommend') {
            if (!this.isCompile) return;
            if ( this.apis.theme.news.columnIdOrder.indexOf(item.classpath) < 0){
                let removeEle1 = this.listColumn.splice(index, 1)
                // let removeEle = this.indexColumn.splice(index, 1)
                this.removeChannel.push(...removeEle1)
            }
        },
        // 增减栏目之后，同步page、location对象
        sync() {
            let pageObj = {}
            let locationObj = {}
            for (let i = 0; i < this.indexColumn.length; i++) {
                var className = this.indexColumn[i].classpath
                if (this.indexPage[className] > 1) {
                    pageObj[className] = this.indexPage[className]
                } else {
                    pageObj[className] = 1
                }
                if (this.indexLocation[className] > 0) {
                    locationObj[className] = this.indexLocation[className]
                } else {
                    locationObj[className] = 0
                }
            }
            this.set_indexPage(pageObj)
            this.set_indexLocation(locationObj)
        }
    },
    mounted() {
        this.get_removeChannel()
        this.get_channel()
        if( this.apis.iphonexPaddingFn() ){
            this.iphonexMarginTop = true;
        }
    },
    deactivated() {
        this.sync()
    }
}
</script>
<style lang='less'>
.back-white {
   position:fixed;
    width: 1.335rem;
    height: 1.335rem;
    background: url('../../../assets/img/back-white.png') no-repeat center center;
    background-size: 20px;
    left:0;
    top: -9px;

}
.compile{
    border-radius: 0.5rem;
    border: 1px solid @dominantColor;
    width: 0.9rem;
    float: right;
    display: flex;
    align-items: center;
    justify-content: center;
    span{
        font-size: .24rem!important;
        color: @dominantColor!important;
        margin: 0!important;
    }
}
.reposit{
    position: relative;
}
.disNone{
    display: none;
}
.delImgFa{
    width: 0.34rem;
    height: 0.34rem;
    border-radius: 50%;
    background: #fff;
    position: absolute;
    left: 2rem;
    top: -0.1rem;
}
.delImg{
    width: 0.34rem;
    height: 0.34rem;
}
.addImg{
    width: 0.24rem;
    height: 0.24rem;
    margin-top: 0.15rem;
}
.login{
 
    -ms-flex: 1;
    flex: 1;
    font-weight: 700;
    text-align: center;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
#head{
  width:100%;
  height:50px;
  background-color:rgb(190,44,31);
  font-size:19px;
  font-weight:bold;
  color:rgb(250,250,250);
  line-height:50px;
  text-align:center;
}
header{
    background: @headerBg;
    .nvbt:nth-child(1){
      background: @headerIback;
    }
    .nvtt{
      font-size: .36rem;
      font-weight: 500;
      color:@headerColor;
    }
}
#channel {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 100%;
    overflow: hidden;
    z-index: 1000;
    .iphonexPaddingClass{
        margin-top: .4rem;
    }
    .content {
        background-color: #f8f8f8;
        background-color: #fff;
        margin-top: 0.3rem;
        .column {
            margin-top: 0.133rem;
            .title {
                font-size: .24rem;
                margin: 0 0.266rem;
                line-height: 2em;
                // background-color: #f5f5f5;
                color: #999;
                margin-bottom: 0.266rem;
                // border-bottom: 1px solid #efefef;
                span{
                    font-size: .32rem;
                    color: #333;
                    margin-right: 16px;
                }
            }
            ul{
                margin: 0.266rem 0;
                li {
                    display: inline-block;
                    width: 33%;
                     border-radius:2px;
                    margin-bottom: 0.266rem;
                    // animation: zoomIn .3s ease;
                    float: left;
                    a {
                        display: block;
                        font-size: 16px;
                        margin: 0 3px;
                        border: 1px solid #ccc;
                        line-height: 2em;
                        color: #131313;
                        text-align: center;
                        text-decoration: none;
                        white-space: nowrap;
                        &.news_recommend {
                            background-color: #f0f0f0;
                        }
                    }
                }
                &.topping li {                  
                    &:nth-child(1) a,&:nth-child(2) a,&:nth-child(3) a,&:nth-child(4) a,&:nth-child(5) a {
                        //background-color: #eae6e6;
                    }
                    a{
                        // background: transparent !important;
                    }
                }
            }
        }
    }
}
#channel .content .column ul li a {
     display: flex; 
     justify-content: center;
     align-items: center;
     border: 1px solid #f6f6f6; 
     color: #131313; 
     text-align: center; 
     white-space: nowrap;
     border-radius:0.7rem;
     background: #f6f6f6;
     span{
         font-size: .28rem; 
         margin: 0 .16rem; 
         position: relative;
         top: .04rem;
     }
}
#channel .content .column ul li a.minfontsize{
    // font-size:.28rem;;
}
#channel .content .column ul li a.minminfontsize{
    font-size:11px;
}
#channel .content .column ul li.longfontsize {
    width: 50%;
    a {
        font-size:15px;
    }
}
.navclolr{color:rgb(26, 26, 26)}
</style>


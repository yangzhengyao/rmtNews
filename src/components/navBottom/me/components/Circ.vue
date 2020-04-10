<template>
    <div 
    :style="isType==1?'height:90vh;':'height: calc(80vh - 0.6rem);'" 
    class="container nesbox circBox"  
    v-infinite-scroll="loadBottomAjax"
    infinite-scroll-disabled="bottomLock"
    infinite-scroll-distance="10"
    infinite-scroll-immediate-check="false"
    >
        <BrowseList :isBrowseType="isType"></BrowseList>
        <div class="bottomLoad" v-if="infoList.length > 0">
          <div class="loading" v-show="bottomLoading">加载中...</div>
          <div class="noData" v-if="bottomNoData">没有更多的内容了</div>
        </div>
    </div>
</template>
<script>
import BrowseList from '../../infoList/BrowseList'
import { mapGetters, mapMutations, mapActions } from "vuex";
import Bus from '@/Bus';
export default {
    name:'Circ',
    props:{
        isType:{   
            default:1
        }
    }
    ,
    data(){
        return{
            bottomLock: false,      // 上滑开关
            bottomLoading: false,    // 底部loading
            bottomNoData: false,    // 底部nothing
            userDataid:'',
            pageNo:2,
            pageSize:10,
            infoList:[],
            searchContent:'',
        }
    },
    components: {
        BrowseList
    },
    computed: {
        ...mapGetters("index", [
        "indexnewBr", // Browse当前ative的栏目
        ])
    },
    methods: {
        loadBottomAjax () {
            var that=this;
            var postData = "";
            if (!this.bottomNoData) {
                this.bottomLock = true
                this.bottomLoading = true
                if(this.isType == 1){
                    // if(this.indexnewBr == 0){
                    //     postData = {
                    //     "userId":this.userDataid,	
                    //     "browseType":1,
                    //     "pageNo":this.pageNo,
                    //     "pageSize":10,
                    //     }
                    // }else{
                        postData = {
                        "userId":this.userDataid,	
                        "browseType":0,
                        "pageNo":this.pageNo,
                        "pageSize":10,
                        }
                    // }
                    this.axios({
                            method: "post",
                            url: this.apis.theme.api.me.selectUserBrowseByParam,
                            data: postData 
                        }).then(res => {
                            if (res.data.data.length > 0 ) {
                                let arrs = that.infoList.concat(res.data.data);
                                Bus.$emit('stateListBr',{arr:arrs,type:1});
                                this.pageNo++;
                            }else {
                                that.bottomNoData = true;
                                // this.bottomNoData = true
                            }
                            that.bottomLoading = false;
                            that.bottomLock = false;
                        });
                }else{
                    postData = {
                    "userId":this.userDataid,	
                    "searchContent":this.searchContent,
                    "type":4,
                    "pageNo":this.pageNo,
                    "pageSize":10,
                    "appInfoId":that.apis.theme.api.appInfoId}
                    this.axios({
                        method: "post",
                        url: this.apis.theme.api.me.seachUserFavContent,
                        data: postData
                        }).then(res => {
                            if (res.data.data.length > 0 ) {
                                let arrs = that.infoList.concat(res.data.data);
                                Bus.$emit('stateListBr',{arr:arrs,type:this.isType});
                                this.pageNo++;
                            } else {
                                that.bottomNoData = true;
                            }
                            that.bottomLoading = false;
                            that.bottomLock = false;
                    });
                }
                
            }
        },
        getDataid(){
			let userDataid = JSON.parse(localStorage.getItem("userData"));
			if( userDataid !== null){
				this.userDataid = userDataid.user_id;
			}else{
				this.userDataid = false;
			}
        },
    },
    created () {
        this.getDataid();
        Bus.$on('stateListBr',(val) =>{
            this.infoList = val.arr;
        });
        Bus.$on('pageAndContent',(val) =>{
            this.pageNo = val.pageNo;
            this.searchContent = val.searchContent;
            this.bottomNoData = val.NoData;
        });
        
    }
}
</script>
<style lang="less" scoped>
.circBox{
    height: calc(80vh - 0.6rem);
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
}
</style>
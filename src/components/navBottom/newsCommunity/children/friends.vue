<template>
    <div class="friends" v-infinite-scroll="loadBottomAjax"
			infinite-scroll-disabled="bottomLock"
			infinite-scroll-distance="10"
			infinite-scroll-immediate-check="false">
        <info-list :is-type='isType'></info-list>
        <div class="bottomLoad" v-if="stateList.length > 0">
            <div class="loading" v-show="bottomLoading">加载中...</div>
            <div class="noData" v-if="bottomNoData">没有更多的内容了</div>
        </div>
        <div class="kongbai"></div>
    </div>
</template>
<script>
import InfoList from '../../infoList/FriInfoList'
import Bus from '@/Bus';
import qs from "qs";
export default {
    data(){
        return {
            stateList:[],
            isType:2,
            bottomLock: false, 
			bottomLoading: false,    // 底部loading
            bottomNoData: false,    // 底部nothing
			loading: false,
			pageNum:1,
			pageSize:3,
            app_info_id:this.apis.theme.api.appInfoId,
            userDataid:''
        }
    },
    components:{
        InfoList
    },
    mounted(){
		// let postData = {
        //     "pageNum":1,
        //     "pageSize":10,
        //     "app_info_id":this.apis.theme.api.appInfoId,
		// 	// "loginUserId":3484
        // };
        this.getDataid();
        if(this.userDataid){
            this.getListAjxa();
        }else{
            Bus.$emit('stateListFri',[]);
        };
        Bus.$on('pageNumFri',(val) =>{
			this.pageNum = val.num;
			this.stateList = val.arr;
			this.bottomNoData = false;
        });
    },
    methods:{
        getListAjxa(){
            if(this.userDataid){
                var postData = {
                    "pageNum":1,
                    "pageSize":10,
                    "app_info_id":this.apis.theme.api.appInfoId,
                    "user_id":this.userDataid
                }
            }else{
                Bus.$emit('islnfoList',false);
                return;
            }
            this.pageNum++;
            this.axios({
            method: "post",
            url: this.apis.theme.api.community.getStateFocusList,
            data: postData
            }).then(res => {
                if( res.data.success == true ){
                    if (res.data.data.length > 0 ) {
                        this.stateList = res.data.data;
                        Bus.$emit('stateListFri',this.stateList);
                        Bus.$emit('islnfoList',true);
                    }else {
                        Bus.$emit('islnfoList',false);
                    }
                    // this.bottomNoData = false;
                }
            });
        },
        loadBottomAjaxFalse(){
            // this.bottomNoData = true;
        },
        loadBottomAjax () {
            var that=this;
            if(this.userDataid){
                var postData = {
                    "pageNum":this.pageNum,
                    "pageSize":10,
                    "app_info_id":this.apis.theme.api.appInfoId,
                    "user_id":this.userDataid
                }
            }else{
                Bus.$emit('islnfoList',false);
                return;
            }
            if (!this.bottomNoData) {
                this.bottomLock = true
				this.bottomLoading = true;
                this.axios({
					method: "post",
					url: this.apis.theme.api.community.getStateFocusList,
					data: postData
					})
                .then(res => {
                    if (res.data.data.length > 0 ) {
						this.stateList.push(...res.data.data);
                        Bus.$emit('stateListFri',this.stateList);
                        Bus.$emit('islnfoList',true);
                        this.pageNum++;
                    } else {
                        this.bottomNoData = true
                    }
                    
                    this.bottomLoading = false
                    this.bottomLock = false
                })
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
    }
}
</script>
<style scoped lang="less">
    .kongbai{
		height: 0.9rem;
	}
</style>

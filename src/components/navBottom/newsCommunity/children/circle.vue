<template>
    <div class="circle">
		<div class="circle-more-title">
			<span style="font-size:0.28rem;font-weight:400;color:#333333;">参与圈子，有福利~</span>
			<span class="more" @click="more" style="font-size:0.28rem;font-weight:400;color:#333333;">更多></span>
		</div>
        <div class="circle-scroll" @touchmove="touchmove($event)">
			
			<div v-for="(item,index) in themeTop" :class="{select_theme:isTheme == index}" :key="index" @click="jumpType(item,index)">
				<img :src="item.pictureUrl" alt="">
				<p>{{item.themeName}}</p>
				<span>{{item.blogCount}}个帖子</span>
			</div>
		</div>
		<div class="circle-title">
			<img :src="circleImg" alt="">
			<p>{{circleTpye}}</p>
			<span>{{circleQuan}}个帖子</span>
		</div>
		<div class="circle-detail" 
		   v-infinite-scroll="loadBottomAjax"
			infinite-scroll-disabled="bottomLock"
			infinite-scroll-distance="10"
			infinite-scroll-immediate-check="false">
			<Info-list :is-type='isType'></Info-list>
			<div class="bottomLoad" v-if="stateList.length > 0">
				<div class="loading" v-show="bottomLoading">加载中...</div>
				<div class="noData" v-if="bottomNoData">没有更多的内容了</div>
			</div>
			<div class="kongbai"></div>
		</div>

    </div>
</template>
<script>
import InfoList from '../../infoList/CirInfoList'
import qs from "qs";
import Bus from '@/Bus';
export default {
    data(){
        return {
			pageNo:1,
			// appInfoId:1,
			pageSize:10,
			dataList: [],
			circleImg:require('../img/ico_1.png'),
			circleTpye:'',
			circleQuan:'',
			stateList:[],
			themeTop:[],
			teamList:[],//圈子列表
			isType:3,
			themeId:"",
			userDataid:"",
			bottomLock: false, 
			bottomLoading: false,    // 底部loading
            bottomNoData: false,    // 底部nothing
			loading: false,
			pageNum:1,
			pageSize:3,
			app_info_id:this.apis.theme.api.appInfoId,
			isTheme:-1
        }
    },
	methods:{
		touch(oEvent){
		  	oEvent.cancelBubble = true;
		},
		touchmove(oEvent){
			oEvent.cancelBubble = true;
			if (window.trackingClickSelf) {
				window.trackingClickSelf = false;
			}
		},
		loadBottomAjax () {
			var that=this;
			if(this.userDataid){
				var postData = {
					"pageNum":this.pageNum,
					"pageSize":10,
					"app_info_id":this.apis.theme.api.appInfoId,
					"theme_id":this.themeId,
					"loginUserId":this.userDataid
				}
			}else{
				var postData = {
					"pageNum":this.pageNum,
					"pageSize":10,
					"app_info_id":this.apis.theme.api.appInfoId,
					"theme_id":this.themeId,
				}
			}
            if (!this.bottomNoData) {
                this.bottomLock = true
				this.bottomLoading = true;
                this.axios({
					method: "post",
					url: this.apis.theme.api.community.getStateList,
					data: postData
					})
                .then(res => {
					// console.log(res.data, res.data.data.lastPage, this.pageNum)
                    if (res.data.data.blog.length > 0) {
						this.stateList.push(...res.data.data.blog);
						Bus.$emit('stateListCir',this.stateList);
						this.pageNum++;
                    } else {
                        this.bottomNoData = true
                    }
                    this.bottomLoading = false
                    this.bottomLock = false
                })
            }
        },
		jumpType(item,index){
			try {
				this.circleImg = item.pictureUrl;
				this.circleTpye = item.themeName;
				this.circleQuan = item.blogCount;
				this.themeId = item.themeId;
				Bus.$emit("itemtypes",item.themeId);
				this.bottomNoData = false;
				this.getListAjxa();
				this.pageNum = 2;
				this.isTheme = index;
			} catch(error) {
				console.log("data数据为空!");
			}
		},
		getListAjxa(){
			this.getDataid();
			if(this.userDataid){
				var postData = {
					"pageNum":1,
					"pageSize":10,
					"app_info_id":this.apis.theme.api.appInfoId,
					"theme_id":this.themeId,
					"loginUserId":this.userDataid
				}
			}else{
				var postData = {
					"pageNum":1,
					"pageSize":10,
					"app_info_id":this.apis.theme.api.appInfoId,
					"theme_id":this.themeId,
				}
			}
			this.axios({
			method: "post",
			url: this.apis.theme.api.community.getStateList,
			data: postData
			}).then(res => {
			if (res.data.data.blog.length > 0 ) {
				this.stateList = res.data.data.blog;
				Bus.$emit('stateListCir',this.stateList);
				Bus.$emit('islnfoListCir',true);
			}else {
				Bus.$emit('islnfoListCir',false);
			}
			});
		},
		more(){
			this.apis.urlParams("topicCircleList",{typeId:'圈子',isShow:false ,type:3},false)
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
	components:{
		InfoList
	},
	mounted(){
		this.axios({
			method: "post",
			url: this.apis.theme.api.community.getThemeTop,
			data: {
				"appInfoId":this.apis.theme.api.appInfoId,
				// "loginUserId":3303
			}
			}).then(res => {
			if (res.data) {
				this.themeTop = res.data.data;
				this.jumpType(res.data.data[0],0);
				this.getListAjxa();
			}
		});
		Bus.$on('pageNumCir',(val) =>{
			this.pageNum = val.num;
			this.stateList = val.arr;
			this.bottomNoData = false;
        });
	},
	created(){

	}
}
</script>
<style scoped lang="less">
.circle-more-title{
	height:0.58rem;
	margin-top: 0.1rem;
	background:#ffffff;
	display:flex;
	padding:0.25rem 0.3rem 0 0.3rem;
	justify-content: space-between;
}

	.circle{
		background:#fff;
	}
	.circle .circle-scroll{
		width: 100%;
		overflow: scroll;
		background: #fff;
		display: flex;
		padding-left: 0.2rem;
		margin-top: 0.1rem;
	}
	.kongbai{
		height: 0.9rem;
	}
	 .circle-scroll::-webkit-scrollbar {
        display: none;
    }
	.circle-scroll > div{
		width: 1.4rem;
		padding: 0.25rem;
		display: flex;
		justify-content: center;
		flex-direction: column;
		box-sizing: content-box;
		align-items:center;
	}
	.circle-scroll > div > img{
		height: 1rem;
		width: 1rem;
		margin-bottom: 0.25rem;
	}
	.circle-scroll > div > p{
		width: 1.4rem;
		font-size:0.28rem;
		font-family:SourceHanSansCN-Regular;
		font-weight:400;
		text-align: center;
		color:rgba(51,51,51,1);
	}
	.circle-scroll > .select_theme > p{
		color: #ff802b!important;
	}
	.circle-scroll > div > span{
		width: 1.2rem;
		font-size:0.2rem;
		font-family:SourceHanSansCN-Regular;
		font-weight:400;
		text-align: center;
		color:rgba(153,153,153,1);
	}
	.circle-title{
		margin-top: 0.1rem; border-top:0.1rem solid #F5F5F5;
		margin-bottom: 0.03rem;
		padding:0.2rem 0.3rem ;
		display: flex;
		justify-content: center;
        align-items: center;
		background: #fff;
	}
	.circle-title > img{
		width: 0.6rem;
		height: 0.6rem;
		margin-right: 0.2rem;


	}
	.circle-title > p{
		flex: 1;
		font-size:0.3rem;
		font-family:SourceHanSansCN-Regular;
		font-weight:400;
		color:rgba(51,51,51,1);
	}
	.circle-title > span{
		flex: 1;
		font-size:0.2rem;
		font-family:SourceHanSansCN-Regular;
		font-weight:400;
		text-align: right;
		color:rgba(153,153,153,1);
	}
	.circle-detail{
		background: #fff;
	}
</style>

<template>
    <div class="dynamic">
        <div class="dynamic-more" v-if="apis.getTheme() !='dongpo'">
			<div class="dynamic-more-title">
				<p>参与话题，有福利~</p>
				<span class="more" @click="more" style="font-size:0.28rem;font-weight:400;color:#333333;" >更多></span>
			</div>
			<div class="dynamic-more-scroll" @touchmove="touchmove($event)">
				<div @click="routeDateil(item)" v-for="(item,index) in topictTop" :key="index">
					<img :src="item.pictureUrl" width="100%" height="100%">
					<p>#{{item.topicName}}#</p>
					<div></div>
				</div>
			</div>
		</div>
		<div class="dynamic-list" v-infinite-scroll="loadBottomAjax"
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
    </div>
</template>
<script>
import InfoList from '../../infoList/DyInfoList'
import Bus from '@/Bus';
export default {
    data(){
        return {
			stateList:[],
			isType:2,
			topictTop:[],
			loading:false,
			type:'',
			bottomLock: false, 
			bottomLoading: false,    // 底部loading
            bottomNoData: false,    // 底部nothing
			loading: false,
			pageNum:1,
			pageSize:10,
			app_info_id:this.apis.theme.api.appInfoId,
			userDataid:"",
			islnfoListDy:true,
			itemateId:[]
        }
    },
	methods:{
		loadBottomAjax () {
			// this.getDataid();
			var that=this;
			if(this.userDataid){
				var postData = {
					"pageNum":this.pageNum,
					"pageSize":10,
					"app_info_id":this.apis.theme.api.appInfoId,
					"loginUserId":this.userDataid
				}
			}else{
				var postData = {
					"pageNum":this.pageNum,
					"pageSize":10,
					"app_info_id":this.apis.theme.api.appInfoId,
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
                    if (!res.data.data.lastPage) {
						this.stateList.push(...res.data.data.blog);
						Bus.$emit('stateListDy',this.stateList);
						this.pageNum++;
                    } else {
                        this.bottomNoData = true
                    }
                    this.bottomLoading = false
                    this.bottomLock = false
                })
            }
        },
		 touch(oEvent){
		  oEvent.cancelBubble = true;
		},
		getDataid(){
			let userDataid = JSON.parse(localStorage.getItem("userData"));
			if( userDataid !== null){
				this.userDataid = userDataid.user_id;
			}else{
				this.userDataid = false;
			}
		},
		touchmove(oEvent){
			
		  	oEvent.cancelBubble = true;
			if (window.trackingClickSelf) {
				window.trackingClickSelf = false;
			}
		},
		routeDateil(item){
			let userDataid = JSON.parse(localStorage.getItem("userData"));
            // if (userDataid == null) {
            //     this.apis.urlParams("Login");
            //     return false;
			// }
			this.itemateId = item.topicId
			localStorage.setItem('topicCircleList', JSON.stringify({"typeId":"话题","isShow":false,type:1,}));
			this.apis.urlParams("topicCircleDetail",{params:item.topicId,typeId:"话题",type:1},false);
			Bus.$emit("teamListso",{judgment:1});
			// this.sensitveinformation() 
		},
		more(){
			this.apis.urlParams("topicCircleList",{typeId:'话题',isShow:false ,type:1},false)
		},
	},
	components:{
		InfoList
	},
	mounted(){
		this.getDataid();
		if(this.userDataid){
			var postData = {
				"pageNum":1,
				"pageSize":10,
				//  "app_info_id":this.apis.theme.api.appInfoId,
				"loginUserId":this.userDataid,
				"app_info_id":parseInt(this.app_info_id)
			}
		}else{
			var postData = {
				"pageNum":1,
				"pageSize":10,
				// "app_info_id":this.apis.theme.api.appInfoId,
				"app_info_id":parseInt(this.app_info_id)
			}
		}
		this.pageNum++;
		this.axios({
          method: "post",
          url: this.apis.theme.api.community.getStateList,
          data: postData
        }).then(res => {
		  if (res.data.data.blog.length > 0 ) {
				this.stateList = res.data.data.blog;
				Bus.$emit('stateListDy',this.stateList);
				Bus.$emit('islnfoListDy',true);
			}else {
				Bus.$emit('islnfoListDy',false);
				// this.bottomNoData = true
			}
		});
		if(this.userDataid){
			var postDatas = {
				"pageNum":1,
				"pageSize":10,
				//  "app_info_id":this.apis.theme.api.appInfoId,
				"loginUserId":this.userDataid,
				"appInfoId":parseInt(this.app_info_id)
			}
		}else{
			var postDatas = {
				"pageNum":1,
				"pageSize":10,
				// "app_info_id":this.apis.theme.api.appInfoId,
				"appInfoId":parseInt(this.app_info_id)
			}
		}
		this.axios({
          method: "post",
          url: this.apis.theme.api.community.selectTopicByParam,
          data: postDatas
        }).then(res => {
          if (res.data) {
			this.topictTop = res.data.data;
			
          }
		});
		Bus.$on('pageNumDy',(val) =>{
			this.pageNum = val.num;
			this.stateList = val.arr;
			this.bottomNoData = false;
        });
	}
}
</script>
<style scoped lang="less">
 .dynamic-more-scroll::-webkit-scrollbar {
        display: none;
    }
.dynamic{
	background:#fff;
}
.dynamic-more{
	padding: 0.3rem 0 0.3rem 0.3rem;border-bottom:0.1rem solid #F5F5F5;
	background: #fff;
	margin: 0.1rem 0;
}
.dynamic-more-title{
	display: flex;
	justify-content: space-between;
}
.dynamic-more p{
	font-size:0.28rem;
	font-family:SourceHanSansCN-Regular;
	font-weight:400;
	color:rgba(51,51,51,1);

}
.dynamic-more-title > a{
	font-size:0.24rem;
	font-family:SourceHanSansCN-Regular;
	font-weight:400;
	color:rgba(153,153,153,1);
}
.dynamic-more-title{
	margin-bottom: 0.25rem;
	margin-right: 0.2rem;
}
.dynamic-more-scroll{
	width: 100%;
	overflow-x: scroll;
	display: -webkit-box;
}
.dynamic-more-scroll > div{
	width:2.67rem;
	height:1.39rem;
	border-radius:0.05rem;
	padding-right: 0.2rem;
	text-align:  center;
	line-height: 1.39rem;
	position: relative;
	box-sizing: content-box;
	border-radius: .1rem;
}
.dynamic-more-scroll > div > img{
	border-radius: 0.1rem;
}
.dynamic-more-scroll > div > p{
	width:100%;
	height:100%;
	position: absolute;
	left: 0;
	top: 0;
	font-size:0.28rem;
	font-family:SourceHanSansCN-Regular;
	font-weight:400;
	color:rgba(255,255,255,1);
	z-index: 11;
}
.dynamic-more-scroll > div > div{
	width:2.67rem;
	height:1.39rem;
	position: absolute;
	background: black;
	opacity: 0.5;
	top: 0;
	left: 0;
	border-radius: .1rem;
}
.dynamic-list{
	background: #fff;
}
.kongbai{
	height: 0.9rem;
}
</style>

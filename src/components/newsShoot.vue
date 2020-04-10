<template>
    <div class="Box">
        <div>
            <shoot :is-type='isType'></shoot>
        </div>
    </div>
</template>
<script>
import shoot from './navBottom/infoList/ShootInfoList'
import { mapGetters, mapMutations, mapActions } from "vuex";
import Bus from '@/Bus';
export default {
    name:'newsShoot',
    data(){
        return{
            userDataid:'',
            app_info_id:this.apis.theme.api.appInfoId,
            stateList:[],
            isType:2,
        }
    },
    components: {
        shoot
    },
    computed: {
        ...mapGetters("login", [
            "getStorge" // active的栏目
        ])
    },
    created (){
		this.getDataid();
		if(this.userDataid){
			var postData = {
				"pageNum":1,
				"pageSize":10,
				"loginUserId":this.userDataid,
                "app_info_id":parseInt(this.app_info_id)
                // "app_info_id":18
			}
		}else{
			var postData = {
				"pageNum":1,
				"pageSize":10,
                "app_info_id":parseInt(this.app_info_id)
                // "app_info_id":18
                
			}
		}
		// this.pageNum++;
		this.axios({
          method: "post",
          url: this.apis.theme.api.community.getStateList,
          data: postData
        }).then(res => {
		    if (res.data.data.blog.length > 0 ) {
                this.stateList = res.data.data.blog;
				Bus.$emit('stateListShoot',this.stateList);
				Bus.$emit('islnfoListShoot',true);
			}else {
				Bus.$emit('islnfoListShoot',false);
				// this.bottomNoData = true
			}
		});
		// Bus.$on('pageNumDy',(val) =>{
		// 	this.pageNum = val.num;
		// 	this.stateList = val.arr;
		// 	this.bottomNoData = false;
        // });
    },
    methods:{
        getDataid(){
			let userDataid = JSON.parse(localStorage.getItem("userData"));
			if( userDataid !== null){
				this.userDataid = userDataid.user_id;
			}else{
				this.userDataid = false;
			}
        },
        clickShoot(){
            console.log('haha');
        }
    }
}
</script>
<style lang='less' scoped>
    
</style>
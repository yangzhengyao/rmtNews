<template>
    <div class="activity">
       <activitylist/>
       <div class="kongbai"></div>
    </div>
</template>
<script>
import activitylist from '@/html/activitypage/activitylist/App';// 活动组件
export default {
    data(){
        return {

        }
    },
     components:{
      activitylist
    },
}
</script>
<style scoped lang="less">
    .kongbai{
		height: 0.9rem;
	}
</style>
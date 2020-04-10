<template>
    <div class="activity">
      <tipOff/> 
       <div class="kongbai"></div>
    </div>
</template>
<script>
import tipOff from '@/html/me/tipOff/App';// 我要报料
export default {
    data(){
        return {

        }
    },
     components:{
      tipOff
    },
}
</script>
<style scoped lang="less">
    .kongbai{
		height: 0.9rem;
	}
</style>
<template>
    <div class="circles">
        <div class="contents">
            <topic-list></topic-list>
        </div>
    </div>
</template>
<script>
import TopicList from '../../../../components/navBottom/infoList/TopicList'
export default {
    name:"circles",
    data(){
        return {
            type:0
        }
    },
    methods:{
        
    },
    components:{
        TopicList
    }
}
</script>
<style scoped lang="less">
.circles{
    display:flex;
    flex-direction: column;
    width:100vw;
    height:100vh;
}
.contents{
    flex:1;
    overflow: auto;
}
    
</style>


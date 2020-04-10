<template>
  <div>
    <mt-popup v-model="getQuestionAreaBool" position="bottom" class="region-popup" :class="iphonexPadding ? 'iphonexMarginClass':'' ">
        <div class="m-area-container">
            <div class="area-ok-cancle">
            <a class="area-ok-cancle" @click="handleHideShowPop(0)">取消</a>
            <a class="area-ok-btn" @click="handleHideShowPop(1)">确定</a>
            </div>
            <mt-picker :slots="addressSlots" valueKey="name" :visibleItemCount="5" @change="addressChange" :itemHeight="40"></mt-picker>
        </div>
    </mt-popup>
  </div>
</template>

<script>
import area from '../assets/js/area.js'
export default {
  name: 'Area',
  props:{
    getQuestionAreaBool:Boolean
  },
  data () {
    return {
      region:'',//三级地址
      province:'',//省
      city:'',//市
      county:'',//县
      regionVisible:this.getQuestionAreaBool,//弹出框是否可见
      regionInit:false,
      iphonexPadding:false,
      addressSlots: [
        {
            flex: 1,
            values: this.getProvinceArr(),
            className: 'slot1',
            defaultIndex:22,
            // 30 新疆
            // 13 福建
            // 22 四川
            // 12 福建
            textAlign: 'center',
        }, {
            divider: true,
            content: '-',
            className: 'slot2'
        }, {
            flex: 1,
            values: this.getCityArr("新疆维吾尔自治区"),
            className: 'slot3',
            textAlign: 'center',
            defaultIndex:9
            // 1 厦门市
            // 14 自治区直辖县级行政区划
            // 11 东坡
            // 9  乐山市
            // 1  厦门市
        },{
            divider: true,
            content: '-',
            className: 'slot4'
        },
        {
            flex: 1,
            values: this.getCountyArr('新疆维吾尔自治区', '自治区直辖县级行政区划'),
            className: 'slot5',
            defaultIndex:0,
            // 2 海沧
            // 4 铁门关
            // 1 东坡区
            // 0 市辖区
            // 2 海沧区
            textAlign: 'center'
        }
      ],
      areaArr:[]
    }
  },
  watch:{
    regionVisible:function( value ){
      console.log( value )
    }
  },
  methods:{
    handleHideShowPop(){
      this.$emit( 'getQuestionAreaFn',{areaBool:false,areaObj:this.areaArr} )
      // this.regionVisible = false
    },
    addressChange(picker, values){
      if (this.regionInit){
          //取值并赋值
          this.region = values[0]["name"] + ' ' + values[1]["name"] + ' ' + values[2]["name"];
          this.province = values[0]["name"];
          this.city = values[1]["name"];
          this.county = values[2]["name"];
          //给市、县赋值
          picker.setSlotValues(1, this.getCityArr(values[0]["name"]));
          picker.setSlotValues(2, this.getCountyArr(values[0]["name"], values[1]["name"]));
          this.areaArr = values;
          for( let i = 0;i<this.areaArr.length;i++ ){
             this.areaArr[i].code = this.areaArr[i].code;
          }
      }else {
          this.regionInit = true;
      }
    },
    getProvinceArr() {
      let provinceArr = [];
      area.forEach(function (item) {
      let obj = {};
          obj.name = item.label;
          obj.code = item.value;
          provinceArr.push(obj);
      });
      return provinceArr;
    },
    getCityArr(province) {
      let cityArr = [];
      area.forEach(function (item) {
      if (item.label === province) {
          item.children.forEach(function (args) {
          let obj = {};
              obj.name = args.label;
              obj.code = args.value;
          cityArr.push(obj);
          });
      }
      });
      return cityArr;
    },
    getCountyArr(province,city){
      let countyArr = [];
      area.forEach(function(item){
      if (item.label === province){
          item.children.forEach(function (args) {
              if (args.label === city){
                  args.children.forEach(function (param) {
                      let obj = {};
                      obj.name=param.label;
                      obj.code=param.value;
                      countyArr.push(obj);
                      })
                  }
              });
          }
      });
      return countyArr;
    },
  },
  mounted(){
    if( this.apis.iphonexPaddingFn() ){
      this.iphonexPadding = true;
    }
  }
}
</script>

<style scoped lang="less" type="text/scss" rel="stylesheet/scss" scoped>
.iphonexMarginClass{
  margin-bottom: 1.8rem;
}
.area-item{
    display: flex;
    align-items: center;
    padding:0 14px;
    height:50px;
    box-sizing: border-box;
    &-title{
        width:70px;
        flex: 0 0 1;
        line-height: 22px;
        color:#A3A3A5;
        font-size:16;
        font-weight: 400;
    }
    &-content{
        display: flex;
        flex:1;
        align-items: center;
        margin-left: 16px;
        line-height: 22px;
        color:#333;
        font-size:16;
        &.area-item-content-more{
            justify-content: space-between;
            flex:1;
            .area-item-content-text{
                flex:1;
                width:calc(100% - 15px);
                height:22px;
            }
            &>img{
                width:8px;
                height:15px;
                display: block;
                flex:0 0 1;
            }
        }
        .inputBox{
            flex:1;
            border:none;
        }
        .selectBox{
            width:18px;
            height:28px;
            border-radius:4px;
        }
    }
}
  .region-popup{
        width:100%;
    }
    .m-area-container{
      width: 100%;
      .area-ok-cancle{
        display: flex;
        display: -webkit-flex;
        justify-content: space-between;
        -webkit-justify-content: space-between;
        padding: .2rem .3rem 0  .3rem;
        a{
          color: #fff;
          padding: 6px 10px;
          border-radius: 4px;
          font-size: .3rem;
        }
        .area-ok-btn{
          background: @dominantColor;
        }
        .area-ok-cancle{
          background: #ccc;
        }
      }
    }
</style>
<style lang="less">
  .picker-items{
    font-size:.48rem !important;
  }
</style>


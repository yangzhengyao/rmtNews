<template>
  <div id="personalDetail">
    <header class="com_header headerNavFixed">
      <div class="nvbt iback" @click="apis.iback()"></div>
      <div class="nvtt">积分明细</div>
      <div class="nvbt idoc"></div>
    </header>
    <div class="container contentNavFixed com_contentNavFixed" id="personalEcharts">
      <!--     <swiper :options="swiperOption" class="swiper-box" ref="mySwiper" :class="{isIOS: $store.state.device == 'ios'}">-->
      <div class="chartContainer" id="chartContainer">
        <div id="myChart" style="width:200%;height: 350px;background:#FAFAFA"></div>
      </div>
      <div class="currentData btm pd">
        <span class="currentData_integral">
          当日积分：
          <span class="currentData_integral_number">{{integralList[curInt]}}</span> 分
        </span>
        <span class="currentDate">{{formatDate(dateList[curInt])}}</span>
      </div>
      <div class="logCon fl">
        <div class="integral_list" v-if="loadingtransform">
          <div class="time_line btm" v-for="(item,index) in listData" :key="index">
            <div class="ft20">{{item.expTypeName}}</div>
            <div class="pt log_time">{{formatTime(item.gmtCreate)}}</div>
            <div class="addNumber" style="margin-top: .3rem">
              +{{item.expScore}}
              <span style="font-size: .34rem">分</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
// const F2 = require('@antv/f2');
import api from "../../../../../src/assets/js/api.js";
import { mapGetters, mapMutations, mapActions } from "vuex";
import { fetch } from "@/config/fetch";
import { Toast } from "mint-ui";
import F2 from "@antv/f2";
import moment from "moment";
import eChart from "echarts";

export default {
  name: "enterprise",
  data() {
    return {
      curInt: 14,
      listData: [],
      integralList: [],
      loadingtransform: true
    };
  },
  computed: {
    ...mapGetters("login", [
      "getStorge" // active的栏目
    ]),
    dateList() {
      let arr = [];
      for (var i = 0; i < 15; i++) {
        arr.unshift(moment().subtract(i, "days"));
      }
      return arr;
    },
    currentMonthDate() {
      let arr = [];
      for (var i = 0; i < 15; i++) {
        arr.unshift(
          moment()
            .subtract(i, "days")
            .format("M-DD")
        );
      }
      return arr;
    }
  },
  mounted() {
    this.searchUserTotalExpDaily();
    this.searchUserExpItem({
      userId: JSON.parse(localStorage.getItem("userData")).user_id,

      appInfoId: api.theme.api.appInfoId,
      dateNum: moment(this.dateList[this.curInt]).format("YYYYMMDD"),
      pageNo: 1,
      pageSize: 100
    });
    document.getElementById("chartContainer").scrollTo(500, 0);
  },
  methods: {
    drawLine() {
      let self = this;
      let myChart = eChart.init(document.getElementById("myChart"));
      var option = {
        tooltip: {
          show: false
        },
        splitNumber: 8,
        background: "#CCCCCC",
        grid: {
          left: "2%",
          right: "2%",
          bottom: "10%",
          top: "10%"
        },
        xAxis: {
          type: "category",
          // x轴的字体样式
          axisLabel: {
            show: true,
            interval:0,
            textStyle: {
              color: "#CCCCCC",
              fontSize: "15",
              fontFamily: "Arial",
              fontWeight: "400"
            },
            emphasis: {
              color: "#1A1A1A"
            }
          },
          // 控制网格线是否显示
          splitLine: {
            show: true,
            //  改变轴线颜色
            interval:0,
            lineStyle: {
              // 使用深浅的间隔色
              color: "#D9D9D9"
            }
          },
          // x轴的颜色和宽度
          axisLine: {
            lineStyle: {
              color: "#FAFAFA"
            }
          },
          data: self.currentMonthDate
        },
        yAxis: {
          show: false,
          axisLabel: {
            show: false //这行代码控制着坐标轴x轴的文字是否显示
          },
          axisTick: {
            //y轴刻度线
            show: false
          },
          // 控制网格线是否显示
          splitLine: {
            show: false,
            //  改变轴线颜色
            lineStyle: {
              // 使用深浅的间隔色
              color: "#D9D9D9"
            }
          }
        },
        series: [
          {
            //name: "当日积分",
            type: "bar",
            barWidth: "80%",
            stack: "总量",
            color: "#FBC5C2",
            itemStyle: {
              normal: {
                //柱形图圆角，初始化效果
                barBorderRadius: [10, 10, 0, 0]
                // color: function(params) {
                //   var key = params.dataIndex;
                //   if (key === self.curInt) {
                //     return "#E32519";
                //   } else {
                //     return "#FBC5C2";
                //   }
                // }
              },
              emphasis: {
                color: "#E32519"
              }
            },
            // label: {
            //     normal: {
            //         show: true,
            //         position: 'insideRight'
            //     }
            // },
            label: {
              show: true, //开启显示
              position: "top", //在上方显示
              textStyle: {
                color: "#1A1A1A",
                fontSize: "15",
                fontFamily: "SourceHanSansCN-Regular",
                fontWeight: "400"
              },
              formatter: function(param) {
                return param.data + "分";
                // return param.name
              }
            },
            data: self.integralList
          }
        ],
        animation: false
      };
      // 绘制图表
      myChart.on("click", function(params) {
        //图表点击事件
        if (params.dataIndex != self.curInt) {
          self.curInt = params.dataIndex;
          let data = {
            userId: JSON.parse(localStorage.getItem("userData")).user_id,
            appInfoId: api.theme.api.appInfoId,
            dateNum: moment(self.dateList[params.dataIndex]).format("YYYYMMDD"),
            pageNo: 1,
            pageSize: 100
          };
          self.searchUserExpItem(data);
        }
      });
      myChart.setOption(option);
    },
    formatDate(date) {
      return moment(date).format("YYYY-MM-DD");
    },
    formatTime(date) {
      return moment(date).format("HH:mm");
    },
    async searchUserTotalExpDaily() {
      //每日积分明细接口
      let res = await fetch("post", "integral_searchUserTotalExpDaily", {
        userId: JSON.parse(localStorage.getItem("userData")).user_id,
        appInfoId: api.theme.api.appInfoId,
        beginDateNum: moment(this.dateList[0]).format("YYYYMMDD"),
        endDateNum: moment(this.dateList[this.dateList.length]).format(
          "YYYYMMDD"
        )
      });
      let obj = {};
      res.data.map(item => {
        if (!obj[item.dateNum]) {
          obj[item.dateNum] = item.totalExpDaily;
        }
      });
      this.dateList.map(item => {
        if (!obj[moment(item).format("YYYYMMDD")]) {
          obj[moment(item).format("YYYYMMDD")] = 0;
        }
      });
      for (var key in obj) {
        this.integralList.push(obj[key]);
      }
      this.drawLine();
    },
    async searchUserExpItem(params) {
      //每日积分明细接口
      this.loadingtransform = false;
      let res = await fetch("post", "integral_searchUserExpItem", params);
      if (res.success) {
        this.listData = res.data;
        this.loadingtransform = true;
      }
    }
  }
};
</script>
<style lang='less' scoped>
header {
  background: @headerBg;

  .nvbt:nth-child(1) {
    background: @headerIback;
  }

  .nvtt {
    font-size: 0.36rem;
    font-weight: 500;
    color: @headerColor;
  }
}
#personalDetail {
  margin-top: 0.88rem;
  .container {
    background: #fff !important;
    font-size: 0.32rem;
    width: 100%;
    height: 100vh;
    padding: 0 0.15rem;
    box-sizing: border-box;
    .chartContainer {
      overflow-x: scroll;
      width: 100%;
    }
    .btm {
      border-bottom: 0.01rem solid #ededed;
    }
    .pd {
      padding-bottom: 0.25rem;
    }
    .currentData {
      padding-left: 0.4rem;
      padding-top: 0.88rem;
      .currentData_integral {
        width: 2.5rem;
        height: 0.38rem;
        font-size: 0.34rem;
        font-family: Source Han Sans CN;
        font-weight: 400;
        color: rgba(227, 37, 25, 1);
        .currentData_integral_number {
          font-size: 0.44rem;
          font-family: Arial;
          font-weight: bold;
          color: rgba(227, 37, 25, 1);
        }
      }
      .currentDate {
        margin-top: 0.1rem;
        font-size: 0.35rem;
        font-family: Arial;
        font-weight: 400;
        padding-right: 0.25rem;
        float: right;
        color: rgba(26, 26, 26, 1);
      }
    }
    .integral_list div {
      height: 1.3rem;
      margin-top: 0.15rem;
      border-radius: 3%;
      margin-left: 0.25rem;
    }

    .integral_list .time_line {
      position: relative;
      flex-direction: column;
      display: flex;
      .addNumber {
        justify-content: center;
        position: absolute;
        right: 0.2rem;
        font-size: 0.44rem;
        font-family: Arial;
        font-weight: bold;
        color: rgba(227, 37, 25, 1);
      }
    }

    .integral_list img {
      position: absolute;
      top: 50%;
      left: -0.13rem /* 10/100 */;
      width: 0.16rem /* 16/100 */;
      height: 0.2rem /* 20/100 */;
    }

    .integral_list div .mt2 {
      margin-top: 0.2rem;
    }

    .integral_list p {
      margin-top: 0.1rem;
      margin-left: 0.4rem;
    }

    .integral_list .ft20 {
      font-size: 0.32rem;
      font-family: Source Han Sans CN;
      font-weight: 400;
      color: rgba(26, 26, 26, 1);
    }

    .pd {
      padding-bottom: 0.15rem;
    }
    .bl {
      border-left: 0.01rem solid #c7c4c4;
    }
    .integral_list .pt {
      margin-top: 0rem;
    }
    .integral_list .log_time {
      font-size: 0.26rem;
      font-family: Source Han Sans CN;
      font-weight: 400;
      color: rgba(153, 153, 153, 1);
    }

    .integral span {
      margin-left: 0.4rem;
    }

    .integral_list > div::before {
      content: " ";
      height: 0.15rem /* 20/75 */;
      width: 0.15rem /* 20/75 */;
      background: #e6e6e6;
      border-radius: 50%;
      position: absolute;
      top: 25%;
      left: -0.193rem /* 36/100 */;
    }

    .integral_list .time_line::after {
      display: block;
      position: absolute;
      content: "";
      width: 0.02rem /* 2/75 */;
      height: 1.4rem;
      left: -0.13rem /* 28/100 */;
      background: #e6e6e6;
      margin-left: 0;
      top: 0.4rem /* 80/100 */;
    }
    .integral_list .time_line:last-child::after {
      display: none;
    }
    .integral_list .time_line2::before {
      content: " ";
      height: 0.2rem /* 20/75 */;
      width: 0.2rem /* 20/75 */;
      background: #e6e6e6;
      border-radius: 50%;
      position: absolute;
      top: 10.35rem /* 853/75 */;
      left: 1.65rem /* 193/75 */;
    }

  }
}
</style>

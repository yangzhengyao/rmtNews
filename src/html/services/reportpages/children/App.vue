<template>
  <div id="home">
    <header
      class="com_header headerNavFixed"
      style="background: #fff;border-bottom: 1px solid #f0f0f0;"
    >
      <div class="nvbt ibackBack" @click="apis.iback()"></div>
      <div class="nvtt" style="color: #1a1a1a;">举报</div>
      <div class="nvbt idoc"></div>
    </header>
    <div class="listboxs">
      <div class="box-titles">
        <div class="line"></div>举报人信息
        <span>
          （标有
          <font style="color: red;">*</font>的必须填写）
        </span>
      </div>
      <div class="boxaction">
        <div class="boxleft">姓名</div>
        <input type="text" value v-model="username" placeholder="请输入姓名" />
      </div>
      <div class="boxaction">
        <div class="boxleft">身份证号</div>
        <input type="text" value v-model="usernameID" placeholder="请输入身份证号" />
      </div>
      <div class="boxaction">
        <div class="boxleft">联系方式</div>
        <input type="number" value v-model="tell" placeholder="请输入联系方式" />
      </div>
      <div class="boxaction" style="">
        <div class="boxleft">政治面貌</div>
        <group>
          <popup-picker :data="list1" v-model="value1"></popup-picker>
        </group>
      </div>
      <!-- <div class="boxaction">
        <div class="boxleft">现居住地址</div>
        <input type="text" value v-model="address" placeholder="请输入地址" />
      </div>-->
      <div class="boxaction" style="border-bottom:none;padding-bottom: 0.1rem;margin: 0 auto;">
        <div class="boxleft">级别</div>
        <div class="boxright">
          <group>
            <popup-picker :data="list2" v-model="value2"></popup-picker>
          </group>
        </div>
      </div>
      <div style="background:rgba(245,244,249,1);height:0.1rem"></div>
      <div class="box-titles">
        <div class="line"></div>被举报人(单位)信息
        <span>
          （标有
          <font style="color: red;">*</font>的必须填写）
        </span>
      </div>
      <div class="boxaction">
        <div class="boxleft">
          被举报人
          <font style="color: red;">*</font>
        </div>
        <input type="text" value v-model="informant" placeholder="请输入内容" />
      </div>
      <div class="boxaction">
        <div class="boxleft">
          单位
          <font style="color: red;">*</font>
        </div>
        <input type="text" value v-model="Company" placeholder="请输入内容" />
      </div>
      <div class="boxaction">
        <div class="boxleft">
          职务
          <font style="color: red;">*</font>
        </div>
        <input type="text" value v-model="postcont" placeholder="请输入内容" />
      </div>
      <div class="boxaction"  style="border-bottom:none;padding-bottom: 0.1rem;margin: 0 auto;">
        <div class="boxleft">
          级别
          <font style="color: red;">*</font>
        </div>
        <group>
          <popup-picker :data="list3" v-model="value3"></popup-picker>
        </group>
      </div>
      <div style="background:rgba(245,244,249,1);height:0.1rem"></div>
      <div class="box-titles">
        <div class="line"></div>举报正文（注意
        <span>
          （标有
          <font style="color: red;">*</font>的必须填写）
        </span>
      </div>
      <div class="boxaction">
        <div class="boxleft">标题 <font style="color: red;">*</font></div>
        <input type="text" value v-model="conttitle" placeholder="请输入内容" />
      </div>
      <div class="boxaction">
        <div class="boxleft">
          问题类别
          <font style="color: red;">*</font>
        </div>
        <group>
          <popup-picker :data="list4" v-model="value4" @on-change="onChange"></popup-picker>
        </group>
      </div>
      <div class="boxaction">
        <div class="boxleft">
          问题细类
          <font style="color: red;">*</font>
        </div>
        <group>
          <popup-picker :data="list5" v-model="value5" @on-change="onChangelist"></popup-picker>
        </group>
      </div>
      <div class="boxaction">
        <div class="boxleft">主要问题<font style="color: red;">*</font></div>
        <textarea
          name
          rows
          cols
          v-model="conttext"
          placeholder="请输入内容"
          contenteditable="true"
          style="-webkit-user-select: auto;font-size:0.3rem;"
        ></textarea>
      </div>
       <div class="sublimet">
      <div class="child-one" @click="subcont">提交</div>
      <div class="child-two" @click="Resets">重填</div>
    </div>
    </div>
   
  </div>
</template>
<script>
import api from "@/assets/js/api.js";
import axios from "axios";
import { PopupPicker, Group, Picker, XButton, Divider, XSwitch } from "vux";
import { mapGetters, mapMutations, mapActions } from "vuex";
import { Cell, Toast, Indicator } from "mint-ui";
import { get_local_cache, set_local_cache } from "@/config/cache";
export default {
  name: "lives",
  data() {
    return {
      classPage: 1, // 当前栏目的翻页页数
      contentJson: [], // 整个列表数据
      dataCount: 0, // 推荐文章数量
      topStatus: "", // 下拉状态
      bottomLock: false, // 上滑开关
      bottomLoading: true, // 底部loading
      bottomNoData: false, // 底部nothing
      loading: false,
      error: false,
      location: 0,
      title: "",
      type: 1,
      times: this.apis.getBeforeDate(0),
      xztit: require("../images/icon_jbxz.png"),
      xztitcon: require("../images/jbxz.png"),
      value: [],
      list1: [
        [
          "请选择",
          "中国共产党党员",
          "中共预备党员",
          "共青团员",
          "民主党派人士",
          "无党派民主人士",
          "群众"
        ]
      ],
      value1: ["请选择"],
      list2: [
        [
          "请选择",
          "正省部级",
          "副省部级",
          "正厅局级",
          "副厅局级",
          "正县处级",
          "副县处级",
          "正乡科级",
          "副乡科级",
          "一般干部",
          "军队",
          "金融机构",
          "一般企业",
          "事业",
          "农村",
          "社区",
          "其他"
        ]
      ],
      value2: ["请选择"],
      list3: [
        [
          "请选择",
          "正乡科级",
          "副乡科级",
          "一般干部",
          "军队",
          "金融机构",
          "一般企业",
          "事业",
          "农村",
          "社区",
          "其他"
        ]
      ],
      value3: ["请选择"],
      list4: [[]],
      value4: ["请选择"],
      list5: [[]],
      value5: ["请选择"],
      username: "",
      usernameID: "",
      tell: "",
      address: "",
      informant: "",
      Company: "",
      postcont: "",
      conttitle: "",
      conttext: "",
      auto_id: {},
      auto_idlist: {},
      list4new: [],
      reportTypeId: "",
      list5new: [],
      reportTypeDetailId: ""
    };
  },
  components: {
    // questionArea,
    PopupPicker,
    Group,
    Picker,
    XButton,
    Divider,
    Cell,
    XSwitch
  },
  methods: {
    Resets() {
      this.username = "";
      this.usernameID = "";
      this.tell = "";
      this.value1 = ["请选择"];
      this.value2 = ["请选择"];
      this.informant = "";
      this.Company = "";
      this.postcont = "";
      this.value3 = ["请选择"];
      this.value4 = ["请选择"];
      this.value5 = ["请选择"];
      this.conttitle = "";
      this.conttext = "";
    },
    subcont() {
      //参数验证检测
      if (
        this.usernameID.trim().length != "" &&
        !/^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/.test(
          this.usernameID
        )
      ) {
        Toast({
          message: "身份证有误",
          position: "middle",
          duration: 1500
        });
        return;
      } else if (
        this.tell.trim().length != "" &&
        !/^1[34578]\d{9}$/.test(this.tell)
      ) {
        Toast({
          message: "手机号输入有误",
          position: "middle",
          duration: 1500
        });
        return;
      } else if (this.informant.trim().length == 0) {
        this.informant = "";
        Toast({
          message: "被举报人不能为空",
          position: "middle",
          duration: 1500
        });
        return;
      } else if (this.Company.trim().length == 0) {
        this.Company = "";
        Toast({
          message: "单位不能为空",
          position: "middle",
          duration: 1500
        });
        return;
      } else if (this.postcont.trim().length == 0) {
        this.postcont = "";
        Toast({
          message: "职务不能为空",
          position: "middle",
          duration: 1500
        });
        return;
      } else if (this.value3 == "请选择") {
        Toast({
          message: "级别不能为空",
          position: "middle",
          duration: 1500
        });
        return;
      } else if (this.conttitle.trim().length == 0) {
        Toast({
          message: "标题不能为空",
          position: "middle",
          duration: 1500
        });
        return;
      } else if (this.value4 == "请选择") {
        Toast({
          message: "问题类别不能为空",
          position: "middle",
          duration: 1500
        });
        return;
      } else if (this.value5 == "请选择") {
        Toast({
          message: "问题细类不能为空",
          position: "middle",
          duration: 1500
        });
        return;
      } else if (this.conttext.trim().length == 0) {
        Toast({
          message: "主要内容不能为空",
          position: "middle",
          duration: 1500
        });
        return;
      }
 
      let params = {
        reportName: this.username,
        reportIdcard: this.usernameID,
        reportPhone: this.tell,
        reportAddress:
          this.value1.toString() == "请选择" ? "" : this.value1.toString(),
        reportIdentity:
          this.value2.toString() == "请选择" ? "" : this.value2.toString(),
        beReportName: this.informant,
        beReportUnit: this.Company,
        beReportPosition: this.postcont,
        beReportLevel: this.value3.toString(),
        reportTitle: this.conttitle,
        reportTypeId: this.reportTypeId,
        reportTypeDetailId: this.reportTypeDetailId,
        reportContent: this.conttext
      };
      Indicator.open({
        text: "正在提交中...",
        spinnerType: "fading-circle"
      });
      axios({
        method: "post",
        url: api.theme.api.services.addReportContent,
        data: params,
        headers: { "Content-Type": "application/json; charset=utf-8" }
      }).then(res => {
        let data = res.data;
        if (data.success == true) {
          Indicator.close();
          Toast({
            message: "提交成功",
            position: "middle",
            duration: 1400
          });
          this.apis.iback();
        }
      });
    },
    listtainer(id) {
      axios({
        method: "post",
        url: api.theme.api.services.selectReportTypeDetail,
        data: { typeId: id },
        headers: { "Content-Type": "application/json; charset=utf-8" }
      }).then(res => {
        let data = res.data;
        if (data.success == true) {
          var getlists = ["请选择"];
          for (let i = 0; i < res.data.data.length; i++) {
            getlists.push(res.data.data[i].content);
            this.auto_idlist[res.data.data[i].content] = res.data.data[i].id;
            this.list5 = [getlists];
          }
          this.list5new = data.data;
        }
      });
    },
    getId(content) {
      return this.list4new.find(item => {
        return item.content == content;
      }).id;
    },
    getIds(content) {
      return this.list5new.find(item => {
        return item.content == content;
      }).id;
    },
    onChangelist(val) {
      var cont = val.toString();
      if (cont == "请选择") {
        return;
      } else {
        this.reportTypeDetailId = this.getIds(cont);
      }
    },
    onChange(val) {
      var that = this;
      this.value5 = ["请选择"];

      var cont = val.toString();
      if (cont == "请选择") {
        this.list5 = [[]];
        return;
      } else {
        this.listtainer(this.getId(cont));
        this.reportTypeId = this.getId(cont);
      }
    }
  },
  mounted() {
    this.title = JSON.parse(get_local_cache("dongpovideos")).title;
  },
  created() {
    axios({
      method: "post",
      url: api.theme.api.services.selectReportType,
      headers: { "Content-Type": "application/json; charset=utf-8" }
    }).then(res => {
      let data = res.data;
      if (data.success == true) {
        var list = ["请选择"];
        data.data.map(item => {
          list.push(item.content);
        });
        this.list4 = [list];
        this.list4new = data.data;
      }
    });
  }
};
</script>
<style lang="less" scoped>
.box-titles {

  font-size: 0.36rem;
  margin: 0.4rem 0.3rem 0.3rem 0.3rem;
  color: rgba(26, 26, 26, 1);
  display: flex;
  -webkit-box-align: center;
  -ms-flex-align: center;
  align-items: center;
}
.box-titles .line {
  width: 0.07rem;
  margin-right: 0.12rem;
  height: 0.3rem;
  background: rgba(238, 26, 26, 1);
  border-radius: 3px;
}
.box-titles span {
  color: #ff999999;
  color: #ff999999;
  font-size: 0.3rem;
}
.boxaction {
  width: 92%;
  display: flex;
  align-items: center;
  font-size: 0.32rem;
  margin: 0 auto;
  margin-bottom: 0.11rem;
  border-bottom: 1px solid #ffe6e6e6;
  padding-bottom: 0.11rem;
  justify-content: space-between;
}
.boxaction textarea {
  width: 80%;
  height: 2rem;
  margin-top: 0.6rem;
  border: none;
  border: 1px solid #ffe6e6e6;
}
.boxaction .boxleft {
  margin-right: 0.5rem;
  color: rgba(26, 26, 26, 1);
  width: 24%;
}
.boxaction textarea{ font-family: "微软雅黑"}
.boxaction input {
  width: 68%;
  height: 0.8rem;
  line-height: 0.8rem;
  display: block;
  font-size: 0.3rem;
  text-align: right;
}
.sublimet {
  width: 100%;
  text-align: center;
  padding-bottom: 1.2rem; margin-top: 0.8rem
}
.child-one {
  background: #e32519;
  width: 30%;
  display: inline-block;
  font-size: 0.3rem;
  color: #fff;
  padding: 0.1rem 0.4rem;
  border-radius: 3px;
}
.child-two {
  background: #e32519;
  width: 30%;
  display: inline-block;
  font-size: 0.3rem;
  color: #fff;
  padding: 0.1rem 0.4rem;
  border-radius: 3px;
}
.listboxs {
 height: 100vh;
    overflow: auto;
    -webkit-overflow-scrolling: touch;
  padding-top: 18%;padding-bottom: 0.6rem;
}
.weachboxs {
  width: 100%;
  display: flex;
  align-items: center;
  margin-top: 0.5rem;
  margin-left: 0.3rem;
}
.xztit img {
  height: 0.42rem;
}
.xztitcon img {
  height: 0.4rem;
}
.listall {
  width: 100%;
  overflow: hidden;
}
.listall {
  padding: 0.3rem;
}
.listall p {
  font-size: 0.32rem;
  line-height: 0.6rem;
  margin-top: 0.2rem;
}
.xztit,
.xztitcon {
  height: 0.42rem;
}
select::-ms-expand {
  display: none;
}
select {
  appearance: none;
  -moz-appearance: none;
  -webkit-appearance: none;
  border: none;
  background: none;
}
/deep/.weui-cells:before {
  border-top: none;
}
/deep/.weui-cells:after {
  border-bottom: none;
}
/deep/.weui-cell {
  padding: 0;
}
/deep/.vux-no-group-title {
  margin-top: 0;
}
/deep/.weui-cells {
  margin-top: 0;
}
/deep/.vux-cell-value {
  font-size: 0.3rem;
  color: rgba(153, 153, 153, 1);
}
/deep/.weui-cell_access .weui-cell__ft:after {
  padding-right: 0;
}
/deep/.vux-cell-box {
  padding: 0.12rem 0;
  right: 0;
}
::-webkit-input-placeholder {
  /* WebKit browsers */
  color: rgba(153, 153, 153, 1);
}
.boxright {
  float: right;
}
::-moz-placeholder {
  /* Mozilla Firefox 19+ */
  color: rgba(153, 153, 153, 1);
}

:-ms-input-placeholder {
  /* Internet Explorer 10+ */
  color: rgba(153, 153, 153, 1);
}
</style>

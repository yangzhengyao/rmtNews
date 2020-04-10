  <template>
  <div id="enterprise">
    <header class="com_header headerNavFixed">
      <div class="nvbt iback" @click="apis.iback()"></div>
      <div class="nvtt">企业认证</div>
      <div class="nvbt idoc"></div>
    </header>
    <div class="container contentNavFixed com_contentNavFixed">
      <div class="content">
        <div class="form-wrap">
          <div class="form-top">
            <div class="flexbox">
              <label>运营者名称</label>
              <input type="text" placeholder="请输入运营者名称" />
            </div>
            <div class="flexbox">
              <label>认证信息</label>
              <input type="text" placeholder="请输入认证信息" />
            </div>
            <div class="flexbox">
              <label>手机号码</label>
              <input type="text" placeholder="请输入运营者手机号码" />
            </div>
            <div class="flexbox">
              <label>电子邮箱</label>
              <input type="text" placeholder="请输入运营者电子邮箱" />
            </div>
          </div>
          <div class="upload-img">
            <p>上传企业营业执照</p>
            <div class="flexbox">
              <div class="upload-box">
                <div class="upload-btn">
                  <i class="add-img"></i>
                </div>
                <p>企业营业执照</p>
              </div>
            </div>
          </div>
          <div class="submit-btn">完成</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapGetters, mapMutations, mapActions } from "vuex";
import { Toast } from "mint-ui";
export default {
  name: "enterprise",
  data() {
    return {};
  },
  computed: {
    ...mapGetters("login", [
      "getStorge" // active的栏目
    ])
  },
  mounted() {},
  methods: {}
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
#enterprise {
  .container {
    background: #fff !important;
    font-size: 0.32rem;
    .flexbox {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    .form-wrap {
      .form-top,
      .upload-img {
        padding: 0 0.36rem;
      }
      line-height: 1rem;
      label {
        padding-right: 0.3rem;
        min-width: 2rem;
      }
      input {
        flex: 2;
        line-height: 1rem;
      }
      .form-top {
        border-bottom: 0.14rem solid #f6f6f6;
      }
    }
    .upload-img {
      .upload-box {
        background: #f6f6f6;
        border-radius: 4px;
        flex: 1;
        height: 3.2rem;
        text-align: center;
        color: #909090;
        // &:first-child {
        //   margin-right: 0.36rem;
        // }
      }
      .upload-btn {
        padding: 0.3rem;
        border-radius: 50%;
        background: #fff;
        display: inline-block;
        vertical-align: middle;
        margin-top: 0.9rem;
        box-shadow: 0 0 0.05rem rgba(0, 0, 0, 0.2);
        .add-img {
          display: block;
          width: 0.4rem;
          height: 0.4rem;
          background: @moreBtnBg;
        }
      }
    }
    .submit-btn {
      margin: 0 0.36rem;
      margin-top: 0.4rem;
      border-radius: 4px;
      background: @dominantColor;
      color: #fff;
      text-align: center;
      line-height: 0;
      padding: 0.46rem 0;
    }
  }
  input::-webkit-input-placeholder {
    color: #9f9f9f;
    font-size: 0.32rem;
  }
  .icon-arrow-right {
    display: table-cell;
    vertical-align: middle;
    width: 0.48rem;
    height: 0.32rem;
    background: url("~@/assets/img/back_right.png") no-repeat center center;
    background-size: cover;
  }
}
</style>

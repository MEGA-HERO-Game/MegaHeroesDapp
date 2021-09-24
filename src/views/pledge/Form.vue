<template>
  <div class="pledgeForm-page">
    <div class="box">
      <img class="cardImg" src="@/assets/common/card.png">
      <div class="content">
        <div class="mh-flex mh-vertical-center mh-align-between">
          <div class="name">钻石卡（500钻石）</div>
          <div class="name">余额：23</div>
        </div>
        <div class="formCon">
          <van-field class="mh_input" v-model="password" />
          <div class="max mh-center">最大值</div>
        </div>
      </div>
      <div class="foot_btn text-center">
        质押
      </div>
      <div class="footText">☆质押钻石卡的数量须为整数，最低质押数量为1。</div>
    </div>
    <LoadingModal ref="LoadingModal" />
    <TipModal ref="TipModal" />
  </div>
</template>

<script>
import LoadingModal from "@/components/Loading";
import TipModal from "@/components/TipModal";
import { mapGetters } from "vuex";
import { diamondsOption, diamondsPrice, receivedOption } from "@/utils/status";
export default {
  name: "PledgeForm",
  components: { LoadingModal, TipModal },
  computed: {
    ...mapGetters(["accountInfo", "account", "web3"])
  },
  data() {
    return {};
  },
  watch: {
    accountInfo: {
      handler: function(val, oldVal) {
        if (
          this.accountInfo &&
          this.accountInfo.userId &&
          this.accountInfo.token
        ) {
          //   this.getDraw();
        }
      },
      deep: true,
      immediate: true
    }
  },
  created() {},
  mounted() {},
  methods: {}
};
</script>
<style lang="scss" scoped>
.pledgeForm-page {
  background-color: #c5ac84;
  padding: 62px 32px;
  .box {
    padding-top: 182px;
    background: linear-gradient(180deg, #f8cb8e 0%, #e1b687 100%);
    box-shadow: 0px 6px 12px rgba(0, 0, 0, 0.16);
    border-radius: 20px;
    .cardImg {
      width: 148px;
      margin: 0 auto;
      margin-bottom: 58px;
    }
    .content {
      padding: 0 40px;
      .formCon {
        margin-top: 16px;
        position: relative;
        .mh_input {
          background: rgba(86, 65, 46, 0.45);
          border-radius: 8px;
          padding: 0 40px;
          line-height: 76px;
          width: auto;
          height: 76px;
          &::after {
            border: 0;
          }
        }
        .max {
          position: absolute;
          top: 6px;
          right: 6px;
          width: 164px;
          height: 64px;
          background: linear-gradient(360deg, #e2a358 0%, #fef1ae 100%);
          box-shadow: 0px 6px 12px rgba(0, 0, 0, 0.16);
          border-radius: 8px;
          color: #fff;
        }
      }
    }
    .foot_btn {
      width: 392px;
      height: 146px;
      margin: 0 auto;
      background-image: url("../../assets/profile/foot_btn_bg.png");
      background-repeat: no-repeat;
      background-size: 100% 100%;
      padding-top: 30px;
      font-size: 44px;
      font-family: PingFang SC;
      font-weight: bold;
      color: #ffffff;
      text-shadow: 0px 1px 3px rgba(0, 0, 0, 0.16);
      margin-top: 100px;
    }
    .footText{
      font-size: 28px;
      font-family: Alibaba PuHuiTi;
      font-weight: 400;
      color: #5E2F2F;
      padding: 244px 28px 100px 28px;
    }
  }
}
</style>

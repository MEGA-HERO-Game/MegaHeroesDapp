<template>
  <div class="pledgeForm-page">
    <div class="box">
      <img class="cardImg" src="@/assets/common/card.png">
      <div class="content">
        <div class="mh-flex mh-vertical-center mh-align-between">
          <div class="name">钻石卡（500钻石）</div>
          <div class="name">余额：{{nftbalance}}</div>
        </div>
        <div class="formCon">
          <van-field class="mh_input" v-model="amount" type="digit" />
          <div class="max mh-center" @click="amount = nftbalance">最大值</div>
        </div>
      </div>
      <div class="foot_btn text-center" @click="pledge">
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
import { DiamondNFTContract } from "@/xworldjs/diamond_NFT";
import { getConfig, getUsdtPrice } from "@/config";
import { Toast } from "vant";
export default {
  name: "PledgeForm",
  components: { LoadingModal, TipModal },
  computed: {
    ...mapGetters(["accountInfo", "account", "web3"])
  },
  data() {
    return {
      amount: null,
      config: getConfig(),
      diamondNFTContract: new DiamondNFTContract(),
      tokenid: 500, //写死 id  目前就一档
      nftbalance: 0 //获取用户钻石卡余额
    };
  },
  watch: {
    accountInfo: {
      handler: function(val, oldVal) {
        if (
          this.accountInfo &&
          this.accountInfo.userId &&
          this.accountInfo.token
        ) {
          this.initData();
        }
      },
      deep: true,
      immediate: true
    }
  },
  created() {},
  mounted() {},
  methods: {
    async initData() {
      await this.diamondNFTContract.init(
        this.web3.currentProvider,
        this.config.diamondcard
      );
      this.getData();
    },
    async getData() {
      // 获取用户钻石卡余额
      this.diamondNFTContract
        .balanceOf(this.account, this.tokenid)
        .then(res => {
          this.nftbalance = res;
          console.log("nftbalance", this.nftbalance);
        });
    },
    pledge() {
      if (!this.amount || this.amount == 0) {
        Toast("请输入质押数量");
        return;
      }
      if (this.amount > this.nftbalance) {
        Toast("质押数量不能大于余额");
        return;
      }
      this.$refs["LoadingModal"].initData();
      this.diamondNFTContract
        .safeTransferFrom(
          this.account,
          this.config.diamondcardpool,
          this.tokenid,
          this.amount
        )
        .then(data => {
          // success
          this.$refs["LoadingModal"].close();
          this.$refs["TipModal"].initData("质押成功");
          this.getData();
        })
        .catch(error => {
          // Failure
          this.$refs["LoadingModal"].close();
          this.$refs["TipModal"].initData("交易失败");
        });
    }
  }
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
    .footText {
      font-size: 28px;
      font-family: Alibaba PuHuiTi;
      font-weight: 400;
      color: #5e2f2f;
      padding: 244px 28px 100px 28px;
    }
  }
}
</style>

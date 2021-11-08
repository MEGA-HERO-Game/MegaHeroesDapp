<template>
  <div class="knapsackDeposit">
    <div class="box mh-flex mh-vertical-center">
      <div class="imgCon">
        <img src="@/assets/knapsack/img_2.png" alt="" />
      </div>
      <div class="info mh-flex-1">
        <div class="name mh-flex mh-vertical-center" @click="chooseList">
          <span>Luna</span>
          <img src="@/assets/common/bottom_allow.png" alt="" />
        </div>
        <div class="num">数量1</div>
      </div>
      <div class="intro">钱包资产</div>
    </div>
    <div class="downCon">
      <img src="@/assets/diamonds/down_icon.png" alt="" />
    </div>
    <div class="box mh-flex mh-vertical-center">
      <div class="imgCon">
        <img src="@/assets/knapsack/img_2.png" alt="" />
      </div>
      <div class="info mh-flex-1">
        <div class="name mh-flex mh-vertical-center">
          <span>Luna</span>
        </div>
        <div class="num">数量1</div>
      </div>
      <div class="intro">存入Mega Hero</div>
    </div>
    <div class="tip">
      手续费：<span>{{ depositRateGratuity }}（限时优惠）</span>
    </div>
    <div class="foot_btn text-center" @click="submit">立即存入</div>
    <!--  -->
    <SelectAsset ref="SelectAsset" />
    <LoadingModal ref="LoadingModal" />
    <TipModal ref="TipModal" />
  </div>
</template>

<script>
import LoadingModal from "@/components/Loading";
import TipModal from "@/components/TipModal";
import SelectAsset from "@/components/SelectAsset";
import { mapGetters } from "vuex";
import { getXWorldService } from "@/xworldjs/xworldjs";
export default {
  name: "KnapsackDeposit",
  components: { LoadingModal, TipModal, SelectAsset },
  computed: {
    ...mapGetters(["signatureInfo", "account", "web3", "depositRateGratuity"]),
  },
  data() {
    return {
      tokenId: 207000000001,
    };
  },
  created() {},
  mounted() {},
  watch: {
    signatureInfo: {
      handler: function (val, oldVal) {
        if (this.signatureInfo.nonce) {
          this.$store.dispatch("user/getDepositRate");
        }
      },
      deep: true,
      immediate: true,
    },
  },
  methods: {
    chooseList() {
      this.$refs["SelectAsset"].initData();
    },
    submit() {
      this.$refs["LoadingModal"].initData();
      getXWorldService()
        .mpNFTContract.burn(this.account, this.tokenId)
        .then((data) => {
          // success
          this.$refs["LoadingModal"].close();
          this.$refs["TipModal"].initData("存入成功");
        })
        .catch((error) => {
          // Failure
          this.$refs["LoadingModal"].close();
          this.$refs["TipModal"].initData("交易失败");
        });
    },
  },
};
</script>
<style lang="scss" scoped>
.knapsackDeposit {
  background-color: #c5ac84;
  padding: 60px 32px;
  .box {
    background: linear-gradient(180deg, #f8cb8e 0%, #e1b687 100%);
    box-shadow: 0px 6px 12px rgba(0, 0, 0, 0.16);
    border-radius: 20px;
    padding: 36px 44px 38px 30px;
    .imgCon {
      width: 112px;
      height: 114px;
      margin-right: 16px;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .info {
      .name {
        font-size: 36px;
        font-family: Microsoft YaHei;
        font-weight: 400;
        color: #943e01;
        img {
          width: 32px;
          height: 22px;
          margin-left: 20px;
        }
      }
      .num {
        font-size: 28px;
        font-family: Alibaba PuHuiTi;
        font-weight: 400;
        color: #5e2f2f;
        margin-top: 22px;
      }
    }
    .intro {
      font-size: 28px;
      font-family: Alibaba PuHuiTi;
      font-weight: 400;
      color: #5e2f2f;
    }
  }
  .downCon {
    width: 78px;
    height: 54px;
    margin: 36px auto;
    img {
      width: 100%;
    }
  }
  .tip {
    font-size: 30px;
    font-family: PingFang SC;
    font-weight: bold;
    color: #56412e;
    margin-top: 40px;
    span {
      color: #d60019;
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
    margin-top: 80px;
  }
}
</style>

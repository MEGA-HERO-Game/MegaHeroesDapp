<template>
  <div class="deposit-page">
    <div class="box">
      <div class="title">从Mega Hero游戏</div>
      <div class="mh-flex">
        <div class="imgCon">
          <img src="@/assets/diamonds/diamonds_icon.png" alt="">
        </div>
        <div class="mh-flex-1 mh-flex mh-vertical-column mh-align-between">
          <div class="mh-flex mh-align-between">
            <div class="name">钻石</div>
            <div class="transferout mh-flex mh-vertical-center name" @click="show = !show">
              转出数量{{amount}}
              <div class="triangle"></div>
              <div class="select-list" v-if="show">
                <div class="select-item" :class="{active: amount == 2000}" @click="getNum(2000)">2000</div>
                <div class="select-item" :class="{active: amount == 4000}" @click="getNum(4000)">4000</div>
                <div class="select-item" :class="{active: amount == 20000}" @click="getNum(20000)">20000</div>
                <div class="select-item" :class="{active: amount == 40000}" @click="getNum(40000)">40000</div>
              </div>
            </div>
          </div>
          <div class="subname text-right">游戏内余额：{{gamecoin}}</div>
        </div>
      </div>
    </div>
    <div class="downCon">
      <img src="@/assets/diamonds/down_icon.png" alt="">
    </div>
    <div class="box">
      <div class="title">提取到钱包</div>
      <div class="mh-flex">
        <div class="imgCon">
          <img src="@/assets/common/card.png" alt="">
        </div>
        <div class="mh-flex-1 mh-flex mh-vertical-column mh-align-between">
          <div class="mh-flex mh-align-between">
            <div class="name">钻石卡</div>
            <div class="name">
              收到数量
            </div>
          </div>
          <div class="subname text-right mh-flex mh-align-between">
            <div>价值500钻石</div>
            <div>钱包余额：{{nftbalance}}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="tip">手续费：<span>0（限时优惠）</span></div>
    <div class="foot_btn text-center">立即提取</div>
    <LoadingModal ref="LoadingModal" />
    <TipModal ref="TipModal" />
  </div>
</template>

<script>
import LoadingModal from "@/components/Loading";
import TipModal from "@/components/TipModal";
import { mapGetters } from "vuex";
import { diamondsOption, diamondsPrice, receivedOption } from "@/utils/status";
import { getConfig } from "@/config";
import { getXWorldService } from "@/xworldjs/xworldjs";
export default {
  name: "diamondsDeposit",
  components: { LoadingModal, TipModal },
  computed: {
    ...mapGetters(["account", "web3", "signatureInfo", "gamecoin"])
  },
  data() {
    return {
      show: false,
      tokenid: 500, //写死 id
      amount: 20000,
      nftbalance: 0 //获取用户钻石卡余额
    };
  },
  watch: {
    account: {
      handler: function(val, oldVal) {
        if (this.account) {
          this.getData();
        }
      },
      deep: true,
      immediate: true
    },
    signatureInfo: {
      handler: function(val, oldVal) {
        if (this.signatureInfo.nonce) {
          this.$store.dispatch("user/getGameCoin");
        }
      },
      deep: true,
      immediate: true
    }
  },
  created() {},
  mounted() {},
  methods: {
    getData() {
      getXWorldService()
        .diamondNFTContract.balanceOf(this.account, this.tokenid)
        .then(res => {
          this.nftbalance = res.toNumber();
          console.log("nftbalance", this.nftbalance);
        });
    },
    getNum(val) {
      this.amount = val;
    }
  }
};
</script>
<style lang="scss" scoped>
.deposit-page {
  background-color: #c5ac84;
  padding: 60px 32px;
  .box {
    background: linear-gradient(180deg, #f8cb8e 0%, #e1b687 100%);
    box-shadow: 0px 6px 12px rgba(0, 0, 0, 0.16);
    border-radius: 20px;
    padding: 30px 44px 34px 22px;
    .title {
      font-size: 30px;
      font-family: PingFang SC;
      font-weight: bold;
      color: #56412e;
      margin-bottom: 12px;
    }
    .imgCon {
      width: 108px;
      height: 108px;
      margin-right: 28px;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .name {
      font-size: 36px;
      font-family: Microsoft YaHei;
      font-weight: 400;
      color: #943e01;
    }
    .subname {
      font-size: 28px;
      font-family: Alibaba PuHuiTi;
      font-weight: 400;
      color: #5e2f2f;
    }
    .transferout {
      position: relative;
      .triangle {
        width: 0;
        height: 0;
        border-left: 16px solid transparent;
        border-right: 16px solid transparent;
        border-top: 22px solid #5e2f2f;
        margin-left: 12px;
      }
    }
    .select-list {
      width: 320px;
      background-color: #ffe5c3;
      box-shadow: 0px 6px 12px rgba(0, 0, 0, 0.16);
      border-radius: 12px;
      position: absolute;
      top: 52px;
      right: -42px;
      .select-item {
        font-size: 28px;
        font-family: Alibaba PuHuiTi;
        font-weight: 400;
        color: #5e2f2f;
        padding: 22px 0;
        text-align: center;
        border-bottom: 1px solid rgba(213, 145, 61, 0.4);
      }
      .active {
        background-color: rgba(213, 145, 61, 0.3);
      }
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
    margin-top: 38px;
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
    margin-top: 82px;
  }
}
</style>

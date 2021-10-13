<template>
  <div class="extract-page">
    <div class="box">
      <div class="title">从钱包</div>
      <div class="mh-flex">
        <div class="imgCon">
          <img src="@/assets/common/card.png" alt="">
        </div>
        <div class="mh-flex-1 mh-flex mh-vertical-column mh-align-between">
          <div class="mh-flex mh-align-between">
            <div class="name">钻石卡</div>
            <div class="transferout mh-flex mh-vertical-center name" @click="show = !show">
              转出数量{{amount}}
              <div class="triangle"></div>
              <div class="select-list" v-if="show">
                <div class="select-item" :class="{active: amount == 4}" @click="getNum(4)">4</div>
                <div class="select-item" :class="{active: amount == 8}" @click="getNum(8)">8</div>
                <div class="select-item" :class="{active: amount == 40}" @click="getNum(40)">40</div>
                <div class="select-item" :class="{active: amount == 80}" @click="getNum(80)">80</div>
              </div>
            </div>
          </div>
          <div class="subname text-right mh-flex mh-align-between">
            <div>价值500钻石</div>
            <div>钱包余额：10</div>
          </div>
        </div>
      </div>
    </div>
    <div class="downCon">
      <img src="@/assets/diamonds/down_icon.png" alt="">
    </div>
    <div class="box">
      <div class="title">存入Mage Hero游戏</div>
      <div class="mh-flex">
        <div class="imgCon">
          <img src="@/assets/diamonds/diamonds_icon.png" alt="">
        </div>
        <div class="mh-flex-1 mh-flex mh-vertical-column mh-align-between">
          <div class="mh-flex mh-align-between">
            <div class="name">钻石</div>
            <div class="name">
              收到数量
            </div>
          </div>
          <div class="subname text-right">游戏内余额：2563</div>
        </div>
      </div>
    </div>
    <div class="tip">手续费：<span>0（限时优惠）</span></div>
    <div class="foot_btn text-center" @click="depositFun">立即存入</div>
    <div class="note">请注意：必须使用注册的账号和密码登录游戏客户端，并且创建角色，存入钻石卡，
      <span @click="handleRule">请查看规则</span>
    </div>
    <Rule ref="Rule"></Rule>
    <LoadingModal ref="LoadingModal" />
    <TipModal ref="TipModal" />
  </div>
</template>

<script>
import LoadingModal from "@/components/Loading";
import TipModal from "@/components/TipModal";
import Rule from "@/components/Rule";
import { mapGetters } from "vuex";
import { diamondsOption, diamondsPrice, receivedOption } from "@/utils/status";
import { getConfig, getUsdtPrice } from "@/config";
import { getXWorldService } from "@/xworldjs/xworldjs";
export default {
  name: "diamondsExtract",
  components: { LoadingModal, TipModal, Rule },
  computed: {
    ...mapGetters(["accountInfo", "account", "web3"])
  },
  data() {
    return {
      show: false,
      tokenid: 500, //写死 id
      amount: 40
    };
  },
  created() {},
  mounted() {},
  methods: {
    getNum(val) {
      this.amount = val;
    },
    handleRule() {
      this.$refs["Rule"].init();
    },
    depositFun() {
      this.$refs["LoadingModal"].initData();
      getXWorldService()
        .diamondNFTContract.burn(
          this.account,
          this.tokenid,
          this.amount
        )
        .then(data => {
          // success
          this.$refs["LoadingModal"].close();
          this.$refs["TipModal"].initData("存入成功");
        })
        .catch(error => {
          console.log(error);
          // Failure
          this.$refs["LoadingModal"].close();
          this.$refs["TipModal"].initData("交易失败");
        });
    }
  }
};
</script>
<style lang="scss" scoped>
.extract-page {
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
  .note {
    margin-top: 64px;
    font-size: 28px;
    font-family: Alibaba PuHuiTi;
    font-weight: 400;
    color: #5e2f2f;
    span {
      color: #ff0000;
    }
  }
}
</style>

<template>
  <div class="purchase-page">
    <div class="box">
      <div class="header mh-flex mh-align-between">
        <div>钱包余额：{{myUSDT}}USDT</div>
        <div>游戏内余额：{{gamecoin}}钻石</div>
        <!-- <div v-for="(item, index) in nftList" :key="index" v-if="item.id==amount">游戏内余额：{{item.amount}}钻石</div> -->
      </div>
      <div class="section mh-flex mh-center">
        <div class="usdt mh-center">
          <img class="usdtImg" src="@/assets/common/usdt.png" alt="">
          USDT
        </div>
        <img class="right" src="@/assets/game/right.png" alt="">
        <div class="usdt mh-center">
          <img src="@/assets/common/diamonds.png" alt="">
          钻石
        </div>
      </div>

      <div class="num-con mh-flex">
        <div class="transferout mh-flex mh-vertical-center mh-flex-1" @click="show = !show">
          转出数量{{amount}}
          <div class="triangle"></div>
          <div class="select-list" v-if="show">
            <div class="select-item" :class="{active: amount == 50}" @click="getUsdt(50)">50USDT</div>
            <div class="select-item" :class="{active: amount == 100}" @click="getUsdt(100)">100USDT</div>
            <div class="select-item" :class="{active: amount == 500}" @click="getUsdt(500)">500USDT</div>
            <div class="select-item" :class="{active: amount == 1000}" @click="getUsdt(1000)">1000USDT</div>
          </div>
        </div>
        <div class="received mh-flex-1">
          收到数量 {{mp}}
        </div>
      </div>

      <div class="text">
        汇率  1钻石={{diamondsPrice}}USDT
        <span>（限时五折优惠）</span>
      </div>
      <div class="text">
        手续费：
        <span>0</span>
        （限时优惠）
      </div>
      <div v-if="status == 4" class="foot_btn text-center" @click="buyMP(mp, amount)">立即购买</div>
      <div v-else class="foot_btn foot_btn_disabled text-center">立即购买</div>
      <div class="foot-tip">
        请注意：须使用注册的账号和密码登录游戏客户端，并且创建角色，才能购买钻石
        <span @click="handleRule">请查看规则</span>
      </div>
    </div>
    <LoadingModal ref="LoadingModal" />
    <TipModal ref="TipModal" />
    <Rule ref="Rule"></Rule>
  </div>
</template>

<script>
import LoadingModal from "@/components/Loading";
import TipModal from "@/components/TipModal";
import Rule from "@/components/Rule";
import { mapGetters } from "vuex";
import { getConfig, getUsdtPrice } from "@/config";
import { purchaseInterfaceApi, userGameApi } from "@/api/user";
import { diamondsPrice } from "@/utils/status";
import { getXWorldService } from "@/xworldjs/xworldjs";
export default {
  name: "Purchase",
  components: { LoadingModal, TipModal, Rule },
  computed: {
    ...mapGetters(["account", "web3", "signatureInfo", "gamecoin"])
  },
  data() {
    return {
      show: false,
      amount: 100,
      mp: 4000,
      config: getConfig(),
      mpTimer: null,
      mpTimeOut: 0,
      myUSDT: 0,
      diamondsPrice,
      status: null //0  2  3  4
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
    }
  },
  created() {},
  mounted() {},
  methods: {
    getData() {
      this.getDraw();
      this.balanceOfUsdt(this.account).then(res => {
        this.myUSDT = res;
      });
      this.$store.dispatch("user/getGameCenter", {
        cmd: "getGameCoin",
        data: {
          nonce: this.signatureInfo.nonce
        }
      });
    },
    getUsdt(val) {
      this.amount = val;
      this.mp = this.amount / this.diamondsPrice;
    },
    // buyMP(40,1);//1mp=0.025usdt
    async buyMP(mp, amount) {
      let that = this;
      this.$refs["LoadingModal"].initData();
      let myUSDT = await this.balanceOfUsdt(this.account);
      console.log("===myUSDT=====", myUSDT, amount);

      if (myUSDT < amount) {
        this.$refs["LoadingModal"].close();
        console.error("额度不足");
        that.$refs["TipModal"].initData("额度不足");
        return;
      }
      const usdt = await getXWorldService().usdtContract.allowance(
        that.account,
        that.config.shop
      );
      console.log("===usdt=====", usdt);
      if (usdt < amount) {
        //授权
        await that.approveUsdt(myUSDT);
      }
      // const r = createPurchaseMPRequest(mp, amount);
      purchaseInterfaceApi({
        cmd: "CREATE_PURCHASE_MP_ORDER",
        requestUserId: that.account,
        token: that.account,
        requestTime: new Date().valueOf(),
        mp: mp,
        amount: amount
      }).then(data => {
        if (data.code === 1) {
          console.log("充值成功");

          that.mpTimer = setInterval(() => {
            that.MPShopRequestId(data.requestId, amount);
          }, 2000);
        } else {
          that.$refs["LoadingModal"].close();
          console.error(data.code, ":", data.errorMessage);
          that.$refs["TipModal"].initData(data.errorMessage);
        }
      });
    },
    async balanceOfUsdt(user) {
      return getXWorldService().usdtContract.balanceOfUsdt(user);
    },
    async approveUsdt(price) {
      let that = this;
      const config = getConfig();

      console.log("approveUsdt:::", {
        to: config.shop,
        amount: getUsdtPrice(price)
      });

      return await getXWorldService().usdtContract.approve(
        getUsdtPrice(price),
        config.shop,
        that.account
      );
      // return await this.usdtContract.approveUsdt(price, config.operator, account)
    },
    async MPShopRequestId(rId, amount) {
      let that = this;
      try {
        const data = await that.goBuyMP(rId, amount, err => {
          console.log("error:::123:", err);
        });
        console.log("data---------", data);
        console.log("充值成功");
        that.$refs["LoadingModal"].close();
        that.$refs["TipModal"].initData("钻石已存入游戏！请进入游戏查看");
      } catch (err) {
        let message = "";
        if (err.code === 4001) {
          //TODO 用户取消
          message = "用户取消交易！";
        } else {
          message = "交易失败：交易id：" + err.hash;
        }
        console.error("buyMP error::::", message);
        that.$refs["LoadingModal"].close();
        that.$refs["TipModal"].initData(message);
      }
    },
    /***
     *
     * @param token
     * @param address
     * @param index
     * @param amount
     * @param price
     * @returns {Promise<void>}
     *
     */
    async goBuyMP(requestId, price, callback) {
      let that = this;
      console.log("buyMP:::::", getUsdtPrice(price));
      await getXWorldService().operatorProxyContract.recharge(
        requestId,
        0,
        "0x0000000000000000000000000000000000000000000000000000000000000000",
        "0x0000000000000000000000000000000000000000000000000000000000000000",
        "0x0000000000000000000000000000000000000000",
        0,
        this.account
      );
    },
    getDraw() {
      userGameApi(
        {
          userId: this.account
        },
        "getStatus"
      )
        .then(response => {
          if (response.code == 0) {
            this.status = response.data.gameStatus;
          } else {
            this.$toast(response.message);
          }
        })
        .catch(error => {});
    },
    handleRule() {
      this.$refs["Rule"].init();
    }
  }
};
</script>
<style lang="scss" scoped>
.purchase-page {
  background-color: #c5ac84;
  padding: 60px 32px;
  .box {
    background: linear-gradient(180deg, #f0cea0 0%, #efcca7 100%);
    box-shadow: 0px 6px 12px rgba(0, 0, 0, 0.16);
    border-radius: 20px;
    padding: 40px 30px;
    .header {
      font-size: 20px;
      font-family: Alibaba PuHuiTi;
      font-weight: 400;
      color: #5e2f2f;
      margin-bottom: 20px;
    }
    .section {
      margin-bottom: 46px;
      .usdt {
        font-size: 36px;
        font-family: Alibaba PuHuiTi;
        font-weight: bold;
        color: #ffffff;
        -webkit-text-stroke: 0.800000011920929px #5e2f2f;
        img {
          width: 48px;
          margin-right: 16px;
        }
        .usdtImg {
          width: 69px;
        }
      }
      .right {
        width: 54px;
        height: 78px;
        margin-left: 84px;
        margin-right: 104px;
      }
    }
    .num-con {
      font-size: 28px;
      font-family: Alibaba PuHuiTi;
      font-weight: 400;
      color: #5e2f2f;
      padding-bottom: 32px;
      border-bottom: 1px solid #d2a166;
      margin-bottom: 30px;
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

      .received {
        margin-left: 88px;
      }
    }
    .select-list {
      width: 320px;
      background-color: #ffe5c3;
      box-shadow: 0px 6px 12px rgba(0, 0, 0, 0.16);
      border-radius: 12px;
      position: absolute;
      top: 52px;
      left: 0;
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
    .text {
      font-size: 30px;
      font-family: PingFang SC;
      font-weight: bold;
      color: #56412e;
      margin-bottom: 12px;
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
      margin-top: 166px;
    }
    .foot_btn_disabled {
      background-image: url("../../assets/game/ios_bg.png");
    }
    .foot-tip {
      margin: 0 auto;
      margin-top: 126px;
      width: 552px;
      font-size: 24px;
      font-family: PingFang SC;
      font-weight: bold;
      color: #56412e;
      text-align: center;
      margin-bottom: 10px;
      span {
        font-size: 36px;
        font-family: PingFang SC;
        font-weight: bold;
        color: #d60019;
        text-decoration: underline;
      }
    }
  }
}
</style>

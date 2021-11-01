<template>
  <div class="purchase-page">
    <div class="box">
      <div class="header mh-flex mh-align-between">
        <div>钱包余额：{{myUSDT}}USDT</div>
        <div v-for="(item, index) in nftList" :key="index" v-if="item.id==amount">游戏内余额：{{item.amount}}钻石</div>
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
import { OperatorProxyContract} from "@/xworldjs/operator_proxy";
import { UsdtContract } from "@/xworldjs/usdt";
import { MPNFTContract } from "@/xworldjs/mp_nft";
import { mapGetters } from "vuex";
import { getConfig, getUsdtPrice } from "@/config";
import { purchaseInterfaceApi, drawInterfaceApi } from "@/api/user";
import { diamondsPrice } from "@/utils/status";
export default {
  name: "Purchase",
  components: { LoadingModal, TipModal, Rule },
  computed: {
    ...mapGetters(["accountInfo", "account", "web3"])
  },
  data() {
    return {
      show: false,
      amount: 100,
      mp: 4000,
      mpShopContract: new MPShopContract(),
      usdtContract: new UsdtContract(),
      mpNFTContract: new MPNFTContract(),
      config: getConfig(),
      mpTimer: null,
      mpTimeOut: 0,
      myUSDT: 0,
      diamondsPrice,
      status: null, //0  2  3  4
      nftList: [
        { id: 50, amount: 0 },
        { id: 100, amount: 0 },
        { id: 500, amount: 0 },
        { id: 1000, amount: 0 }
      ]
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
          this.getDraw();
          this.usdtContract
            .init(this.web3.currentProvider, this.config.usdt)
            .then(() => {
              this.balanceOfUsdt(this.accountInfo.userId).then(res => {
                this.myUSDT = res;
              });
            });
          this.mpNFTContract
            .init(this.web3.currentProvider, this.config.nft)
            .then(() => {
              this.getNFTs();
            });
        }
      },
      deep: true,
      immediate: true
    }
  },
  created() {},
  mounted() {},
  methods: {
    getUsdt(val) {
      this.amount = val;
      this.mp = this.amount / this.diamondsPrice;
    },
    // buyMP(40,1);//1mp=0.025usdt
    async buyMP(mp, amount) {
      let that = this;
      let userInfo = this.accountInfo;
      this.$refs["LoadingModal"].initData();
      let myUSDT = await this.balanceOfUsdt(userInfo.userId);
      console.log("===myUSDT=====", myUSDT, amount);

      if (myUSDT < amount) {
        this.$refs["LoadingModal"].close();
        console.error("额度不足");
        that.$refs["TipModal"].initData("额度不足");
        return;
      }
      const usdt = await this.usdtContract.allowance(
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
        requestUserId: that.accountInfo.userId,
        token: that.accountInfo.token,
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
      return this.mpShopContract.balanceOfUsdt(user);
    },
    async approveUsdt(price) {
      let that = this;
      const config = getConfig();

      console.log("approveUsdt:::", {
        to: config.shop,
        amount: getUsdtPrice(price)
      });

      return await this.usdtContract.approve(
        getUsdtPrice(price),
        config.shop,
        that.account
      );
      // return await this.usdtContract.approveUsdt(price, config.operator, account)
    },
    async MPShopRequestId(rId, amount) {
      let that = this;
      that.mpTimeOut += 1;
      const result = await that.getOrderStatus(rId);
      if (result === 1) {
        that.mpTimer = clearInterval(that.mpTimer);
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
      } else if (result === 2) {
        console.log("该订单已支付");
        that.$refs["LoadingModal"].close();
        that.$refs["TipModal"].initData("该订单已支付");
      } else {
        if (that.mpTimeOut > 60) {
          that.mpTimer = clearInterval(that.mpTimer);
          console.error("支付超时，请重新发起支付!");
          that.$refs["LoadingModal"].close();
          that.$refs["TipModal"].initData("支付超时，请重新发起支付!");
        }
      }
    },
    /***
     * 获取订单状态，1为待支付，2为支付完成
     * @param requestId
     * @returns {Promise<*>}
     */
    async getOrderStatus(requestId) {
      // const id = Web3.utils.toBN(requestId);
      // console.log('requestId:::::', id.toNumber())
      const result = await this.mpShopContract.getOrderStatus(requestId);
      return result;
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
      await this.mpShopContract.buyMP(
        requestId,
        getUsdtPrice(price),
        that.account,
        callback
      );
    },
    getDraw() {
      drawInterfaceApi({
        cmd: "GET_GAME_DRAW_STATUS",
        requestUserId: this.accountInfo.userId,
        token: this.accountInfo.token,
        requestTime: new Date().valueOf()
      })
        .then(response => {
          if (response.code == 1) {
            this.status = response.status;
          } else {
            Toast(response.errorMessage);
          }
        })
        .catch(error => {});
    },
    handleRule() {
      this.$refs["Rule"].init();
    },
    getNFTs() {
      this.mpNFTContract.getNFTs(this.account).then(res => {
        console.log("res", res);
        if (res && res.length) {
          this.nftList = res;
        }
      });
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

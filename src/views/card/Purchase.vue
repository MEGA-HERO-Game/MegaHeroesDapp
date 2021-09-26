<template>
  <div class="purchase-page">
    <div class="box">
      <div class="header mh-flex mh-align-between">
        <div>钱包余额：{{myUSDT}}USDT</div>
        <!-- <div>游戏内余额：2365钻石</div> -->
      </div>
      <div class="section mh-flex mh-center">
        <div class="usdt mh-center">
          <img class="usdtImg" src="@/assets/common/usdt.png" alt="">
          USDT
        </div>
        <img class="right" src="@/assets/game/right.png" alt="">
        <div class="usdt mh-center text-center">
          <img src="@/assets/common/card.png" alt="">
          {{cardInfo.name}}<br>
          （{{cardInfo.val}}）
          <!-- <img class="bottom_icon" src="@/assets/common/bottom_icon.png" alt=""> -->
        </div>
      </div>

      <div class="num-con mh-flex">
        <div class="transferout mh-flex mh-vertical-center mh-flex-1" @click="show = !show">
          转出数量{{amountPrice}}
          <!-- <div class="triangle"></div>
          <div class="select-list" v-if="show">
            <div class="select-item" :class="{active: amount == 50}" @click="getUsdt(50)">50USDT</div>
            <div class="select-item" :class="{active: amount == 100}" @click="getUsdt(100)">100USDT</div>
            <div class="select-item" :class="{active: amount == 500}" @click="getUsdt(500)">500USDT</div>
            <div class="select-item" :class="{active: amount == 1000}" @click="getUsdt(1000)">1000USDT</div>
          </div> -->
        </div>
        <div class="transferout received mh-flex mh-vertical-center mh-flex-1" @click="receivedShow = !receivedShow">
          收到数量{{amount}}
          <div class="triangle"></div>
          <div class="select-list num-list" v-if="receivedShow">
            <div class="select-item" :class="{active: amount == item.val}" @click="getNum(item.val)" v-for="(item, index) in receivedOption" :key="index">{{item.name}}</div>
          </div>
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
      <div class="foot_btn text-center" @click="buyNft">立即购买</div>
    </div>
    <LoadingModal ref="LoadingModal" />
    <TipModal ref="TipModal" />
    <CardModal ref="CardModal" @getCard="getCard" />
  </div>
</template>

<script>
import LoadingModal from "@/components/Loading";
import TipModal from "@/components/TipModal";
import CardModal from "@/components/CardModal";
import { mapGetters } from "vuex";
import { diamondsOption, diamondsPrice, receivedOption } from "@/utils/status";
import { DiamondNFTContract } from "@/xworldjs/diamond_NFT";
import { UsdtContract } from "@/xworldjs/usdt";
import { getConfig, getUsdtPrice } from "@/config";
export default {
  name: "CardPurchase",
  components: { LoadingModal, TipModal, CardModal },
  computed: {
    ...mapGetters(["accountInfo", "account", "web3"]),
    amountPrice() {
      return this.amount * diamondsPrice * this.cardInfo.val
    }
  },
  data() {
    return {
      show: false,
      diamondsPrice,
      cardInfo: diamondsOption[0],
      amount: 4,
      receivedOption,
      receivedShow: false,
      num: 1,

      diamondNFTContract: new DiamondNFTContract(),
      usdtContract: new UsdtContract(),
      config: getConfig(),
      myUSDT: 0
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
          this.usdtContract
            .init(this.web3.currentProvider, this.config.usdt)
            .then(() => {
              this.balanceOfUsdt(this.accountInfo.userId).then(res => {
                this.myUSDT = res;
              });
            });
          this.diamondNFTContract.init(
            this.web3.currentProvider,
            this.config.diamondcard
          );
        }
      },
      deep: true,
      immediate: true
    }
  },
  created() {},
  mounted() {},
  methods: {
    getNum(num) {
      this.amount = num;
    },
    chooseCard() {
      this.$refs["CardModal"].initData(this.cardInfo);
    },
    getCard(item) {
      this.cardInfo = item;
    },
    async buyNft() {
      let that = this;
      let amount = this.amount;
      let amountPrice = amount * diamondsPrice * this.cardInfo.val;
      let userInfo = this.accountInfo;
      this.$refs["LoadingModal"].initData();
      let myUSDT = await this.balanceOfUsdt(userInfo.userId);
      console.log("===myUSDT=====", myUSDT, amount, amountPrice);

      if (myUSDT < amountPrice) {
        this.$refs["LoadingModal"].close();
        console.error("额度不足");
        that.$refs["TipModal"].initData("额度不足");
        return;
      }

      const usdt = await this.usdtContract.allowance(
        that.account,
        that.config.diamondcard
      );
      console.log("===usdt=====", usdt);
      if (usdt < amountPrice) {
        //授权
        await that.approveUsdt(myUSDT);
      }

      try {
        const data = await that.goBuyNft(this.cardInfo.val, amount, err => {
          that.$refs["LoadingModal"].close();
          console.log("error:::123:", err);
          that.$refs["TipModal"].initData(err);
        });
        console.log("data---------", data);
        console.log("充值成功");
        that.$refs["LoadingModal"].close();
        that.$refs["TipModal"].initData("购买成功");
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
    async balanceOfUsdt(user) {
      return this.usdtContract.balanceOfUsdt(user);
    },
    async approveUsdt(price) {
      let that = this;
      return await this.usdtContract.approve(
        getUsdtPrice(price),
        that.config.diamondcard,
        that.account
      );
    },
    async goBuyNft(tokenid, amount, callback) {
      let that = this;
      await this.diamondNFTContract.buyDiamondNft(
        tokenid,
        amount,
        "0x0000000000000000000000000000000000000000000000000000000000000000",
        "0x0000000000000000000000000000000000000000000000000000000000000000",
        0,
        "0x0000000000000000000000000000000000000000",
        0,
        that.account,
        callback
      );
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
    padding: 40px 18px;
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
        font-size: 32px;
        font-family: Alibaba PuHuiTi;
        font-weight: bold;
        color: #ffffff;
        -webkit-text-stroke: 0.800000011920929px #5e2f2f;
        img {
          width: 70px;
          margin-right: 16px;
        }
        .usdtImg {
          width: 69px;
        }
        .bottom_icon {
          width: 32px;
          margin-left: 6px;
          margin-right: 0;
        }
      }
      .right {
        width: 54px;
        height: 78px;
        margin-left: 106px;
        margin-right: 62px;
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
    .num-list {
      left: -20px;
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
      margin-bottom: 104px;
    }
  }
}
</style>

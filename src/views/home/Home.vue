<template>
  <div class="home-page">
    <!-- <div class="mh-flex mh-align-right">
      <router-link :to="{ path: '/rule'}" tag="div" class="activationBtn">激活/报名规则</router-link>
    </div> -->
    <div class="game-banner">
      <img class="logo" src="@/assets/home/logo.png" alt="">
      <div class="rule-btn mh-center" @click="handleRule">规则说明</div>
      <div class="home-title mh-center" @click="jumpPage(1)">开始游戏</div>
    </div>

    <div class="box">
      <div class="name text-center">锁钻石卡NFT</div>
      <div class="mh-flex mh-align-between dataCon">
        <div class="mh-flex-1 leftItem">
          <div class="dataLabel">当前奖金池总额</div>
          <div class="numCon">
            {{poolremainUSDT | keepDecimals(2)}}
            <span>usdt</span>
          </div>
        </div>
        <div class="mh-flex-1 rightItem">
          <div class="dataLabel">APY</div>
          <div class="percentage">{{apy | keepDecimals(2)}}%</div>
        </div>
      </div>
      <div class="content">
        锁定功能必须在创建游戏角色的情况下，才能开启，将游戏内的钻石提取出来，转化为钻石卡NFT进行锁定，奖金池的资金来源为用户购买钻石消耗的USDT，其中60%会进入奖金池，个人的收益按照个人锁定资产价值跟锁定总资产价值占比进行分配
      </div>
      <div @click="jumpPage(4)" class="notyetopen-btn mh-center">进入</div>
    </div>

    <div class="banner">
      <img src="@/assets/home/banner6.png" alt="">
    </div>

    <div class="purchase-box">
      <div class="gameCoin">
        游戏内钻石余额：{{gamecoin}}
        <img class="tip_icon" src="@/assets/home/tip_icon.png" alt="">
      </div>
      <div class="purchase-text text-center">
        钻石价格：{{diamondsPrice}}USDT
        <span>（限时五折优惠）</span>
      </div>
      <div class="mh-center">
        <div class="purchase-btn mh-center mr-18 purchase-btn-flex-1" @click="jumpPage(2)">立即购买</div>
      </div>
      <div class="mh-center">
        <div class="purchase-btn mh-center mr-18" @click="jumpPage(5)">提取钻石</div>
        <div @click="jumpPage(6)" class="purchase-btn mh-center">存入钻石卡</div>
      </div>
    </div>

    <div class="banner">
      <img src="@/assets/home/banner7.png" alt="">
    </div>

    <div class="box">
      <div class="name text-center">iBox NFT交易平台</div>
      <div class="goWebsite" @click="goWebsiteFun">
        官网：https://www.ibox.fan   去购买
      </div>
      <div class="content">
        在iBox交易平台可购买相应资产激活游戏账号或者购买资产存入到游戏中，增加游戏战斗力。将游戏内资产提取到钱包，可在iBox交易平台进行出售。
      </div>
    </div>

    <!-- <div class="box optionBox">
      <div class="option mh-flex mh-align-between" v-for="(item, index) in diamondsOption" :key="index">
        <div class="label">{{item.name}}</div>
        <div class="val">（价值{{item.val}}钻石）</div>
      </div>
      <div class="mh-center">
        <div @click="jumpPage(3)" class="purchase-btn mh-center purchase-btns mr-18">立即购买</div>
        <div @click="jumpPage(6)" class="purchase-btn mh-center purchase-btns">存入钻石卡</div>
      </div>
    </div> -->
    <!-- <div class="box">
      <img class="logo" src="@/assets/home/logo.png" alt="">
      <div class="content">
        MEGA HERO是全球首款非道具收费的NFT挂机网游。游戏以区块链技术为基础，以构建经济平衡的自由开放世界为目标，以促成用户之间集卡、交易、PK、协作为核心玩法，任何玩家都可以通过娴熟游戏技巧和NFT卡牌交易，来赚取数字资产。
      </div>
    </div> -->

    <!-- <div class="home-title mh-center">开始游戏</div> -->
    <!-- <div class="banner">
      <img src="@/assets/home/banner5.png" alt="">
    </div>
    <div class="box">
      <div class="name text-center">质押</div>
      <div class="content">
        Mega Hero将部分的平台收益奖励给质押的用户，质押资产为钻石卡，收益按照区块进行分配，个人的收益按照个人资产价值跟质押总资产价值占比进行分配。
      </div>
      <div @click="jumpPage(4)" class="notyetopen-btn mh-center">进入</div>
    </div> -->


    <div class="banner">
      <img src="@/assets/home/banner8.png" alt="">
    </div>
    <div class="box">
      <div class="name text-center">iBox资产兑换</div>
      <div class="content">
        在iBox交易平台购买的N级、SR级或者SSR级NFT资产，如果想要将资产存入到游戏中使用或者在iBox交易市场直接出售都需要使用iBox资产兑换功能进行兑换。
      </div>
      <div @click="jumpPage(8)" class="notyetopen-btn mh-center">进入</div>
    </div>

    <div class="banner">
      <img src="@/assets/home/banner2.png" alt="">
    </div>
    <div class="box">
      <div class="name text-center">游戏与钱包资产互转（存入与提取）</div>
      <div class="content">
        存入是指将用户钱包资产存入到游戏内，提取是指将游戏资产提取到钱包中。目前允许存入的资产包括5、6星神灵、精灵、钻石卡，允许提取的资产包括5、6神灵、钻石
      </div>
      <div @click="jumpPage(7)" class="notyetopen-btn mh-center">进入</div>
    </div>

    

    <!-- <div class="home-title mh-center">兑换</div>
    <div class="banner">
      <img src="@/assets/home/banner2.png" alt="">
    </div>
    <div class="box">
      <div class="name text-center">iBox资产兑换</div>
      <div class="content">
        Mega Hero前期在iBox售卖了两期盲盒，用户需要在iBox平台将资产（盲盒打开后）提取到钱包，在此H5功能页面，通过钱包和账户进行绑定，这时可以将iBox资产读取出来，如果用户拥有SR级或者SSR级NFT资产，就具备参与内测的资格。
      </div>
    </div> -->

    <!-- <div class="home-title mh-center">一键购买</div>
    <div class="banner">
      <img src="@/assets/home/banner3.png" alt="">
    </div>
    <div class="box">
      <div class="name text-center">存入与提取</div>
      <div class="content">
        游戏内与钱包资产的互转，存入是指将用户钱包资产存入到游戏内，提取是指将游戏资产提取到钱包中。<br>
        目前允许存入资产包括5星、6星神灵、精灵蛋、精灵、三种类别的钻石卡。允许提取的资产包括5星、6星神灵、精灵、钻石。
      </div>
    </div> -->

    <!-- <div class="home-title mh-center">资产转化</div>
    <div class="banner">
      <img src="@/assets/home/banner4.png" alt="">
    </div>
    <div class="box">
      <div class="name text-center">质押（staking）</div>
      <div class="content">
        Mega Hero将部分的平台收益奖励给质押的用户，质押资产为钻石箱，收益按照区块进行分配，个人的收益按照个人资产价值跟质押总资产价值占比进行分配。
      </div>
    </div> -->

    <!-- <div class="home-title mh-center">进入</div> -->
    <Rule ref="Rule"></Rule>
  </div>
</template>

<script>
import Rule from "@/components/Rule";
import { diamondsOption, diamondsPrice } from "@/utils/status";
import { mapGetters } from "vuex";
import { getXWorldService } from "@/xworldjs/xworldjs";
import { getConfig } from "@/config";
import { subtract, multiply, divide } from "@/utils/bignumber";
export default {
  name: "Home",
  components: { Rule },
  computed: {
    ...mapGetters(["account", "gamecoin"])
  },
  data() {
    return {
      diamondsPrice,
      diamondsOption,
      config: getConfig(),
      poolremainUSDT: 0, //当前奖金池剩余总额
      apy: 0 //收益率
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
    handleRule() {
      this.$refs["Rule"].init();
    },
    jumpPage(val) {
      if (!this.account) {
        this.$store.dispatch("web3/connectWallet");
        return;
      }
      if (val == 1) {
        this.$router.push({ name: "Game" });
      } else if (val == 2) {
        this.$router.push({ path: "/game/purchase" });
      } else if (val == 3) {
        this.$router.push({ path: "/card" });
      } else if (val == 4) {
        this.$router.push({ path: "/pledge" });
      } else if (val == 5) {
        this.$router.push({ path: "/diamonds" });
      } else if (val == 6) {
        this.$router.push({ path: "/diamonds/extract" });
      } else if (val == 7) {
        this.$router.push({ path: "/knapsack" });
      } else if (val == 8) {
        this.$router.push({ path: "/iBox" });
      }
    },
    goWebsiteFun() {
      window.open("https://www.ibox.fan", "_blank");
    },
    async getData() {
      let account = this.account;
      // 获取合约usdt总额
      let poolUSDT = await getXWorldService().usdtContract.balanceOfUsdt(
        this.config.diamondcardpool
      );
      console.log("poolUSDT", poolUSDT);

      // 获取已经分出去的，但用户还没领取的usdt总额
      let poolrewardUSDT = await getXWorldService().diamondPoolsContract.pendingAllRewards();
      console.log("poolrewardUSDT", poolrewardUSDT);

      // // 当前奖金池剩余总额
      let poolremainUSDT = subtract(poolUSDT, poolrewardUSDT);
      console.log("poolremainUSDT", poolremainUSDT);

      this.poolremainUSDT = poolremainUSDT;

      // 质押钻石总量
      let totalamount = await getXWorldService().diamondPoolsContract.totalAmount();
      console.log("totalamount", totalamount);
      // 质押钻石总价值
      let totalamountValue = multiply(totalamount, this.diamondsPrice);
      console.log("totalamountValue", totalamountValue);

      // 用户质押的总价值   根据用户质押的数据列表计算
      // 设X为获取挖矿合约的usdt余额。 usdt.balanceOf(poolAddress)
      let X = poolUSDT;
      // 设Y为已经分出去的，但用户还没领取的usdt。 pool.pendingAllRewards()
      let Y = poolrewardUSDT;
      // 设Z为当前一个区块时间的收益率。 pool.ratePerBlock()
      let Z = await getXWorldService().diamondPoolsContract.ratePerBlock();
      // 设C为当前质押钻石总量。 pool.totalAmount()
      let C = totalamount;
      // 设D为钻石的价格。 调用其他中心化接口获取
      let D = this.diamondsPrice;
      // 可分配的U * 一年要分出去U的比例 / 已经质押的资产价值
      console.log("X Y Z C D", X, Y, Z, C, D);
      if (C != 0) {
        // this.apy = ((X - Y) * ((Z * 10512000) / 100)) / (C * D);
        this.apy = divide(
          subtract(subtract(X, Y), divide(multiply(Z, 10512000), 100)),
          subtract(C, D)
        );
      }
    }
  }
};
</script>
<style lang="scss" scoped>
.home-page {
  background-color: #c5ac84;
  padding: 8px 32px;
  .game-banner {
    height: 360px;
    border-radius: 12px;
    margin: 0 auto;
    background-color: #000;
    padding-top: 240px;
    position: relative;
    margin-bottom: 36px;
    background-image: url("../../assets/home/banner.png");
    background-repeat: no-repeat;
    background-size: 100% 100%;
    .logo {
      width: 186px;
      height: 112px;
      position: absolute;
      top: 0;
      left: 4px;
    }
    .rule-btn {
      position: absolute;
      top: 0;
      right: 0;
      width: 180px;
      height: 56px;
      background-color: rgba(28, 18, 78, 0.7);
      border-radius: 0px 12px 0px 0px;
      font-size: 24px;
      font-family: PingFang SC;
      font-weight: 500;
      color: rgba(255, 255, 255, 0.9);
    }
  }
  .purchase-box {
    background-color: #ead7ba;
    border-radius: 12px;
    padding: 0 16px;
    margin-bottom: 40px;
    .gameCoin {
      text-align: center;
      padding: 20px 0 24px 0;
      font-size: 32px;
      font-family: PingFang SC;
      font-weight: 600;
      color: #40519d;
      border-bottom: 1px dashed #c5ac84;
      position: relative;
      margin-bottom: 24px;
      .tip_icon {
        width: 33px;
        height: 33px;
        position: absolute;
        top: 10px;
        right: 16px;
      }
    }
    .purchase-text {
      font-size: 32px;
      font-family: PingFang SC;
      font-weight: 600;
      color: #452b0d;
      margin-bottom: 44px;
      span {
        color: #d60019;
      }
    }
  }
  .purchase-btn {
    width: 300px;
    height: 80px;
    background-color: #b9965f;
    border-radius: 12px;
    font-size: 36px;
    font-family: PingFang SC;
    font-weight: 600;
    color: #ffffff;
    margin-bottom: 42px;
  }
  .purchase-btn-flex-1 {
    width: 622px;
    margin: 0 auto;
    margin-bottom: 30px;
  }
  .purchase-btns {
    margin-top: 38px;
    margin-bottom: 0;
  }
  .mr-18 {
    margin-right: 18px;
  }
  .banner {
    margin-bottom: 40px;
    img {
      width: 100%;
    }
  }
  .box {
    background-color: #e5d2b3;
    border-radius: 12px;
    position: relative;
    padding: 30px 40px 80px 42px;
    margin-bottom: 36px;
    .name {
      font-size: 32px;
      font-family: PingFang SC;
      font-weight: 600;
      color: #000000;
    }
    .dataCon {
      margin-top: 46px;
      .leftItem {
        margin-right: 60px;
      }
      .leftItem,
      .rightItem {
        background-color: rgba(185, 150, 95, 0.4);
        border-radius: 12px;
        padding: 26px 0;
        text-align: center;
        .dataLabel {
          font-size: 32px;
          font-family: PingFang SC;
          font-weight: bold;
          color: #452b0d;
          margin-bottom: 18px;
        }
        .numCon {
          font-size: 32px;
          font-family: PingFang SC;
          font-weight: 600;
          color: #d60019;
          span {
            font-size: 20px;
          }
        }
        .percentage {
          font-size: 32px;
          font-family: PingFang SC;
          font-weight: 600;
          color: #40519d;
        }
      }
    }
    .goWebsite {
      padding-top: 30px;
      text-align: center;
      font-size: 32px;
      font-family: PingFang SC;
      font-weight: 600;
      color: #d60019;
      text-decoration: underline;
    }
    .content {
      padding-top: 32px;
      font-size: 28px;
      font-family: PingFang SC;
      font-weight: 400;
      line-height: 48px;
      color: rgba(0, 0, 0, 0.7);
    }
    .notyetopen-btn {
      margin: 0 auto;
      margin-top: 46px;
      width: 500px;
      height: 80px;
      background: #b9965f;
      border-radius: 12px;
      font-size: 36px;
      font-family: PingFang SC;
      font-weight: 600;
      color: #ffffff;
    }
    .notyetopen-btn.disabled {
      background-color: rgba(0, 0, 0, 0.5);
    }
  }
  .home-title {
    width: 248px;
    height: 84px;
    margin: 0 auto;
    margin-bottom: 46px;
    background-image: url("../../assets/common/btn_bg.png");
    background-repeat: no-repeat;
    background-size: 100% 100%;
    font-size: 32px;
    font-family: PingFang SC;
    font-weight: bold;
    color: #5e3a11;
  }
  .optionBox {
    padding: 0 16px;
    padding-bottom: 34px;
    .option {
      padding: 30px 60px;
      border-bottom: 1px dashed #c5ac84;
      .label {
        font-size: 32px;
        font-family: PingFang SC;
        font-weight: 600;
        color: #452b0d;
      }
      .val {
        font-size: 32px;
        font-family: PingFang SC;
        font-weight: 400;
        color: #40519d;
      }
    }
  }
}
</style>

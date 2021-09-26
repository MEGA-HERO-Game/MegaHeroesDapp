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
    <div class="purchase-box">
      <div class="purchase-text text-center">
        钻石价格：{{diamondsPrice}}USDT
        <span>（限时五折优惠）</span>
      </div>
      <div class="purchase-btn mh-center" @click="jumpPage(2)">立即购买</div>
    </div>

    <div class="box optionBox">
      <div class="option mh-flex mh-align-between" v-for="(item, index) in diamondsOption" :key="index">
        <div class="label">{{item.name}}</div>
        <div class="val">（价值{{item.val}}钻石）</div>
      </div>
      <div @click="jumpPage(3)" class="purchase-btn mh-center purchase-btns">立即购买</div>
    </div>
    <!-- <div class="box">
      <img class="logo" src="@/assets/home/logo.png" alt="">
      <div class="content">
        MEGA HERO是全球首款非道具收费的NFT挂机网游。游戏以区块链技术为基础，以构建经济平衡的自由开放世界为目标，以促成用户之间集卡、交易、PK、协作为核心玩法，任何玩家都可以通过娴熟游戏技巧和NFT卡牌交易，来赚取数字资产。
      </div>
    </div> -->

    <!-- <div class="home-title mh-center">开始游戏</div> -->
    <div class="banner">
      <img src="@/assets/home/banner5.png" alt="">
    </div>
    <div class="box">
      <div class="name text-center">质押</div>
      <div class="content">
        Mega Hero将部分的平台收益奖励给质押的用户，质押资产为钻石卡，收益按照区块进行分配，个人的收益按照个人资产价值跟质押总资产价值占比进行分配。
      </div>
      <div @click="jumpPage(4)" class="notyetopen-btn mh-center">进入</div>
    </div>

    <div class="banner">
      <img src="@/assets/home/banner2.png" alt="">
    </div>
    <div class="box">
      <div class="name text-center">存入与提取</div>
      <div class="content">
        游戏内与钱包资产的互转，存入是指将用户钱包资产存入到游戏内，提取是指将游戏资产提取到钱包中。<br>
        目前允许存入资产包括5星、6星神灵、精灵蛋、精灵、钻石卡。允许提取的资产包括5星、6星神灵、精灵、钻石。
      </div>
      <div class="notyetopen-btn disabled mh-center">暂未开启</div>
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
export default {
  name: "Home",
  components: { Rule },
  computed: {
    ...mapGetters(["account"])
  },
  data() {
    return {
      diamondsPrice,
      diamondsOption
    };
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
    padding: 26px 0;
    margin-bottom: 36px;
    .purchase-text {
      font-size: 32px;
      font-family: PingFang SC;
      font-weight: bold;
      color: #452b0d;
      margin-bottom: 21px;
      span {
        color: #d60019;
      }
    }
  }
  .purchase-btn {
    width: 500px;
    height: 62px;
    background-color: #b9965f;
    border-radius: 12px;
    font-size: 36px;
    font-family: PingFang SC;
    font-weight: 600;
    color: #ffffff;
    margin: 0 auto;
    margin-bottom: 6px;
  }
  .purchase-btns {
    margin-top: 38px;
    margin-bottom: 0;
  }
  .banner {
    margin-bottom: 26px;
    img {
      width: 100%;
    }
  }
  .box {
    background-color: #e5d2b3;
    border-radius: 12px;
    position: relative;
    padding: 26px 30px 44px 30px;
    margin-bottom: 36px;
    .name {
      font-size: 32px;
      font-family: PingFang SC;
      font-weight: 600;
      color: #000000;
    }
    .content {
      padding-top: 28px;
      font-size: 28px;
      font-family: PingFang SC;
      font-weight: 400;
      line-height: 48px;
      color: rgba(0, 0, 0, 0.7);
    }
    .notyetopen-btn {
      margin: 0 auto;
      margin-top: 24px;
      width: 500px;
      height: 62px;
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

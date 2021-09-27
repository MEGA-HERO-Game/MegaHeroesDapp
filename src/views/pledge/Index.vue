<template>
  <div class="pledge-page">
    <div class="box header">
      <div class="title text-center">当前奖金池总额</div>
      <div class="total mh-center">
        <div class="num">{{poolremainUSDT}}</div>
        <div class="unit">USDT</div>
      </div>
      <div class="exchangeRate text-center">1钻石={{diamondsPrice}}USDT</div>
    </div>
    <div class="box infoBox">
      <div class="infoCon mh-flex mh-vertical-center mh-align-between">
        <div class="item mh-flex mh-vertical-column mh-vertical-center">
          <div class="num red">{{apy}}</div>
          <div class="label">年化收益率</div>
        </div>
        <div class="item mh-flex mh-vertical-column mh-vertical-center">
          <div class="num">{{totalamount}}</div>
          <div class="label">质押钻石总量</div>
        </div>
        <div class="item mh-flex mh-vertical-column mh-vertical-center">
          <div class="num">{{totalamountValue}}USDT</div>
          <div class="label">质押钻石总价值</div>
        </div>
      </div>
      <div class="home-title mh-center" @click="goPledge">质押</div>
    </div>
    <div class="myTitle text-center">我的质押</div>
    <div class="box myBox mh-flex mh-vertical-center mh-align-between">
      <div class="name">未领取</div>
      <div class="num mh-flex-1 text-center">{{userUSDT}}USDT</div>
      <div class="home-title mh-center" @click="claim">领取</div>
    </div>
    <div class="box listBox">
      <div class="list">
        <div class="item itemTh mh-center">
          <div class="mh-flex-1 text-center th">质押类别</div>
          <div class="mh-flex-1 text-center th">质押数量</div>
          <div class="mh-flex-1 text-center th">质押价值</div>
        </div>
        <div class="item mh-center" v-for="(item, index) in dataList" :key="index">
          <div class="mh-flex-1 text-center td">
            <div>钻石卡</div>
            <div class="val">{{item.name}}钻石</div>
          </div>
          <div class="mh-flex-1 text-center td">{{item.amount}}</div>
          <div class="mh-flex-1 text-center td">{{item.value}}USDT</div>
        </div>
        <div class="item mh-center bg_fff">
          <div class="mh-flex-1 text-center td">
            质押总价值
          </div>
          <div class="mh-flex-1 text-center td"></div>
          <div class="mh-flex-1 text-center td">{{totalValue}}USDT</div>
        </div>
      </div>
    </div>
    <div class="foot_btn text-center" @click="goWithdraw">
      解除质押
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
import { DiamondPoolsContract } from "@/xworldjs/diamond_pools";
import { UsdtContract } from "@/xworldjs/usdt";
import { getConfig, getUsdtPrice } from "@/config";
export default {
  name: "PledgeIndex",
  components: { LoadingModal, TipModal },
  computed: {
    ...mapGetters(["accountInfo", "account", "web3"])
  },
  data() {
    return {
      diamondsPrice,
      diamondNFTContract: new DiamondNFTContract(),
      diamondPoolsContract: new DiamondPoolsContract(),
      usdtContract: new UsdtContract(),
      config: getConfig(),

      poolUSDT: 0, //合约usdt总额
      poolrewardUSDT: 0, //已经分出去的，但用户还没领取的usdt总额
      poolremainUSDT: 0, //当前奖金池剩余总额

      totalamount: 0, //质押钻石总量
      totalamountValue: 0, //质押钻石总价值

      userUSDT: 0, //用户未领取的usdt

      dataList: [],
      totalValue: 0,

      apy: 0 //收益率
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
      await this.usdtContract.init(this.web3.currentProvider, this.config.usdt);
      await this.diamondNFTContract.init(
        this.web3.currentProvider,
        this.config.diamondcard
      );
      await this.diamondPoolsContract.init(
        this.web3.currentProvider,
        this.config.diamondcardpool
      );
      this.getData();
    },
    async getData() {
      let account = this.account;
      if (!account) {
        return;
      }
      // 获取合约usdt总额
      let poolUSDT = await this.usdtContract.balanceOfUsdt(
        this.config.diamondcardpool
      );
      console.log("poolUSDT", poolUSDT);

      // 获取已经分出去的，但用户还没领取的usdt总额
      let poolrewardUSDT = await this.diamondPoolsContract.pendingAllRewards();
      console.log("poolrewardUSDT", poolrewardUSDT);

      // 当前奖金池剩余总额
      let poolremainUSDT = poolUSDT - poolrewardUSDT;
      console.log("poolremainUSDT", poolremainUSDT);

      this.poolUSDT = poolUSDT;
      this.poolrewardUSDT = poolrewardUSDT;
      this.poolremainUSDT = poolremainUSDT;

      // 质押钻石总量
      let totalamount = await this.diamondPoolsContract.totalAmount();
      console.log("totalamount", totalamount);
      // 质押钻石总价值
      let totalamountValue = totalamount * this.diamondsPrice;
      console.log("totalamountValue", totalamountValue);

      this.totalamount = totalamount;
      this.totalamountValue = totalamountValue;

      // 用户未领取的usdt
      this.diamondPoolsContract.pendingRewards(account).then(res => {
        this.userUSDT = res;
        console.log("userUSDT", this.userUSDT);
      });

      // 质押的数据列表
      this.diamondPoolsContract.getUserDepositList(account).then(res => {
        console.log("质押的数据列表", res);
        let _ids = res["_ids"];
        let _values = res["_values"];
        let dataList = [];
        this.totalValue = 0;
        for (let i = 0; i < _ids.length; i++) {
          dataList.push({
            name: _ids[i].toString(),
            amount: _values[i].toString(),
            value:
              parseFloat(_values[i].toString()) *
              parseFloat(_values[i].toString()) *
              this.diamondsPrice
          });
          this.totalValue += dataList[i].value;
        }
        this.dataList = dataList;
      });

      // 用户质押的总价值   根据用户质押的数据列表计算
      // 设X为获取挖矿合约的usdt余额。 usdt.balanceOf(poolAddress)
      let X = poolUSDT;
      // 设Y为已经分出去的，但用户还没领取的usdt。 pool.pendingAllRewards()
      let Y = poolrewardUSDT;
      // 设Z为当前一个区块时间的收益率。 pool.ratePerBlock()
      let Z = await this.diamondPoolsContract.ratePerBlock();
      // 设C为当前质押钻石总量。 pool.totalAmount()
      let C = totalamount;
      // 设D为钻石的价格。 调用其他中心化接口获取
      let D = this.diamondsPrice;
      // 可分配的U * 一年要分出去U的比例 / 已经质押的资产价值
      console.log("X Y Z C D", X, Y, Z, C, D);
      this.apy = ((X - Y) * ((Z * 10512000) / 100)) / (C * D);
    },
    claim() {
      // 领取
      this.$refs["LoadingModal"].initData();
      this.diamondPoolsContract
        .claim(this.account)
        .then(data => {
          // success
          this.$refs["LoadingModal"].close();
          this.$refs["TipModal"].initData("领取成功");
          this.getData();
        })
        .catch(error => {
          // Failure
          this.$refs["LoadingModal"].close();
          this.$refs["TipModal"].initData("交易失败");
        });
    },
    goPledge() {
      this.$router.push({ path: "/pledge/form" });
    },
    goWithdraw() {
      this.$router.push({ path: "/pledge/relieve" });
    }
  }
};
</script>
<style lang="scss" scoped>
.pledge-page {
  background-color: #c5ac84;
  padding: 48px 32px;
  .box {
    background: linear-gradient(180deg, #f8cb8e 0%, #e1b687 100%);
    box-shadow: 0px 6px 12px rgba(0, 0, 0, 0.16);
    border-radius: 20px;
    margin-bottom: 30px;
  }
  .header {
    padding: 40px 30px 32px 30px;
    .title {
      font-size: 36px;
      font-family: Alibaba PuHuiTi;
      font-weight: bold;
      color: #5e2f2f;
    }
    .total {
      padding-bottom: 6px;
      border-bottom: 1px solid #d2a166;
      .num {
        font-size: 64px;
        font-family: AlibabaPuHuiTi-Bold;
        font-weight: bold;
        color: #d60019;
      }
      .unit {
        padding-top: 20px;
        font-size: 28px;
        font-family: Alibaba PuHuiTi;
        font-weight: bold;
        color: #5e2f2f;
      }
    }
    .exchangeRate {
      padding-top: 30px;
      font-size: 30px;
      font-family: PingFang SC;
      font-weight: bold;
      color: #56412e;
    }
  }
  .infoBox {
    padding: 58px 0 40px 0;
    .infoCon {
      margin-bottom: 30px;
      padding: 0 30px;
      .item {
        .num {
          font-size: 36px;
          font-family: Alibaba PuHuiTi;
          font-weight: bold;
          color: #5e2f2f;
        }
        .label {
          margin-top: 16px;
          font-size: 28px;
          font-family: PingFang SC;
          font-weight: bold;
          color: #56412e;
        }
        .red {
          color: #d60019;
        }
      }
    }
  }
  .home-title {
    width: 248px;
    height: 84px;
    margin: 0 auto;
    background-image: url("../../assets/common/btn_bg.png");
    background-repeat: no-repeat;
    background-size: 100% 100%;
    font-size: 32px;
    font-family: PingFang SC;
    font-weight: bold;
    color: #5e3a11;
  }
  .myTitle {
    font-size: 36px;
    font-family: Alibaba PuHuiTi;
    font-weight: bold;
    color: #5e2f2f;
    margin-bottom: 14px;
  }
  .myBox {
    padding: 14px 20px 12px 40px;
    .name {
      font-size: 30px;
      font-family: PingFang SC;
      font-weight: bold;
      color: #56412e;
    }
    .num {
      font-size: 36px;
      font-family: Alibaba PuHuiTi;
      font-weight: bold;
      color: #d60019;
    }
  }
  .listBox {
    .list {
      .itemTh {
        background-color: rgba(213, 145, 61, 0.3);
      }
      .bg_fff {
        background-color: rgba(255, 255, 255, 0.1);
      }
      .item {
        padding: 22px 0;
        .th {
          font-size: 28px;
          font-family: Alibaba PuHuiTi;
          font-weight: bold;
          color: #5e2f2f;
        }
        .td {
          font-size: 28px;
          font-family: Alibaba PuHuiTi;
          font-weight: 400;
          color: #5e2f2f;
          .val {
            font-size: 24px;
            color: rgba(94, 47, 47, 0.7);
            margin-top: 6px;
          }
        }
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
  }
}
</style>

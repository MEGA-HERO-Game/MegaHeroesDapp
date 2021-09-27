<template>
  <div class="RelieveForm-page">
    <div class="box">
      <img class="cardImg" src="@/assets/common/card.png">
      <div class="content">
        <div class="mh-flex mh-vertical-center mh-align-between">
          <div class="name">钻石卡（500钻石）</div>
          <div class="name">已质押：{{num}}</div>
        </div>
        <div class="formCon">
          <van-field class="mh_input" v-model="amount" type="digit" />
          <div class="max mh-center" @click="amount = num">最大值</div>
        </div>
      </div>
      <div class="foot_btn text-center" @click="withdraw">
        解除质押
      </div>
      <div class="footText">☆解除质押钻石卡的数量须为整数，最低解除质押数量为1。<br>☆可一次性解除全部质押资产，也可解除部分质押资产。</div>
    </div>
    <LoadingModal ref="LoadingModal" />
    <TipModal ref="TipModal" />
  </div>
</template>

<script>
import LoadingModal from "@/components/Loading";
import TipModal from "@/components/TipModal";
import { mapGetters } from "vuex";
import { DiamondPoolsContract } from "@/xworldjs/diamond_pools";
import { getConfig, getUsdtPrice } from "@/config";
import { diamondsOption, diamondsPrice, receivedOption } from "@/utils/status";
import { Toast } from "vant";
export default {
  name: "RelieveForm",
  components: { LoadingModal, TipModal },
  computed: {
    ...mapGetters(["accountInfo", "account", "web3"])
  },
  data() {
    return {
      amount: null,
      diamondsPrice,
      tokenid: 500, //写死 id  目前就一档
      config: getConfig(),
      diamondPoolsContract: new DiamondPoolsContract(),
      dataList: [],
      num: 0
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
      await this.diamondPoolsContract.init(
        this.web3.currentProvider,
        this.config.diamondcardpool
      );
      this.getData();
    },
    async getData() {
      // 质押的数据列表
      this.diamondPoolsContract.getUserDepositList(this.account).then(res => {
        console.log("质押的数据列表", res);
        let _ids = res["_ids"];
        let _values = res["_values"];
        let dataList = [];
        for (let i = 0; i < _ids.length; i++) {
          dataList.push({
            name: _ids[i].toString(),
            amount: _values[i].toString(),
            value:
              parseFloat(_values[i].toString()) *
              parseFloat(_values[i].toString()) *
              this.diamondsPrice
          });
          if (_ids[i].toString() == this.tokenid) {
            this.num = _values[i].toString();
          }
        }
        this.dataList = dataList;
      });
    },
    withdraw() {
      if (!this.amount || this.amount == 0) {
        Toast("请输入解除数量");
        return;
      }
      if (this.amount > this.num) {
        Toast("解除数量不能大于质押数量");
        return;
      }
      this.$refs["LoadingModal"].initData();
      this.diamondPoolsContract
        .withdraw(this.tokenid, this.amount,this.accountInfo.userId)
        .then(data => {
          // success
          this.$refs["LoadingModal"].close();
          this.$refs["TipModal"].initData("解除成功");
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
.RelieveForm-page {
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
      padding: 244px 28px 28px 28px;
    }
  }
}
</style>

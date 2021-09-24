<template>
  <div class="pledge-page">
    <div class="box header">
      <div class="title text-center">当前奖金池总额</div>
      <div class="total mh-center">
        <div class="num">89567</div>
        <div class="unit">USDT</div>
      </div>
      <div class="exchangeRate text-center">1钻石=0.025USDT</div>
    </div>
    <div class="box infoBox">
      <div class="infoCon mh-flex mh-vertical-center mh-align-between">
        <div class="item mh-flex mh-vertical-column mh-vertical-center">
          <div class="num red">123.21%</div>
          <div class="label">年化收益率</div>
        </div>
        <div class="item mh-flex mh-vertical-column mh-vertical-center">
          <div class="num">58964</div>
          <div class="label">质押钻石总量</div>
        </div>
        <div class="item mh-flex mh-vertical-column mh-vertical-center">
          <div class="num">58964USDT</div>
          <div class="label">质押钻石总价值</div>
        </div>
      </div>
      <div class="home-title mh-center">质押</div>
    </div>
    <div class="myTitle text-center">我的质押</div>
    <div class="box myBox mh-flex mh-vertical-center mh-align-between">
      <div class="name">未领取</div>
      <div class="num mh-flex-1 text-center">58964USDT</div>
      <div class="home-title mh-center">领取</div>
    </div>
    <div class="box listBox">
      <div class="list">
        <div class="item itemTh mh-center">
          <div class="mh-flex-1 text-center th">质押类别</div>
          <div class="mh-flex-1 text-center th">质押数量</div>
          <div class="mh-flex-1 text-center th">质押价值</div>
        </div>
        <div class="item mh-center">
          <div class="mh-flex-1 text-center td">
            <div>钻石卡</div>
            <div class="val">500钻石</div>
          </div>
          <div class="mh-flex-1 text-center td">596</div>
          <div class="mh-flex-1 text-center td">58936USDT</div>
        </div>
        <div class="item mh-center bg_fff">
          <div class="mh-flex-1 text-center td">
            质押总价值
          </div>
          <div class="mh-flex-1 text-center td"></div>
          <div class="mh-flex-1 text-center td">58936USDT</div>
        </div>
      </div>
    </div>
    <div class="foot_btn text-center">
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
export default {
  name: "PledgeIndex",
  components: { LoadingModal, TipModal },
  computed: {
    ...mapGetters(["accountInfo", "account", "web3"])
  },
  data() {
    return {};
  },
  watch: {
    accountInfo: {
      handler: function(val, oldVal) {
        if (
          this.accountInfo &&
          this.accountInfo.userId &&
          this.accountInfo.token
        ) {
          //   this.getDraw();
        }
      },
      deep: true,
      immediate: true
    }
  },
  created() {},
  mounted() {},
  methods: {}
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

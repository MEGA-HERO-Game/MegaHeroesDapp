<template>
  <div class="knapsack-page">
    <div class="box">
      <div class="navCon mh-flex mh-align-center mh-vertical-bottom">
        <div class="nav mar-r24" :class="{active: type == 1}" @click="toggleAsset(1)">游戏资产</div>
        <div class="nav" :class="{active: type == 2}" @click="toggleAsset(2)">钱包资产</div>
      </div>
      <div class="content">
        <div class="toogleList mh-center" v-if="type == 2">
          <div class="toogleItem leftItem mh-center" :class="{active: isIBox == 2}" @click="toggleIBox(2)">Mega Hero资产</div>
          <div class="toogleItem rightItem mh-center" :class="{active: isIBox == 1}" @click="toggleIBox(1)">IBOX资产</div>
        </div>
        <div class="navList mh-center">
          <div class="navItem mh-center" :class="{active:assetType == 2}" @click="toggleAssetType(2)">神灵</div>
          <div class="navItem mh-center" :class="{active:assetType == 0}" @click="toggleAssetType(0)">道具</div>
          <div class="navItem mh-center" :class="{active:assetType == 3}" @click="toggleAssetType(3)">精灵</div>
        </div>
        <div class="list mh-flex mh-line-feed">
          <div class="item" v-for="(item, index) in list" :key="index" @click="handleDetail">
            <img src="@/assets/knapsack/img_1.png" alt="">
          </div>
        </div>
        <div class="mh-flex mh-align-between mh-vertical-center footCon">
          <div class="home-title mh-center">刷新</div>
          <div class="text">游戏内钻石：45896</div>
        </div>
      </div>
      <div class="tip text-center">钱包资产可在iBox交易平台进行出售</div>
      <div class="btnCon mh-center">去出售</div>
    </div>
    <LoadingModal ref="LoadingModal" />
    <TipModal ref="TipModal" />
    <Dialog ref="Dialog" />
  </div>
</template>

<script>
import LoadingModal from "@/components/Loading";
import TipModal from "@/components/TipModal";
import Dialog from "./components/Dialog";
import { mapGetters } from "vuex";
import { diamondsOption, diamondsPrice, receivedOption } from "@/utils/status";
import { getConfig, getUsdtPrice } from "@/config";
import { assetInterfaceApi } from "@/api/user";
import { imgBaseUrl } from '@/utils/env'
export default {
  name: "KnapsackIndex",
  components: { LoadingModal, TipModal, Dialog },
  computed: {
    ...mapGetters(["accountInfo", "account", "web3"])
  },
  data() {
    return {
      imgBaseUrl,
      list: [],
      type: 1, //1  游戏资产  2 钱包资产
      isIBox: 2, // 1 IBOX资产  2Mega Hero资产
      assetType: 2 //资产类型，2.神灵，3.精灵  0.道具
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
      assetInterfaceApi({
        cmd: "GET_GAME_ASSET",
        requestUserId: this.accountInfo.userId,
        token: this.accountInfo.token,
        requestTime: new Date().valueOf(),
        assetType: this.assetType
      })
        .then(response => {
          if (response.code == 1) {
            this.list = response.list;
          } else {
            this.$toast(response.errorMessage);
          }
        })
        .catch(error => {});
    },
    toggleAsset(val) {
      this.type = val;
      if (this.type == 1) {
        this.getData();
      } else {
      }
    },
    toggleIBox(val) {
      this.isIBox = val;
    },
    toggleAssetType(val) {
      this.assetType = val;
      this.getData();
    },
    handleDetail() {
      this.$refs["Dialog"].init();
    }
  }
};
</script>
<style lang="scss" scoped>
.knapsack-page {
  background-color: #c5ac84;
  padding: 56px 38px 16px 34px;
  .box {
    .navCon {
      position: relative;
      z-index: 2;
      .nav {
        width: 268px;
        height: 62px;
        background-image: url("../../assets/knapsack/icon_2.png");
        background-repeat: no-repeat;
        background-size: 100% 100%;
        font-size: 28px;
        font-family: Microsoft YaHei;
        font-weight: 400;
        color: #ffffff;
        text-align: center;
        padding-top: 10px;
      }
      .active {
        width: 270px;
        height: 76px;
        background-image: url("../../assets/knapsack/icon_1.png");
        padding-top: 26px;
      }
    }
    .content {
      position: relative;
      top: -2px;
      z-index: 1;
      border: 1px solid #000;
      border-radius: 20px;
      background: rgba(173, 140, 102, 0.4);
      padding: 28px 0 44px 0;
      margin-bottom: 42px;
      .toogleList {
        padding-top: 12px;
        margin-bottom: 34px;
        .toogleItem {
          width: 256px;
          height: 70px;
          background-repeat: no-repeat;
          background-size: 100% 100%;
          font-size: 24px;
          font-family: Microsoft YaHei;
          font-weight: 400;
          color: #ffffff;
        }
        .leftItem {
          background-image: url("../../assets/knapsack/icon_7.png");
        }
        .rightItem {
          background-image: url("../../assets/knapsack/icon_6.png");
        }
        .active.leftItem {
          background-image: url("../../assets/knapsack/icon_5.png");
        }
        .active.rightItem {
          background-image: url("../../assets/knapsack/icon_8.png");
        }
      }
      .navList {
        .navItem {
          width: 132px;
          height: 46px;
          background-image: url("../../assets/knapsack/icon_4.png");
          background-repeat: no-repeat;
          background-size: 100% 100%;
          font-size: 24px;
          font-family: Microsoft YaHei;
          font-weight: 400;
          color: #ffffff;
          margin-right: 2px;
        }
        .active {
          background-image: url("../../assets/knapsack/icon_3.png");
          color: #943e01;
        }
      }
      .list {
        padding: 26px 0 0 12px;
        .item {
          margin: 0 16px 34px 16px;
          img {
            width: 126px;
            height: 128px;
          }
        }
      }
      .footCon {
        padding-left: 36px;
        padding-right: 30px;
        .home-title {
          width: 248px;
          height: 84px;
          background-image: url("../../assets/common/btn_bg.png");
          background-repeat: no-repeat;
          background-size: 100% 100%;
          font-size: 32px;
          font-family: PingFang SC;
          font-weight: bold;
          color: #5e3a11;
        }
        .text {
          font-size: 28px;
          font-family: PingFang SC;
          font-weight: 600;
          color: #d60019;
        }
      }
    }
    .tip {
      font-size: 28px;
      font-family: PingFang SC;
      font-weight: 400;
      color: #452b0d;
      margin-bottom: 10px;
    }
    .btnCon {
      width: 316px;
      height: 112px;
      margin: 0 auto;
      background-image: url("../../assets/knapsack/icon_9.png");
      background-repeat: no-repeat;
      background-size: 100% 100%;
      font-size: 32px;
      font-family: PingFang SC;
      font-weight: bold;
      color: #5e3a11;
    }
  }
  .mar-r24 {
    margin-right: 24px;
  }
}
</style>

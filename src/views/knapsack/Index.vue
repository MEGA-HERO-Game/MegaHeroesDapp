<template>
  <div class="knapsack-page">
    <div class="box">
      <div class="navCon mh-flex mh-align-center mh-vertical-bottom">
        <div
          class="nav mar-r24"
          :class="{ active: type == 1 }"
          @click="toggleAsset(1)"
        >
          游戏资产
        </div>
        <div class="nav" :class="{ active: type == 2 }" @click="toggleAsset(2)">
          钱包资产
        </div>
      </div>
      <div class="content">
        <div v-if="type == 2">
          <div class="toogleList mh-center">
            <div
              class="toogleItem leftItem mh-center"
              :class="{ active: isIBox == 1 }"
              @click="toggleIBox(2)"
            >
              Mega Hero资产
            </div>
            <div
              class="toogleItem rightItem mh-center"
              :class="{ active: isIBox == 2 }"
              @click="toggleIBox(1)"
            >
              IBOX资产
            </div>
          </div>
          <!-- <div class="navList mh-center">
            <div class="navItem mh-center active">全部</div>
            <div class="navItem mh-center">神灵</div>
            <div class="navItem mh-center">道具</div>
            <div class="navItem mh-center">精灵</div>
          </div> -->
          <div class="list mh-flex mh-line-feed" v-if="isIBox == 2">
            <div
              class="item"
              v-for="(item, index) in nftList"
              :key="index"
              @click="handleDetail(item)"
            >
              <img :src="item.pic" alt="" />
            </div>
            <div
              v-if="loadComplete && (!nftList || !nftList.length)"
              class="noData mh-flex-1"
            >
              暂无数据
            </div>
          </div>
          <div class="list mh-flex mh-line-feed" v-if="isIBox == 1">
            <div
              class="item"
              v-for="(item, index) in iboxList"
              :key="index"
              @click="handleIBox(item)"
            >
              <img :src="item.pic" alt="" />
            </div>
            <div
              v-if="loadComplete && (!iboxList || !iboxList.length)"
              class="noData mh-flex-1"
            >
              暂无数据
            </div>
          </div>
        </div>
        <div v-if="type == 1">
          <div class="navList mh-center">
            <div
              class="navItem mh-center"
              :class="{ active: assetType == 2 }"
              @click="toggleAssetType(2)"
            >
              神灵
            </div>
            <div
              class="navItem mh-center"
              :class="{ active: assetType == 0 }"
              @click="toggleAssetType(0)"
            >
              道具
            </div>
            <div
              class="navItem mh-center"
              :class="{ active: assetType == 3 }"
              @click="toggleAssetType(3)"
            >
              精灵
            </div>
          </div>
          <div class="list mh-flex mh-line-feed" v-if="assetType == 2">
            <div
              class="item"
              v-for="(item, index) in godsList"
              :key="index"
              @click="handleDetail(item)"
            >
              <img :src="formatHeroImg(item.icon)" alt="" />
            </div>
            <div
              v-if="loadComplete && (!godsList || !godsList.length)"
              class="noData mh-flex-1"
            >
              暂无数据
            </div>
          </div>
          <div class="list mh-flex mh-line-feed" v-if="assetType == 0">
            <div class="noData mh-flex-1">暂无数据</div>
          </div>
          <div class="list mh-flex mh-line-feed" v-if="assetType == 3">
            <div
              class="item"
              v-for="(item, index) in spiritList"
              :key="index"
              @click="handleDetail(item)"
            >
              <img :src="formatHeroImg(item.icon)" alt="" />
            </div>
            <div
              v-if="loadComplete && (!spiritList || !spiritList.length)"
              class="noData mh-flex-1"
            >
              暂无数据
            </div>
          </div>
        </div>
        <div class="mh-flex mh-align-between mh-vertical-center footCon">
          <div class="home-title mh-center" @click="refresh">刷新</div>
          <div class="text">游戏内钻石：{{gameCion}}</div>
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
import { centerApi } from "@/api/user";
import imgPath from "@/views/mixins/imgPath";
import { getXWorldService } from "@/xworldjs/xworldjs";
import { metadataApi } from "@/api/user";
import AES from "@/utils/AES.js";
export default {
  name: "KnapsackIndex",
  components: { LoadingModal, TipModal, Dialog },
  mixins: [imgPath],
  computed: {
    ...mapGetters(["account", "web3", "signatureInfo"]),
  },
  data() {
    return {
      godsList: [], //神灵列表
      spiritList: [], //精灵列表
      propList: [], //道具列表
      type: 1, //1  游戏资产  2 钱包资产
      isIBox: 2, // 1 IBOX资产  2Mega Hero资产
      assetType: 2, //资产类型，2.神灵，3.精灵  0.道具
      loadComplete: false,
      nftList: [], //
      iboxList: [], //

      gameCion: 0,
    };
  },
  watch: {
    account: {
      handler: function (val, oldVal) {
        if (this.account) {
          this.getNftData();
          this.getIBoxData();
        }
      },
      deep: true,
      immediate: true,
    },
    signatureInfo: {
      handler: function (val, oldVal) {
        if (this.signatureInfo.nonce) {
          this.getData();
        }
      },
      deep: true,
      immediate: true,
    },
  },
  created() {},
  mounted() {},
  methods: {
    getData() {
      this.loadComplete = false;
      centerApi(
        {
          nonce: this.signatureInfo.nonce,
          sign: AES.signSecret({
            nonce: this.signatureInfo.nonce,
            cmd: "getGameAssetList",
          }),
        },
        "getGameAssetList"
      )
        .then((response) => {
          this.loadComplete = true;
          if (response.code == 0) {
            let gameAsset = [];
            if (response.data && response.data.gameAsset) {
              gameAsset = response.data.gameAsset;
            }
            if(response.data && response.data.gameCion){
              this.gameCion = response.data.gameCion;
            }
            let godsList = gameAsset.filter((element) => {
              return element.assetType == 2;
            });
            let spiritList = gameAsset.filter((element) => {
              return element.assetType == 1;
            });
            this.godsList = godsList;
            this.spiritList = spiritList;
          } else {
            this.$toast(response.errorMessage);
          }
        })
        .catch((error) => {
          this.loadComplete = true;
        });
    },
    getNftData() {
      getXWorldService()
        .mpNFTContract.getNFTs(this.account)
        .then((res) => {
          console.log("res", res);
        });
    },
    getIBoxData() {
      this.iboxList = [];
      getXWorldService()
        .iboxTokenContract.getIboxTokenId(this.account)
        .then((res) => {
          for (let i = 0; i < res.length; i++) {
            this.getMetaData(res[i]);
          }
        });
    },
    getMetaData(tokenId) {
      metadataApi({
        tokenId: tokenId,
        assetType: "iBox",
      }).then((response) => {
        if (response.code == 1) {
          this.iboxList.push(response.data);
        }
      });
    },
    toggleAsset(val) {
      this.type = val;
      if (this.type == 1 && this.assetType != 0) {
        this.assetType = 2;
        this.getData();
      } else {
      }
    },
    toggleIBox(val) {
      this.isIBox = val;
    },
    toggleAssetType(val) {
      this.assetType = val;
      if (this.assetType != 0) {}
    },
    refresh() {
      if (this.type == 1 && this.assetType != 0) {
        this.getData();
      }
    },
    handleDetail(item) {
      this.$refs["Dialog"].init(item, {
        type: this.type, //1  游戏资产  2 钱包资产
        isIBox: this.isIBox, // 1 IBOX资产  2Mega Hero资产
      });
    },
    handleIBox(item) {
      this.$router.push({
        path: "/iBox/exchange",
        query: {
          id: item.tokenId,
        },
      });
    },
  },
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
        .noData {
          font-size: 28px;
          font-family: PingFang SC;
          font-weight: 400;
          color: #452b0d;
          text-align: center;
          padding: 30px 0;
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

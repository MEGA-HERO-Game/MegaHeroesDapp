<template>
  <div class="iBox_exchange">
    <div class="title">从钱包</div>
    <div class="box mh-flex mh-vertical-center">
      <div class="imgCon">
        <img :src="iboxInfo.pic" alt="">
      </div>
      <div class="info mh-flex-1">
        <div class="mh-flex mh-vertical-center mh-align-between">
          <div class="name fontColor">{{iboxInfo.name}}</div>
          <!-- <div class="choose fontColor mh-center" @click="chooseList">
            选择资产
            <img class="bottom_allow" src="@/assets/common/bottom_allow.png" alt="">
          </div> -->
        </div>
        <div class="num">数量1</div>
      </div>
    </div>
    <div class="downCon">
      <img src="@/assets/diamonds/down_icon.png" alt="">
    </div>
    <div class="title">到Mega Hero游戏</div>
    <div class="section mh-center mh-line-feed">
      <div class="box container mh-flex mh-vertical-center" v-if="exchangeInfo.spirit">
        <div class="imgCon">
          <img :src="iboxInfo.pic" alt="">
        </div>
        <div class="info mh-flex-1">
          <div>
            <div class="name fontColor">{{exchangeInfo.spirit.name}}</div>
          </div>
          <div class="num">数量1</div>
        </div>
      </div>
      <img v-if="exchangeInfo.spirit && (exchangeInfo.gods.length || exchangeInfo.diamondCard != 0)" class="plus_icon" src="@/assets/common/plus_icon.png" alt="">
      <div class="box container mh-flex mh-vertical-center" v-if="exchangeInfo.gods.length">
        <div class="head_name" v-if="exchangeInfo.godsStar">{{exchangeInfo.godsStar}}星极品英雄任选</div>
        <div class="imgCon">
          <img src="@/assets/common/question_icon.png" alt="">
        </div>
        <div class="info mh-flex-1">
          <div class="mh-flex mh-vertical-center mh-align-between">
            <div class="choose fontColor mh-center" @click="chooseList">
              <div class="line1">{{spiritInfo.tokenId?spiritInfo.name:'神灵'}}</div>
              <img class="bottom_allow" src="@/assets/common/bottom_allow.png" alt="">
            </div>
          </div>
          <div class="num">数量1</div>
        </div>
      </div>
      <img v-if="exchangeInfo.gods.length && exchangeInfo.diamondCard != 0" class="plus_icon" src="@/assets/common/plus_icon.png" alt="">
      <div class="box container mh-flex mh-vertical-center" v-if="exchangeInfo.diamondCard != 0">
        <div class="head_name">价值500钻石</div>
        <div class="imgCon">
          <img src="@/assets/common/card.png" alt="">
        </div>
        <div class="info mh-flex-1">
          <div>
            <div class="name fontColor">钻石卡</div>
          </div>
          <div class="num">数量{{exchangeInfo.diamondCard}}</div>
        </div>
      </div>
    </div>
    <div class="footBtn text-center" @click="exchangeFun">立即兑换</div>
    <div class="tip text-center">手续费：<span>0（限时优惠）</span></div>
    <!--  -->
    <SelectAsset @chooseInfo="chooseInfo" ref="SelectAsset" />
    <LoadingModal ref="LoadingModal" />
    <TipModal @confirmFun="confirmFun" ref="TipModal" />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { getXWorldService } from "@/xworldjs/xworldjs";
import { metadataApi, centerApi } from "@/api/user";
import SelectAsset from "@/components/SelectAsset";
import LoadingModal from "@/components/Loading";
import TipModal from "@/components/TipModal";
import { add } from "@/utils/bignumber";
import AES from "@/utils/AES.js";
import { assetsOption } from "@/utils/status";
import { convertStringToNumber } from "@/utils/bignumber";
export default {
  name: "IBoxExchange",
  components: { SelectAsset, LoadingModal, TipModal },
  computed: {},
  data() {
    return {
      tokenId: null,
      iboxInfo: {},
      assetCount: 1,
      exchangeInfo: {},
      spiritInfo: {},
      isSuccess: false
    };
  },
  computed: {
    ...mapGetters(["account", "web3", "signatureInfo"])
  },
  created() {
    this.tokenId = this.$route.query.id;
    this.getData();
    this.getExchangeInfo();
  },
  mounted() {},
  methods: {
    getExchangeInfo() {
      this.exchangeInfo = assetsOption.find(item => {
        return item.tokenId.includes(this.tokenId);
      });
    },
    getData() {
      metadataApi({
        tokenId: this.tokenId,
        assetType: "iBox"
      })
        .then(response => {
          if (response.code == 1) {
            this.iboxInfo = response.data;
          } else {
            this.$toast(response.message);
          }
        })
        .catch(error => {});
    },
    chooseList() {
      this.$refs["SelectAsset"].initData(this.exchangeInfo.gods);
    },
    chooseInfo(info) {
      this.spiritInfo = info;
    },
    exchangeFun() {
      if (this.exchangeInfo.gods.length && !this.spiritInfo.tokenId) {
        this.$toast("请选择神灵");
        return;
      }
      let mpType = [];
      if (this.exchangeInfo.spirit && this.exchangeInfo.spirit.tokenId) {
        mpType.push(convertStringToNumber(this.exchangeInfo.spirit.tokenId));
      }
      if (this.spiritInfo && this.spiritInfo.tokenId) {
        mpType.push(convertStringToNumber(this.spiritInfo.tokenId));
      }
      this.$refs["LoadingModal"].initData();
      try {
           await getXWorldService().iboxTokenContract.setApprovalForAll(this.account,this.config.diamondcardpool);
        } catch (err) {
          console.log("授权失败");
          this.$refs["LoadingModal"].close();
          this.$refs["TipModal"].initData("授权失败");
        }  
      getXWorldService()
        .operatorProxyContract.exchangeIbox(this.tokenId, mpType, this.account)
        .then(data => {
          // success
          this.$refs["LoadingModal"].close();
          this.isSuccess = true;
          this.$refs["TipModal"].initData("兑换成功");
        })
        .catch(error => {
          console.log("error", error);
          // Failure
          this.$refs["LoadingModal"].close();
          this.isSuccess = false;
          this.$refs["TipModal"].initData("交易失败");
        });
      // this.$store
      //   .dispatch("user/userLoginFun", {
      //     cmd: "getNonce",
      //     data: {
      //       address: this.account
      //     }
      //   })
      //   .then(response => {
      //     this.exchangeBox();
      //   })
      //   .catch(error => {});
    },
    confirmFun() {
      if (this.isSuccess) {
        this.$router.go(-1);
      }
    },
    async exchangeBox() {
      let nonceNum = this.signatureInfo.nonceNum;

      let web3Sign = await this.web3.eth.personal.sign(
        add(nonceNum, 1),
        this.account
      );
      let nonce = AES.encrypt(this.account + " " + web3Sign);

      let sign = AES.signSecret({
        iboxAssetId: this.tokenId,
        assetCount: this.assetCount,
        nonce: nonce,
        cmd: "getTextractIBoxAsset"
      });
      centerApi(
        {
          iboxAssetId: this.tokenId,
          assetCount: this.assetCount,
          code: this.code,
          nonce: nonce,
          sign: sign
        },
        "getTextractIBoxAsset"
      )
        .then(response => {
          if (response.code == 0) {
          } else {
            this.$toast(response.message);
          }
        })
        .catch(error => {});
    }
  }
};
</script>
<style lang="scss" scoped>
.iBox_exchange {
  background-color: #c5ac84;
  padding: 40px 32px;
  .title {
    font-size: 30px;
    font-family: PingFang SC;
    font-weight: bold;
    color: #56412e;
    margin-bottom: 20px;
  }
  .box {
    background: linear-gradient(180deg, #f8cb8e 0%, #e1b687 100%);
    box-shadow: 0px 6px 12px rgba(0, 0, 0, 0.16);
    border-radius: 20px;
    padding: 40px 30px;
    .imgCon {
      width: 90px;
      height: 92px;
      border-radius: 10px;
      overflow: hidden;
      margin-right: 38px;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .fontColor {
      font-size: 36px;
      font-family: Microsoft YaHei;
      font-weight: 400;
      color: #943e01;
    }
    .info {
      .num {
        font-size: 28px;
        font-family: Alibaba PuHuiTi;
        font-weight: 400;
        color: #5e2f2f;
        margin-top: 22px;
      }
    }
    .bottom_allow {
      width: 32px;
      height: 22px;
      margin-left: 14px;
    }
  }
  .downCon {
    width: 78px;
    height: 54px;
    margin: 0 auto;
    margin-top: 38px;
    img {
      width: 100%;
    }
  }
  .section {
    .container {
      width: 314px;
      height: 188px;
      padding: 0 20px;
      margin-bottom: 46px;
      position: relative;
      .head_name {
        position: absolute;
        top: 14px;
        left: 20px;
        font-size: 20px;
        font-family: Alibaba PuHuiTi;
        font-weight: 400;
        color: #5e2f2f;
        padding-bottom: 6px;
      }
      .imgCon {
        margin-right: 12px;
      }
      .info {
        .num {
          margin-top: 14px;
        }
      }
    }
    .plus_icon {
      width: 38px;
      height: 38px;
      margin: 0 10px;
      margin-bottom: 46px;
    }
  }
  .footBtn {
    width: 392px;
    height: 146px;
    margin: 0 auto;
    margin-top: 162px;
    background-image: url("../../assets/common/btns_bg.png");
    background-repeat: no-repeat;
    background-size: 100% 100%;
    font-size: 44px;
    font-family: PingFang SC;
    font-weight: bold;
    color: #ffffff;
    text-shadow: 0px 1px 3px rgba(0, 0, 0, 0.16);
    padding-top: 30px;
  }
  .tip {
    font-size: 30px;
    font-family: PingFang SC;
    font-weight: bold;
    color: #56412e;
    margin: 76px auto;
    span {
      color: #d60019;
    }
  }
  .line1 {
    word-wrap: break-word;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowarp;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
  }
}
</style>

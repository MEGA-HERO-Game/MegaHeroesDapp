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
          <div class="choose fontColor mh-center" @click="chooseList">
            选择资产
            <img class="bottom_allow" src="@/assets/common/bottom_allow.png" alt="">
          </div>
        </div>
        <div class="num">数量1</div>
      </div>
    </div>
    <div class="downCon">
      <img src="@/assets/diamonds/down_icon.png" alt="">
    </div>
    <div class="title">到Mega Hero游戏</div>
    <div class="section mh-center mh-line-feed">
      <div class="box container mh-flex mh-vertical-center">
        <div class="imgCon">
          <img :src="iboxInfo.pic" alt="">
        </div>
        <div class="info mh-flex-1">
          <div>
            <div class="name fontColor">{{iboxInfo.name}}</div>
          </div>
          <div class="num">数量1</div>
        </div>
      </div>
      <img class="plus_icon" src="@/assets/common/plus_icon.png" alt="">
      <div class="box container mh-flex mh-vertical-center">
        <div class="head_name">6星极品英雄任选</div>
        <div class="imgCon">
          <img src="@/assets/common/question_icon.png" alt="">
        </div>
        <div class="info mh-flex-1">
          <div class="mh-flex mh-vertical-center mh-align-between">
            <div class="choose fontColor mh-center">
              神灵
              <img class="bottom_allow" src="@/assets/common/bottom_allow.png" alt="">
            </div>
          </div>
          <div class="num">数量1</div>
        </div>
      </div>
      <img class="plus_icon" src="@/assets/common/plus_icon.png" alt="">
      <div class="box container mh-flex mh-vertical-center">
        <div class="head_name">价值500钻石</div>
        <div class="imgCon">
          <img src="@/assets/common/card.png" alt="">
        </div>
        <div class="info mh-flex-1">
          <div>
            <div class="name fontColor">Luna</div>
          </div>
          <div class="num">数量1</div>
        </div>
      </div>
    </div>
    <div class="footBtn text-center">立即兑换</div>
    <div class="tip text-center">手续费：<span>0（限时优惠）</span></div>
    <!--  -->
    <SelectAsset ref="SelectAsset" />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { getXWorldService } from "@/xworldjs/xworldjs";
import { metadataApi } from "@/api/user";
import SelectAsset from "@/components/SelectAsset";
export default {
  name: "IBoxExchange",
  components: { SelectAsset },
  computed: {},
  data() {
    return {
      tokenId: null,
      iboxInfo: {}
    };
  },
  computed: {
    ...mapGetters(["accountInfo", "account", "web3"])
  },
  created() {
    this.tokenId = this.$route.query.id;
    this.getData();
  },
  mounted() {},
  methods: {
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
      this.$refs["SelectAsset"].initData();
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
}
</style>

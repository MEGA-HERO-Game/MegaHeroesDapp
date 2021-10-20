<template>
  <div class="knapsack-dialog" v-if="show">
    <div class="knapsack-box">
      <img @click="show = false" class="close-icon" src="@/assets/home/close.png" alt="">
      <div class="header mh-flex mh-vertical-center">
        <div class="headCon">
          <img src="@/assets/knapsack/img_1.png" alt="">
        </div>
        <div class="info">
          <div class="name">牛顿</div>
          <div class="star mh-center">
            <img src="@/assets/knapsack/icon_10.png" alt="">
            <img src="@/assets/knapsack/icon_10.png" alt="">
            <img src="@/assets/knapsack/icon_10.png" alt="">
            <img src="@/assets/knapsack/icon_10.png" alt="">
            <img src="@/assets/knapsack/icon_10.png" alt="">
          </div>
        </div>
        <div class="rightCon">
          <div class="nft mh-center">NFT</div>
          <img src="@/assets/knapsack/img_5.png" alt="">
        </div>
      </div>
      <div class="knapsack-title text-center">英雄四维</div>
      <div class="chartCon mh-flex mh-line-feed">
        <div class="chartItem mh-center">
          <img class="chartImg" src="@/assets/knapsack/icon_12.png" alt="">
          <div class="progressCon">
            <div></div>
            <div class="progress"></div>
          </div>
        </div>
        <div class="chartItem mh-center">
          <img class="chartImg" src="@/assets/knapsack/icon_13.png" alt="">
          <div class="progressCon">
            <div></div>
            <div class="progress"></div>
          </div>
        </div>
        <div class="chartItem mh-center">
          <img class="chartImg" src="@/assets/knapsack/icon_14.png" alt="">
          <div class="progressCon">
            <div></div>
            <div class="progress"></div>
          </div>
        </div>
        <div class="chartItem mh-center">
          <img class="chartImg" src="@/assets/knapsack/icon_15.png" alt="">
          <div class="progressCon">
            <div></div>
            <div class="progress"></div>
          </div>
        </div>
      </div>
      <div class="knapsack-title text-center">专属技能</div>
      <div class="mh-flex skill">
        <div class="skillItem mh-center">
          <img src="@/assets/knapsack/img_6.png" alt="">
          <div>技能名字</div>
        </div>
        <div class="skillItem mh-center">
          <img src="@/assets/knapsack/img_7.png" alt="">
          <div>技能名字</div>
        </div>
      </div>
      <div class="intro">
        牛顿是深海的防御者，他的人生格言就是”人在塔在”。他可以对敌人造成高额输出，还有极高的几率击晕对手。也可以靠自身的铠甲帮助队友吸收敌人造成的大量伤害。
      </div>
      <div class="home-title mh-center">存入</div>
      <div class="footerCon">
        <div class="footerItem mh-center">
          <div class="name mh-flex-1 text-right">Token id</div>
          <div class="mh-flex-1 text-left">6569911211</div>
        </div>
        <div class="mh-center">
          <div class="name mh-flex-1 text-right">合约地址</div>
          <div class="mh-flex-1 text-left">0x587c...20a7</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { assetInterfaceApi } from "@/api/user";
export default {
  name: "Dialog",
  props: {},
  computed: {
    ...mapGetters(["accountInfo", "account", "web3"])
  },
  data() {
    return {
      show: false
    };
  },
  methods: {
    init(info) {
      this.show = true;
      this.getDetail(info.typeId);
    },
    getDetail(id) {
      assetInterfaceApi({
        cmd: "GET_HERO_DETAIL",
        requestUserId: this.accountInfo.userId,
        token: this.accountInfo.token,
        requestTime: new Date().valueOf(),
        id: id
      })
        .then(response => {
          if (response.code == 1) {
          } else {
            this.$toast(response.errorMessage);
          }
        })
        .catch(error => {});
    }
  }
};
</script>

<style lang="scss" scoped>
.knapsack-dialog {
  position: fixed;
  top: 120px;
  left: 0;
  z-index: 2;
  width: 100%;
  height: calc(100vh - 120px);
  background-color: rgba(91, 79, 60, 1);
  overflow: auto;
  padding: 56px 32px;
  .close-icon {
    width: 60px;
    height: 60px;
    position: absolute;
    top: -20px;
    right: -20px;
  }
  .knapsack-box {
    width: 100%;
    background-color: rgba($color: #000000, $alpha: 0.4);
    border-radius: 20px;
    position: relative;
    .header {
      padding-left: 18px;
      padding-bottom: 30px;
      .headCon {
        margin-right: 26px;
        img {
          width: 126px;
          height: 128px;
        }
      }
      .info {
        .name {
          font-size: 36px;
          font-family: Alibaba PuHuiTi;
          font-weight: bold;
          color: #ffffff;
          -webkit-text-stroke: 0.800000011920929px #382d1d;
        }
        .star {
          margin-top: 20px;
          img {
            width: 46px;
            height: 44px;
            margin-right: 8px;
          }
        }
      }
      .rightCon {
        padding-top: 82px;
        img {
          width: 102px;
          height: 102px;
          margin-left: 52px;
        }
        .nft {
          width: 118px;
          height: 60px;
          background-color: rgba($color: #d6b08f, $alpha: 0.5);
          border-radius: 0px 0px 8px 8px;
          font-size: 28px;
          font-family: Alibaba PuHuiTi;
          font-weight: 400;
          color: #ffffff;
          position: absolute;
          top: 0;
          right: 68px;
        }
      }
    }
    .knapsack-title {
      width: 206px;
      height: 63px;
      background-image: url("../../../assets/knapsack/icon_11.png");
      background-repeat: no-repeat;
      background-size: 100% 100%;
      font-size: 32px;
      font-family: Microsoft YaHei;
      font-weight: 400;
      color: #ffffff;
      position: relative;
      left: -12px;
      margin-bottom: 46px;
    }
    .chartCon {
      margin-bottom: 34px;
      .chartItem {
        margin-bottom: 10px;
        .chartImg {
          width: 60px;
          height: 62px;
        }
        .progressCon {
          .progress {
            width: 270px;
            height: 12px;
            background-color: #724600;
            border: 2px solid #f5a031;
            border-radius: 12px;
          }
        }
      }
    }
    .skill {
      padding: 8px 0 62px 32px;
      .skillItem {
        margin-right: 42px;
        img {
          width: 130px;
          height: 130px;
          margin-right: 14px;
        }
        div {
          font-size: 32px;
          font-family: Alibaba PuHuiTi;
          font-weight: bold;
          color: #ffffff;
          text-shadow: 0px 3px 6px rgba(0, 0, 0, 0.16);
          -webkit-text-stroke: 0.800000011920929px #382d1d;
        }
      }
    }
    .intro {
      padding: 0 40px;
      font-size: 28px;
      font-family: Alibaba PuHuiTi;
      font-weight: 400;
      color: #bfa993;
      margin-bottom: 60px;
    }
    .home-title {
      width: 248px;
      height: 84px;
      margin: 0 auto;
      background-image: url("../../../assets/common/btn_bg.png");
      background-repeat: no-repeat;
      background-size: 100% 100%;
      font-size: 32px;
      font-family: PingFang SC;
      font-weight: bold;
      color: #5e3a11;
    }
    .footerCon {
      font-size: 24px;
      font-family: Microsoft YaHei;
      font-weight: 400;
      color: #bfa993;
      opacity: 0.6;
      padding: 102px 0 44px 0;
      .footerItem {
        margin-bottom: 8px;
      }
      .name {
        margin-right: 100px;
      }
    }
  }
}
</style>

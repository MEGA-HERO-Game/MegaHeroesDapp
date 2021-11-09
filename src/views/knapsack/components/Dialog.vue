<template>
  <div class="knapsack-dialog" v-if="show">
    <div class="knapsack-box">
      <img @click="show = false" class="close-icon" src="@/assets/home/close.png" alt="">
      <div class="header mh-flex mh-vertical-center">
        <div class="headCon">
          <img :src="formatHeroImg(info.icon)" alt="">
        </div>
        <div class="info">
          <div class="name">{{info.name}}</div>
          <div class="star mh-center">
            <img v-for="(item, index) in info.level" :key="index" src="@/assets/knapsack/icon_10.png" alt="">
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
            <div class="progress_num">{{info.attack}}/999</div>
            <div class="progress progress_attack">
              <div class="progressChild" :style="'width: '+(info.attack/999*100)+'%'"></div>
            </div>
          </div>
        </div>
        <div class="chartItem mh-center">
          <img class="chartImg" src="@/assets/knapsack/icon_13.png" alt="">
          <div class="progressCon">
            <div class="progress_num">{{info.defense}}/999</div>
            <div class="progress progress_defense">
              <div class="progressChild" :style="'width: '+(info.defense/999*100)+'%'"></div>
            </div>
          </div>
        </div>
        <div class="chartItem mh-center">
          <img class="chartImg" src="@/assets/knapsack/icon_14.png" alt="">
          <div class="progressCon">
            <div class="progress_num">{{info.speed}}/999</div>
            <div class="progress progress_speed">
              <div class="progressChild" :style="'width: '+(info.speed/999*100)+'%'"></div>
            </div>
          </div>
        </div>
        <div class="chartItem mh-center">
          <img class="chartImg" src="@/assets/knapsack/icon_15.png" alt="">
          <div class="progressCon">
            <div class="progress_num">{{info.hp}}/999</div>
            <div class="progress progress_hp">
              <div class="progressChild" :style="'width: '+(info.hp/999*100)+'%'"></div>
            </div>
          </div>
        </div>
      </div>
      <div class="knapsack-title text-center">专属技能</div>
      <div class="mh-flex skill">
        <div class="skillItem mh-center">
          <img :src="formatSkillImg(info.skillIcon1)" alt="">
          <div>{{info.skillName1}}</div>
        </div>
        <div class="skillItem mh-center">
          <img :src="formatSkillImg(info.skillIcon2)" alt="">
          <div>{{info.skillName2}}</div>
        </div>
      </div>
      <div class="intro">
        {{info.skillIntro1}}<br>
        {{info.skillIntro2}}
      </div>
      <div class="home-title mh-center" v-if="basicInfo.type == 1 && info.assetType != 3" @click="jumpExtract">提取</div>
      <div class="home-title mh-center" v-if="basicInfo.type == 2">存入</div>
      <div class="footerCon">
        <div class="footerItem mh-center">
          <div class="name mh-flex-1 text-right">Token id</div>
          <div class="mh-flex-1 text-left">{{info.typeId}}</div>
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
import { centerApi } from "@/api/user";
import imgPath from "@/views/mixins/imgPath";
import AES from "@/utils/AES.js";
export default {
  name: "Dialog",
  mixins: [imgPath],
  props: {},
  computed: {
    ...mapGetters(["account", "web3", "signatureInfo"])
  },
  data() {
    return {
      show: false,
      basicInfo: {},
      info: {}
    };
  },
  methods: {
    init(info, basicInfo) {
      this.show = true;
      info.level = parseFloat(info.level);
      this.info = info;
      this.basicInfo = basicInfo;
      // this.getDetail(info.typeId || info.tokenId);
    },
    getDetail(id) {
      centerApi({
        tokenId: id,
        // nonce: this.signatureInfo.nonce,
        sign: AES.signSecret({
          // nonce: this.signatureInfo.nonce,
          cmd: "assetInfo",
          tokenId: id,
        })
      }, "assetInfo")
        .then(response => {
          if (response.code == 1) {
            this.info = response.info;
          } else {
            this.$toast(response.errorMessage);
          }
        })
        .catch(error => {});
    },
    jumpExtract(){
      this.$router.push({
        path: "/knapsack/extract",
        query: {
          id: this.info.typeId
        }
      });
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
          position: relative;
          .progress_num {
            font-size: 32px;
            font-family: Alibaba PuHuiTi;
            font-weight: bold;
            color: #ffffff;
            position: absolute;
            bottom: 0px;
            left: 10px;
          }
          .progress {
            width: 270px;
            height: 12px;
            border-radius: 12px;
            .progressChild {
              width: 0;
              max-width: 100%;
              height: 100%;
            }
          }
          .progress_attack {
            background-color: #724600;
            border: 2px solid #f5a031;
            .progressChild {
              background-color: #f5a031;
            }
          }
          .progress_defense {
            background-color: #054d85;
            border: 2px solid #40a3ea;
            .progressChild {
              background-color: #40a3ea;
            }
          }
          .progress_speed {
            background-color: #075354;
            border: 2px solid #37ce73;
            .progressChild {
              background-color: #37ce73;
            }
          }
          .progress_hp {
            background-color: #5f1616;
            border: 2px solid #e85857;
            .progressChild {
              background-color: #e85857;
            }
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

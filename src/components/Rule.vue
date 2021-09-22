<template>
  <div class="rules" :hidden="show">
    <img @click="show = true" class="close-icon" src="@/assets/home/close.png" alt="">
    <div class="bg_title text-center">
      规则说明
    </div>
    <div class="rule-content">
      <div class="item">
        <div class="title">1、激活游戏账号的前提条件</div>
        <div class="text">
          ①须持有MH通行证NFT或者<br>
          ②五星神灵、六星神灵NFT，神灵NFT只需持有一种即可。
        </div>
      </div>
      <div class="item">
        <div class="title">2、激活游戏账号的NFT资产获取</div>
        <div class="text">
          ①需要将iBox平台的资产提取到钱包，再链接Mego Hero的DAPP，通过Mega Hero的iBox资产兑换功能，兑换成Mega Hero的资产，如果兑换得到的资产，符合激活游戏账号的前提条件，就可以进行报名。
          <br>
          ②获取流程：进入首页—找到iBox资产兑换功能，并且进入—输入要兑换的iBox—获得Mega Hero的NFT资产
        </div>
      </div>
      <div class="item">
        <div class="title">3、报名规则</div>
        <div class="text">
          ①您必须在激活游戏账号后，才可以去报名<br>
          ②为了让您有更好的游戏体验，获得更多的收益，目前暂定每日限量进入游戏的名额为1600人，如果当日报名数额已满，也可进行报名，但需第二天才能进入游戏。
        </div>
      </div>
      <div class="item">
        <div class="title">4、报名资产回收规则</div>
        <div class="text">
          ①如果手中只持有通行证，报名后，通行证会进行回收，如果持有多张，则随机回收其中一张。<br>
          ②如果手中持有5星或者6星神灵，报名后，不做回收，<br>
          ③如果手中持有5星或者6星神灵以及通行证，报名后，只对通行证进行回收。
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "Rule",
  props: {},
  computed: {},
  data() {
    return {
      show: true
    };
  },
  methods: {
    init() {
      this.show = false;
    }
  }
};
</script>

<style lang="scss" scoped>
.rules {
  position: fixed;
  top: 120px;
  left: 0;
  z-index: 2;
  width: 100%;
  height: 100%;
  background-color: rgba($color: #000000, $alpha: 0.75);
  overflow: auto;
  .close-icon {
    width: 60px;
    height: 60px;
    position: absolute;
    top: 88px;
    right: 22px;
  }
  .bg_title {
    margin-top: 154px;
  }
  .rule-content {
    padding: 38px 62px 162px 74px;
    .item {
      margin-bottom: 48px;
    }
    .title {
      font-size: 28px;
      font-family: PingFang SC;
      font-weight: 500;
      color: #ffffff;
      margin-bottom: 26px;
    }
    .text {
      font-size: 24px;
      font-family: PingFang SC;
      font-weight: 500;
      line-height: 36px;
      color: #ffffff;
    }
  }
}
</style>

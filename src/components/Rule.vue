<template>
  <div class="rules" :hidden="show">
    <img @click="show = true" class="close-icon" src="@/assets/home/close.png" alt="">
    <div class="bg_title text-center">
      规则说明
    </div>
    <div class="rule-content">
      <div class="item">
        <div class="title">1、激活游戏账号</div>
        <div class="text">①在iBox平台将相应资产提取到个人钱包</div>
        <div class="text">②登录Mega Hero官网，链接钱包，并注册登录</div>
        <div class="text">③点击开始游戏，须持有N级、SR级或者SSR级的NFT资产才可激活账号</div>
      </div>
      <div class="item">
        <div class="title">2、创建游戏角色</div>
        <div class="text">①持有激活账号的NFT资产</div>
        <div class="text">②下载游戏客户端</div>
        <div class="text">③用注册的账号和密码进行登录，选择服务器，创建游戏角色</div>
        <div class="text">④购买钻石的功能必须在创建角色状态下，才能使用</div>
      </div>
      <div class="item">
        <div class="title">3、质押</div>
        <div class="text">①质押的资产为三种类别的钻石卡，通过购买钻石卡功能获得质押资产</div>
        <div class="text">②质押资产的用户分配的收益为USDT，来源为用户购买钻石和钻石卡消耗的USDT，其中60%会进入分红池</div>
        <div class="text">③个人的收益按照个人质押资产价值跟质押总资产价值占比进行分配</div>
        <div class="text">④年化收益率=过去24小时分配的USDT*365/质押钻石总价值</div>
      </div>
      <div class="item">
        <div class="title">4、Mega Hero整体操作流程</div>
        <div class="text">
          链接钱包地址—点击创建游戏账户—注册—回到首页点击开始游戏—下载游戏客户端—输入账号和密码—选择服务器—角色创建
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
    top: 30px;
    right: 30px;
  }
  .bg_title {
    margin-top: 48px;
  }
  .rule-content {
    padding: 38px 62px 162px 74px;
    .item {
      margin-bottom: 48px;
    }
    .title {
      font-size: 32px;
      font-family: PingFang SC;
      font-weight: 500;
      color: #ffffff;
      margin-bottom: 22px;
    }
    .text {
      font-size: 24px;
      font-family: PingFang SC;
      font-weight: 500;
      line-height: 34px;
      color: #ffffff;
      margin-bottom: 30px;
    }
  }
}
</style>

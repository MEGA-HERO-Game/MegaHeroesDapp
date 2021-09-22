<template>
  <div class="rule-page">
    <div class="rule-content">
      <div class="title_con text-center">
        激活报名规则
      </div>
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
    <div class="sign-up-btn text-center">去报名</div>
  </div>
</template>

<script>
export default {
  name: "Rule",
  components: {},
  computed: {},
  data() {
    return {};
  },
  created() {},
  mounted() {}
};
</script>
<style lang="scss" scoped>
.rule-page {
  background-color: #c5ac84;
  padding: 94px 32px 66px 32px;
  .rule-content {
    padding: 70px 30px 40px 30px;
    position: relative;
    background-color: #ad8c66;
    border-radius: 20px;
    .title_con {
      width: 572px;
      height: 98px;
      background-image: url("../../assets/common/title_bg.png");
      background-repeat: no-repeat;
      background-size: 100% 100%;
      position: absolute;
      top: -54px;
      left: 50%;
      transform: translate(-50%, 0);
      padding-top: 22px;
      font-size: 32px;
      font-family: PingFang SC;
      font-weight: 800;
      color: #ffffff;
      text-shadow: 0px 3px 6px rgba(0, 0, 0, 0.16);
    }
    .item {
      margin-bottom: 30px;
      .title {
        font-size: 32px;
        font-family: PingFang SC;
        font-weight: 800;
        line-height: 48px;
        color: #ffffff;
        margin-bottom: 20px;
      }
      .text {
        font-size: 28px;
        font-family: PingFang SC;
        font-weight: 400;
        line-height: 48px;
        color: #ffffff;
        opacity: 0.8;
      }
    }
  }
  .sign-up-btn {
    width: 392px;
    height: 146px;
    margin: 0 auto;
    margin-top: 40px;
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
}
</style>

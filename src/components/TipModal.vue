<template>
  <div class="tipModal">
    <van-dialog className="tipModal" class="dialog" v-model="show" title="" :show-confirm-button="false" get-container="body">
      <div class="tip text-center">{{msg}}</div>
      <!-- <div class="tip text-center">交易被拒绝</div> -->
      <div class="home-title mh-center" @click="close">确认</div>
    </van-dialog>
  </div>
</template>

<script>
export default {
  name: "TipModal",
  props: {
    text: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      show: false,
      msg: ""
    };
  },
  methods: {
    initData(msg) {
      this.msg = msg;
      this.show = true;
    },
    close() {
      this.show = false;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.dialog.tipModal {
  width: 624px;
  background-color: #c5ac84;
  border: 2px solid #ffe1ab;
  border-radius: 16px;
  .tip {
    margin-top: 132px;
    margin-bottom: 60px;
    font-size: 36px;
    font-family: PingFang SC;
    font-weight: bold;
    color: #452b0d;
  }
  .home-title {
    width: 248px;
    height: 84px;
    margin: 0 auto;
    margin-bottom: 46px;
    background-image: url("../assets/common/btn_bg.png");
    background-repeat: no-repeat;
    background-size: 100% 100%;
    font-size: 32px;
    font-family: PingFang SC;
    font-weight: bold;
    color: #5e3a11;
  }
}
</style>
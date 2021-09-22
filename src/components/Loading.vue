<template>
  <div class="loadingModal">
    <van-dialog className="loadingModal" class="dialog" v-model="show" title="" :show-confirm-button="false" get-container="body">
      <div class="mh-center">
        <van-loading type="spinner" size="24px" />
        <div class="tip">交易正在确认中…</div>
      </div>
    </van-dialog>
  </div>
</template>

<script>
export default {
  name: "LoadingModal",
  props: {
    text: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      show: false
    };
  },
  methods: {
    initData() {
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
.dialog.loadingModal {
  width: 624px;
  background-color: #c5ac84;
  border: 2px solid #ffe1ab;
  border-radius: 16px;
  padding-top: 70px;
  padding-bottom: 48px;
  .tip {
    font-size: 36px;
    font-family: PingFang SC;
    font-weight: bold;
    color: #452b0d;
    margin-left: 24px;
  }
}
</style>
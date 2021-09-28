<template>
  <div class="cardModal">
    <van-dialog className="cardModal" class="dialog" v-model="show" title="" :show-confirm-button="false" get-container="body">
      <img @click="show = !show" class="close_icon" src="@/assets/home/close.png" alt="">
      <div class="title">选择礼品卡</div>
      <div class="cardList">
        <div class="cardItem mh-flex mh-vertical-center" :class="{active: item.val == info.val}" v-for="(item, index) in diamondsOption" :key="index" @click="toggleCard(item)">
          <img src="@/assets/common/card.png" alt="">
          <div class="cardName">{{item.name}}</div>
          <div class="cardVal">价值{{item.val}}钻石</div>
        </div>
      </div>
    </van-dialog>
  </div>
</template>

<script>
import { diamondsOption, diamondsPrice } from "@/utils/status";
export default {
  name: "CardModal",
  props: {
    text: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      show: false,
      diamondsOption,
      info: {
        name: null,
        val: null
      }
    };
  },
  methods: {
    initData(info) {
      this.info = info;
      this.show = true;
    },
    toggleCard(item){
      this.$emit("getCard", item);
      this.close();
    },
    close() {
      this.show = false;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.dialog.cardModal {
  width: 686px;
  background-color: #ffe5c3;
  box-shadow: 0px 6px 12px rgba(0, 0, 0, 0.16);
  border-radius: 12px;
  overflow: visible;
  .close_icon {
    width: 60px;
    position: absolute;
    top: -30px;
    right: -26px;
  }
  .title {
    text-align: center;
    font-size: 36px;
    font-family: Alibaba PuHuiTi;
    font-weight: bold;
    color: #5e2f2f;
    padding: 24px 0;
  }
  .cardList {
    .cardItem {
      padding: 16px 0 14px 172px;
      border-top: 1px solid rgba(213, 145, 61, 0.4);
      img {
        width: 70px;
        height: 70px;
      }
      .cardName {
        font-size: 28px;
        font-family: Alibaba PuHuiTi;
        font-weight: 400;
        color: #5e2f2f;
        margin-left: 26px;
        margin-right: 10px;
      }
      .cardVal {
        font-size: 20px;
        font-family: Alibaba PuHuiTi;
        font-weight: 400;
        color: #5e2f2f;
        opacity: 0.3;
      }
    }
    .active {
      background-color: rgba(213, 145, 61, 0.3);
    }
  }
}
</style>
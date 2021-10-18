<template>
  <div class="selectAssetModal">
    <van-dialog className="selectAssetModal" class="dialog" v-model="show" title="" :show-confirm-button="false" get-container="body">
      <img @click="show = !show" class="close_icon" src="@/assets/home/close.png" alt="">
      <div class="title">选择资产</div>
      <div class="mh-flex mh-vertical-center search-con">
        <img class="search_icon" src="@/assets/common/search_icon.png" alt="">
        <van-field class="search_input" v-model="text" label="" />
      </div>
      <div class="assetList">
        <div class="assetItem mh-flex mh-vertical-center" v-for="(item, index) in list" :key="index">
          <div class="assetImg">
            <img src="@/assets/knapsack/img_2.png" alt="">
          </div>
          <div class="assetInfo mh-flex-1">
            <div class="assetName">修谱诺斯</div>
            <div class="assetIntro">阵营、职业、四维</div>
          </div>
        </div>
      </div>
    </van-dialog>
  </div>
</template>

<script>
export default {
  name: "SelectAsset",
  props: {
    text: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      show: false,
      list: 3
    };
  },
  methods: {
    initData() {
      this.show = true;
    },
    toggleCard(item) {
      // this.$emit("getCard", item);
      // this.close();
    },
    close() {
      this.show = false;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.dialog.selectAssetModal {
  width: 624px;
  background-color: #c5ac84;
  border: 2px solid #ffe1ab;
  border-radius: 16px;
  padding: 40px;
  overflow: visible;
  .close_icon {
    width: 60px;
    position: absolute;
    top: -30px;
    right: -26px;
  }
  .title {
    font-size: 36px;
    font-family: PingFang SC;
    font-weight: 800;
    color: #452b0d;
    margin-bottom: 40px;
  }
  .search-con {
    background-color: rgba($color: #937c5d, $alpha: 0.6);
    border-radius: 46px;
    padding: 0 40px;
    .search_icon {
      width: 39px;
      height: 39px;
      margin-right: 20px;
    }
    .search_input {
      font-size: 30px;
      font-family: Microsoft YaHei;
      font-weight: 400;
      background-color: transparent;
      padding: 20px 0;
    }
  }
  .assetList {
    max-height: 600px;
    margin-top: 30px;
    overflow: auto;
    .assetItem {
      background-color: #d8bf97;
      border: 2px solid #ffe1ab;
      border-radius: 12px;
      padding: 30px;
      margin-bottom: 20px;
      .assetImg {
        width: 90px;
        height: 92px;
        margin-right: 20px;
        img {
          width: 100%;
          height: 100%;
        }
      }
      .assetInfo {
        .assetName {
          font-size: 32px;
          font-family: PingFang SC;
          font-weight: bold;
          color: #452b0d;
          margin-bottom: 8px;
        }
        .assetIntro {
          font-size: 28px;
          font-family: Microsoft YaHei;
          font-weight: 400;
          color: rgba($color: #452b0d, $alpha: 0.6);
        }
      }
    }
  }
}
</style>

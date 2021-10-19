<template>
  <div class="iBox_index">
    <div class="bg_title text-center">
      iBox资产
    </div>
    <div class="box mh-flex mh-line-feed">
      <div class="item" v-for="(item, index) in list" :key="index" @click="goExchange(item.tokenId)">
        <img :src="item.pic" alt="">
      </div>
    </div>
    <div class="footTip text-center">☆点击资产图标直接进入iBox资产兑换页面</div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { getXWorldService } from "@/xworldjs/xworldjs";
import { metadataApi } from "@/api/user";
export default {
  name: "IBoxIndex",
  components: {},
  computed: {},
  data() {
    return {
      list: [],
      toast: null
    };
  },
  computed: {
    ...mapGetters(["accountInfo", "account", "web3"])
  },
  watch: {
    accountInfo: {
      handler: function(val, oldVal) {
        if (
          this.accountInfo &&
          this.accountInfo.userId &&
          this.accountInfo.token
        ) {
          this.getData();
        }
      },
      deep: true,
      immediate: true
    }
  },
  created() {},
  mounted() {},
  methods: {
    getData() {
      this.list = [];
      this.toast = this.$toast.loading({
        message: "",
        forbidClick: true,
        loadingType: "spinner",
        duration: 0
      });
      getXWorldService()
        .iboxTokenContract.getIboxTokenId(this.account)
        .then(res => {
          for (let i = 0; i < res.length; i++) {
            this.getMetaData(res[i]);
          }
        })
        .catch(error => {
          this.toast.clear();
        });
    },
    getMetaData(tokenId) {
      metadataApi({
        tokenId: tokenId,
        assetType: "iBox"
      })
        .then(response => {
          this.toast.clear();
          if (response.code == 1) {
            this.list.push(response.data);
          } else {
            this.$toast(response.message);
          }
        })
        .catch(error => {
          this.toast.clear();
        });
    },
    goExchange(id) {
      this.$router.push({
        path: "/iBox/exchange",
        query: {
          id: id
        }
      });
    }
  },
  beforeDestroy() {
    if (this.toast) {
      this.toast.clear();
    }
  }
};
</script>
<style lang="scss" scoped>
.iBox_index {
  background-color: #c5ac84;
  padding: 50px 32px;
  .box {
    background-color: rgba($color: #ad8c66, $alpha: 0.4);
    border-radius: 20px;
    padding: 46px 13px;
    margin-top: 52px;
    .item {
      width: 112px;
      height: 114px;
      margin: 0 23px 30px 23px;
      img {
        width: 100%;
        height: 100%;
      }
    }
  }
  .footTip {
    font-size: 24px;
    font-family: PingFang SC;
    font-weight: 600;
    color: #5e2f2f;
    padding: 38px 0;
  }
}
</style>

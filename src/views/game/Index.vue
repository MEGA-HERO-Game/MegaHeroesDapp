<template>
  <div class="game-page">
    <div class="box mh-center">
      <img class="logo" src="@/assets/home/logo.png" alt="">
      <div v-if="status == 0">抱歉，您未持有激活游戏账号的NFT资产</div>
      <div v-if="status == 1">您已激活游戏账号<br>快去下载游戏，创建角色吧！</div>
      <div v-if="status == 2">
        您已持有激活游戏账号的NFT资产<br>
        赶快去下载游戏吧
      </div>
      <div v-if="status == 3">
        游戏角色未创建<br>请使用创建的账号和密码<br>登录游戏客户端，并创建角色
      </div>
      <div v-if="status == 4">
        游戏角色创建成功<br>所在游戏服务器：宙斯神庙
      </div>
    </div>
    <div v-if="status == 0" class="home-title mh-center" @click="handleRule">查看规则</div>
    <div v-if="status == 4" class="home-title mh-center" @click="handlePurchase">购买钻石</div>
    <div class="banner">
      <img src="@/assets/home/banner1.png" alt="">
    </div>

    <div class="btn_con ios_btn_img">
      <div class="ios mh-center">
        <img src="@/assets/game/ios.png" alt="">
        IOS下载
      </div>
    </div>
    <div class="btn_con android_btn_img">
      <div class="android mh-center">
        <img src="@/assets/game/android.png" alt="">
        Android下载
      </div>
    </div>
    <Rule ref="Rule"></Rule>
  </div>
</template>

<script>
import Rule from "@/components/Rule";
import { drawInterfaceApi } from "@/api/user";
import { mapGetters } from "vuex";
export default {
  name: "GameIndex",
  components: { Rule },
  computed: {
    ...mapGetters(["accountInfo"])
  },
  data() {
    return {
      status: null //0  2  3  4
    };
  },
  watch: {
    accountInfo: {
      handler: function(val, oldVal) {
        if (
          this.accountInfo &&
          this.accountInfo.userId &&
          this.accountInfo.token
        ) {
          this.getDraw();
        }
      },
      deep: true,
      immediate: true
    }
  },
  created() {},
  mounted() {},
  methods: {
    handleRule() {
      this.$refs["Rule"].init();
    },
    handlePurchase() {
      this.$router.push({ name: "Purchase" });
    },
    getDraw() {
      drawInterfaceApi({
        cmd: "GET_GAME_DRAW_STATUS",
        requestUserId: this.accountInfo.userId,
        token: this.accountInfo.token,
        requestTime: new Date().valueOf()
      })
        .then(response => {
          if (response.code == 1) {
            this.status = response.status;
          } else {
            Toast(response.errorMessage);
          }
        })
        .catch(error => {});
    }
  }
};
</script>
<style lang="scss" scoped>
.game-page {
  background-color: #c5ac84;
  padding-top: 134px;
  .box {
    background-color: #ad8c66;
    border-radius: 20px;
    position: relative;
    margin: 0 38px;
    padding-top: 42px;
    padding-bottom: 30px;
    font-size: 28px;
    font-family: PingFang SC;
    font-weight: 400;
    color: rgba($color: #ffffff, $alpha: 0.8);
    margin-bottom: 36px;
    text-align: center;
    .logo {
      width: 186px;
      height: 112px;
      position: absolute;
      top: -74px;
      left: 50%;
      transform: translate(-50%, 0);
    }
  }
  .home-title {
    width: 248px;
    height: 84px;
    margin: 0 auto;
    margin-bottom: 46px;
    background-image: url("../../assets/common/btn_bg.png");
    background-repeat: no-repeat;
    background-size: 100% 100%;
    font-size: 32px;
    font-family: PingFang SC;
    font-weight: bold;
    color: #5e3a11;
  }
  .banner {
    padding: 0 32px;
    margin-bottom: 80px;
    img {
      width: 100%;
    }
  }
  .ios_btn_img {
    background-image: url("../../assets/game/ios_bg.png");
  }
  .android_btn_img {
    background-image: url("../../assets/game/android_bg.png");
  }
  .btn_con {
    width: 392px;
    height: 146px;
    background-repeat: no-repeat;
    background-size: 100% 100%;
    margin: 0 auto;
    font-size: 44px;
    font-family: PingFang SC;
    font-weight: bold;
    color: #ffffff;
    text-shadow: 0px 1px 3px rgba(0, 0, 0, 0.16);
    padding-top: 32px;
    margin-bottom: 30px;
    .ios {
      img {
        width: 27px;
        height: 33px;
      }
    }
    .android {
      img {
        width: 34px;
        height: 39px;
      }
    }
  }
}
</style>

<template>
  <div class="navbar-page" :class="{navbarActive: show}">
    <div class="mh-flex mh-vertical-center mh-align-between">
      <div class="logoCon">
        <img class="logo" src="@/assets/layout/logo.png" alt="">
      </div>
      <div v-if="account" class="userInfo mh-flex mh-vertical-center">
        <img class="network" src="@/assets/layout/network.png" alt="">
        <div class="name">{{account | hiddenCharCenter}}</div>
      </div>
      <div v-else class="userInfo mh-flex mh-vertical-center" @click="goConnect">
        <img class="network" src="@/assets/layout/network.png" alt="">
        <div class="name">连接钱包</div>
      </div>
      <div @click="editFun" class="editPass" v-if="accountInfo && accountInfo.userId">修改密码</div>
      <!-- <img @click="show = !show" class="menu" src="@/assets/layout/menu.png" alt=""> -->
    </div>
    <div class="pop">
      <div class="content">
        <div class="content_con mh-flex mh-vertical-column">
          <div class="list mh-flex mh-vertical-column mh-flex-1 mh-align-center">
            <div class="item mh-center" @click="jumpNav('Home')">
              <div class="icon_con">
                <img src="@/assets/layout/home_icon.png" alt="">
              </div>
              <div>主页</div>
            </div>
            <div class="item mh-center" @click="jumpNav('Home')">
              <div class="icon_con">
                <img src="@/assets/layout/knapsack_icon.png" alt="">
              </div>
              <div>背包</div>
            </div>
            <div class="item mh-center" @click="jumpNav('Home')">
              <div class="icon_con">
                <img src="@/assets/layout/pledge_icon.png" alt="">
              </div>
              <div>质押</div>
            </div>
            <div class="item mh-center" @click="jumpNav('Home')">
              <div class="icon_con">
                <img src="@/assets/layout/purchase_icon.png" alt="">
              </div>
              <div>购买钻石</div>
            </div>
            <div class="item mh-center" @click="jumpNav('Profile')">
              <div class="icon_con">
                <img src="@/assets/layout/personal_icon.png" alt="">
              </div>
              <div>个人中心</div>
            </div>
          </div>
          <div class="foot mh-flex mh-align-center">
            <img src="@/assets/layout/icon1.png" alt="">
            <img src="@/assets/layout/icon2.png" alt="">
            <img src="@/assets/layout/icon3.png" alt="">
            <img src="@/assets/layout/icon4.png" alt="">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  components: {},
  data() {
    return {
      show: false
    };
  },
  computed: {
    ...mapGetters(["account", "accountInfo"]),
    getRouteName() {
      const route = this.$route;
      return route.name;
    }
  },
  watch: {},
  mounted() {},
  methods: {
    jumpNav(name) {
      this.show = false;
      if (name && name == this.getRouteName) {
        return;
      }
      this.$router.push({ name: name });
    },
    goConnect() {
      this.$store.dispatch("web3/connectWallet").then(() => {
        console.log("this.account", this.account);
      });
    },
    editFun() {
      window.location.href =
        "http://megahero.games:25001/rebind.html?addr=" + this.account;
    }
  }
};
</script>

<style lang="scss" scoped>
.navbar-page {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1;
  width: 100%;
  height: 150px;
  // background-color: #c5ac84;
  background-image: url("../../assets/layout/nav_bg.png");
  background-repeat: no-repeat;
  background-size: 100% 100%;
  padding: 16px;
  .logoCon {
    flex: 1;
    .logo {
      width: 144px;
      height: 86px;
    }
  }
  .userInfo {
    padding: 10px 20px;
    background-color: #56412e;
    border-radius: 8px;
    // margin-right: 22px;
    .network {
      width: 54px;
      height: 56px;
      margin-right: 12px;
    }
    .name {
      font-size: 30px;
      font-family: PingFang SC;
      font-weight: 500;
      color: #d7caab;
    }
  }
  .editPass {
    height: 100%;
    padding: 0 10px 0 32px;
    font-size: 32px;
    font-family: PingFang SC;
    font-weight: 500;
    line-height: 48px;
    color: #d7caab;
  }
  .menu {
    width: 58px;
    height: 60px;
  }
  .pop {
    overflow-y: auto;
    position: fixed;
    top: 150px;
    left: 0;
    z-index: 1;
    width: 0;
    height: 0;
    max-height: 100%;
    background-color: #a88d6c;
    transition: height 0.3s;
    .content {
      display: none;
      height: 100%;
      .content_con {
        height: 100%;
        .list {
          padding: 0 32px;
          .item {
            background: linear-gradient(180deg, #f8cb8e 0%, #e1b687 100%);
            box-shadow: 0px 6px 12px rgba(0, 0, 0, 0.16);
            border-radius: 20px;
            font-size: 36px;
            font-family: PingFang SC;
            font-weight: 800;
            color: #452b0d;
            padding: 22px 0;
            margin-bottom: 30px;
            div {
              width: 50%;
            }
            .icon_con {
              overflow: hidden;
              img {
                float: right;
                width: 66px;
                margin-right: 8px;
              }
            }
          }
        }
        .foot {
          width: 100%;
          height: 152px;
          background-image: url("../../assets/layout/nav_foot_bg.png");
          background-repeat: no-repeat;
          background-size: 100% auto;
          padding-top: 58px;
          img {
            width: 76px;
            height: 78px;
            margin-right: 34px;
          }
        }
      }
    }
  }
}
.navbarActive {
  background-color: #a88d6c;
  .pop {
    width: 100%;
    height: calc(100vh - 150px);
    .content {
      display: block;
    }
  }
}
</style>

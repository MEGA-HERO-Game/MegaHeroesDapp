<template>
  <div class="register-page">
    <div class="bg_title text-center">
      邮箱绑定
    </div>
    <div class="title text-center">
      请使用注册成功的邮箱或手机号<br>
      登录游戏客户端
    </div>
    <!-- <div class="nav mh-center">
      <div class="item">邮箱注册</div>
      <div class="item">手机注册</div>
    </div> -->
    <div class="mh_form">
      <van-field class="mh_input" v-model="email" placeholder="请输入邮箱" />
      <van-field class="mh_input" v-model="password" type="password" placeholder="请输入密码" />
      <div class="mh_form_tip">密码长度须在6位至8位之间</div>
      <van-field class="mh_input" v-model="password1" type="password" placeholder="请再次输入密码" />
      <!-- <div class="mh-flex mh-align-between">
        <van-field class="mh_input" v-model="code" placeholder="输入邀请码" />
        <div class="mh_form_code mh-center">邀请码</div>
      </div> -->
    </div>
    <div class="foot_btn text-center" @click="submitData">完成</div>
  </div>
</template>

<script>
import { Toast } from "vant";
import { userInterfaceApi } from "@/api/user";
import { mapGetters } from "vuex";
export default {
  name: "Register",
  components: {},
  computed: {
    ...mapGetters(["accountInfo"])
  },
  data() {
    return {
      email: "",
      password: "",
      password1: "",
      code: ""
    };
  },
  created() {},
  mounted() {},
  methods: {
    submitData() {
      if (!this.email) {
        Toast("请输入邮箱");
        return;
      }
      if (!this.password) {
        Toast("请输入密码");
        return;
      }
      if (this.password.length < 6 || this.password.length > 8) {
        Toast("密码长度须在6位至8位之间");
        return;
      }
      if (this.password != this.password1) {
        Toast("两次输入密码不一致");
        return;
      }
      userInterfaceApi({
        cmd: "EDIT_USER_DETAIL",
        requestUserId: this.accountInfo.userId,
        token: this.accountInfo.token,
        requestTime: new Date().valueOf(),
        email: this.email,
        password: this.password
      })
        .then(response => {
          if (response.code == 1) {
            this.$router.replace({ name: "Home" });
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
.register-page {
  padding: 60px 72px;
  .title {
    width: 606px;
    background-color: #ad8c66;
    border-radius: 20px;
    margin: 0 auto;
    padding: 20px 0;
    font-size: 24px;
    font-family: PingFang SC;
    font-weight: 400;
    color: rgba(255, 255, 255, 0.8);
    margin-top: 44px;
  }
  .foot_btn {
    width: 392px;
    height: 146px;
    margin: 0 auto;
    background-image: url("../../assets/profile/foot_btn_bg.png");
    background-repeat: no-repeat;
    background-size: 100% 100%;
    padding-top: 30px;
    font-size: 44px;
    font-family: PingFang SC;
    font-weight: bold;
    color: #ffffff;
    text-shadow: 0px 1px 3px rgba(0, 0, 0, 0.16);
    margin-top: 14px;
  }
}
</style>

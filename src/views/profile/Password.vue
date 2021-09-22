<template>
  <div class="password-page">
    <div class="bg_title text-center">
        修改密码
    </div>
    <div class="mh_form">
      <van-field class="mh_input" v-model="text" />
      <van-field class="mh_input" v-model="text" placeholder="请输入新密码" />
      <div class="tip">密码长度须在6位至8位之间</div>
      <van-field class="mh_input" v-model="text" placeholder="请再次输入新密码" />
      <div class="mh-flex mh-align-between">
        <van-field class="mh_input" v-model="text" placeholder="输入验证码" />
        <div class="code mh-center">验证码</div>
      </div>
    </div>
    <div class="foot_btn text-center">完成</div>
  </div>
</template>

<script>
export default {
  name: "Password",
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
.password-page {
  padding-top: 50px;
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

<template>
  <div class="profile-page">
    <div class="box mh-flex mh-vertical-center">
      <div class="head">
        <img src="@/assets/profile/head.png" alt="">
      </div>
      <div class="info">
        <div class="name">王者的潼恩</div>
        <div class="mh-flex">
          <div class="text">服务器名称</div>
          <div class="text">服务器id</div>
        </div>
      </div>
    </div>
    <div class="box mh-flex mh-vertical-center">
      <div class="name">我的状态</div>
      <div class="text mh-flex-1 text-right">游戏账号未创建</div>
      <img class="right_icon" src="@/assets/profile/right_icon.png" alt="">
    </div>
    <div class="box">
      <div class="mh-flex mh-vertical-center">
        <div class="name">游戏账号</div>
        <div class="mh-flex-1 mh-flex mh-align-right">
          <div class="text bold">q962495027@126.com</div>
          <div class="text edit">编辑</div>
        </div>
        <img class="right_icon" src="@/assets/profile/right_icon.png" alt="">
      </div>
      <span class="red_text forget">忘记密码？</span>
    </div>
    <div class="box mh-flex mh-vertical-center">
      <div class="name">手机账号</div>
      <div class="text mh-flex-1 text-right">暂未创建手机账号</div>
      <img class="right_icon" src="@/assets/profile/right_icon.png" alt="">
    </div>
    <div class="box box_list">
      <div class="name">我的邀请</div>
      <div class="list">
        <div class="item mh-center bg_30">
          <div class="text mh-flex-1 text-center bold">邀请码</div>
          <div class="text mh-flex-1 text-center bold">好友人数</div>
          <div class="text mh-flex-1 text-center bold">好友贡献收益</div>
        </div>
        <div class="item mh-center">
          <div class="text mh-flex-1 text-center bold">
            Wf89547
            <span class="red_text">复制</span>
          </div>
          <div class="text mh-flex-1 text-center bold">25</div>
          <div class="text mh-flex-1 text-center bold">5896USDT</div>
        </div>
        <div class="item mh-center bg_fff">
          <div class="text mh-flex-1 text-center bold">
            Wf89547
            <span class="red_text">复制</span>
          </div>
          <div class="text mh-flex-1 text-center bold">25</div>
          <div class="text mh-flex-1 text-center bold">5896USDT</div>
        </div>
        <div class="item mh-center">
          <div class="text mh-flex-1 text-center bold">
            Wf89547
            <span class="red_text">复制</span>
          </div>
          <div class="text mh-flex-1 text-center bold">25</div>
          <div class="text mh-flex-1 text-center bold">5896USDT</div>
        </div>
        <div class="item mh-center bg_fff">
          <div class="text mh-flex-1 text-center bold">
            Wf89547
            <span class="red_text">复制</span>
          </div>
          <div class="text mh-flex-1 text-center bold">25</div>
          <div class="text mh-flex-1 text-center bold">5896USDT</div>
        </div>
        <div class="item mh-center">
          <div class="text mh-flex-1 text-center bold">
            Wf89547
            <span class="red_text">复制</span>
          </div>
          <div class="text mh-flex-1 text-center bold">25</div>
          <div class="text mh-flex-1 text-center bold">5896USDT</div>
        </div>
        <div class="item mh-center bg_fff">
          <div class="text mh-flex-1 text-center bold">
            Wf89547
            <span class="red_text">复制</span>
          </div>
          <div class="text mh-flex-1 text-center bold">25</div>
          <div class="text mh-flex-1 text-center bold">5896USDT</div>
        </div>
      </div>
    </div>
    <div class="foot">
      <div>邀请好友，可以获得好友注册后30天内</div>
      <div>购买钻石消费的USDT的10%奖励</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Profile",
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
.profile-page {
  background-color: #c5ac84;
  padding: 40px 32px;
  .name {
    font-size: 36px;
    font-family: Alibaba PuHuiTi;
    font-weight: bold;
    color: #ffffff;
    -webkit-text-stroke: 0.800000011920929px #5e2f2f;
    // text-stroke: 0.800000011920929 #5E2F2F;
  }
  .text {
    font-size: 28px;
    font-family: Alibaba PuHuiTi;
    font-weight: 400;
    color: #5e2f2f;
  }
  .red_text {
    font-size: 28px;
    font-family: Alibaba PuHuiTi;
    font-weight: 400;
    color: #ff4343;
  }
  .bold {
    font-weight: bold;
  }
  .box {
    background: linear-gradient(180deg, #f8cb8e 0%, #e1b687 100%);
    box-shadow: 0px 6px 12px rgba(0, 0, 0, 0.16);
    border-radius: 20px;
    padding: 40px 30px;
    margin-bottom: 20px;
    .head {
      width: 108px;
      height: 108px;
      border-radius: 50%;
      overflow: hidden;
      margin-right: 20px;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .info {
      .name {
        margin-bottom: 18px;
      }
      .text {
        margin-right: 48px;
      }
    }
    .edit {
      margin-left: 46px;
    }
    .forget {
      display: inline-block;
      margin-top: 20px;
    }
    .right_icon {
      width: 22px;
      height: 32px;
      margin-left: 32px;
    }
  }
  .box_list {
    padding: 40px 0;
    .name {
      padding-left: 30px;
      position: relative;
      &::before {
        display: inline-block;
        content: "";
        width: 10px;
        height: 40px;
        background-color: #d5913d;
        position: absolute;
        left: 0px;
        top: 6px;
      }
    }
    .list {
      margin-top: 24px;
      .item {
        padding: 22px 0;
      }
      .bg_30 {
        background-color: rgba(213, 145, 61, 0.3);
      }
      .bg_fff {
        background-color: rgba(255, 255, 255, 0.1);
      }
    }
  }
  .foot {
    padding-top: 10px;
    padding-bottom: 8px;
    font-size: 28px;
    font-family: Alibaba PuHuiTi;
    font-weight: 400;
    line-height: 40px;
    color: #5e2f2f;
    opacity: 0.6;
    text-align: center;
  }
}
</style>

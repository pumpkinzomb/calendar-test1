<template>
  <div id="app">
    <div class="gnb" ref="left_view">
      <router-link to="/" class="nav-home">
        <img :src="logo" alt="neofect logo" />
      </router-link>&nbsp;
      <router-link to="/calendar" class="nav-calendar nav-button on">
        <span class="icon-ic_date">
          <span class="path1"></span>
          <span class="path2"></span>
          <span class="path3"></span>
          <span class="path4"></span>
          <span class="path5"></span>
          <span class="path6"></span>
          <span class="path7"></span>
          <span class="path8"></span>
          <span class="path9"></span>
          <span class="path10"></span>
        </span>
      </router-link>
      <router-link to="/patient" class="nav-patients nav-button">
        <span class="icon-ic_group">
          <span class="path1"></span>
          <span class="path2"></span>
          <span class="path3"></span>
          <span class="path4"></span>
        </span>
      </router-link>
    </div>
    <div ref="right_view">
      <div class="top">
        <span>알림</span>
        <span>회원</span>
      </div>
      <router-view class="view" />
    </div>
  </div>
</template>
<script>
export default {
  name: "app",
  data() {
    return {};
  },
  computed: {
    logo() {
      return require("@/assets/svgs/symbol-neofect.svg");
    }
  },
  mounted() {
    console.log(this.$refs.right_view.clientHeight);
  },
  updated() {
    console.log(this.$refs.right_view.clientHeight);
  }
};
</script>
<style lang='scss'>
#app {
  display: flex;
  font-family: "manrope3";
  .gnb {
    width: 80px;
    flex-shrink: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    border-right: 1px solid $borderColor1;
    .nav-home {
      display: block;
      margin-top: 24px;
      width: 40px;
      text-align: center;
    }
    .nav-button {
      display: block;
      width: 40px;
      height: 40px;
      border-radius: 8px;
      text-decoration: none;
      color: $fontColor2;
      display: flex;
      align-items: center;
      justify-content: center;
      &.on {
        background: $mainColor1;
        color: #ffffff;
      }
      &.nav-calendar {
        margin-top: 60px;
      }
      &.nav-patients {
        margin-top: 40px;
      }
    }
  }
  .top {
    width: 100%;
    border-bottom: 1px solid $borderColor1;
    height: 70px;
  }
}
</style>
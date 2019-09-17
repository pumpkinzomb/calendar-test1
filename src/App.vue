<template>
  <div id="app">
    <div class="gnb">
      <router-link to="/" class="nav-home">
        <img :src="logo" alt="neofect logo" />
      </router-link>&nbsp;
      <router-link to="/calendar" class="nav-calendar nav-button on"></router-link>
      <router-link to="/patient" class="nav-patients nav-button">
        <span class="icon-ic_group">
          <span class="path1"></span>
          <span class="path2"></span>
          <span class="path3"></span>
          <span class="path4"></span>
        </span>
      </router-link>
    </div>
    <div class="view">
      <router-view />
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
  }
};
</script>
<style lang='scss'>
#app {
  display: flex;
  font-family: "manrope3";
  .gnb {
    width: 80px;
    height: 100%;
    flex-shrink: 0;
    display: flex;
    flex-direction: column;
    align-items: center;
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
        &::after {
          color: #ffffff;
        }
      }
      &::after {
        font-family: "icomoon" !important;
      }
      &.nav-calendar {
        margin-top: 60px;
        &::after {
          content: "\e93f";
        }
      }
      &.nav-patients {
        margin-top: 40px;
        .icon-ic_group {
          font-size: $fontSize2;
          .path1:before {
            content: "\e992";
          }
          .path2:before {
            content: "\e993";
            margin-left: -1em;
          }
          .path3:before {
            content: "\e994";
            margin-left: -1em;
          }
          .path4:before {
            content: "\e995";
            margin-left: -1em;
          }
        }
      }
    }
  }
}
</style>
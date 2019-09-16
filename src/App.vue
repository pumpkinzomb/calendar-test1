<template>
  <div id="app">
    <div class="gnb">
      <router-link to="/">logo</router-link>&nbsp;
      <router-link to="/calendar">c</router-link>
      <router-link to="/patient">p</router-link>
    </div>
    <div class="view">
      <router-view />
    </div>
  </div>
</template>

<style lang='scss'>
#app {
  display: flex;
  font-family: "manrope3";
  .gnb {
    width: 80px;
    height: 100%;
    flex-shrink: 0;
    a {
      display: block;
    }
  }
}
</style>
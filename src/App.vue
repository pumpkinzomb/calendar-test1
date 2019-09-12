<template>
  <div id="app">
    <Calendar />
  </div>
</template>

<script>
/* eslint-disable */
import Calendar from "./components/Calendar.vue";
import "reset-css";
export default {
  name: "app",
  components: {
    Calendar
  },
  methods: {},
  data() {
    return {};
  },
  mounted() {
    console.log("rendered");
  }
};
</script>

<style lang='scss'>
</style>
<template>
  <div class="CreateEvent">
    <div>
      <span v-for="(type,index) of eventTypes" :key="index">
        <input type="radio" :id="'type'+(index+1)" :value="'type'+(index+1)" v-model="pickedType" />
        <label :for="'type'+(index+1)">{{type}}</label>
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: "CreateEvent",
  data() {
    return {
      eventTypes: ["Co-op Game", "Screen Sharing", "Therapist Live", "General"],
      pickedType: "type1"
    };
  }
};
</script>

<style>
</style>
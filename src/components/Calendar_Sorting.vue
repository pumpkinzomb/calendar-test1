<template>
  <div class="Sorting">
    <div class="sort-patient">
      <h2>Patient Sorting</h2>
      <input type="text" placeholder="Search Patient" />
      <div>
        <input type="checkbox" id="all_patients" value="all" @click="selectAllPatients" />
        <label for="all_patients">Select All</label>
      </div>
      <ul>
        <li v-for="(patient,index) of allPatients" :key="index">
          <input
            type="checkbox"
            :id="patient.patientId"
            :value="patient.patientId"
            v-model="checkedPatients"
          />
          <label :for="patient.patientId">{{patient.patientName}}</label>
        </li>
      </ul>
    </div>
    <div class="sort-type">
      <h2>Type of Event</h2>
      <div>
        <input type="checkbox" id="all_types" value="all" @click="selectAllTypes" />
        <label for="all_types">Select All</label>
      </div>
      <ul>
        <li v-for="(type,index) of eventTypes" :key="index">
          <input type="checkbox" :id="index" :value="index" v-model="checkedTypes" />
          <label :for="index">{{type}}</label>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "Sorting",
  props: {
    allPatients: Array,
    eventTypes: Array
  },
  mounted() {
    console.log(this.allPatients, this.eventTypes);
  }
};
</script>

<style lang="scss">
.Sorting {
  width: 240px;
  flex-shrink: 0;
}
</style>
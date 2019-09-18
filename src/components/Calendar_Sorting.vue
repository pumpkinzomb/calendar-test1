<template>
  <div class="Sorting">
    <div class="sort-patient">
      <h2>Patient Sorting</h2>
      <div class="search">
        <span class="icon-ic_search">
          <span class="path1"></span>
          <span class="path2"></span>
        </span>
        <input type="text" placeholder="Search Patient" />
      </div>
      <div>
        <button :class="checkAllPatients">Select All</button>
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
        <button :class="checkAllTypes" @click="handleAllTypes">Select All</button>
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
/* eslint-disable */
export default {
  name: "Sorting",
  props: {
    allPatients: Array,
    eventTypes: Array
  },
  data() {
    return {
      checkedPatients: ["aaaaa", "bbbbb"],
      checkedTypes: [1, 2]
    };
  },
  methods: {
    handleAllTypes: function() {}
  },
  watch: {
    checkedPatients: function(newVal, oldVal) {
      this.$parent.handleDetailPopupClose();
      const sortEventSources = this.$parent.sortEventSources(
        this.checkedTypes,
        newVal
      );
      this.$parent.setEventSources(sortEventSources);
    },
    checkedTypes: function(newVal, oldVal) {
      this.$parent.handleDetailPopupClose();
      const sortEventSources = this.$parent.sortEventSources(
        newVal,
        this.checkedPatients
      );
      this.$parent.setEventSources(sortEventSources);
    }
  },
  computed: {
    checkAllTypes: function() {
      const allCounts = this.eventTypes.length;
      const checkedCounts = this.checkedTypes.length;
      // console.log(allCounts, this.checkedTypes.length);
      return checkedCounts === allCounts
        ? "all all-checkbox"
        : checkedCounts > 0
        ? "checked all-checkbox"
        : "all-checkbox";
    },
    checkAllPatients: function() {
      const allCounts = this.allPatients.length;
      const checkedCounts = this.checkedPatients.length;
      // console.log(allCounts, this.checkedTypes.length);
      return checkedCounts === allCounts
        ? "all all-checkbox"
        : checkedCounts > 0
        ? "checked all-checkbox"
        : "all-checkbox";
    }
  },
  mounted() {}
};
</script>

<style lang="scss">
.Sorting {
  width: 240px;
  flex-shrink: 0;
  padding: 16px;
  box-sizing: border-box;
  border-right: 1px solid $borderColor1;
  h2 {
    margin-top: 16px;
    font-weight: 500;
    padding-left: 8px;
  }
  li {
    & + li {
      margin-top: 16px;
    }
  }
  .all-checkbox {
    font-weight: 500;
    display: flex;
    align-items: center;
    &.all {
      &::before {
        background: red;
      }
    }
    &.checked {
      &::before {
        background: blue;
      }
    }
  }
  label {
    display: flex;
    align-items: center;
    font-size: $fontSize6;
    cursor: pointer;
  }
  .sort-patient {
    .search {
      margin-top: 24px;
      position: relative;

      .icon-ic_search {
        position: absolute;
        top: 50%;
        left: 16px;
        transform: translate(0, -50%);
        font-size: $fontSize2;
        color: $fontColor2;
      }
      input[type="text"] {
        padding-left: 55px;
      }
    }
  }
}
</style>
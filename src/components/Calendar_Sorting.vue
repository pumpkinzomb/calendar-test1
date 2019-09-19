<template>
  <div class="Sorting">
    <div class="sort-patient">
      <h2>Patient Sorting</h2>
      <div class="search">
        <span class="icon-ic_search">
          <span class="path1"></span>
          <span class="path2"></span>
        </span>
        <input
          type="text"
          placeholder="Search Patient"
          v-model="searchText"
          v-on:keyup="handleSearch"
        />
      </div>
      <div class="check-all">
        <button :class="checkAllPatients" @click="handleAllPatients">Select All</button>
      </div>
      <ul class="check-list">
        <li v-for="(patient,index) of searchedPatients" :key="index">
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
      <h2 class="sort-heading">Type of Event</h2>
      <div class="check-all">
        <button :class="checkAllTypes" @click="handleAllTypes">Select All</button>
      </div>
      <ul class="check-list">
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
      checkedPatients: ["aaaaa", "bbbbb", "ccccc", "ddddd", "eeeee", "fffff"],
      checkedTypes: [0, 1, 2, 3, 4],
      searchText: "",
      searchedPatients: []
    };
  },
  methods: {
    handleAllTypes: function() {
      let newChecked = [];
      if (this.checkedTypes.length === 0) {
        this.eventTypes.forEach((type, index) => {
          newChecked.push(index);
        });
      }
      this.checkedTypes = newChecked;
    },
    handleAllPatients: function() {
      let newChecked = [];
      if (this.checkedPatients.length === 0) {
        this.allPatients.forEach((patient, index) => {
          newChecked.push(patient.patientId);
        });
      }
      this.checkedPatients = newChecked;
    },
    handleSearch: function(e) {
      const text = this.searchText;
      if (text.length < 1) {
        this.searchedPatients = this.allPatients;
        return;
      }
      const re = new RegExp(`^${text}`, "i");
      let SearchedList = [];
      this.allPatients.forEach((patient, index) => {
        if (re.test(patient.patientName)) {
          SearchedList.push(patient);
        }
      });
      if (
        JSON.stringify(this.searchedPatients) === JSON.stringify(SearchedList)
      ) {
        return;
      }
      this.searchedPatients = SearchedList;
    }
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
    },
    searchedPatients: function(newVal, oldVal) {
      if (JSON.stringify(newVal) === JSON.stringify(oldVal)) {
        return;
      }
      let newChecked = [];
      newVal.forEach((patient, index) => {
        newChecked.push(patient.patientId);
      });
      this.checkedPatients = newChecked;
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
  mounted() {
    this.searchedPatients = this.allPatients;
  },
  updated() {
    console.log("updated");
  }
};
</script>

<style lang="scss">
.Sorting {
  width: 240px;
  flex-shrink: 0;
  padding: 16px;
  box-sizing: border-box;
  border-right: 1px solid $borderColor1;
  color: $fontColor1;
  display: flex;
  flex-direction: column;
  h2 {
    margin: 16px 8px 0 8px;
    font-weight: 500;
    &.sort-heading {
      margin-top: 60px;
    }
  }
  li {
    & + li {
      margin-top: 16px;
    }
  }
  .check-all {
    border-bottom: 1px solid $borderColor1;
    padding-bottom: 16px;
    margin: 0 8px;
  }
  .check-list {
    padding-top: 16px;
    margin: 0 8px;
  }
  .all-checkbox {
    margin-top: 32px;
    font-weight: 600;
    display: flex;
    align-items: center;
    font-size: $fontSize6;

    &:focus {
      outline: none;
      border: 0 none;
    }
    &::before {
      border-color: #dcdfe6;
      background: none;
    }
    &.all {
      &::before {
        content: "\e933";
        border-color: $mainColor1;
        background: $mainColor1;
      }
    }
    &.checked {
      &::before {
        content: "\e965";
        border-color: $mainColor1;
        background: $mainColor1;
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
    .check-list {
      margin-top: 16px;
      padding-top: 0;
      height: 240px;
      overflow-y: auto;
      &::-webkit-scrollbar {
        box-shadow: none;
        width: 8px;
      }

      /* Handle */
      &::-webkit-scrollbar-thumb {
        background: $fontColor4;
        border-radius: 4px;
      }
    }
  }
  .sort-type {
    flex-shrink: 0;
    padding-bottom: 32px;
  }
}
</style>
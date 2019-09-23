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
            :id="patient.patient_id"
            :value="patient.patient_id"
            v-model="checkedPatients"
          />
          <label :for="patient.patient_id">{{patient.patient_nickname}}</label>
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
          <input type="checkbox" :id="type" :value="type" v-model="checkedTypes" />
          <label :for="type" :class="'group'+(index+1)">{{printTypes[index]}}</label>
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
      printTypes: [
        "Video Session",
        "Co-op Game",
        "Screen Sharing",
        "Therapist Live",
        "General",
        "Video Session Request"
      ],
      checkedPatients: [],
      checkedTypes: [],
      searchText: "",
      searchedPatients: []
    };
  },
  methods: {
    handleAllTypes: function() {
      let newChecked = [];
      if (
        this.checkedTypes.length === 0 ||
        this.checkedTypes.length !== this.eventTypes.length
      ) {
        this.eventTypes.forEach((type, index) => {
          newChecked.push(type);
        });
      }
      this.checkedTypes = newChecked;
    },
    handleAllPatients: function() {
      let newChecked = [];
      if (
        this.checkedPatients.length === 0 ||
        this.checkedPatients.length !== this.searchedPatients.length
      ) {
        this.searchedPatients.forEach((patient, index) => {
          newChecked.push(patient.patient_id);
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
        if (re.test(patient.patient_nickname)) {
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
        newChecked.push(patient.patient_id);
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
      const allCounts = this.searchedPatients.length;
      const checkedCounts = this.checkedPatients.length;
      // console.log(allCounts, this.checkedTypes.length);
      return checkedCounts === allCounts
        ? "all all-checkbox"
        : checkedCounts > 0
        ? "checked all-checkbox"
        : "all-checkbox";
    }
  },
  created() {
    this.searchedPatients = this.allPatients;
    this.checkedTypes = this.eventTypes;
  },
  mounted() {
    console.log("mounted");
  },
  updated() {
    console.log("updated");
  }
};
</script>

<style lang="scss">
.Sorting {
  width: 250px;
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
      margin-top: 32px;
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
  input[type="checkbox"]:checked {
    & + label {
      &.group1 {
        &::before {
          border-color: $groupColor1;
          background: $groupColor1;
        }
      }
      &.group2 {
        &::before {
          border-color: $groupColor2;
          background: $groupColor2;
        }
      }
      &.group3 {
        &::before {
          border-color: $groupColor3;
          background: $groupColor3;
        }
      }
      &.group4 {
        &::before {
          border-color: $groupColor4;
          background: $groupColor4;
        }
      }
      &.group5 {
        &::before {
          border-color: $groupColor5;
          background: $groupColor5;
        }
      }
      &.group6 {
        &::before {
          border-color: $groupColor6;
          background: $groupColor6;
        }
      }
    }
  }
  label {
    display: flex;
    align-items: center;
    font-size: $fontSize6;
    cursor: pointer;
    &.group1 {
      &::before {
        border-color: $groupColor1;
      }
    }
    &.group2 {
      &::before {
        border-color: $groupColor2;
      }
    }
    &.group3 {
      &::before {
        border-color: $groupColor3;
      }
    }
    &.group4 {
      &::before {
        border-color: $groupColor4;
      }
    }
    &.group5 {
      &::before {
        border-color: $groupColor5;
      }
    }
    &.group6 {
      &::before {
        border-color: $groupColor6;
      }
    }
  }
  .sort-patient {
    height: calc(100% - 400px);
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
      height: calc(100% - 187px);
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
    padding-bottom: 32px;
    margin-top: auto;
  }
}
</style>
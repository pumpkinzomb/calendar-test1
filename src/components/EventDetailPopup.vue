<template>
  <div class="Event-Detail-Popup" :style="{top:`${coordinates.y}px`,left:`${coordinates.x}px`}">
    <div class="Event-contents">
      <div :class="'Event-title '+eventDetailInfo.event_type">{{eventDetailInfo.title}}</div>
      <div class="Event-date">
        <span class="icon-ic_time">
          <span class="path1"></span>
          <span class="path2"></span>
        </span>
        {{date}}
      </div>
      <div class="Event-patients">
        <div class="patients-heading">
          <span class="icon-ic_group">
            <span class="path1"></span>
            <span class="path2"></span>
            <span class="path3"></span>
            <span class="path4"></span>
            <span class="path5"></span>
          </span>
          {{eventDetailInfo.patients_list_all}} Attendee
        </div>
      </div>
    </div>
    <div class="submit-btns">
      <button type="button" class="accept-btn">Confirm</button>
      <button type="button">Deny</button>
    </div>
    <div class="popup-btns">
      <!-- 팝업 컨트롤 버튼 -->
      <button type="button" class="del-btn">
        <span class="icon-ic_bin">
          <span class="path1"></span>
          <span class="path2"></span>
          <span class="path3"></span>
          <span class="path4"></span>
          <span class="path5"></span>
        </span>
      </button>
      <button type="button" class="edit-btn">
        <span class="icon-ic_edit">
          <span class="path1"></span>
          <span class="path2"></span>
          <span class="path3"></span>
        </span>
      </button>
      <button type="button" class="close-btn" @click="handleClose">
        <span class="icon-ic_delete">
          <span class="path1"></span>
          <span class="path2"></span>
        </span>
      </button>
    </div>
  </div>
</template>

<script>
/* eslint-disable */

// title: info.event.title,
// date_start: info.event.start,
// date_end: info.event.end,
// patients_list: [info.event.patients],
// patients_list_all: info.event.patients.length,
// event_description: info.event.title,
// event_type: info.event.className,

export default {
  name: "EventDetailPopup",
  props: {
    eventDetailInfo: {
      title: String,
      date_start: Date,
      date_end: Date,
      patients_list: Array,
      patients_list_all: Number,
      patients_list_all: Number,
      event_description: String,
      event_type: String,
      coordinates: Object
    }
  },
  data() {
    return {
      coordinates: {
        x: 0,
        y: 0
      },
      monthName: [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December"
      ],
      dayName: [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
      ],
      date: ""
    };
  },
  methods: {
    handleClose() {
      this.$parent.handleDetailPopupClose();
    },
    calculatePosition() {
      let calendarSize = this.$parent.calendarSize;
      let thisPopupSize = {
        width: this.$el.offsetWidth,
        height: this.$el.offsetHeight
      };
      let calculateX =
        this.eventDetailInfo.coordinates.x + 15 + thisPopupSize.width >
        calendarSize.width
          ? this.eventDetailInfo.coordinates.x - thisPopupSize.width - 15
          : this.eventDetailInfo.coordinates.x + 15;
      let calculateY =
        this.eventDetailInfo.coordinates.y + thisPopupSize.height >
        calendarSize.height
          ? this.eventDetailInfo.coordinates.y - thisPopupSize.height
          : this.eventDetailInfo.coordinates.y;
      this.coordinates = {
        x: calculateX,
        y: calculateY
      };
    },
    convertTimeString() {
      const dateStart = this.eventDetailInfo.date_start;
      const dateEnd = this.eventDetailInfo.date_end;
      const startHours =
        dateStart.getHours() === 0
          ? `AM 12`
          : dateStart.getHours() === 12
          ? `PM 12`
          : dateStart.getHours() > 12
          ? `PM ${dateStart.getHours() - 12}`
          : `AM ${dateStart.getHours()}`;
      const startMinutes =
        dateStart.getMinutes() < 10
          ? `0${dateStart.getMinutes()}`
          : dateStart.getMinutes();
      const endHours =
        dateEnd.getHours() === 0
          ? `AM 12`
          : dateEnd.getHours() === 12
          ? `PM 12`
          : dateEnd.getHours() > 12
          ? `PM ${dateEnd.getHours() - 12}`
          : `AM ${dateEnd.getHours()}`;
      const endMinutes =
        dateEnd.getMinutes() < 10
          ? `0${dateEnd.getMinutes()}`
          : dateEnd.getMinutes();
      const dateString = `${this.dayName[dateStart.getDay()]}, ${
        this.monthName[dateStart.getMonth()]
      } ${dateStart.getDate()}, ${startHours}:${startMinutes} - ${endHours}:${endMinutes}`;
      this.date = dateString;
    }
  },
  created() {
    this.convertTimeString();
  },
  mounted() {
    this.calculatePosition();
    console.log("mounted");
  },
  beforeUpdate() {
    this.calculatePosition();
    this.convertTimeString();
  },
  updated() {
    console.log("updated");
  }
};
</script>

<style lang='scss'>
.Event-Detail-Popup {
  z-index: 2;
  box-shadow: 0 0 40px 0 rgba(0, 0, 0, 0.2);
  overflow: hidden;
  width: 450px;
  border-radius: 0.5rem;
  background: #ffffff;
  padding: 0.5rem;
  box-sizing: border-box;
  position: absolute;
  padding: 50px 0 0 0;
  color: $fontColor1;
  .Event-contents {
    padding: 0 24px 24px 24px;
    .Event-title {
      font-size: $fontSize2;
      font-weight: 500;
      padding-left: 32px;
      line-height: 40px;
      position: relative;
      &::before {
        content: "";
        width: 16px;
        height: 16px;
        display: inline-block;
        position: absolute;
        top: 20px;
        left: 0;
        border-radius: 50%;
        transform: translate(0, -50%);
      }
      &.event-group1 {
        &::before {
          background: $groupColor1;
        }
      }
      &.event-group2 {
        &::before {
          background: $groupColor2;
        }
      }
      &.event-group3 {
        &::before {
          background: $groupColor3;
        }
      }
      &.event-group4 {
        &::before {
          background: $groupColor4;
        }
      }
      &.event-group5 {
        &::before {
          background: $groupColor5;
        }
      }
      &.event-group6 {
        &::before {
          background: $groupColor6;
        }
      }
    }
    .Event-date {
      padding-top: 26px;
      font-size: $fontSize5;
      display: flex;
      align-items: center;
      color: $fontColor2;
      .icon-ic_time {
        margin-right: 8px;
      }
    }
    .Event-patients {
      padding-top: 10px;
      font-size: $fontSize5;
      .patients-heading {
        display: flex;
        align-items: center;
        color: $fontColor2;

        .icon-ic_group {
          margin-right: 8px;
        }
      }
    }
  }
  .submit-btns {
    width: 100%;
    padding: 24px;
    box-sizing: border-box;
    background: $popupBgColor1;
    display: flex;
    justify-content: flex-end;
    .accept-btn {
      background: $mainColor1;
      color: #ffffff;
    }
  }
  .popup-btns {
    position: absolute;
    top: 16px;
    right: 16px;
    .edit-btn {
      margin-left: 16px;
    }
    .close-btn {
      margin-left: 32px;
    }
  }
}
</style>
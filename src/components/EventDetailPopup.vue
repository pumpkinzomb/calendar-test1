<template>
  <div class="Event-Detail-Popup" :style="{top:`${coordinates.y}px`,left:`${coordinates.x}px`}">
    <div class="Event-title">{{eventDetailInfo.title}}</div>
    <div class="Event-date">{{`${eventDetailInfo.date_start} - ${eventDetailInfo.date_end}`}}</div>
    <div class="Event-attendance-list">
      <p>참석자 {{eventDetailInfo.attendance_list_all}}명</p>
      <p>초대 수락 {{eventDetailInfo.attendance_list_accept_number}}명</p>
    </div>
    <div class="Event-description">{{eventDetailInfo.event_description}}</div>
    <button type="button" @click="handleClose">닫기</button>
  </div>
</template>

<script>
/* eslint-disable */
export default {
  name: "EventDetailPopup",
  props: {
    eventDetailInfo: {
      title: String,
      date_start: Date,
      date_end: Date,
      attendance_list: Array,
      attendance_list_all: Number,
      attendance_list_accept_number: Number,
      event_description: String,
      coordinates: Object
    }
  },
  data() {
    return {
      coordinates: {
        x: 0,
        y: 0
      }
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
    }
  },
  mounted() {
    this.calculatePosition();
    console.log("rendered");
  },
  beforeUpdate() {
    this.calculatePosition();
  },
  updated() {
    console.log("updated");
  }
};
</script>

<style lang='scss'>
.Event-Detail-Popup {
  z-index: 2;
  box-shadow: 0 24px 38px 3px rgba(0, 0, 0, 0.14),
    0 9px 46px 8px rgba(0, 0, 0, 0.12), 0 11px 15px -7px rgba(0, 0, 0, 0.2);
  overflow: hidden;
  width: 300px;
  border-radius: 0.5rem;
  background: #ffffff;
  padding: 0.5rem;
  box-sizing: border-box;
  position: absolute;
}
</style>
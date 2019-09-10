<template>
  <div class="Event-Detail-Popup">
    <div class="Event-title">{{eventDetailInfo.title}}</div>
    <div class="Event-date">{{`${eventDetailInfo.date_start} - ${eventDetailInfo.date_end}`}}</div>
    <div class="Event-attendance-list">
      <p>참석자 {{eventDetailInfo.attendance_list_all}}명</p>
      <p>초대 수락 {{eventDetailInfo.attendance_list_accept_number}}명</p>
    </div>
    <div class="Event-description">{{eventDetailInfo.event_description}}</div>
    <div>닫기</div>
  </div>
</template>

<script>
export default {
  props: {
    eventDetailInfo: {
      title: String,
      date_start: Date,
      date_end: Date,
      attendance_list: Array,
      attendance_list_all: Number,
      attendance_list_accept_number: Number,
      event_description: String
    }
  },
  mounted() {
    console.log(this.eventDetailInfo);
  }
};
</script>

<style>
</style>
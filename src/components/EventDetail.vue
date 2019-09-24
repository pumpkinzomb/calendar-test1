<template>
  <div class="EventDetail" :style="{top:`${coordinates.y}px`,left:`${coordinates.x}px`}">
    <!-- Video Session -->
    <div v-if="eventDetailInfo.className === 'group1'">
      <div class="Event-contents">
        <div :class="'Event-title '+eventDetailInfo.className">Video Session</div>
        <div class="Event-date">
          <span class="icon-ic_time">
            <span class="path1"></span>
            <span class="path2"></span>
          </span>
          {{convertTimeString(
          eventDetailInfo.start,
          eventDetailInfo.end
          )}}
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
            {{eventDetailInfo.patients.length}} Attendee
          </div>
          <div class="patients-list">
            <ul>
              <li v-for="(patient,index) of eventDetailInfo.patients" :key="index">
                <div class="patient-name">
                  <span
                    class="icon-ic_check_circle_fill wait status-icon"
                    v-if="patient.attendance_state === 'WAIT'"
                  >
                    <span class="path1"></span>
                    <span class="path2"></span>
                  </span>
                  <span
                    class="icon-ic_check_circle_fill accept status-icon"
                    v-if="patient.attendance_state === 'ACCEPT'"
                  >
                    <span class="path1"></span>
                    <span class="path2"></span>
                  </span>
                  <span
                    class="icon-ic_delete_circle_fill refuse status-icon"
                    v-if="patient.attendance_state === 'REFUSE'"
                  >
                    <span class="path1"></span>
                    <span class="path2"></span>
                    <span class="path3"></span>
                  </span>
                  <span>{{patient.patient_nickname}}</span>
                </div>
                <div class="patient-time">
                  {{convertTimeString(
                  patient.patient_start,
                  patient.patient_end
                  )}}
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="submit-btns">
        <button type="button" class="accept-btn">Start Video Session</button>
      </div>
    </div>
    <!-- Co-op Game -->
    <div v-else-if="eventDetailInfo.className === 'group2'">
      <div class="Event-contents">
        <div :class="'Event-title '+eventDetailInfo.className">Co-op Game</div>
        <div class="Event-date">
          <span class="icon-ic_time">
            <span class="path1"></span>
            <span class="path2"></span>
          </span>
          {{convertTimeString(
          eventDetailInfo.start,
          eventDetailInfo.end
          )}}
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
            {{eventDetailInfo.patients.length}} Attendee
          </div>
          <div class="patients-list">
            <ul>
              <li v-for="(patient,index) of eventDetailInfo.patients" :key="index">
                <div class="patient-name">
                  <span
                    class="icon-ic_check_circle_fill wait status-icon"
                    v-if="patient.attendance_state === 'WAIT'"
                  >
                    <span class="path1"></span>
                    <span class="path2"></span>
                  </span>
                  <span
                    class="icon-ic_check_circle_fill accept status-icon"
                    v-if="patient.attendance_state === 'ACCEPT'"
                  >
                    <span class="path1"></span>
                    <span class="path2"></span>
                  </span>
                  <span
                    class="icon-ic_delete_circle_fill refuse status-icon"
                    v-if="patient.attendance_state === 'REFUSE'"
                  >
                    <span class="path1"></span>
                    <span class="path2"></span>
                    <span class="path3"></span>
                  </span>
                  <span>{{patient.patient_nickname}}</span>
                </div>
                <div class="patient-time">
                  {{convertTimeString(
                  patient.patient_start,
                  patient.patient_end
                  )}}
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <!-- Screen Sharing -->
    <div v-else-if="eventDetailInfo.className === 'group3'">
      <div class="Event-contents">
        <div :class="'Event-title '+eventDetailInfo.className">Screen Sharing</div>
        <div class="Event-date">
          <span class="icon-ic_time">
            <span class="path1"></span>
            <span class="path2"></span>
          </span>
          {{convertTimeString(
          eventDetailInfo.start,
          eventDetailInfo.end
          )}}
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
            {{eventDetailInfo.patients.length}} Attendee
          </div>
          <div class="patients-list">
            <ul>
              <li v-for="(patient,index) of eventDetailInfo.patients" :key="index">
                <div class="patient-name">
                  <span
                    class="icon-ic_check_circle_fill wait status-icon"
                    v-if="patient.attendance_state === 'WAIT'"
                  >
                    <span class="path1"></span>
                    <span class="path2"></span>
                  </span>
                  <span
                    class="icon-ic_check_circle_fill accept status-icon"
                    v-if="patient.attendance_state === 'ACCEPT'"
                  >
                    <span class="path1"></span>
                    <span class="path2"></span>
                  </span>
                  <span
                    class="icon-ic_delete_circle_fill refuse status-icon"
                    v-if="patient.attendance_state === 'REFUSE'"
                  >
                    <span class="path1"></span>
                    <span class="path2"></span>
                    <span class="path3"></span>
                  </span>
                  <span>{{patient.patient_nickname}}</span>
                </div>
                <div class="patient-time">
                  {{convertTimeString(
                  patient.patient_start,
                  patient.patient_end
                  )}}
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="submit-btns">
        <button type="button" class="accept-btn">Start Screen Sharing</button>
      </div>
    </div>
    <!-- Therapist Live -->
    <div v-else-if="eventDetailInfo.className === 'group4'">
      <div class="Event-contents">
        <div :class="'Event-title '+eventDetailInfo.className">Therapist Live</div>
        <div class="Event-date">
          <span class="icon-ic_time">
            <span class="path1"></span>
            <span class="path2"></span>
          </span>
          {{convertTimeString(
          eventDetailInfo.start,
          eventDetailInfo.end
          )}}
        </div>
        <div class="Event-live-contents">
          <div class="subject">
            <span>Subject</span>
            {{eventDetailInfo.title}}
          </div>
          <div class="summary">{{eventDetailInfo.contents}}</div>
        </div>
        <div class="Event-live-link">
          <span class="icon-ic_connecting">
            <span class="path1"></span>
            <span class="path2"></span>
          </span>
          <a :href="eventDetailInfo.contents_link" target="_blank">{{eventDetailInfo.contents_link}}</a>
        </div>
      </div>
    </div>
    <!-- General -->
    <div v-else-if="eventDetailInfo.className === 'group5'">
      <div class="Event-contents">
        <div :class="'Event-title '+eventDetailInfo.className">{{eventDetailInfo.title}}</div>
        <div class="Event-date">
          <span class="icon-ic_time">
            <span class="path1"></span>
            <span class="path2"></span>
          </span>
          {{convertTimeString(
          eventDetailInfo.start,
          eventDetailInfo.end
          )}}
        </div>
        <div class="Event-general-contents">{{eventDetailInfo.contents}}</div>
      </div>
    </div>
    <!-- Video Session Request -->
    <div v-else-if="eventDetailInfo.className === 'group6'">
      <div class="Event-contents">
        <div :class="'Event-title '+eventDetailInfo.className">{{eventDetailInfo.title}}</div>
        <div class="Event-date">
          <span class="icon-ic_time">
            <span class="path1"></span>
            <span class="path2"></span>
          </span>
          {{convertTimeString(
          eventDetailInfo.start,
          eventDetailInfo.end
          )}}
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
            {{eventDetailInfo.patients.length}} Attendee
          </div>
          <div class="patients-list">
            <ul>
              <li v-for="(patient,index) of eventDetailInfo.patients" :key="index">
                <div class="patient-name">
                  <span
                    class="icon-ic_check_circle_fill wait status-icon"
                    v-if="patient.attendance_state === 'WAIT'"
                  >
                    <span class="path1"></span>
                    <span class="path2"></span>
                  </span>
                  <span
                    class="icon-ic_check_circle_fill accept status-icon"
                    v-if="patient.attendance_state === 'ACCEPT'"
                  >
                    <span class="path1"></span>
                    <span class="path2"></span>
                  </span>
                  <span
                    class="icon-ic_delete_circle_fill refuse status-icon"
                    v-if="patient.attendance_state === 'REFUSE'"
                  >
                    <span class="path1"></span>
                    <span class="path2"></span>
                    <span class="path3"></span>
                  </span>
                  <span>{{patient.patient_nickname}}</span>
                </div>
                <div class="patient-time">
                  {{convertTimeString(
                  patient.patient_start,
                  patient.patient_end
                  )}}
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="submit-btns">
        <button type="button" class="accept-btn">Confirm</button>
        <button type="button">Deny</button>
      </div>
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
export default {
  name: "EventDetail",
  props: {
    eventDetailInfo: {
      title: String,
      start: Date,
      end: Date,
      patients: Array,
      contents: Object,
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
      ]
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
        this.eventDetailInfo.coordinates.x + thisPopupSize.width >
        calendarSize.width
          ? this.eventDetailInfo.coordinates.x - thisPopupSize.width
          : this.eventDetailInfo.coordinates.x;
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
    convertTimeString(start, end) {
      const dateStart = new Date(start);
      const dateEnd = new Date(end);
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
      return dateString;
    }
  },
  created() {},
  mounted() {
    this.calculatePosition();
  },
  beforeUpdate() {
    this.calculatePosition();
  },
  updated() {}
};
</script>

<style lang='scss'>
.EventDetail {
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
    padding: 0 24px 40px 24px;
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
      &.group1 {
        &::before {
          background: $groupColor1;
        }
      }
      &.group2 {
        &::before {
          background: $groupColor2;
        }
      }
      &.group3 {
        &::before {
          background: $groupColor3;
        }
      }
      &.group4 {
        &::before {
          background: $groupColor4;
        }
      }
      &.group5 {
        &::before {
          background: $groupColor5;
        }
      }
      &.group6 {
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
        margin-right: 16px;
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
          margin-right: 16px;
        }
      }
      .patients-list {
        padding-top: 16px;
        padding-left: 40px;
        font-size: $fontSize6;
        color: $fontColor1;
        li {
          & + li {
            margin-top: 12px;
          }
        }
        .status-icon {
          font-size: $fontSize5;
          margin-right: 8px;
          &.accept {
            color: $uiColor3;
          }
          &.wait {
            color: $uiColor4;
          }
          &.refuse {
            color: $uiColor1;
          }
        }
      }
      .patient-name {
        display: flex;
        align-items: center;
        line-height: 20px;
      }
      .patient-time {
        font-size: $fontSize7;
        padding-top: 8px;
        color: $fontColor3;
        padding-left: 24px;
      }
    }
    .Event-general-contents {
      margin: 16px 30px 0 30px;
      border-top: 1px solid $borderColor1;
      padding-top: 16px;
      font-size: $fontSize6;
      line-height: 24px;
      color: $fontColor2;
    }
    .Event-live-contents {
      margin: 16px 30px;
      padding: 16px 0;
      border-top: 1px solid $borderColor1;
      border-bottom: 1px solid $borderColor1;

      .subject {
        font-family: $fontSize5;
        color: $fontColor1;
        line-height: 24px;
        font-weight: 500;
        span {
          display: block;
          margin-bottom: 6px;
          color: $fontColor2;
          font-size: $fontSize7;
          font-weight: 300;
        }
      }
      .summary {
        padding-top: 16px;
        font-size: $fontSize6;
        line-height: 24px;
        color: $fontColor2;
      }
    }
    .Event-live-link {
      font-size: $fontSize5;
      color: $fontColor2;
      line-height: 20px;
      display: flex;
      align-items: center;
      .icon-ic_connecting {
        margin-right: 16px;
      }
      a {
        text-decoration: none;
        color: $fontColor2;
      }
    }
  }
  .submit-btns {
    width: 100%;
    margin-top: -16px;
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
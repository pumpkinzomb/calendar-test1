<template>
  <div class="Calendar">
    <Sorting :allPatients="allPatients" :eventTypes="eventTypes" ref="sorting" v-if="sortingMenu" />
    <div class="calendar-area">
      <button type="button" class="sorting-btn" @click="toggleSortingMenu">
        <span class="icon-ic_delete">
          <span class="path1"></span>
          <span class="path2"></span>
        </span>
      </button>
      <FullCalendar
        :plugins="calendarPlugins"
        defaultView="dayGridMonth"
        @eventClick="handleEventClick"
        @select="handleSelect"
        @datesRender="handleDatesRender"
        @windowResize="handleWindowResize"
        :header="calendarConfig.header"
        :eventLimit="calendarConfig.eventLimit"
        :selectable="calendarConfig.selectable"
        :showNonCurrentDates="calendarConfig.showNonCurrentDates"
        :fixedWeekCount="calendarConfig.fixedWeekCount"
        :dayPopoverFormat="calendarConfig.dayPopoverFormat"
        :titleFormat="calendarConfig.titleFormat"
        :buttonText="calendarConfig.buttonText"
        :height="windowHeight"
        class="fullCalendar"
        ref="fullCalendar"
      />
    </div>
    <EventDetailPopup
      v-if="event_detail_popup.view"
      :eventDetailInfo="event_detail_popup"
      ref="detailPopup"
    ></EventDetailPopup>
  </div>
</template>

<script>
/* eslint-disable */
import FullCalendar from "@fullcalendar/vue";
import Sorting from "./Calendar_Sorting.vue";
import EventDetailPopup from "./EventDetailPopup.vue";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import CALENDAR_DEFAULT from "@/utils/calendar_default.js";

export default {
  name: "Calendar",
  components: {
    FullCalendar,
    EventDetailPopup,
    Sorting
  },
  methods: {
    handleEventClick(info) {
      // console.log(info);
      const testInfo = {
        view: true,
        title: info.event.title,
        date_start: info.event.start,
        date_end: info.event.end,
        patients_list: [info.event.extendedProps.patients],
        patients_list_all: info.event.extendedProps.patients.length,
        event_type: info.event.source.internalEventSource._raw.className,
        coordinates: { x: info.jsEvent.pageX, y: info.jsEvent.pageY }
      };
      this.event_detail_popup = testInfo;
    },
    handleDetailPopupClose() {
      this.event_detail_popup.view = false;
    },
    handleSelect(info) {
      this.handleDetailPopupClose();
    },
    handleWindowResize(info) {
      //캘린더가 리사이즈될때마다 호출됨
      this.calendarSize = {
        width: this.$el.offsetWidth,
        height: this.$el.offsetHeight
      };
      const checkWindowHeight =
        window.innerHeight - 70 < 916 ? 915 : window.innerHeight - 70;
      this.windowHeight = checkWindowHeight;
      this.handleDetailPopupClose();
    },
    sortEventSources(types, patients) {
      let newEventSources = eval("(" + JSON.stringify(this.eventSources) + ")");
      newEventSources = newEventSources.filter(source => {
        for (const type of types) {
          if (source.className === `event-group${type}`) {
            return source;
          }
        }
      });
      newEventSources.map(source => {
        source.events = source.events.filter(event => {
          for (let group of event.patients) {
            for (let patient of patients) {
              if (group.patientId === patient) {
                return event;
              }
            }
          }
          // for (let patient of patients) {
          //   if (event.patient.patientId === patient) {
          //     return event;
          //   }
          // }
        });
      });
      return newEventSources;
    },
    setEventSources(sources) {
      const calendarApi = this.$refs.fullCalendar.getApi();
      const getAllEventSource = calendarApi.getEventSources();
      for (let source of getAllEventSource) {
        source.remove();
      }
      for (let source of sources) {
        calendarApi.addEventSource(source);
      }
    },
    handleDatesRender(info) {
      this.handleDetailPopupClose();
      //캘린더가 event를 렌더링할때마다 호출됨
    },
    toggleSortingMenu() {
      this.sortingMenu = !this.sortingMenu;
    }
  },
  data() {
    return {
      calendarPlugins: [dayGridPlugin, interactionPlugin, timeGridPlugin],
      calendarConfig: CALENDAR_DEFAULT,
      event_detail_popup: {
        view: false,
        title: "",
        date: "",
        coordinates: { x: 0, y: 0 }
      },
      calendarSize: {
        width: 0,
        height: 0
      },
      eventSources: [
        {
          events: [
            {
              id: "a1",
              patients: [
                {
                  patientId: "aaaaa",
                  patientName: "personA"
                }
              ],
              title: "AAAAAAA aaaaaaaaaaaaaa aaaaaaa AAAAAAA ",
              start: "2019-09-05T12:05:00",
              end: "2019-09-05T13:30:00"
            },
            {
              id: "a2",
              patients: [
                {
                  patientId: "bbbbb",
                  patientName: "personB"
                }
              ],
              title: "eventA personB",
              start: "2019-09-05T00:05:00",
              end: "2019-09-05T01:30:00"
            },
            {
              id: "a3",
              patients: [
                {
                  patientId: "bbbbb",
                  patientName: "personB"
                }
              ],
              title: "eventA personB",
              start: "2019-09-04T12:30:00",
              end: "2019-09-04T13:30:00"
            }
            // etc...
          ],
          className: "event-group1"
        },
        {
          events: [
            {
              id: "a4",
              patients: [
                {
                  patientId: "aaaaa",
                  patientName: "personA"
                },
                {
                  patientId: "bbbbb",
                  patientName: "personB"
                }
              ],
              title: "eventB personA",
              start: "2019-09-10T12:30:00",
              end: "2019-09-10T13:30:00"
            },
            {
              id: "a5",
              patients: [
                {
                  patientId: "aaaaa",
                  patientName: "personA"
                },
                {
                  patientId: "hhhhh",
                  patientName: "cat"
                }
              ],
              title: "personA, cat",
              start: "2019-09-10T12:30:00",
              end: "2019-09-10T13:30:00"
            },
            {
              id: "a6",
              patients: [
                {
                  patientId: "bbbbb",
                  patientName: "personB"
                }
              ],
              title: "eventB personB",
              start: "2019-09-10T12:30:00",
              end: "2019-09-10T15:30:00"
            }
            // etc...
          ],
          className: "event-group2"
        },
        {
          events: [
            {
              id: "a7",
              patients: [
                {
                  patientId: "bbbbb",
                  patientName: "personB"
                }
              ],
              title: "eventB personA",
              start: "2019-09-10T12:30:00",
              end: "2019-09-10T13:30:00"
            },
            {
              id: "a8",
              patients: [
                {
                  patientId: "aaaaa",
                  patientName: "personA"
                },
                {
                  patientId: "hhhhh",
                  patientName: "cat"
                }
              ],
              title: "personA, cat",
              start: "2019-09-19T12:30:00",
              end: "2019-09-19T13:30:00"
            },
            {
              id: "a9",
              patients: [
                {
                  patientId: "fffff",
                  patientName: "personF"
                },
                {
                  patientId: "ggggg",
                  patientName: "nabi"
                }
              ],
              title: "eventB personB",
              start: "2019-09-24T12:30:00",
              end: "2019-09-24T13:30:00"
            }
            // etc...
          ],
          className: "event-group6"
        },
        {
          events: [
            {
              id: "a10",
              patients: [
                {
                  patientId: "ggggg",
                  patientName: "nabi"
                },
                {
                  patientId: "hhhhh",
                  patientName: "cat"
                }
              ],
              title: "eventB personA",
              start: "2019-09-15T12:30:00",
              end: "2019-09-15T13:30:00"
            },
            {
              id: "a11",
              patients: [
                {
                  patientId: "aaaaa",
                  patientName: "personA"
                },
                {
                  patientId: "hhhhh",
                  patientName: "cat"
                }
              ],
              title: "personA, cat",
              start: "2019-09-29T12:30:00",
              end: "2019-09-29T13:30:00"
            }
            // etc...
          ],
          className: "event-group4"
        }
      ],
      allPatients: [
        {
          patientId: "aaaaa",
          patientName: "personA"
        },
        {
          patientId: "bbbbb",
          patientName: "personB"
        },
        {
          patientId: "ccccc",
          patientName: "personC"
        },
        {
          patientId: "ddddd",
          patientName: "personD"
        },
        {
          patientId: "eeeee",
          patientName: "personE"
        },
        {
          patientId: "fffff",
          patientName: "personF"
        },
        {
          patientId: "ggggg",
          patientName: "nabi"
        },
        {
          patientId: "hhhhh",
          patientName: "cat"
        }
      ],
      eventTypes: [
        "Video Session",
        "Co-op Game",
        "Screen Sharing",
        "Therapist Live",
        "General",
        "Video Session Request"
      ],
      sortingMenu: true,
      windowHeight: 0
    };
  },
  created() {
    const checkWindowHeight =
      window.innerHeight - 70 < 916 ? 915 : window.innerHeight - 70;
    this.windowHeight = checkWindowHeight;
  },
  mounted() {
    this.calendarSize = {
      width: this.$el.offsetWidth,
      height: this.$el.offsetHeight
    };
    const sortEventSources = this.sortEventSources(
      this.$refs.sorting.checkedTypes,
      this.$refs.sorting.checkedPatients
    );
    this.setEventSources(sortEventSources);
  },
  updated() {
    console.log("Calendar_updated");
  }
};
</script>

<style lang='scss'>
@import "~@fullcalendar/core/main.css";
@import "~@fullcalendar/daygrid/main.css";

.Calendar {
  display: flex;
  font-size: $fontSize5;
  .calendar-area {
    position: relative;
    .sorting-btn {
      position: absolute;
      top: 25px;
      left: 16px;
      z-index: 1;
    }
    .fullCalendar {
      position: relative;
      color: $fontColor1;
      .fc-head {
        .fc-day-header {
          padding: 15px 0;
          color: $fontColor3;
        }
      }
      .fc-header-toolbar {
        padding: 20px 0;
        background: rgba(244, 245, 247, 0.3);
        &.fc-toolbar {
          margin: 0;
        }
        .fc-center {
          display: flex;
          h2 {
            margin: 0 21.4px;
            line-height: 34px;
            font-size: $fontSize3;
          }
        }
      }

      &.fc-unthemed {
        th,
        td {
          border-width: 0.6px;
          border-color: $borderColor1;
          &:first-of-type {
            border-left: 0 none;
          }
          &:last-of-type {
            border-right: 0 none;
          }
        }
        .fc-popover {
          .fc-header {
            background: white;
          }
        }
        .fc-disabled-day {
          background: rgba(255, 255, 255, 0);
        }
      }
      .fc-day-header {
        position: relative;
      }
      .fc-day-top {
        position: relative;
        .fc-day-number {
          float: left;
          position: relative;
          padding: 20.5px 0 13.7px 0;
          left: 50%;
          transform: translate(-50%, 0);
        }
      }
      .fc-event-container {
        padding: 0 16px;
      }
      .fc-event {
        cursor: pointer;

        font-size: $fontSize6;
        line-height: $fontSize6;
        background: rgba(255, 255, 255, 0);
        color: $fontColor1;
        padding-left: 15px;
        border: 0;
        &:hover {
          background: rgba(90, 90, 90, 0.1);
        }
        .fc-content {
          padding: 0.3rem;
        }
        &::before {
          content: "";
          display: block;
          width: 12px;
          height: 12px;
          background: rgb(167, 155, 142);
          position: absolute;
          top: 50%;
          left: 0;
          transform: translate(0, -45%);
          border-radius: 50%;
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
      }
      .fc-more-popover {
        width: 260px;
        box-shadow: 0 0 40px 0 rgba(0, 0, 0, 0.2);
        overflow: hidden;
        border: none;
        box-sizing: border-box;
        .fc-header {
          .fc-title {
            margin: auto;
            font-weight: 500;
            font-size: $fontSize3;
            padding: 16px 0;
            color: $fontColor2;
          }
          .fc-close {
            position: absolute;
            top: 16px;
            right: 16px;
          }
          .fc-icon-x {
            font-size: $fontSize2;
            color: $fontColor1;
            &::before {
              content: "\e951";
            }
            &::after {
              content: "\e952";
              margin-left: -1em;
            }
          }
        }
        .fc-event-container {
          padding: 0 16px 24px 16px;
        }
      }
      .fc-today {
        background: rgba(255, 255, 255, 0);
        .fc-day-number {
          margin: 0.5rem 0;
          padding: 0;
          width: 50px;
          height: 50px;
          line-height: 50px;
          text-align: center;
          background: $mainColor1;
          color: #ffffff;
          border-radius: 50%;
          box-sizing: border-box;
        }
      }
      .fc-button {
        padding: 0;

        border-radius: 11px;
        &.fc-prev-button,
        &.fc-next-button {
          width: 34px;
          height: 34px;
          margin: 0;
        }
        &.fc-today-button {
          width: 67.1px;
          margin-right: 20.9px;
          color: $fontColor1;
          font-size: $fontSize6;
        }
        &.fc-button-primary {
          background: rgba(255, 255, 255, 0);
          color: $fontColor1;
          border-color: $borderColor1;
        }
      }

      .fc-popover.fc-more-popover {
        border-radius: 0.5rem;
      }
      .fc-more {
        position: absolute;
        transform: translate(50%, 40%);
        font-size: $fontSize6;
        color: $fontColor2;
      }
      .fc-icon {
        font-family: "icomoon" !important;
        font-size: $fontSize5;
        color: $fontColor2;
        position: relative;
        &.fc-icon-chevron-left {
          top: -2px;
          left: -1px;
          &:before {
            content: "\e93a";
          }
        }
        &.fc-icon-chevron-right {
          top: -2px;
          left: 1px;
          &:before {
            content: "\e93f";
          }
        }
      }
    }
  }
}
</style>
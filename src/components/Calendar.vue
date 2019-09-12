<template>
  <div class="Calendar">
    <div class="sort-type">
      <ul>
        <li v-for="(patient,index) of eventPatients" :key="index">
          <input
            type="checkbox"
            :id="patient.patientId"
            :value="patient.patientId"
            v-model="checkedPatients"
          />
          <label :for="patient.patientId">{{patient.patientName}}</label>
        </li>
      </ul>
      <ul :style="{margin:'20px 0'}">
        <li v-for="(type,index) of eventTypes" :key="index">
          <input type="checkbox" :id="type" :value="type" v-model="checkedTypes" />
          <label :for="type">{{type}}</label>
        </li>
      </ul>
    </div>
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
      class="fullCalendar"
      ref="fullCalendar"
    />
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
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import EventDetailPopup from "./EventDetailPopup.vue";
import CALENDAR_DEFAULT from "@/utils/calendar_default.js";

export default {
  name: "Calendar",
  components: {
    FullCalendar,
    EventDetailPopup
  },
  methods: {
    handleEventClick(info) {
      //   this.handleDetailPopupClose();
      const testInfo = {
        view: true,
        title: info.event.title,
        date_start: info.event.start,
        date_end: info.event.end,
        attendance_list: [],
        attendance_list_all: 0,
        attendance_list_accept_number: 0,
        event_description: info.event.title,
        coordinates: { x: info.jsEvent.pageX, y: info.jsEvent.pageY },
        groupName: "group1"
      };
      this.event_detail_popup = testInfo;
    },
    handleDetailPopupClose() {
      this.event_detail_popup.view = false;
    },
    handleSelect(info) {
      console.log(info);
      this.handleDetailPopupClose();
    },
    handleWindowResize(info) {
      //캘린더가 리사이즈될때마다 호출됨
      this.calendarSize = {
        width: info.calendar.el.offsetWidth,
        height: info.calendar.el.offsetHeight
      };
      this.handleDetailPopupClose();
    },
    sortEventSources(types, patients) {
      let newEventSources = eval("(" + JSON.stringify(this.eventSources) + ")");
      newEventSources = newEventSources.filter(source => {
        for (let type of types) {
          if (source.className === `event-${type}`) {
            return source;
          }
        }
      });
      newEventSources.map(source => {
        source.events = source.events.filter(event => {
          for (let patient of patients) {
            if (event.patient.patientId === patient) {
              return event;
            }
          }
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
        attendance_list: [],
        attendance_list_all: 0,
        attendance_list_accept_number: 0,
        event_description: "",
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
              patient: {
                patientId: "aaaaa",
                patientName: "personA"
              },
              title: "eventA personA",
              start: "2019-09-05T12:30:00",
              end: "2019-09-05T13:30:00"
            },
            {
              id: "a2",
              patient: {
                patientId: "bbbbb",
                patientName: "personB"
              },
              title: "eventA personB",
              start: "2019-09-05T12:30:00",
              end: "2019-09-05T13:30:00"
            },
            {
              id: "a3",
              patient: {
                patientId: "bbbbb",
                patientName: "personB"
              },
              title: "eventA personB",
              start: "2019-09-05T12:30:00",
              end: "2019-09-05T13:30:00"
            }
            // etc...
          ],
          className: "event-group1"
        },
        {
          events: [
            {
              id: "a4",
              patient: {
                patientId: "aaaaa",
                patientName: "eventB personA"
              },
              title: "eventB personA",
              start: "2019-09-10T12:30:00",
              end: "2019-09-10T13:30:00"
            },
            {
              id: "a5",
              patient: {
                patientId: "aaaaa",
                patientName: "personA"
              },
              title: "eventB personA",
              start: "2019-09-10T12:30:00",
              end: "2019-09-10T13:30:00"
            },
            {
              id: "a6",
              patient: {
                patientId: "bbbbb",
                patientName: "personB"
              },
              title: "eventB personB",
              start: "2019-09-10T12:30:00",
              end: "2019-09-10T12:30:00"
            }
            // etc...
          ],
          className: "event-group2"
        }
      ],
      eventPatients: [
        {
          patientId: "aaaaa",
          patientName: "personA"
        },
        {
          patientId: "bbbbb",
          patientName: "personB"
        }
      ],
      eventTypes: ["group1", "group2", "group3", "group4"],
      checkedPatients: ["aaaaa", "bbbbb"],
      checkedTypes: ["group1", "group2"]
    };
  },
  mounted() {
    this.calendarSize = {
      width: this.$refs.fullCalendar.$el.offsetWidth,
      height: this.$refs.fullCalendar.$el.offsetHeight
    };
    const sortEventSources = this.sortEventSources(
      this.checkedTypes,
      this.checkedPatients
    );
    this.setEventSources(sortEventSources);
    // console.log("rendered");
  },
  updated() {
    // console.log("updated");
  },
  watch: {
    checkedPatients: function(newVal, oldVal) {
      this.handleDetailPopupClose();
      const sortEventSources = this.sortEventSources(this.checkedTypes, newVal);
      this.setEventSources(sortEventSources);
    },
    checkedTypes: function(newVal, oldVal) {
      this.handleDetailPopupClose();
      const sortEventSources = this.sortEventSources(
        newVal,
        this.checkedPatients
      );
      this.setEventSources(sortEventSources);
    }
  }
};
</script>

<style lang='scss'>
@import "~@fullcalendar/core/main.css";
@import "~@fullcalendar/daygrid/main.css";

.Calendar {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 1.5rem;
  display: flex;
  padding: 0.5rem;
  .sort-type {
    padding-top: 4rem;
    ul {
      width: 200px;
    }
  }
  .fullCalendar {
    position: relative;
    .fc-today-button {
    }
    .fc-day-header {
      padding: 1rem 0;
    }
    .fc-center {
      display: flex;
    }
    &.fc-unthemed {
      .fc-head {
        td {
          border-bottom: 1px solid rgba(255, 255, 255, 0);
        }
      }
      .fc-popover {
        .fc-header {
          background: white;
        }
      }
    }
    .fc-day-header {
      position: relative;
      &::after {
        /* 일월화수목금토 아래 border를 투명하게했기때문에 생긴 우측 border빈공간을 채우기 위한 것 */
        content: "";
        display: block;
        border-right: 1px solid #dddddd;
        width: 0;
        height: 1px;
        position: absolute;
        top: 100%;
        left: 100%;
      }
    }
    .fc-day-top {
      position: relative;
      .fc-day-number {
        float: left;
        position: relative;
        padding: 0.5rem;
        left: 50%;
        transform: translate(-50%, 0);
      }
    }
    .fc-event {
      cursor: pointer;
      line-height: 0.7rem;
      background: rgba(255, 255, 255, 0);
      color: #000000;
      padding-left: 1.3rem;
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
        width: 0.5rem;
        height: 0.5rem;
        background: rgb(167, 155, 142);
        position: absolute;
        top: 50%;
        left: 0.5rem;
        transform: translate(0, -45%);
        border-radius: 50%;
      }
      &.event-group1 {
        &::before {
          background: #f1c40f;
        }
      }
      &.event-group2 {
        &::before {
          background: #e67e22;
        }
      }
      &.event-group3 {
        &::before {
          background: #f39c12;
        }
      }
      &.event-group4 {
        &::before {
          background: #d35400;
        }
      }
      &.event-group5 {
        &::before {
          background: #e74c3c;
        }
      }
    }
    .fc-more-popover {
      box-shadow: 0 24px 38px 3px rgba(0, 0, 0, 0.14),
        0 9px 46px 8px rgba(0, 0, 0, 0.12), 0 11px 15px -7px rgba(0, 0, 0, 0.2);
      overflow: hidden;
      border: none;
      .fc-header {
        .fc-title {
          margin: auto;
          font-weight: bold;
          font-size: 1.5rem;
          padding: 0.8rem;
        }
        .fc-close {
          position: absolute;
          right: 0.8rem;
        }
      }
      .fc-event-container {
        padding: 0.5rem;
      }
    }
    .fc-today {
      background: rgba(255, 255, 255, 0);
      .fc-day-number {
        margin: 0.5rem 0;
        padding: 0;
        width: 2rem;
        height: 2rem;
        line-height: 2rem;
        text-align: center;
        background: #1a73e8;
        color: #ffffff;
        border-radius: 50%;
        box-sizing: border-box;
      }
    }
    .fc-sat {
      // color: blue;
    }
    .fc-sun {
      // color: red;
    }

    .fc-popover.fc-more-popover {
      border-radius: 0.5rem;
    }
  }
}
</style>
<template>
  <div id="app">
    <div class="sort-type">
      <ul>
        <li>사람 A</li>
        <li>사람 B</li>
        <li>사람 C</li>
        <li>사람 D</li>
      </ul>
      <ul>
        <li>이벤트 A</li>
        <li>이벤트 B</li>
        <li>이벤트 C</li>
        <li>이벤트 D</li>
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
      class="Calendar"
      ref="fullCalendar"
    />
    <EventDetailPopup
      v-if="event_detail_popup.view"
      :eventDetailInfo="event_detail_popup"
      ref="detailPopup"
    ></EventDetailPopup>
    <!-- 
      :style="{position:'absolute',top: `${event_detail_popup.coordinates.y}px`,left: `${event_detail_popup.coordinates.x}px`, }"
    -->
  </div>
</template>

<script>
/* eslint-disable */
import FullCalendar from "@fullcalendar/vue";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";
import EventDetailPopup from "./components/EventDetailPopup.vue";
import CALENDAR_DEFAULT from "@/utils/calendar_default.js";
import "reset-css";
export default {
  name: "app",
  components: {
    FullCalendar,
    EventDetailPopup
  },
  methods: {
    handleEventClick(info) {
      console.log(info);
      // info.el.style.backgroundColor = "red";
      this.handleDetailPopupClose();
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
      this.calendarSize = {
        width: info.calendar.el.offsetWidth,
        height: info.calendar.el.offsetHeight
      };
      this.handleDetailPopupClose();
    },
    handleDatesRender(info) {
      setTimeout(
        function() {
          let calendarApi = this.$refs.fullCalendar.getApi();
          let eventSources = {
            events: [
              {
                id: 0,
                title: "change1",
                start: "2019-09-30",
                end: "2019-09-30"
              },
              {
                id: 1,
                title: "change2",
                start: "2019-09-05T12:30:00",
                end: "2019-09-09T12:30:00"
              },
              {
                id: 2,
                title: "change3",
                start: "2019-09-05"
              },
              {
                id: 4,
                title: "change4",
                start: "2019-09-06"
              },
              {
                id: 5,
                title: "change5",
                start: "2019-09-30"
              },
              {
                id: 6,
                title: "change6",
                start: "2019-09-30"
              },
              {
                id: 7,
                title: "change7",
                start: "2019-09-30"
              },
              {
                id: 8,
                title: "change7",
                start: "2019-09-11"
              }
              // etc...
            ],
            className: "normal-event"
          };

          let test = calendarApi.getEventSources();
          for (let source of test) {
            source.remove();
          }
          calendarApi.addEventSource(eventSources);
        }.bind(this),
        1000
      );
    }
  },
  data() {
    return {
      calendarPlugins: [dayGridPlugin, interactionPlugin],
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
      }
    };
  },
  mounted() {
    this.calendarSize = {
      width: this.$refs.fullCalendar.$el.offsetWidth,
      height: this.$refs.fullCalendar.$el.offsetHeight
    };
    console.log("rendered");
  },
  updated() {
    console.log("updated");
  }
};
</script>

<style lang='scss'>
@import "~@fullcalendar/core/main.css";
@import "~@fullcalendar/daygrid/main.css";

#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 30px;
  display: flex;
  .sort-type {
    ul {
      width: 200px;
    }
  }
  .Calendar {
    position: relative;
    .fc-today-button {
      position: absolute;
      right: 0;
      top: 0;
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

      &.normal-event {
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
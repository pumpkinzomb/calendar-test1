<template>
  <div id="app">
    <FullCalendar
      defaultView="dayGridMonth"
      :plugins="calendarPlugins"
      :header="header"
      :eventLimit="eventLimit"
      :eventSources="eventSources"
      :selectable="selectable"
      :showNonCurrentDates="showNonCurrentDates"
      :fixedWeekCount="fixedWeekCount"
      :titleFormat="titleFormat"
      @eventClick="handleEventClick"
      @select="handleSelect"
      @datesRender="handleDatesRender"
      class="Calendar"
      ref="fullCalendar"
    />
  </div>
</template>

<script>
/* eslint-disable */
import FullCalendar from "@fullcalendar/vue";
import dayGridPlugin from "@fullcalendar/daygrid";
import interactionPlugin from "@fullcalendar/interaction";

export default {
  name: "app",
  components: {
    FullCalendar
  },
  methods: {
    handleEventClick(info) {
      console.log(`${info.event.title} ${info.event.id}`);
      console.log(info);
      // info.el.style.backgroundColor = "red";
    },
    handleSelect(info) {
      console.log(info);
    },
    handleDatesRender(info) {
      let calendarApi = this.$refs.fullCalendar.getApi();
      setTimeout(
        function() {
          let calendarApi = this.$refs.fullCalendar.getApi();
          let eventSources = {
            events: [
              {
                id: 0,
                title: "change1",
                start: "2019-09-01",
                end: "2019-09-10"
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
                start: "2019-09-05"
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
        3000
      );
      console.log(calendarApi.getDate());
    }
  },
  data() {
    return {
      calendarPlugins: [dayGridPlugin, interactionPlugin],
      header: {
        left: "",
        center: "prev title next",
        right: "today"
      },
      titleFormat: function(dateData) {
        const title = new Date(dateData.date.marker);
        return `${title.getFullYear()}. ${title.getMonth()} `;
      },
      // locale: "ko",
      selectable: true,
      eventLimit: true,
      showNonCurrentDates: true, // 해당 달 이외의 날짜정보 hidden
      fixedWeekCount: false, //항상 6줄의 위크카운트를 보여줄것인가
      eventSources: [
        {
          events: [
            {
              id: 0,
              title: "my event",
              start: "2019-09-01",
              end: "2019-09-10"
            },
            {
              id: 1,
              title: "Event2",
              start: "2019-09-05T12:30:00",
              end: "2019-09-09T12:30:00"
            },
            {
              id: 2,
              title: "Event3",
              start: "2019-09-05"
            },
            {
              id: 4,
              title: "Event4",
              start: "2019-09-05"
            }
            // etc...
          ],
          className: "normal-event"
        },
        {
          events: [
            {
              id: 5,
              title: "long event1",
              start: "2019-09-01",
              end: "2019-09-09T12:30:00"
            },
            {
              id: 6,
              title: "long event2",
              start: "2019-09-05T12:30:00",
              end: "2019-09-09T12:30:00"
            }
            // etc...
          ],
          className: "long-event"
        }
      ],
      events: [
        {
          title: "My Event",
          start: "2019-09-11",
          url: "http://google.com/"
        }
      ]
    };
  },
  mounted() {
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
  .Calendar {
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
      &.long-event {
        background: rgb(167, 155, 142);
        color: #ffffff;
        padding-left: 0.3rem;
      }
    }
    .fc-more-popover {
      .fc-event-container {
        padding: 0.5rem;
      }
    }

    .fc-sat {
      color: blue;
    }
    .fc-sun {
      color: red;
    }

    .fc-popover.fc-more-popover {
      border-radius: 0.5rem;
    }
  }
}
</style>
<template>
  <div id="app">
    <FullCalendar
      defaultView="dayGridMonth"
      :plugins="calendarPlugins"
      :header="header"
      :locale="locale"
      :eventLimit="eventLimit"
      :eventSources="eventSources"
      :selectable="selectable"
      @eventClick="handleEventClick"
      @select="handleSelect"
    />
  </div>
</template>

<script>
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
      locale: "ko",
      selectable: true,
      eventLimit: true,
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
          color: "orange", // an option!
          textColor: "black" // an option!
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

  .fc-day-header {
    padding: 1rem 0;
  }
  .fc-center {
    display: flex;
  }
  .fc-event {
    padding: 0.1rem;
    margin-bottom: 0.1rem;
    cursor: pointer;
  }
  .fc-day-number {
    padding: 0.5rem;
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
</style>
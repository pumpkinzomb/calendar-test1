// right: "dayGridMonth,timeGridWeek,timeGridDay,listWeek"
const CALENDAR_DEFAULT = {
  header: {
    left: "",
    center: "today prev title next",
    right: ""
  },
  titleFormat: function(dateData) {
    //캘린더 타이틀날짜표기
    const monthNames = [
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
    ];
    const dateInfo = new Date(dateData.date.marker);
    return `${monthNames[dateInfo.getMonth()]} ${dateInfo.getFullYear()}`;
  },
  selectable: true, // date select 가능여부
  eventLimit: true, // event 갯수 limit
  showNonCurrentDates: false, // 해당 달 이외의 날짜정보 hidden
  fixedWeekCount: false, //항상 6줄의 위크카운트를 보여줄것인가
  dayPopoverFormat: function(dateData) {
    //더보기 팝업 타이틀날짜표기
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const title = new Date(dateData.date.marker);
    return `${title.getDate()} ${days[title.getDay()]}`;
  },
  buttonText: {
    today: "Today",
    month: "month",
    week: "week",
    day: "day",
    list: "list"
  },
  height: 852
};

export default CALENDAR_DEFAULT;

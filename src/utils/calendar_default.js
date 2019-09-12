// right: "dayGridMonth,timeGridWeek,timeGridDay,listWeek"
const CALENDAR_DEFAULT = {
  header: {
    left: "",
    center: "prev title next",
    right: "today"
  },
  titleFormat: function(dateData) {
    //캘린더 타이틀날짜표기
    const title = new Date(dateData.date.marker);
    return `${title.getFullYear()}. ${title.getMonth() + 1} `;
  },
  selectable: true, // date select 가능여부
  eventLimit: true, // event 갯수 limit
  showNonCurrentDates: true, // 해당 달 이외의 날짜정보 hidden
  fixedWeekCount: false, //항상 6줄의 위크카운트를 보여줄것인가
  dayPopoverFormat: function(dateData) {
    //더보기 팝업 타이틀날짜표기
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const title = new Date(dateData.date.marker);
    return `${title.getDate()} (${days[title.getDay()]})`;
  }
};

export default CALENDAR_DEFAULT;

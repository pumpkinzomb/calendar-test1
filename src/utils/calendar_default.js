const CALENDAR_DEFAULT =
{
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
};

export default CALENDAR_DEFAULT;
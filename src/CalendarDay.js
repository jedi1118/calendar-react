function CalendarDay({calendarMonth, calendarYear, day, dateKey, onShowDetail, tasks}) {
        // console.log('#### CalendarDay:', this.props.dateKey);
        // getMonth() is 0 based, need to +1
        const today = new Date();
        const isToday = day === today.getDate() &&
            calendarMonth === today.getMonth()+1  && calendarYear === today.getFullYear();
        return (
        <button className={isToday?"today":""} onClick={() => {onShowDetail(dateKey)}}>
            <span className="day">{day}</span>
            {
                tasks && tasks[dateKey] &&
                    <span className="todo">{tasks[dateKey].length} tasks</span>
            }
            </button>
        );
}
export default CalendarDay;
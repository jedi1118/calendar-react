import { useSelector, useDispatch } from 'react-redux';

function CalendarDay(props/*{calendarMonth, calendarYear, day, dateKey, onShowDetail, tasks}*/) {
        const month = useSelector((state) => state.calendar.month);
        const year = useSelector((state) => state.calendar.year);

        // getMonth() is 0 based
        const today = new Date();
        const isToday = props.day === today.getDate() &&
            month === today.getMonth()  && year === today.getFullYear();
        return (
        <button className={isToday?"today":""} onClick={() => {/*onShowDetail(props.dateKey)*/}}>
            <span className="day">{props.day}</span>
            {
                props.tasks && props.tasks[props.dateKey] &&
                    <span className="todo">{props.tasks[props.dateKey].length} tasks</span>
            }
            </button>
        );
}
export default CalendarDay;
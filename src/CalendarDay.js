import { useSelector, useDispatch } from 'react-redux';
import { toPreviousMonth, toNextMonth, selectDay } from './reducers/calendarSlice'

function CalendarDay(props) {
        const month = useSelector((state) => state.calendar.month);
        const year = useSelector((state) => state.calendar.year);
        const dispatch = useDispatch(props.day);
        const dateKey = `${year}-${month+1}-${props.day}`;
        
        const tasks = useSelector((state) => state.tasks[dateKey]);

        // getMonth() is 0 based
        const today = new Date();
        const isToday = props.day === today.getDate() &&
            month === today.getMonth()  && year === today.getFullYear();
        if (isToday) {
            dispatch(selectDay(props.day));
        }
        return (
        <button className={isToday?"today":""} onClick={() => {dispatch(selectDay(props.day))}}>
            <span className="day">{props.day}</span>
            {
                tasks && tasks.length &&
                    <span className="todo">{tasks.length} tasks</span>
            }
            </button>
        );
}
export default CalendarDay;
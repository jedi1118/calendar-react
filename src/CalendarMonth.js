import CalendarButton from "./CalendarButton";
import CalendarDay from "./CalendarDay";
import { useSelector, useDispatch } from 'react-redux'
import { toPreviousMonth, toNextMonth } from './reducers/calendarSlice'

function CalendarMonth(props) {
    const date = useSelector(state => state.calendar.date) 
    const day = useSelector(state => state.calendar.day);
    const month = useSelector(state => state.calendar.month);
    const year = useSelector(state => state.calendar.year);
    const dispatch = useDispatch();

        const DAYS_IN_MONTHS = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];// days in a month
        let daysInMonth = DAYS_IN_MONTHS[month];// how many days in this month
        // check leap month
        if (month === 1 && year % 4 === 0) {// feb and leap year
            daysInMonth = 29;
        }
        const firstDay = new Date(`${month+1}/1/${year}`);
        // const lastDay = new Date(`${month}/${daysInMonth}/${year}`);
        // console.log('@@@ firstDay:', firstDay, ', lastday:', lastDay);
        const padBefore = firstDay.getDay();// days to pad before 1st day
        // const padAfter = 7 - lastDay.getDay() - 1;// days to pad after last day
        // console.log('###CalendarMonth', padBefore, padAfter);
        const DAY_LABEL = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const MONTH_LABEL = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        return (
        <div className="calendar">
            <div className="month-label">
                <CalendarButton
                    direction={-1}
                    onClick={() => dispatch(toPreviousMonth())}
                />
                <div>{MONTH_LABEL[month]} {year}</div>
                <CalendarButton
                    direction={1}
                    onClick={() => dispatch(toNextMonth())}
                />
            </div>
            <ul className="day-label">
                { DAY_LABEL.map((label, idx) => { return <li key={'label-'+idx}>{label}</li>} )}
            </ul>
            <ul className="month">
                { Array(padBefore).fill(null).map( (val, idx) => { return <li className="blank" key={'blank-'+idx}></li>})}
                { Array(daysInMonth).fill(null).map( (itm, index) => {
                    // const day = new Date(`${month}/${index+1}/${year}`);
                    const key = `${month}-${index+1}-${year}`;
                    // console.log('### key', key);
                    // seems unnecessary to construct/use a Date obj - we only use the number for display, 
                    // not using any of the Date functions
                    return <li key={key}>
                            <CalendarDay {...props} day={index+1} dateKey={key}/>
                        </li>
                })}
                {/* { Array(padAfter).fill(null).map( () => { return <li className="blank"></li>})} */}
            </ul>
        </div>
    );
}

export default CalendarMonth;
import { useSelector, useDispatch } from 'react-redux';
import { toPreviousMonth, toNextMonth } from './reducers/calendarSlice'

function CalendarButton({direction}) {
    const dispatch = useDispatch();

    return (
        <div className={`button-wrapper ${direction === 1? "next":"prev"}`}>
            <button onClick={() => { direction ===1? dispatch(toNextMonth()) : dispatch(toPreviousMonth())}}></button>
        </div>
    );
}

export default CalendarButton;
import { useSelector, useDispatch } from 'react-redux';
import { toPreviousMonth, toNextMonth } from './calendarSlice'

function CalendarButton({direction}) {
    const dispatch = useDispatch();

    return (
        <div className={`button-wrapper ${direction ? "next":"prev"}`}>
            <button onClick={() => { direction ? dispatch(toNextMonth()) : dispatch(toPreviousMonth())}}></button>
        </div>
    );
}

export default CalendarButton;
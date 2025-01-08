// import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toPreviousMonth, toNextMonth } from './reducers/calendarSlice'

import CalendarButton from './CalendarButton';
import CalendarMonth from './CalendarMonth';
import DayInfo from './DayInfo';
import './Calendar.css';


function Calendar() {
    const dispatch = useDispatch();
  
    return (
        <>
            <CalendarButton direction={-1}
                onClick={() => dispatch(toPreviousMonth())}
            />
            <CalendarMonth />
            <CalendarButton direction={1}
                onClick={() => dispatch(toNextMonth())}
            />
            <DayInfo/>
        </>
    );
}
export default Calendar;
// import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toPreviousMonth, toNextMonth } from './reducers/calendarSlice'

import CalendarButton from './CalendarButton';
import CalendarMonth from './CalendarMonth';
import DayInfo from './DayInfo';
import './Calendar.css';


function Calendar() {
    // const date = useSelector((state) => state.calendar.date);

    // const day = useSelector((state) => state.calendar.day);
    // const month = useSelector((state) => state.calendar.month);
    // const year = useSelector((state) => state.calendar.year);
    const dispatch = useDispatch();
    
    // function handlDelete(dayKey, id) {
    //     console.log('####handlDelete', dayKey, id);
    //     const taskCopy = JSON.parse(JSON.stringify(this.state.tasks));// create a copy
    //     let tasks = taskCopy && taskCopy[dayKey];
    //     for(let i = 0; tasks && i < tasks.length; i++) {
    //         if (tasks[i].id === id) {
    //             tasks.splice(i, 1);// remove
    //                 taskCopy[dayKey] = tasks;
    //             // this.setState({"tasks": taskCopy});
    //             this.handleShowDetail(dayKey);
    //         }
    //     }
    // }
    // function handleAdd(dayKey, description) {
    //     console.log('####handleAdd', dayKey, description);
    //     const taskCopy = JSON.parse(JSON.stringify(this.state.tasks));// create a copy
    //     let tasks = (taskCopy && taskCopy[dayKey]) || [];
    //     tasks.push({
    //         id: Date.now(),
    //         description: description
    //     });
    //     taskCopy[dayKey] = tasks;
    //     // this.setState({"tasks": taskCopy});
    //     this.handleShowDetail(dayKey);
    // }

    
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
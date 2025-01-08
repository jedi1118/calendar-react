// import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toPreviousMonth, toNextMonth } from './calendarSlice'

import CalendarButton from './CalendarButton';
import CalendarMonth from './CalendarMonth';
import DayInfo from './DayInfo';
import './Calendar.css';


function Calendar() {
    const date = useSelector((state) => state.calendar.date);

    const day = useSelector((state) => state.calendar.day);
    const month = useSelector((state) => state.calendar.month);
    const year = useSelector((state) => state.calendar.year);
    const dispatch = useDispatch();
    
    function initMonth(params) {
        // console.log('###initMonth', date);
        // const curMonth = date.getMonth();// 0 baseds, 0 is January
        // const curYear = date.getFullYear();
        return {
            calendarMonth: month+1,// display month, date.monthneeds to -1
            calendarYear: year,
            tasks: {// setup some tasks
                [`${month}-15-${year}`]: [{// prev month
                    id: 0,
                    description: "grocery shopping"
                }],
                [`${month+1}-5-${year}`]: [{// cur month
                    id: 1,
                    description: "return books"
                }],
                [`${month+1}-17-${year}`]: [{// cur month
                    id: 2,
                    description: "grocery shopping"
                }, {
                    id: 3,
                    description: "go to gym"
                }],
                [`${month+2}-9-${year}`]: [{// next month
                    id: 4,
                    description: "go to gym"
                }]
            }
        };
    }
    // function handleChangeMonth(direction) {
    //     // console.log('###handleChangeMonth', direction, this);
    //     let month = this.state.calendarMonth+direction;
    //     let year = this.state.calendarYear;
    //     if (month > 12) {
    //         month = 1;
    //         year += 1;
    //     } else if (month < 1) {
    //         month = 12;
    //         year -= 1;
    //     }
    //     // this.setState({
    //     //     calendarMonth: month,
    //     //     calendarYear: year
    //     // });
    // }
    // function toPreviouMonth() {
    //     this.handleChangeMonth(-1);
    // }
    // function toNextMonth() {
    //     this.handleChangeMonth(1);
    // }
    // function handleShowDetail(day) {
    //     // console.log('###onShowDetail', day);
    //     // this.setState({
    //     //     dateKey: day
    //     // });
    // }
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

    // let initialState = initMonth();
    // console.log('##############initialState', initialState);
    // let [state, setState] = useState(initialState);
    
    return (
            <>
            <CalendarButton direction={-1}
                onClick={() =>dispatch(toPreviousMonth())}
            />
            <CalendarMonth />
            <CalendarButton direction={1}
                onClick={() => dispatch(toNextMonth())}
            />
            {/* <DayInfo
                tasks={this.state.tasks}
                dateKey={this.state.dateKey}
                onAdd={this.handleAdd.bind(this)}
                onDelete={this.handlDelete.bind(this)}/> */}
            </>
        );
}
export default Calendar;
import React, { useState } from 'react';
import CalendarButton from './CalendarButton';
import CalendarMonth from './CalendarMonth';
import './Calendar.css';

function Calendar({date}) {
    console.log('###Calendar', date);

    // constructor(props) {
    //     super(props);
    //     this.initMonth();
    //     // 'this' is undefined when invoked, if bind the function to 'this' here
    //     // this.toPreviouMonth.bind(this);
    //     // this.toNextMonth.bind(this);
    // }

    function initMonth(params) {
        console.log('###initMonth', date);
        const curMonth = date.getMonth();// 0 baseds, 0 is January
        const curYear = date.getFullYear();
        return {
            calendarMonth: curMonth+1,// display month, date.monthneeds to -1
            calendarYear: curYear,
            tasks: {// setup some tasks
                [`${curMonth}-15-${curYear}`]: [{// prev month
                    id: 0,
                    description: "grocery shopping"
                }],
                [`${curMonth+1}-5-${curYear}`]: [{// cur month
                    id: 1,
                    description: "return books"
                }],
                [`${curMonth+1}-17-${curYear}`]: [{// cur month
                    id: 2,
                    description: "grocery shopping"
                }, {
                    id: 3,
                    description: "go to gym"
                }],
                [`${curMonth+2}-9-${curYear}`]: [{// next month
                    id: 4,
                    description: "go to gym"
                }]
            }
        };
    }
    function handleChangeMonth(direction) {
        // console.log('###handleChangeMonth', direction, this);
        let month = this.state.calendarMonth+direction;
        let year = this.state.calendarYear;
        if (month > 12) {
            month = 1;
            year += 1;
        } else if (month < 1) {
            month = 12;
            year -= 1;
        }
        // this.setState({
        //     calendarMonth: month,
        //     calendarYear: year
        // });
    }
    function toPreviouMonth() {
        this.handleChangeMonth(-1);
    }
    function toNextMonth() {
        this.handleChangeMonth(1);
    }
    function handleShowDetail(day) {
        // console.log('###onShowDetail', day);
        // this.setState({
        //     dateKey: day
        // });
    }
    function handlDelete(dayKey, id) {
        console.log('####handlDelete', dayKey, id);
        const taskCopy = JSON.parse(JSON.stringify(this.state.tasks));// create a copy
        let tasks = taskCopy && taskCopy[dayKey];
        for(let i = 0; tasks && i < tasks.length; i++) {
            if (tasks[i].id === id) {
                tasks.splice(i, 1);// remove
                    taskCopy[dayKey] = tasks;
                // this.setState({"tasks": taskCopy});
                this.handleShowDetail(dayKey);
            }
        }
    }
    function handleAdd(dayKey, description) {
        console.log('####handleAdd', dayKey, description);
        const taskCopy = JSON.parse(JSON.stringify(this.state.tasks));// create a copy
        let tasks = (taskCopy && taskCopy[dayKey]) || [];
        tasks.push({
            id: Date.now(),
            description: description
        });
        taskCopy[dayKey] = tasks;
        // this.setState({"tasks": taskCopy});
        this.handleShowDetail(dayKey);
    }

    let initialState = initMonth();
    console.log('##############initialState', initialState);
    let [state, setState] = useState(initialState);
    
    return (
            <>
            <div>hello</div>
            <CalendarButton onChangeMonth={() => {this.toPreviouMonth()}} direction={-1}/>
            <CalendarMonth 
                day={date} 
                onPrevMonth={() => {toPreviouMonth()}} 
                onNextMonth={() => {toNextMonth()}} 
                onShowDetail={handleShowDetail}/>
            <CalendarButton onChangeMonth={() => toNextMonth()} direction={1}/>
            {/* <DayInfo
            //     tasks={this.state.tasks}
            //     dateKey={this.state.dateKey}
            //     onAdd={this.handleAdd.bind(this)}
            //     onDelete={this.handlDelete.bind(this)}/>
            */}
            </>
        );
}
export default Calendar;
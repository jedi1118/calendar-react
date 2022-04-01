import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class CalendarDay extends React.PureComponent {
    render() {
        // console.log('#### CalendarDay:', this.props.dateKey);
        // getMonth() is 0 based, need to +1
        const isToday = this.props.day === today.getDate() &&
            this.props.calendarMonth === today.getMonth()+1  && this.props.calendarYear === today.getFullYear();
        return <button className={isToday?"today":""} onClick={() => {this.props.onShowDetail(this.props.dateKey)}}>
            <span className="day">{this.props.day}</span>
            {
                this.props.tasks && this.props.tasks[this.props.dateKey] &&
                    <span className="todo">{this.props.tasks[this.props.dateKey].length} tasks</span>
            }
            </button>
    }
}

class CalendarMonth extends React.PureComponent {
    render() {
        // console.log('###CalendarMonth', this.props);
        const month = this.props.calendarMonth;
        const year = this.props.calendarYear;
        const DAYS_IN_MONTHS = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];// day in a month
        let daysInMonth = DAYS_IN_MONTHS[month-1];// how many days in this month
        // check leap month
        if (month === 1 && year % 4 === 0) {// feb and leap year
            daysInMonth = 29;
        }
        const firstDay = new Date(`${month}/1/${year}`);
        const lastDay = new Date(`${month}/${daysInMonth}/${year}`);
        // console.log('@@@ firstDay:', firstDay, ', lastday:', lastDay);
        const padBefore = firstDay.getDay();// days to pad before 1st day
        const padAfter = 7 - lastDay.getDay() - 1;// days to pad after last day
        // console.log('###CalendarMonth', padBefore, padAfter);
        const DAY_LABEL = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const MONTH_LABEL = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

        return <div className="calendar">
            <div className="month-label">
                <CalendarButton {...this.props} direction={-1}
                    onChangeMonth={this.props.onPrevMonth}
                />
                <div>{MONTH_LABEL[month-1]} {year}</div>
                <CalendarButton {...this.props} direction={1}
                    onChangeMonth={this.props.onNextMonth}
                />
            </div>
            <ul className="day-label">
                { DAY_LABEL.map((label, idx) => { return <li key={'label-'+idx}>{label}</li>} )}
            </ul>
            <ul className="month">
                { Array(padBefore).fill(null).map( (val, idx) => { return <li className="blank" key={'blank-'+idx}></li>})}
                { Array(daysInMonth).fill(null).map( (itm, index) => {
                    const day = new Date(`${month}/${index+1}/${year}`);
                    const key = `${month}-${index+1}-${year}`;
                    // console.log('### key', key);
                    // seems unnecessary to construct/use a Date obj - we only use the number for display, 
                    // not using any of the Date functions
                    return <li key={key}>
                            <CalendarDay {...this.props} day={index+1} dateKey={key}/>
                        </li>
                })}
                {/* { Array(padAfter).fill(null).map( () => { return <li className="blank"></li>})} */}
            </ul>
        </div>
    }
}

class DayInfo extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = { value: ''}
        this.handleChange = this.handleChange.bind(this);
        this.handleAdd = this.handleAdd.bind(this);
    }
    handleChange(event) {
        this.setState({value: event.target.value});
    }
    handleAdd() {
        this.props.onAdd(this.props.dateKey, this.state.value);
        this.setState({value : ''});
    }
    render() {
        // console.log('##########DayInfo', this.props);
        const dayTasks = this.props && this.props.tasks && this.props.tasks[this.props.dateKey];
        return <div className="details">
            <div className="detail-label">Tasks for the day:</div>
            <div>{this.props.dateKey && new Date(this.props.dateKey).toDateString()}</div>
        {dayTasks && dayTasks.length > 0 &&
            <React.Fragment>
            <ul>
                {dayTasks.map((itm) => { 
                    return <li key={itm.id}>{itm.description}
                        <button onClick={() => {this.props.onDelete(this.props.dateKey, itm.id)}}>Delete</button>
                </li> })}
            </ul>
            </React.Fragment>
        }
        {this.props.dateKey && 
            <React.Fragment>
            <div className="add-label">Add a new task</div>
            <textarea value={this.state.value} onChange={this.handleChange}/>
            <div>
                <button onClick={this.handleAdd}>Add</button>
            </div>
            </React.Fragment>
        }
        </div>;
    }
}

class CalendarButton extends React.PureComponent {
    constructor(props) {
        super(props);
        this.triggerChangeMonth = this.triggerChangeMonth.bind(this);
    }
    triggerChangeMonth() {
        this.props.onChangeMonth(this.props.direction);
    }
    render() {
        return <div className={`button-wrapper ${this.props.direction === 1?"next":"prev"}`}>
            <button onClick={() => this.props.onChangeMonth(this.props.direction)}></button>
            {/* <button onClick={this.triggerChangeMonth}></button> */}
        </div>
    }
}

class Calendar extends React.PureComponent {
    constructor(props) {
        super(props);
        this.initMonth();
        // 'this' is undefined when invoked, if bind the function to 'this' here
        // this.toPreviouMonth.bind(this);
        // this.toNextMonth.bind(this);
    }

    initMonth(params) {
        // console.log('###initMonth', this.props.date);
        const curMonth = this.props.date.getMonth();// 0 baseds, 0 is January
        const curYear = this.props.date.getFullYear();
        this.state = {
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
    handleChangeMonth(direction) {
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
        this.setState({
            calendarMonth: month,
            calendarYear: year
        });
    }
    toPreviouMonth() {
        this.handleChangeMonth(-1);
    }
    toNextMonth() {
        this.handleChangeMonth(1);
    }
    handleShowDetail(day) {
        // console.log('###onShowDetail', day);
        this.setState({
            dateKey: day
        });
    }
    handlDelete(dayKey, id) {
        console.log('####handlDelete', dayKey, id);
        const taskCopy = JSON.parse(JSON.stringify(this.state.tasks));// create a copy
        let tasks = taskCopy && taskCopy[dayKey];
        for(let i = 0; tasks && i < tasks.length; i++) {
            if (tasks[i].id === id) {
                tasks.splice(i, 1);// remove
                    taskCopy[dayKey] = tasks;
                this.setState({"tasks": taskCopy});
                this.handleShowDetail(dayKey);
            }
        }
    }
    handleAdd(dayKey, description) {
        console.log('####handleAdd', dayKey, description);
        const taskCopy = JSON.parse(JSON.stringify(this.state.tasks));// create a copy
        let tasks = (taskCopy && taskCopy[dayKey]) || [];
        tasks.push({
            id: Date.now(),
            description: description
        });
        taskCopy[dayKey] = tasks;
        this.setState({"tasks": taskCopy});
        this.handleShowDetail(dayKey);
    }
    render() {
        return <React.Fragment>
            <CalendarButton 
                onChangeMonth={() => {this.toPreviouMonth()}} direction={-1}/>
            <CalendarMonth 
                {...this.state} 
                onPrevMonth={() => {this.toPreviouMonth()}} 
                onNextMonth={() => {this.toNextMonth()}} 
                onShowDetail={this.handleShowDetail.bind(this)}/>
            <CalendarButton 
                onChangeMonth={() => this.toNextMonth()} direction={1}/>
            <DayInfo
                tasks={this.state.tasks}
                dateKey={this.state.dateKey}
                onAdd={this.handleAdd.bind(this)}
                onDelete={this.handlDelete.bind(this)}/>
        </React.Fragment>;
    }
}

const today = new Date();

// init app
ReactDOM.render(
    <Calendar date={today}/>, 
    document.getElementById('root')
);

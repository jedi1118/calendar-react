import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class CalendarDay extends React.PureComponent {
    render() {
        console.log('#### CalendarDay:', this.props.day,  this.props.calendarMonth, this.props.calendarYear, `${today.getDate()}/${today.getMonth()+1}/${today.getFullYear()}`);
        // getMonth() is 0 based, need to +1
        const isToday = this.props.day === today.getDate() &&
            this.props.calendarMonth === today.getMonth()+1  && this.props.calendarYear === today.getFullYear();
        return <button className={isToday?"today":""} onClick={() => {this.props.showDetail(this.props.day)}}>
            <span className="day">{this.props.day}</span>
            {
                this.props.items && this.props.items[this.props.date] &&
                    <span className="todo">{this.props.items[this.props.date].length} events</span>
            }
            </button>
    }
}

class CalendarMonth extends React.PureComponent {
    render() {
        console.log('###CalendarMonth', this.props);

        const month = this.props.calendarMonth;
        const year = this.props.calendarYear;
        const DAYS_IN_MONTHS = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];// day in a month
        let daysInMonth = DAYS_IN_MONTHS[month-1];// how many days in this month
        // check leap month
        if (month == 1 && year % 4 === 0) {// feb and leap year
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
                <CalendarButton/>
                {MONTH_LABEL[month-1]} {year}
                <CalendarButton/>
            </div>
            <ul className="day-label">
                { DAY_LABEL.map((label, idx) => { return <li key={'label-'+idx}>{label}</li>} )}
            </ul>
            <ul className="month">
                { Array(padBefore).fill(null).map( (val, idx) => { return <li className="blank" key={'blank-'+idx}></li>})}
                { Array(daysInMonth).fill(null).map( (itm, index) => {
                    const day = new Date(`${month}/${index+1}/${year}`);
                    const key = `${month}-${index+1}-${year}`;
                    console.log('### key', key);
                    // seems unnecessary to construct/use a Date obj
                    return <li key={key}>
                            <CalendarDay {...this.props} day={index+1} date={key}/>
                        </li>
                })}
                {/* { Array(padAfter).fill(null).map( () => { return <li className="blank"></li>})} */}
            </ul>
        </div>
    }
}

class DayInfo extends React.PureComponent {
    render() {
        return 'day detail';
    }
}

class CalendarButton extends React.PureComponent {
    render() {
        return <button>click here</button>;
    }
}

class Calendar extends React.PureComponent {
    constructor(props) {
        super(props);
        this.initMonth();
        this.changeMonth.bind(this);
    }

    initMonth(params) {
        console.log('###initMonth', this.props.date);
        const curMonth = this.props.date.getMonth();// 0 baseds, 0 is January
        const curYear = this.props.date.getFullYear();
        this.state = {
            calendarMonth: curMonth+1,// display month, date.monthneeds to -1
            calendarYear: curYear,
            items: {
                "3-5-2022": [{
                    idx: 0,
                    description: "return books"
                }],
                "3-15-2022": [{
                    idx: 0,
                    description: "grocery shopping"
                }, {
                    idx: 1,
                    description: "go to gym"
                }]
            }
        };
    }
    changeMonth(direction) {
        console.log('###changeMonth', direction);
    }
    showDetail(day) {
        console.log('###showDetail', day);
    }
    render() {
        return <React.Fragment>
            <CalendarButton changeMonth={this.changeMonth} direction={1}/>
            <CalendarMonth {...this.state} changeMonth={this.changeMonth} showDetail={this.showDetail}/>
            <CalendarButton changeMonth={this.changeMonth} direction={-1}/>
            <DayInfo />
        </React.Fragment>;
    }
}

const today = new Date();

// init app
ReactDOM.render(
    <Calendar date={today}/>, 
    document.getElementById('root')
);

import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';


class CalendarDay extends React.PureComponent {
    render() {
        return <button>day {this.props.day}</button>;
    }

}

class CalendarMonth extends React.PureComponent {
    render() {
        console.log('###CalendarMonth', this.props);

        const month = this.props.calendarMonth;
        const year = this.props.calendarYear;
        const DAYS_IN_MONTHS = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];// day in a month
        let daysInMonth = DAYS_IN_MONTHS[month];// how many days in this month
        // check leap month
        if (month == 1 && year % 4 === 0) {// feb and leap year
            daysInMonth = 29;
        }
        const firstDay = new Date(`${month}/1/${year}`);
        const lastDay = new Date(`${month}/${daysInMonth}/${year}`);
        const padBefore = firstDay.getDay();// days to pad before 1st day
        const padAfter = 7 - lastDay.getDay() - 1;// days to pad after last day
        console.log('###CalendarMonth', padBefore, padAfter);

        return <div className="calendar">
            <div>Month</div>
            { Array(padBefore).fill(null).map( () => { return <div className="blank">blank</div>})}
            { Array(daysInMonth).fill(null).map( (itm, index) => { return <div className="day">{index+1}</div>})}
            { Array(padAfter).fill(null).map( () => { return <div className="blank">blank</div>})}
            <div>Month</div>
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
    }

    initMonth(params) {
        console.log('###initMonth', this.props.date);
        const curMonth = this.props.date.getMonth();// 0 baseds, 0 is January
        const curYear = this.props.date.getFullYear();
        this.state = {
            calendarMonth: curMonth+1,
            calendarYear: curYear,
            items: []// items for calendar i.e. "3-15-2021" : [ { idx: 0, description: "grocery shopping" }, { idx: 0, description: "go to gym" }, ... ]
        };
    }

    render() {
        return <React.Fragment>
            <CalendarButton/>
            <CalendarMonth {...this.state}/>
            <CalendarButton/>
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

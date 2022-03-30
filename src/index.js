import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';


class Day extends React.PureComponent {
    render() {
        return <button>day {this.props.day}</button>;
    }

}


class Calendar extends React.PureComponent {
    render() {
        const month = Array(31).fill(null);        
        return month.map((day, index) => <Day day={index}/>);
    }
}


// init app
ReactDOM.render(<Calendar/>, document.getElementById('root'));

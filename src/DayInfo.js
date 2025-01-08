import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';


function DayInfo(props) {
    // constructor(props) {
    //     super(props);
    //     this.state = { value: '', error: false}
    //     this.handleChange = this.handleChange.bind(this);
    //     this.handleAdd = this.handleAdd.bind(this);
    // }
    // function handleChange(event) {
    //     this.setState({error: false});
    //     this.setState({value: event.target.value});
    // }
    // function handleAdd() {
    //     if (this.state.value === '') {
    //         this.setState({error: true});
    //         return;
    //     }
    //     this.setState({error: false});
    //     this.props.onAdd(this.props.dateKey, this.state.value);
    //     this.setState({value : ''});
    // }
    // render() {
        // console.log('##########DayInfo', this.props);
        const dayTasks = this.props && this.props.tasks && this.props.tasks[this.props.dateKey];
        return (
        <div className="details">
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
            <textarea value={1/*this.state.value*/} onChange={this.handleChange}/>
            { /*this.state.error &&*/ <span className="detail-add-err">Please enter a description</span>}
            <div>
                <button onClick={this.handleAdd}>Add</button>
            </div>
            </React.Fragment>
        }
        </div>
        );
    // }
}
export default DayInfo;
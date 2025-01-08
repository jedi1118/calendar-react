import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { toPreviousMonth, toNextMonth, selectDay } from './reducers/calendarSlice'
import { addTask, deleteTask } from './reducers/taskSlice'

function DayInfo(props) {
    const dispatch = useDispatch();
    const day = useSelector((state) => state.calendar.day);
    const month = useSelector((state) => state.calendar.month);
    const year = useSelector((state) => state.calendar.year);
    
    const dateKey = `${month+1}-${day}-${year}`;
    const taskList = useSelector((state) => state.tasks[dateKey]);
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
        // const dayTasks = this.props && this.props.tasks && this.props.tasks[this.props.dateKey];
    return (
        <div className="details">
            <div className="detail-label">Tasks for the day:</div>
            <div>{new Date(dateKey).toDateString()}</div>
        {taskList && taskList.length > 0 &&
            <React.Fragment>
            <ul>
                {taskList.map((itm) => { 
                    return <li key={itm.id}>{itm.description}
                        <button onClick={() => {dispatch(deleteTask(dateKey, itm.id))}}>Delete</button>
                </li> })}
            </ul>
            </React.Fragment>
        }
        {dateKey && 
            <React.Fragment>
            <div className="add-label">Add a new task</div>
            <textarea value={""} /*onChange={this.handleChange}*//>
            { /*this.state.error &&*/ <span className="detail-add-err">Please enter a description</span>}
            <div>
                <button onClick={() => dispatch(addTask)}>Add</button>
            </div>
            </React.Fragment>
        }
        </div>
    );
}
export default DayInfo;
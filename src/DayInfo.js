import React, { useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { toPreviousMonth, toNextMonth, selectDay } from './reducers/calendarSlice'
import { addTask, deleteTask } from './reducers/taskSlice'

function DayInfo(props) {
    const dispatch = useDispatch();
    const day = useSelector((state) => state.calendar.day);
    const month = useSelector((state) => state.calendar.month);
    const year = useSelector((state) => state.calendar.year);
    
    const dateKey = `${year}-${month+1}-${day}`;
    const taskList = useSelector((state) => state.tasks[dateKey]);

    const taskRef = useRef(null);
    const [error, setError] = useState(false);

    function handleAdd() {
        const text = taskRef.current.value;
        setError(text === "");
        if (text === "") return;

        dispatch(addTask({key: dateKey, task: text}));
        taskRef.current.value = '';
    }
    return (
        <div className="details">
            <div className="detail-label">Tasks for the day:</div>
            <div>{new Date(dateKey).toDateString()}</div>
        {taskList && taskList.length > 0 &&
            <React.Fragment>
            <ul>
                {taskList.map((itm) => { 
                    return <li key={itm.id}>{itm.description}
                        <button onClick={() => {dispatch(deleteTask({ key: dateKey, id: itm.id}))}}>Delete</button>
                </li> })}
            </ul>
            </React.Fragment>
        }
        {dateKey && 
            <React.Fragment>
            <div className="add-label">Add a new task</div>
                <textarea defaultValue={""} ref={taskRef}/>
                { error && <span className="detail-add-err">Please enter a description</span>}
                <button onClick={handleAdd}>Add</button>
            </React.Fragment>
        }
        </div>
    );
}
export default DayInfo;
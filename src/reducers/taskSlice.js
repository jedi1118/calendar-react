import { createSlice } from "@reduxjs/toolkit";

const today = new Date();
const month = today.getMonth();// 0 baseds, 0 is January
const year = today.getFullYear();

// NOTE: alternative way to organize tasks would be normalize tasks.
// initialState: {
    // 'dates': {
    //     '2025-1-10': [ 11, 23, 45, 234],// date key contains ref to task ids
    //     '2025-2-6': [ 3, 78]
    // },
    // 'tasks': [
    //     { id: 11, desc: 'blah'},// actual task
    //     { id: 23, desc: 'blah'}, 
    //     { id: 234, desc: 'blah'}, 
    // ] 
// }
// but, the data is nested stil, so it's no better than existing structure
const taskSlice = createSlice({
    name: 'tasks',
    initialState: {// add some demo data
        [`${year}-${month}-15`]: [{// prev month
            id: 0,
            description: "grocery shopping"
        }],
        [`${year}-${month+1}-5`]: [{// cur month
            id: 1,
            description: "return books"
        }],
        [`${year}-${month+1}-17`]: [{// cur month
                id: 2,
                description: "grocery shopping"
            }, {
                id: 3,
                description: "go to gym"
            }
        ],
        [`${year}-${month+2}-9`]: [{// next month
            id: 4,
            description: "go to gym"
        }]
    },
    reducers: {
        addTask: (state, data) => {
            if (!state[data.payload.key]) {
                state[data.payload.key] = [];
            }
            state[data.payload.key].push({id: Date.now(), description: data.payload.task});
        },
        deleteTask: (state, data) => {
            const todos = state[data.payload.key];
            if (todos) {
                const newList = todos.filter(
                    (todo) => todo.id !== data.payload.id
                );
                state[data.payload.key] = newList;
            }
        }
    }
  });
  
export const {addTask, deleteTask} = taskSlice.actions;
export default taskSlice.reducer;
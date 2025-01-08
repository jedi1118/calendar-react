import { createSlice } from "@reduxjs/toolkit";

const today = new Date();
const month = today.getMonth();// 0 baseds, 0 is January
const year = today.getFullYear();

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
        addTask: (state, dateKey) => {
            if (!state.list[dateKey]) {
                state.list[dateKey] = [];
            }
            state.list[dateKey].push('?????');
        },
        deleteTask: (state,dateKey) => {
            delete state.list[dateKey]["a"];
        },
    },
  });
  
export const {addTask, deleteTask} = taskSlice.actions;
export default taskSlice.reducer;
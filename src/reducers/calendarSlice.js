import { createSlice } from "@reduxjs/toolkit";

const today = new Date();
const curMonth = today.getMonth();// 0 baseds, 0 is January
const curYear = today.getFullYear();
const curDay = today.getDate();

const calendarSlice = createSlice({
    name: 'calendar',
    initialState: {
        year: curYear,
        month: curMonth,
        day: 1,// default to day 1
    },
    reducers: {
        toPreviousMonth: (state) => {
            if (state.month - 1 < 0) {
                state.month = 11;// month value is 0 based
                state.year -= 1;
            } else {
                state.month -= 1;
            }
            // state.day = 1;
        },
        toNextMonth: (state) => {
            if (state.month + 1 > 11) {
                state.month = 0;// month value is 0 based
                state.year += 1;
            } else {
                state.month += 1;
            }
            // state.day = 1;
        },
        selectDay: (state, day) => {
            state.day = day.payload;
        }
    },
  });
  
export const {toPreviousMonth, toNextMonth, selectDay} = calendarSlice.actions;
export default calendarSlice.reducer;
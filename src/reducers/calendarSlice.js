import { createSlice } from "@reduxjs/toolkit";

const today = new Date();
const curMonth = today.getMonth();// 0 baseds, 0 is January
const curYear = today.getFullYear();

const calendarSlice = createSlice({
    name: 'calendar',
    initialState: {
        year: curYear,
        month:curMonth,
        day: null,
        date: today
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
    //   addItem: (state, action) => {
    //     // Add item logic
    //   },
    //   removeItem: (state, action) => {
    //     // Remove item logic
    //   },
    //   updateQuantity: (state, action) => {
    //     // Update quantity logic
    //   },
    },
  });
  
export const {toPreviousMonth, toNextMonth} = calendarSlice.actions;
export default calendarSlice.reducer;
// import logo from './logo.svg';
import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit';

import './App.css';
import Calendar from './Calendar';
import calendarReducer from './reducers/calendarSlice.js'
import taskReducer from './reducers/taskSlice.js'

const store = configureStore({
  reducer: {
    calendar: calendarReducer,
    tasks: taskReducer
  }
});

function App() {
  // const today = new Date();
  return (
    <div className="App">
      <Provider store={store}>
        <Calendar/>
      </Provider>
    </div>
  );
}

export default App;

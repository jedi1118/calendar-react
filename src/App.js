// import logo from './logo.svg';
import './App.css';
import Calendar from './Calendar';

import { Provider } from 'react-redux'
import { configureStore } from '@reduxjs/toolkit';
import calendarReducer from './reducers/calendarSlice.js'

const store = configureStore({
  reducer: {
    calendar: calendarReducer
  }
});

function App() {
  const today = new Date();
  return (
    <div className="App">
      <Provider store={store}>
        <Calendar date={today}/>
      </Provider>
    </div>
  );
}

export default App;

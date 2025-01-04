// import logo from './logo.svg';
import './App.css';
import Calendar from './Calendar';


function App() {
  const today = new Date();
  return (
    <div className="App">
      {/* <header className="App-header"> */}

        <Calendar date={today}/>
      {/* </header> */}
    </div>
  );
}

export default App;

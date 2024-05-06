import React from "react"
import './App.css';
import TimerIcon from '@mui/icons-material/Timer';

function App() {

  const [screen, setScreen] = React.useState("start")

  function handleScreenChange() {
    setScreen("main")
  }

  return (
    <div className="App">
      <main>
        {screen === "start" ? (
          <>
            <h1 className="title">Tenzies</h1>
            <p className="instructions">Roll until all dice are the same.
              Click each die to freeze it at its current value between rolls.</p>
            <button className='start-button' onClick={handleScreenChange}>Start Game
              <TimerIcon className='timer-icon' />
            </button>
          </>) : (
          <div>
            <h1>Main Screen</h1>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;

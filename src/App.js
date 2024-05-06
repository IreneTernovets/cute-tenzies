import React from "react"
import './App.css';
import TimerIcon from '@mui/icons-material/Timer';
import { nanoid } from 'nanoid'

/* скачай шостий дайс в базу даних
ще я подумала шо можна змінювати філ в свдж при натиску
зараз я генерую просто числа*/

function App() {

  const [screen, setScreen] = React.useState("start")
  const [dice, setDice] = React.useState(allNewDice())

  function handleScreenChange() {
    setScreen("main")
  }

  function allNewDice() {
    const newDice = []
    for (let i = 0; i < 10; i++) {
      newDice.push({
        value: Math.ceil(Math.random() * 6),
        id: nanoid()
      })
    }
    return newDice
  }

  const diceElements = dice.map(die => <div key={die.id}>{die.value}</div>)

  return (
    <div className="App">
      <main className="wrapper">
        {screen === "start" ? (
          <>
            <h1 className="title">Tenzies</h1>
            <p className="instructions">Roll until all dice are the same.
              Click each die to freeze it at its current value between rolls.</p>
            <button className='start-button' onClick={handleScreenChange}>Start Game
              <TimerIcon className='timer-icon' />
            </button>
          </>) : (
          <div className="wrapper tenzies-screen">
            <h2>Number of attempts: 0</h2>
            {diceElements}

          </div>
        )}
      </main>
    </div>
  );
}

export default App;

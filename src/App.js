import React from "react"
import './App.css';
import TimerIcon from '@mui/icons-material/Timer';
import { nanoid } from 'nanoid'
import Die from "./Die";
import picData from "./data"

/*
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
      const randomPictureObj = picData[Math.floor(Math.random() * 6)]
      newDice.push({
        defaultValue: randomPictureObj.imgDefault,
        heldValue: randomPictureObj.imgHeld,
        id: nanoid(),
        isHeld: false
      })
    }
    return newDice
  }

  const diceElements = dice.map(die => <Die key={die.id}
    defaultValue={die.defaultValue}
    id={die.id}
    heldValue={die.heldValue}
    isHeld={die.isHeld}
  ></Die>)

  return (
    <div className="App">
      <main>
        {screen === "start" ? (
          <div className="wrapper">
            <h1 className="title">Tenzies</h1>
            <p className="instructions">Roll until all dice are the same.
              Click each die to freeze it at its current value between rolls.</p>
            <button className='start-button' onClick={handleScreenChange}>Start Game
              <TimerIcon className='timer-icon' />
            </button>
          </div>) : (
          <div className="tenzies-screen">
            <h2 className="attemts-counter">Number of attempts: 0</h2>
            <div className="dice-container">
              {diceElements}
            </div>
            <button className='roll-button'>Roll</button>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;

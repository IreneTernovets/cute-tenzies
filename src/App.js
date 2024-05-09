import React from "react"
import './App.css';
import TimerIcon from '@mui/icons-material/Timer';
import { nanoid } from 'nanoid'
import Die from "./Die";
import picData from "./data"
import Fireworks from "react-canvas-confetti/dist/presets/fireworks";

function App() {
  const [screen, setScreen] = React.useState("start")
  const [dice, setDice] = React.useState(allNewDice())
  const [count, setCount] = React.useState(0)
  const [tenzies, setTenzies] = React.useState(false)
  const [time, setTime] = React.useState(0)
  const intervalRef = React.useRef(null)

  function handleScreenChange() {
    setScreen("main")
    setCount(0)
  }

  function startTimer() {
    const id = setInterval(() => { setTime(oldTime => oldTime + 1) }, 1000)
    intervalRef.current = id;
  }


  function createSeparateDie() {
    const randomPictureObj = picData[Math.floor(Math.random() * 6)]
    return {
      number: randomPictureObj.number,
      defaultValue: randomPictureObj.imgDefault,
      heldValue: randomPictureObj.imgHeld,
      id: nanoid(),
      isHeld: false
    }
  }

  React.useEffect(() => {
    const referenceNumber = dice[0].number
    if (dice.every(die => die.isHeld) && dice.every(die => die.number === referenceNumber)) {
      setTenzies(true);
      clearInterval(intervalRef.current)
    }
  }, [dice])


  function allNewDice() {
    const newDice = []
    for (let i = 0; i < 10; i++) {
      newDice.push(createSeparateDie())
    }
    return newDice
  }

  function handleHoldChange(id) {
    setDice(prevDice => prevDice.map(die => {
      return die.id === id ?
        {
          ...die, isHeld: !die.isHeld
        } :
        die
    }))
  }

  function rollDice() {
    if (!tenzies) {
      setDice(prevDice => prevDice.map(die => {
        return die.isHeld ? die : createSeparateDie()
      }))
    } else {
      setTenzies(false)
      setDice(allNewDice())
      setScreen("start")
    }
  }

  function addCount() {
    setCount(prevCount => prevCount + 1)
  }

  const diceElements = dice.map(die => <Die key={die.id}
    defaultValue={die.defaultValue}
    id={die.id}
    heldValue={die.heldValue}
    isHeld={die.isHeld}
    handleHoldChange={handleHoldChange}
  ></Die>)

  return (
    <div className="App">
      {tenzies && <Fireworks autorun={{ speed: 3 }} />}
      <main>
        {screen === "start" ? (
          <div className="wrapper">
            <h1 className="title">Tenzies</h1>
            <p className="instructions">Roll until all dice are the same.
              Click each die to freeze it at its current value between rolls.</p>
            <button className='start-button' onClick={() => { handleScreenChange(); startTimer() }}>Start Game
              <TimerIcon className='timer-icon' />
            </button>
          </div>) : (
          <div className="tenzies-screen">
            <div className="timer">Time:{time}sec</div>
            <h2 className="attemts-counter">Number of attempts: {count}</h2>
            <div className="dice-container">
              {diceElements}
            </div>
            <button className='roll-button' onClick={() => { rollDice(); addCount() }}>{tenzies ? "New Game" : "Roll"}</button>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;

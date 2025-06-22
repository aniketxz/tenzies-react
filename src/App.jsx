import { useEffect, useRef, useState } from "react";
import Die from "./Die";
import { nanoid } from "nanoid";
import Confetti from "react-confetti";

const App = () => {
  const [dice, setDice] = useState(() => generateAllNewDice());

  const buttonRef = useRef(null);

  const gameWon =
    dice.every((die) => die.isHeld) &&
    dice.every((die) => die.value === dice[0].value);

  useEffect(() => {
    if (gameWon) {
      buttonRef.current.focus();
    }
  }, [gameWon]);

  function generateAllNewDice() {
    return Array(10)
      .fill(null)
      .map(() => {
        return {
          value: Math.ceil(Math.random() * 6),
          isHeld: false,
          id: nanoid(),
        };
      });
  }

  function rollDice() {
    gameWon
      ? setDice(() => generateAllNewDice())
      : setDice((oldDice) =>
          oldDice.map((die) =>
            die.isHeld
              ? die
              : {
                  ...die,
                  value: Math.ceil(Math.random() * 6),
                }
          )
        );
  }

  function hold(id) {
    setDice((oldDice) =>
      oldDice.map((die) =>
        id === die.id ? { ...die, isHeld: !die.isHeld } : die
      )
    );
  }

  const diceElements = dice.map((dieObj) => (
    <Die
      key={dieObj.id}
      value={dieObj.value}
      isHeld={dieObj.isHeld}
      hold={() => hold(dieObj.id)}
    />
  ));

  return (
    <main className="custom-main-container">
      <div aria-live="polite" className="sr-only">
        {gameWon && (
          <p>Congratulations! You Won! Press "New Game" to start again.</p>
        )}
      </div>
      <div className="bg-[#F5F5F5] w-[22rem] p-8 rounded-2xl shadow-2xl">
        <h1 className="text-2xl font-bold text-center mb-4">Tenzies</h1>
        <p className="text-sm text-center text-gray-500 mb-7 px-3">
          Roll until all dice are the same. Click each die to freeze it at its
          current value between rolls.
        </p>
        <div className="mb-8 grid grid-cols-5 gap-5">{diceElements}</div>
        <button
          ref={buttonRef}
          onClick={rollDice}
          className="custom-main-button"
        >
          {gameWon ? "New Game" : "Roll"}
        </button>
      </div>
      {gameWon && <Confetti />}
    </main>
  );
};

export default App;
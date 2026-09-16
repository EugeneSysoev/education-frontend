import { useEffect, useState } from "react";

export function Timer() {
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  function handleStart() {
    setIsRunning(true);
  }
  function handlePause() {
    setIsRunning(false);
  }
  function handleReset() {
    setIsRunning(false);
    setSeconds(0);
  }

  useEffect(() => {
    if (!isRunning) {
      return;
    }

    const intervalId = setInterval(() => {
      setSeconds((previousSeconds) => previousSeconds + 1);
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, [isRunning]);

  return (
    <section className="exercise-card" aria-labelledby="timer-heading">
      <h2 id="timer-heading">Timer</h2>
      <p>{seconds} seconds</p>

      <div>
        <button type="button" onClick={handleStart} disabled={isRunning}>
          Start
        </button>
        <button type="button" onClick={handlePause} disabled={!isRunning}>
          Pause
        </button>
        <button type="button" onClick={handleReset}>
          Reset
        </button>
      </div>
    </section>
  );
}

/* 

1. Какие значения должны храниться в состоянии и каковы их типы?
seconds: number
isRunning: boolean

2. Какое событие запускает эффект?
Первый рендер и при изменении зависимости то есть переключения isRunning

3. При каких условиях эффект создаёт интервал?
isRunning включен

4. Когда должна вызываться функция очистки?
При повторном запуске эффекта и размонтиорвании таймера

5. Почему счётчик внутри интервала лучше обновлять через предыдущее значение? 
Интервальный callback может помнить старое значение seconds.
Функциональный updater получает от React актуальное предыдущее значение.

*/

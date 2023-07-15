import React from "react";

export default function Clock() {
  const [minutes, setMinutes] = React.useState(0);
  const [seconds, setSeconds] = React.useState(0);
  const [totalSeconds, setTotalSeconds] = React.useState(0);
  const [isRunning, setIsRunning] = React.useState(false);
  const [isDone, setIsDone] = React.useState(false);

  function clickStart() {
    const totalSeconds = 60 * parseInt(minutes, 10) + parseInt(seconds, 10);
    setTotalSeconds(totalSeconds);
    setIsRunning(true);
    setIsDone(false);
  }

  React.useEffect(() => {
    let timer = null;
    if (isRunning && totalSeconds > 0) {
      timer = setTimeout(() => {
        setTotalSeconds((prevTotalSeconds) => prevTotalSeconds - 1);
      }, 1000);
    } else if (totalSeconds === 0 && isRunning) {
      setIsRunning(false);
      setIsDone(true);
    }

    return () => {
      clearTimeout(timer);
    };
  }, [totalSeconds, isRunning]);

  function formatTime(time) {
    return time < 10 ? `0${time}` : `${time}`;
  }

  function clickPauseAndResume() {
    setIsRunning((prevIsRunning) => !prevIsRunning);
  }

  function clickReset() {
    setMinutes(0);
    setSeconds(0);
    setTotalSeconds(0);
    setIsDone(false);
  }

  return (
    <div>
      <label>
        <input
          type="number"
          value={minutes}
          onChange={(e) => {
            setMinutes(e.target.value);
          }}
        />
        Minutes
      </label>
      <label>
        <input
          type="number"
          value={seconds}
          onChange={(e) => {
            setSeconds(e.target.value);
          }}
        />
        Seconds
      </label>

      <button onClick={clickStart}>START</button>
      <button onClick={clickPauseAndResume}>PAUSE / RESUME</button>
      <button onClick={clickReset}>RESET</button>

      <h1 data-testid="running-clock">
        {isDone
          ? "Time's up!"
          : `${formatTime(Math.floor(totalSeconds / 60))}:${formatTime(
              totalSeconds % 60
            )}`}
      </h1>
    </div>
  );
}

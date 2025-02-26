import React, { useState, useEffect } from "react";

const RunningExercise = () => {
  const [laps, setLaps] = useState([]);
  const [isRunning, setIsRunning] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);

  useEffect(() => {
    let timer;
    if (isRunning) {
      timer = setInterval(() => {
        setElapsedTime((prevTime) => prevTime + 0.1);
      }, 100);
    } else {
      clearInterval(timer);
    }
    return () => clearInterval(timer);
  }, [isRunning]);

  const toggleTimer = () => {
    if (isRunning) {
      setLaps([...laps, elapsedTime.toFixed(2) + "s"]);
      setElapsedTime(0);
    } else {
      setElapsedTime(0);
    }
    setIsRunning(!isRunning);
  };

  return (
    <div className="container">
      <h1 className="title">Track Your Run!e</h1>
      <button onClick={toggleTimer} className="recordButton">
        {isRunning ? "Stop" : "Go"}
      </button>

      <div className="elapsedTime">
        {isRunning ? `Running... ${elapsedTime.toFixed(2)}s` : `Last Lap: ${laps[laps.length - 1] || "N/A"}`}
      </div>

      <div className="lapContainer">
        <h2 className="lapTitle">Lap Times</h2>
        <div className="lapList">
          {laps.length > 0 ? (
            <ul>
              {laps.map((lap, index) => (
                <li key={index} className="lapItem">
                  Lap {index + 1}: {lap}
                </li>
              ))}
            </ul>
          ) : (
            <p className="noLaps">No laps recorded yet.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default RunningExercise;

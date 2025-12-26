function ControlPanel({
  onPlay,
  onPause,
  onReset,
  speed,
  setSpeed,
  size,
  setSize,
}) {
  return (
    <div style={{ marginTop: "1.5rem" }}>
      <button onClick={onPlay}>Play</button>
      <button onClick={onPause} style={{ marginLeft: "0.5rem" }}>
        Pause
      </button>
      <button onClick={onReset} style={{ marginLeft: "0.5rem" }}>
        Reset
      </button>

      <div style={{ marginTop: "1rem" }}>
        <label>Speed: </label>
        <input
          type="range"
          min="50"
          max="1000"
          step="50"
          value={speed}
          onChange={(e) => setSpeed(Number(e.target.value))}
        />
      </div>

      <div style={{ marginTop: "1rem" }}>
        <label>Array Size: </label>
        <input
          type="range"
          min="5"
          max="50"
          value={size}
          onChange={(e) => setSize(Number(e.target.value))}
        />
      </div>
    </div>
  );
}

export default ControlPanel;

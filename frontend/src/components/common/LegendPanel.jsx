function LegendPanel() {
  const itemStyle = {
    display: "flex",
    alignItems: "center",
    gap: "0.75rem",
    marginBottom: "0.5rem",
    fontSize: "0.9rem",
    color: "var(--text-secondary)",
  };

  const colorBox = (color) => ({
    width: "16px",
    height: "16px",
    borderRadius: "4px",
    background: color,
  });

  return (
    <div
      style={{
        background: "rgba(0,0,0,0.3)",
        borderRadius: "10px",
        padding: "1rem",
        marginBottom: "1.5rem",
        maxWidth: "320px",
      }}
    >
      <h4 style={{ marginBottom: "0.75rem" }}>Legend</h4>

      <div style={itemStyle}>
        <span style={colorBox("var(--bar-default)")} />
        <span>Unsorted / Default element</span>
      </div>

      <div style={itemStyle}>
        <span style={colorBox("var(--bar-active)")} />
        <span>Currently compared</span>
      </div>

      <div style={itemStyle}>
        <span style={colorBox("var(--bar-sorted)")} />
        <span>Sorted / Final position</span>
      </div>

      <div style={itemStyle}>
        <span style={colorBox("var(--accent-purple)")} />
        <span>Active range / search window</span>
      </div>

      <div style={itemStyle}>
        <span
          style={{
            width: "20px",
            height: "2px",
            background: "var(--accent-yellow)",
          }}
        />
        <span>Comparison indicator</span>
      </div>

      <div style={itemStyle}>
        <span
          style={{
            width: "16px",
            height: "16px",
            borderRadius: "4px",
            background: "var(--bar-active)",
            transform: "translateY(-4px)",
          }}
        />
        <span>Swap animation</span>
      </div>
    </div>
  );
}

export default LegendPanel;

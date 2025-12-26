function ArrayBars({ array, activeIndices, sortedIndices = [] }) {
  const maxVal = Math.max(...array);

  return (
    <div
      style={{
        display: "flex",
        alignItems: "flex-end",
        height: "320px",
        gap: "6px",
        marginTop: "2rem",
        padding: "1rem",
        background: "var(--bg-secondary)",
        borderRadius: "8px",
      }}
    >
      {array.map((value, idx) => {
        const height = (value / maxVal) * 100;

        let color = "#4caf50";
        if (activeIndices.includes(idx)) color = "var(--accent)";
        if (sortedIndices.includes(idx)) color = "#1db954";

        return (
          <div
            key={idx}
            title={value}
            style={{
              width: "18px",
              height: `${height}%`,
              backgroundColor: color,
              borderRadius: "4px 4px 0 0",
              transition:
                "height 0.25s ease, background-color 0.25s ease",
            }}
          />
        );
      })}
    </div>
  );
}

export default ArrayBars;

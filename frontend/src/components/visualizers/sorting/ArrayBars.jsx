function ArrayBars({
  array,
  activeIndices = [],
  sortedIndices = [],
  range = null,
}) {
  const maxVal = Math.max(...array);

  return (
    <div
      style={{
        position: "relative",
        display: "flex",
        alignItems: "flex-end",
        gap: "6px",
        height: "320px",
        padding: "1rem",
        background: "rgba(0,0,0,0.25)",
        borderRadius: "12px",
        marginBottom: "1rem",
      }}
    >
      {/* Comparison Arrow */}
      {activeIndices.length === 2 && (
        <div
          style={{
            position: "absolute",
            bottom: "340px",
            left: `${activeIndices[0] * 24}px`,
            width: `${(activeIndices[1] - activeIndices[0]) * 24}px`,
            height: "2px",
            background: "var(--accent-yellow)",
            transition: "all 0.3s ease",
          }}
        />
      )}

      {array.map((value, index) => {
        let bg = "var(--bar-default)";

        if (sortedIndices.includes(index)) {
          bg = "var(--bar-sorted)";
        } else if (activeIndices.includes(index)) {
          bg = "var(--bar-active)";
        } else if (range && index >= range[0] && index <= range[1]) {
          bg = "var(--accent-purple)";
        }

        return (
          <div
            key={index}
            style={{
              width: "18px",
              height: `${(value / maxVal) * 100}%`,
              background: bg,
              borderRadius: "4px 4px 0 0",
              transition:
                "height 0.3s ease, background 0.3s ease, transform 0.3s ease",
              transform: activeIndices.includes(index)
                ? "translateY(-6px) scale(1.05)"
                : "none",
              position: "relative",
            }}
          >
            {/* Value Label */}
            <span
              style={{
                position: "absolute",
                top: "-18px",
                fontSize: "10px",
                color: "#9ca3af",
              }}
            >
              {value}
            </span>
          </div>
        );
      })}
    </div>
  );
}

export default ArrayBars;

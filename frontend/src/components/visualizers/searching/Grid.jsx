function Grid({ grid, onToggleWall }) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: `repeat(${grid[0].length}, 24px)`,
        gap: "2px",
        justifyContent: "center",
        margin: "1rem 0",
      }}
    >
      {grid.map((row, rIdx) =>
        row.map((cell, cIdx) => {
          let bg = "#1e293b"; // empty

          if (cell.isStart) bg = "#22d3ee";
          else if (cell.isEnd) bg = "#f472b6";
          else if (cell.isWall) bg = "#020617";
          else if (cell.isPath) bg = "#4ade80";
          else if (cell.isVisited) bg = "#a78bfa";

          return (
            <div
              key={`${rIdx}-${cIdx}`}
              onClick={() => onToggleWall(rIdx, cIdx)}
              style={{
                width: "24px",
                height: "24px",
                background: bg,
                borderRadius: "4px",
                cursor: "pointer",
                transition: "background 0.15s ease",
              }}
            />
          );
        })
      )}
    </div>
  );
}

export default Grid;

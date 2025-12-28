import "./graph.css";

function GraphCanvas({ nodes, edges, activeEdges = [], activeNodes = [] }) {
  return (
    <svg className="graph-canvas">
      {edges.map((e, i) => (
        <line
          key={i}
          x1={e.from.x}
          y1={e.from.y}
          x2={e.to.x}
          y2={e.to.y}
          className={
            activeEdges.includes(i) ? "edge active-edge" : "edge"
          }
        />
      ))}

      {nodes.map((n, i) => (
        <g key={i}>
          <circle
            cx={n.x}
            cy={n.y}
            r={18}
            className={
              activeNodes.includes(i) ? "node active-node" : "node"
            }
          />
          <text x={n.x} y={n.y + 5} textAnchor="middle">
            {n.id}
          </text>
        </g>
      ))}
    </svg>
  );
}

export default GraphCanvas;

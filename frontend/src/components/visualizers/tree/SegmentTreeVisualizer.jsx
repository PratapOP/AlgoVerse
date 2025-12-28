import { useRef, useState } from "react";
import {
  buildSegmentTreeSteps,
  rangeQuerySteps,
} from "../../../algorithms/tree/segmentTree";
import SegmentTreeNode from "./SegmentTreeNode";
import "./segmentTree.css";

function SegmentTreeVisualizer() {
  const [array] = useState([2, 4, 1, 3, 5, 7, 6]);
  const [tree, setTree] = useState([]);
  const [steps, setSteps] = useState([]);
  const [stepIndex, setStepIndex] = useState(0);
  const [active, setActive] = useState(null);
  const [queryRange, setQueryRange] = useState([2, 5]);

  const timerRef = useRef(null);

  const buildTree = () => {
    const s = buildSegmentTreeSteps(array);
    setSteps(s);
    setStepIndex(0);
  };

  const queryTree = () => {
    const s = rangeQuerySteps(tree, array.length, queryRange[0], queryRange[1]);
    setSteps(s);
    setStepIndex(0);
  };

  const play = () => {
    if (timerRef.current) return;

    timerRef.current = setInterval(() => {
      setStepIndex((i) => {
        if (i >= steps.length) {
          clearInterval(timerRef.current);
          timerRef.current = null;
          return i;
        }

        const step = steps[i];

        if (step.value !== undefined && step.node !== undefined) {
          setTree((prev) => {
            const t = [...prev];
            t[step.node] = step.value;
            return t;
          });
        }

        setActive(step.node ?? null);
        return i + 1;
      });
    }, 800);
  };

  return (
    <div className="segment-container">
      <h2>Segment Tree – Range Sum Query</h2>

      <div className="segment-controls">
        <button onClick={buildTree}>Build Tree</button>
        <button onClick={queryTree}>Query [{queryRange.join(", ")}]</button>
        <button onClick={play}>Play</button>
      </div>

      <div className="segment-tree">
        {tree.map((value, index) => (
          <SegmentTreeNode
            key={index}
            value={value}
            active={index === active}
          />
        ))}
      </div>
    </div>
  );
}

export default SegmentTreeVisualizer;

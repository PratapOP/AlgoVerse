import { useRef, useState } from "react";
import {
  buildFenwickTree,
  prefixSumSteps,
} from "../../../algorithms/tree/fenwickTree";
import FenwickNode from "./FenwickNode";
import "./fenwick.css";

function FenwickTreeVisualizer() {
  const [array] = useState([3, 2, -1, 6, 5, 4, -3, 3]);
  const [tree, setTree] = useState([]);
  const [steps, setSteps] = useState([]);
  const [stepIndex, setStepIndex] = useState(0);
  const [activeIndex, setActiveIndex] = useState(null);
  const [sum, setSum] = useState(null);

  const timerRef = useRef(null);

  const buildTree = () => {
    const { tree, steps } = buildFenwickTree(array);
    setTree(tree);
    setSteps(steps);
    setStepIndex(0);
    setSum(null);
  };

  const calculatePrefixSum = (i) => {
    const s = prefixSumSteps(tree, i);
    setSteps(s);
    setStepIndex(0);
    setSum(null);
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

        if (step.index !== undefined) {
          setActiveIndex(step.index);
        }

        if (step.sum !== undefined) {
          setSum(step.sum);
        }

        return i + 1;
      });
    }, 800);
  };

  return (
    <div className="fenwick-container">
      <h2>Fenwick Tree (Binary Indexed Tree)</h2>

      <div className="fenwick-controls">
        <button onClick={buildTree}>Build Tree</button>
        <button onClick={() => calculatePrefixSum(6)}>
          Prefix Sum (1 → 6)
        </button>
        <button onClick={play}>Play</button>
      </div>

      <div className="fenwick-tree">
        {tree.map((value, index) =>
          index === 0 ? null : (
            <FenwickNode
              key={index}
              index={index}
              value={value}
              active={index === activeIndex}
            />
          )
        )}
      </div>

      {sum !== null && (
        <p className="fenwick-sum">Prefix Sum = {sum}</p>
      )}
    </div>
  );
}

export default FenwickTreeVisualizer;

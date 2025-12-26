import { useEffect, useRef, useState } from "react";
import ArrayBars from "../components/visualizers/sorting/ArrayBars";
import ControlPanel from "../components/controls/ControlPanel";
import { getBubbleSortSteps } from "../algorithms/sorting/bubbleSort";

function Visualizer() {
  /* ---------- Utility ---------- */
  const generateArray = (size) =>
    Array.from({ length: size }, () =>
      Math.floor(Math.random() * 100) + 10
    );

  /* ---------- State ---------- */
  const [size, setSize] = useState(20);
  const [array, setArray] = useState(() => generateArray(20));
  const [steps, setSteps] = useState([]);
  const [stepIndex, setStepIndex] = useState(0);
  const [active, setActive] = useState([]);
  const [sorted, setSorted] = useState([]);
  const [speed, setSpeed] = useState(300);

  const timerRef = useRef(null);

  /* ---------- Re-generate array when size changes ---------- */
  useEffect(() => {
    pause();
    const newArray = generateArray(size);
    setArray(newArray);
    setSteps(getBubbleSortSteps(newArray));
    setStepIndex(0);
    setActive([]);
    setSorted([]);
  }, [size]);

  /* ---------- Controls ---------- */
  const play = () => {
    if (timerRef.current) return;

    timerRef.current = setInterval(() => {
      setStepIndex((prev) => {
        if (prev >= steps.length) {
          pause();
          return prev;
        }

        const step = steps[prev];
        setArray(step.array);
        setActive(step.indices);

        if (step.type === "done") {
          setSorted(
            Array.from({ length: step.array.length }, (_, i) => i)
          );
        }

        return prev + 1;
      });
    }, speed);
  };

  const pause = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  const reset = () => {
    pause();
    const newArray = generateArray(size);
    setArray(newArray);
    setSteps(getBubbleSortSteps(newArray));
    setStepIndex(0);
    setActive([]);
    setSorted([]);
  };

  /* ---------- Render ---------- */
  return (
    <div>
      <h2 style={{ marginBottom: "1rem" }}>
        Bubble Sort Visualization
      </h2>

      <ArrayBars
        array={array}
        activeIndices={active}
        sortedIndices={sorted}
      />

      <ControlPanel
        onPlay={play}
        onPause={pause}
        onReset={reset}
        speed={speed}
        setSpeed={setSpeed}
        size={size}
        setSize={setSize}
      />
    </div>
  );
}

export default Visualizer;

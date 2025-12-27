import { useState } from "react";
import { Stack } from "./stackLogic";

function StackVisualizer() {
  const [stack] = useState(new Stack());
  const [items, setItems] = useState([]);
  const [value, setValue] = useState("");

  const pushItem = () => {
    if (!value) return;
    stack.push(value);
    setItems(stack.getStack());
    setValue("");
  };

  const popItem = () => {
    stack.pop();
    setItems(stack.getStack());
  };

  return (
    <div style={{ padding: "1rem" }}>
      <h2>Stack (LIFO)</h2>

      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Value"
      />
      <button onClick={pushItem}>Push</button>
      <button onClick={popItem}>Pop</button>

      <div style={{ marginTop: "1rem" }}>
        {items.map((item, index) => (
          <div
            key={index}
            style={{
              padding: "10px",
              margin: "4px",
              background: index === items.length - 1 ? "#ff7675" : "#74b9ff",
              color: "#fff",
              textAlign: "center",
            }}
          >
            {item} {index === items.length - 1 && "(TOP)"}
          </div>
        ))}
      </div>
    </div>
  );
}

export default StackVisualizer;

import { useState } from "react";
import { LinkedList } from "./linkedListLogic";

function LinkedListVisualizer() {
  const [list] = useState(new LinkedList());
  const [nodes, setNodes] = useState([]);
  const [value, setValue] = useState("");

  const insertNode = () => {
    if (!value) return;
    list.insert(value);
    setNodes(list.getList());
    setValue("");
  };

  return (
    <div style={{ padding: "1rem" }}>
      <h2>Linked List</h2>

      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Value"
      />
      <button onClick={insertNode}>Insert</button>

      <div style={{ display: "flex", marginTop: "1rem" }}>
        {nodes.map((node, index) => (
          <div key={index} style={{ display: "flex", alignItems: "center" }}>
            <div
              style={{
                padding: "10px",
                background: "#0984e3",
                color: "#fff",
              }}
            >
              {node}
            </div>
            {index !== nodes.length - 1 && <span> → </span>}
          </div>
        ))}
      </div>
    </div>
  );
}

export default LinkedListVisualizer;

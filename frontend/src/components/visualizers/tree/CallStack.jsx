import "./tree.css";

function CallStack({ stack }) {
  return (
    <div className="callstack-container">
      <h4>Call Stack</h4>
      <div className="callstack">
        {stack
          .slice()
          .reverse()
          .map((frame, idx) => (
            <div key={idx} className="callstack-frame">
              dfs({frame})
            </div>
          ))}
      </div>
    </div>
  );
}

export default CallStack;

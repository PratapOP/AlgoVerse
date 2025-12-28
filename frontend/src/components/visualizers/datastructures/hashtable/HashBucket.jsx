// HashBucket.jsx
import "./hashtable.css";

function HashBucket({ index, values, highlight }) {
  return (
    <div className={`hash-bucket ${highlight ? "active" : ""}`}>
      <div className="hash-index">{index}</div>

      <div className="hash-values">
        {values.length === 0 ? (
          <span className="empty">∅</span>
        ) : (
          values.map((v, i) => (
            <span key={i} className="hash-value">
              {v}
            </span>
          ))
        )}
      </div>
    </div>
  );
}

export default HashBucket;

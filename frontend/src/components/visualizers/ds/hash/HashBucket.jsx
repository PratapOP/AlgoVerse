function HashBucket({ index, values }) {
  return (
    <div className="bucket">
      <strong>{index}</strong>
      {values.map((v, i) => (
        <span key={i}>{v}</span>
      ))}
    </div>
  );
}

export default HashBucket;

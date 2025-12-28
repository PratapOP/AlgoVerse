import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function Home() {
  const navigate = useNavigate();
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    setAnimate(true);
  }, []);

  return (
    <div
      style={{
        minHeight: "calc(100vh - 64px)",
        background:
          "radial-gradient(circle at top, #1f2937 0%, #020617 60%)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "2rem",
      }}
    >
      <div
        style={{
          maxWidth: "900px",
          textAlign: "center",
          transform: animate ? "translateY(0)" : "translateY(20px)",
          opacity: animate ? 1 : 0,
          transition: "all 0.8s ease",
        }}
      >
        {/* Logo / Title */}
        <h1
          style={{
            fontSize: "4rem",
            fontWeight: "700",
            letterSpacing: "1px",
            marginBottom: "1rem",
            background:
              "linear-gradient(90deg, #22d3ee, #a78bfa, #22d3ee)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            animation: "gradientMove 6s linear infinite",
          }}
        >
          AlgoVerse
        </h1>

        {/* Tagline */}
        <p
          style={{
            fontSize: "1.3rem",
            color: "#cbd5f5",
            marginBottom: "2.5rem",
          }}
        >
          Visualize algorithms. Understand how they think.
        </p>

        {/* Feature highlights */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: "2rem",
            flexWrap: "wrap",
            marginBottom: "3rem",
          }}
        >
          {[
            {
              title: "Sorting",
              desc: "Watch elements compare, swap, and organize",
            },
            {
              title: "Searching",
              desc: "See how algorithms narrow down answers",
            },
            {
              title: "Data Structures",
              desc: "Explore stacks, queues, trees, and more",
            },
          ].map((item, idx) => (
            <div
              key={idx}
              style={{
                background: "rgba(255,255,255,0.05)",
                padding: "1.5rem",
                borderRadius: "14px",
                width: "240px",
                backdropFilter: "blur(8px)",
                transform: animate
                  ? "translateY(0)"
                  : "translateY(30px)",
                transition: `all 0.8s ease ${idx * 0.2}s`,
              }}
            >
              <h3 style={{ marginBottom: "0.5rem" }}>{item.title}</h3>
              <p style={{ fontSize: "0.95rem", color: "#9ca3af" }}>
                {item.desc}
              </p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <button
          onClick={() => navigate("/visualizer")}
          style={{
            padding: "0.9rem 2.2rem",
            fontSize: "1.05rem",
            borderRadius: "999px",
            border: "none",
            cursor: "pointer",
            background:
              "linear-gradient(90deg, #22d3ee, #a78bfa)",
            color: "#020617",
            fontWeight: "600",
            boxShadow: "0 10px 30px rgba(0,0,0,0.4)",
            transition: "transform 0.2s ease",
          }}
          onMouseEnter={(e) =>
            (e.target.style.transform = "scale(1.05)")
          }
          onMouseLeave={(e) =>
            (e.target.style.transform = "scale(1)")
          }
        >
          Start Visualizing
        </button>
      </div>

      {/* Gradient animation */}
      <style>
        {`
          @keyframes gradientMove {
            0% { background-position: 0% 50%; }
            100% { background-position: 200% 50%; }
          }
        `}
      </style>
    </div>
  );
}

export default Home;

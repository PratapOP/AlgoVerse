import { NavLink } from "react-router-dom";

function Navbar() {
  const linkStyle = ({ isActive }) => ({
    textDecoration: "none",
    color: isActive ? "#22d3ee" : "var(--text-secondary)",
    fontWeight: isActive ? "600" : "400",
    transition: "color 0.2s ease",
  });

  return (
    <nav
      style={{
        position: "sticky",
        top: 0,
        zIndex: 100,
        background: "rgba(2, 6, 23, 0.85)",
        backdropFilter: "blur(10px)",
        borderBottom: "1px solid #1e293b",
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "0.75rem 1.25rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        {/* Brand */}
        <NavLink to="/" style={{ textDecoration: "none" }}>
          <span
            style={{
              fontSize: "1.4rem",
              fontWeight: "700",
              letterSpacing: "0.5px",
              background:
                "linear-gradient(90deg, #22d3ee, #a78bfa)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            AlgoVerse
          </span>
        </NavLink>

        {/* Links */}
        <div style={{ display: "flex", gap: "1.5rem" }}>
          <NavLink to="/" style={linkStyle}>
            Home
          </NavLink>
          <NavLink to="/visualizer" style={linkStyle}>
            Visualizer
          </NavLink>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;

import Navbar from "./Navbar";

function Layout({ children }) {
  return (
    <>
      <Navbar />
      <main
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "1.5rem 1rem",
        }}
      >
        {children}
      </main>
    </>
  );
}

export default Layout;

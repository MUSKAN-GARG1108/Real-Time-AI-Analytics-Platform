import Sidebar from "./Sidebar";

function Layout({ children }) {
  return (
    <div style={{ display: "flex" }}>
      <Sidebar />

      <div style={{
        flex: 1,
        background: "#f5f6fa",
        minHeight: "100vh",
        padding: "20px"
      }}>
        {children}
      </div>
    </div>
  );
}

export default Layout;
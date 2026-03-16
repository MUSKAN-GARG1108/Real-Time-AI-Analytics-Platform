import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import UploadData from "./pages/UploadData";
import Projects from "./pages/Projects";
import Insights from "./pages/Insights";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Projects />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/upload" element={<UploadData />} />
        <Route path="/insights" element={<Insights />} />
      </Routes>
    </Router>
  );
}

export default App;
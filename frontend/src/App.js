import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Layout from "./components/Layout";
import ProtectedRoute from "./components/ProtectedRoute";

import Projects from "./pages/Projects";
import Dashboard from "./pages/Dashboard";
import UploadData from "./pages/UploadData";
import Insights from "./pages/Insights";
import EventSimulator from "./pages/EventSimulator";

import Login from "./pages/Login";
import Signup from "./pages/Signup";

function App() {
  return (
    <Router>
      <Routes>

        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Protected Routes */}
        <Route path="/" element={
          <ProtectedRoute>
            <Layout><Projects /></Layout>
          </ProtectedRoute>
        } />

        <Route path="/dashboard" element={
          <ProtectedRoute>
            <Layout><Dashboard /></Layout>
          </ProtectedRoute>
        } />

        <Route path="/upload" element={
          <ProtectedRoute>
            <Layout><UploadData /></Layout>
          </ProtectedRoute>
        } />

        <Route path="/events" element={
          <ProtectedRoute>
            <Layout><EventSimulator /></Layout>
          </ProtectedRoute>
        } />

        <Route path="/insights" element={
          <ProtectedRoute>
            <Layout><Insights /></Layout>
          </ProtectedRoute>
        } />

      </Routes>
    </Router>
  );
}

export default App;
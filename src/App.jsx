import { Routes, Route, Navigate } from "react-router-dom";import Layout from "./components/Layout";import Dashboard from "./pages/Dashboard";import SalesJournal from "./pages/SalesJournal";
export default function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/journal" element={<SalesJournal />} />
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </Layout>
  );
}
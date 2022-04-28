import "./App.css";
import { Routes, Route } from "react-router-dom";
import AdminPage from "./views/AdminPage/AdminPage";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<h1>Proyecto final Henry</h1>} />
        <Route path="/adminDashboard" element={<AdminPage />} />
      </Routes>
    </div>
  );
}

export default App;

import "./App.css";
import { Routes, Route } from "react-router-dom";
import AdminPage from "./views/AdminPage/AdminPage";

import Home from "./components/Home/home";
import Clases from "./components/Clases/clases";


function App() {
  return (
    <div className="App">
      {/* <Nav /> */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/clases" element={<Clases />} />
        <Route path="/adminDashboard" element={<AdminPage />} />
      </Routes>
    </div>
  );
}

export default App;

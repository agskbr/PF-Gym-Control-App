import "./App.css";
import { Routes, Route } from "react-router-dom";
import AdminPage from "./views/AdminPage/AdminPage";
import Home from "./components/Home/home";
import AboutHome from "./components/AboutHome/AboutHome";


function App() {
  return (
    <div className="App">
      {/* <Nav /> */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/adminDashboard" element={<AdminPage />} />
        <Route path="/about" element={<AboutHome />} />
      </Routes>
    </div>
  );
}

export default App;

import "./App.css";
import { Routes, Route } from "react-router-dom";
import AdminPage from "./views/AdminPage/AdminPage.jsx";
import SocioPage from "./views/SocioPage/SocioPage.jsx";
import Buy from "./components/Buy/Buy";
import EditActivity from "./views/AdminPage/components/EditActivity/EditActivity";
import HomePage from "./views/homePage/homePage";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/clases/:id" element={<Buy />} />
        <Route path="/admindashboard" element={<AdminPage />} />
        <Route
          path="/admindashboard/activity/edit/:id"
          element={<EditActivity />}
        />
        <Route path="/sociodashboard" element={<SocioPage />} />
      </Routes>
    </div>
  );
}

export default App;

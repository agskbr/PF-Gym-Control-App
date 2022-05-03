import "./App.css";
import { Routes, Route } from "react-router-dom";
import AdminPage from "./views/AdminPage/AdminPage";
import Buy from "./components/Buy/Buy";
import EditActivity from "./views/AdminPage/components/EditActivity/EditActivity";
import HomePage from "./views/homePage/homePage";

function App() {
  return (
    <div className="App">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/clases/:id" element={<Buy />} />
          <Route exact path="/adminDashboard" element={<AdminPage />} />
          <Route
            path="/adminDashboard/activity/edit/:id"
            element={<EditActivity />}
          />
      </Routes>
    </div>
  );
}

export default App;

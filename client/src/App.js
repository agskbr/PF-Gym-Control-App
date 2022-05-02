import "./App.css";
import { Routes, Route } from "react-router-dom";
import AdminPage from "./views/AdminPage/AdminPage";
import Home from "./components/Home/home";
import AboutHome from "./components/AboutHome/AboutHome";
import Clases from "./components/Clases/Clases";
import Buy from "./components/Buy/Buy";
import EditActivity from "./views/AdminPage/components/EditActivity/EditActivity";

function App() {
  return (
    <div className="App">
      {/* <Nav /> */}
      {/* <Routes>
        <Route path="/" element={[<Home />,
                                  <AboutHome id='about'/>,
                                  <Clases />,
                                  ]} />
        <Route path="/adminDashboard" element={<AdminPage />} />
        <Route
          path="/adminDashboard/activity/edit/:id"
          element={<EditActivity />}
        />
        <Route path="/about" element={<AboutHome />} />
        <Route path="/clases" element={<Clases />} />
        <Route path="/clases/:id" element={<Buy />} />
      </Routes> */}

          <div id='home'>
            <Home />
          </div>

          <div id='about'>
                <AboutHome />
          </div>

          <div id='clases'>
                <Clases />
          </div>
        <Routes>
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

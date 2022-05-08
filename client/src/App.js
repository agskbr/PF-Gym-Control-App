import "./App.css";
import { Routes, Route } from "react-router-dom";
import AdminPage from "./views/AdminPage/AdminPage.jsx";
import SocioPage from "./views/SocioPage/SocioPage.jsx";
import Buy from "./components/Buy/Buy";
import EditActivity from "./views/AdminPage/components/EditActivity/EditActivity";
import HomePage from "./views/homePage/homePage";
import LoginPage from "./views/LoginPage/LoginPage";
import RegisterPage from "./views/RegisterPage/RegisterPage";
import Checkout from "./components/Checkout/Checkout";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { validateUserIsLogged } from "./store/actions/actions-login";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(validateUserIsLogged());
  } , [dispatch]);
  
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/clases/:id" element={<Buy />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/admindashboard" element={<AdminPage />} />
        <Route
          path="/admindashboard/activity/edit/:id"
          element={<EditActivity />}
        />
        <Route path="/sociodashboard" element={<SocioPage />} />
        <Route path="/checkout" element={<Checkout/>}/>
      </Routes>
    </div>
  );
}

export default App;

import "./App.css";
import { AunthenticatedRoutes, UnAuthenticatedRoutes } from "./Rols";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  requestUserLogin,
  validateUserIsLogged,
} from "./store/actions/actions-login";
import { getAllDescuentos} from "./store/actions/actions-descuentos";
import Loader from "./components/Loader/Loader";

function App() {
  const dispatch = useDispatch();
  const { user, isAdmin, isLoading } = useSelector((state) => state.login);
  useEffect(() => {
    dispatch(requestUserLogin());
    dispatch(validateUserIsLogged());
  }, [dispatch]);

  return (
    <div className="App">
      {isLoading ? (
        <Loader />
      ) : user ? (
        <AunthenticatedRoutes isAdmin={isAdmin} isLoading={isLoading} />
      ) : (
        <UnAuthenticatedRoutes  />
      )}
    </div>
  );
}

export default App;

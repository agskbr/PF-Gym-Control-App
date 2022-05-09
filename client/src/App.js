import "./App.css";
import { AunthenticatedRoutes, UnAuthenticatedRoutes } from "./Rols";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { validateUserIsLogged } from "./store/actions/actions-login";
import { requestPost } from "./store/actions";

function App() {
  const dispatch = useDispatch();
  const { user, isAdmin } = useSelector((state) => state.login);
  useEffect(() => {
    dispatch(requestPost());
    dispatch(validateUserIsLogged());
  }, [dispatch]);

  return (
    <div className="App">
      {user ? (
        <AunthenticatedRoutes isAdmin={isAdmin} />
      ) : (
        <UnAuthenticatedRoutes user={user} />
      )}
    </div>
  );
}

export default App;

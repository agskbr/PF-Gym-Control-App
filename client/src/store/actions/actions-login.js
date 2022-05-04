import axios from "axios";
import {
  googleAuthProvider,
  auth,
  signInWithPopup,
  onAuthStateChanged,
  signOut,
} from "../../firebase/index";
import { LOGIN_WITH_GOOGLE, USER_SIGN_OUT } from "../actions-type";

const base_url = "http://localhost:3001";

const loginWithGoogle = () => {
  return async (dispatch) => {
    const userData = await signInWithPopup(auth, googleAuthProvider);
    const firstName = userData.user.displayName.split(" ")[0];
    const lastName = userData.user.displayName.split(" ")[1];

    const authWithGoogleData = {
      id: userData.user.uid,
      email: userData.user.email,
      name: firstName,
      lastName,
      phoneNumber: userData.user.phoneNumber,
      image: userData.user.photoURL,
    };

    const { status } = await axios.post(`${base_url}/user`, authWithGoogleData);
    if (status === 200) {
      dispatch({ type: LOGIN_WITH_GOOGLE, payload: authWithGoogleData });
    }
  };
};

const validateUserIsLogged = () => {
  return (dispatch) => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch({ type: LOGIN_WITH_GOOGLE, payload: user });
      } else {
        dispatch({ type: LOGIN_WITH_GOOGLE, payload: {} });
      }
    });
  };
};

const userSignOut = () => {
  return async (dispatch) => {
    await signOut(auth);
    dispatch({ type: USER_SIGN_OUT });
  };
};

export { loginWithGoogle, validateUserIsLogged, userSignOut };

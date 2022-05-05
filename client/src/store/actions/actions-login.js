import axios from "axios";
import {
  googleAuthProvider,
  auth,
  signInWithPopup,
  onAuthStateChanged,
  signOut,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
} from "../../firebase/index";
import {
  LOGIN_WITH_GOOGLE,
  USER_SIGN_OUT,
  VALIDATE_USER_IS_LOGGED,
  REGISTER_USER_WITH_EMAIL_AND_PASS,
  SIGN_IN_USER,
} from "../actions-type";

const base_url = "http://localhost:3001";

const registerUserWithEmailAndPass = (
  email,
  password,
  name,
  lastName,
  phoneNumber
) => {
  return async (dispatch) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const userToDB = {
        uid: userCredential.user.uid,
        name,
        lastName,
        phoneNumber,
      };
      await axios.post(`${base_url}/user`, userToDB);
      dispatch({
        type: REGISTER_USER_WITH_EMAIL_AND_PASS,
        payload: userCredential,
      });
    } catch (error) {
      console.log(error);
    }
  };
};

const signInWithEmailAndPass = (email, password) => {
  return async (dispatch) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      dispatch({ type: SIGN_IN_USER, payload: userCredential });
    } catch (error) {
      console.log(error);
    }
  };
};

const resetPassword = (email) => {
  return async () => {
    try {
      await sendPasswordResetEmail(auth, email);
    } catch (error) {
      console.log(error);
    }
  };
};
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
        dispatch({ type: VALIDATE_USER_IS_LOGGED, payload: {} });
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

export {
  loginWithGoogle,
  validateUserIsLogged,
  userSignOut,
  registerUserWithEmailAndPass,
  signInWithEmailAndPass,
  resetPassword,
};

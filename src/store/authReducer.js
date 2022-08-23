import { auth, db } from "../config/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { signOut, signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";

//action type
const GET_USER = "GET_USER";

//action creator
const getUser = (user) => ({ type: GET_USER, user });

//thunk
export const gettingUser = () => async (dispatch) => {
  const userId = auth.currentUser !== null ? auth.currentUser.uid : null;
  const user = await getDoc(doc(db, "users", userId)).then((doc) => {
    return (doc.data());
  });
  return dispatch(getUser(user));
};

export const loggingOut = () => async (dispatch) => {
  await signOut(auth)

  return dispatch(getUser({}))
};

export const loggingIn = (email, password) => async (dispatch) => {
  await signInWithEmailAndPassword(auth, email, password)
  .then((cred) => {
    console.log("user logged in:", cred.user);
  })
  .catch((err) => {
    console.log(err.message);
  });
  const userId = auth.currentUser !== null ? auth.currentUser.uid : null;
  const user = await getDoc(doc(db, "users", userId)).then((doc) => {
    return (doc.data());
  });
  return dispatch(getUser(user));
};

export const signup = (email, password, firstName, lastName) => async (dispatch) => {
  await createUserWithEmailAndPassword(auth, email, password)
  .then((cred) => {
    console.log("user created:", cred.user);
    return setDoc(doc(db, "users", cred.user.uid), {
      firstName: firstName,
      lastName: lastName,
    })
  })
  .catch((err) => {
    console.log(err.message);
  });
  const userId = auth.currentUser !== null ? auth.currentUser.uid : null;
  const user = await getDoc(doc(db, "users", userId)).then((doc) => {
    return (doc.data());
  });
  return dispatch(getUser(user));
};

//reducer
const initialState = {};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_USER:
      return action.user;
    default:
      return state;
  }
};

export default authReducer;
import { auth, db } from "../config/firebase";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import { deleteUser, signInWithEmailAndPassword, updatePassword, updateEmail } from "firebase/auth";

//action type
const GET_NOTICE = "GET_NOTICE"

//action creator
const getNotice = (notice) => ({ type: GET_NOTICE, notice})

//thunk
export const deletingAccount = (navigate, email, password) => async () => {
  try {
    await signInWithEmailAndPassword(auth, email, password)
    const userId = auth.currentUser !== null ? auth.currentUser.uid : null;
    await deleteUser(auth.currentUser)
    await deleteDoc(doc(db, "users", userId))
    await deleteDoc(doc(db, "users", userId, "transactions", userId))
    navigate("/signup")
  } catch (err) {
    console.log(err)
  }
};

export const updatingPassword = (email, password, newPassword) => async (dispatch) => {
  try {
    await signInWithEmailAndPassword(auth, email, password)
    const user = auth.currentUser
    await updatePassword(user, newPassword)
    return dispatch(getNotice("Password Updated"))
  } catch (err) {
    console.log(err)
  }
};

export const updatingEmail = (email, password, newEmail) => async (dispatch) => {
  try {
    await signInWithEmailAndPassword(auth, email, password)
    const user = auth.currentUser
    console.log(user.uid)
    await updateEmail(user, newEmail)
    await updateDoc(doc(db, "users", user.uid), {
      email: newEmail
    })
    return dispatch(getNotice("Email Updated"))
  } catch (err) {
    console.log(err)
  }
};

export const updatingPhoneNumber = (email, password, newPhoneNumber) => async (dispatch) => {
  try {
    await signInWithEmailAndPassword(auth, email, password)
    const user = auth.currentUser
    await updateDoc(doc(db, "users", user.uid), {
      phoneNumber: newPhoneNumber
    })
    return dispatch(getNotice("Email Updated"))
  } catch (err) {
    console.log(err)
  }
};

//reducer
const initialState = {};

const accountReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_NOTICE:
      return action.notice
    default:
      return state;
  }
};

export default accountReducer;


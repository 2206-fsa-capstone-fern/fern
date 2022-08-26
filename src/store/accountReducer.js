import { auth, db } from "../config/firebase";
import { deleteDoc, doc } from "firebase/firestore";
import { deleteUser, signInWithEmailAndPassword, updatePassword} from "firebase/auth";

//action type
const GET_NOTICE = "GET_NOTICE"

//action creator
const getNotice = (notice) => ({ type: GET_NOTICE, notice})

//thunk
export const deletingAccount = (navigate, email, password) => async () => {
  try {
    await signInWithEmailAndPassword(auth, email, password)
    const userId = auth.currentUser !== null ? auth.currentUser.uid : null;
    await deleteDoc(doc(db, "users", userId))
    await deleteDoc(doc(db, "users", userId, "transactions", userId))
    await deleteUser(auth.currentUser)
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


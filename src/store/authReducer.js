import { auth, db } from "../config/firebase";
import { doc, getDoc } from "firebase/firestore";

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
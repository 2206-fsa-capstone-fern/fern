import { auth, db } from "../config/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { signOut, signInWithEmailAndPassword, createUserWithEmailAndPassword, setPersistence, browserSessionPersistence, onAuthStateChanged } from "firebase/auth";

//action type
const GET_USER = "GET_USER";

//action creator
const getUser = (user) => ({ type: GET_USER, user });


//thunk
export const gettingUser = () => async (dispatch) => {
  try {
    const userId = auth.currentUser !== null ? auth.currentUser.uid : null;
    let loggedUser
    if(!userId) {
      auth.onAuthStateChanged(async (u) => {
        if(u) {
          loggedUser = await getDoc(doc(db, "users", u.uid)).then((doc) => {
            return (doc.data());
          });
          console.log('user is logged in')
          return dispatch(getUser(loggedUser))
        } else {
          return dispatch(getUser({}))
        }
      })
    } else {
      const user = await getDoc(doc(db, "users", userId)).then((doc) => {
        return (doc.data());
      });
    
      return dispatch(getUser(user));
    }
  } catch (err) {
    return dispatch(getUser(err))
  }
};

export const loggingOut = () => async (dispatch) => {
  await signOut(auth)

  return dispatch(getUser({}))
};

export const loggingIn = (email, password) => async (dispatch) => {
  try{
    await setPersistence(auth, browserSessionPersistence).then(() => {
      console.log("set")
      return signInWithEmailAndPassword(auth, email, password)
    })
    // await signInWithEmailAndPassword(auth, email, password)
    // .then((cred) => {
    //   console.log("user logged in:", cred.user);
    // })
    const userId = auth.currentUser !== null ? auth.currentUser.uid : null;
    console.log(auth.currentUser)
    const user = await getDoc(doc(db, "users", userId)).then((doc) => {
      return (doc.data());
    });
    return dispatch(getUser(user));
  } catch (err) {
    return dispatch(getUser(err))
  }
};

export const signup = (email, password, firstName, lastName, phoneNumber) => async (dispatch) => {
  try {
    await createUserWithEmailAndPassword(auth, email, password)
    .then((cred) => {
      console.log("user created:", cred.user);
      return setDoc(doc(db, "users", cred.user.uid), {
        firstName: firstName,
        lastName: lastName,
        phoneNumber: phoneNumber
      })
    })

    const userId = auth.currentUser !== null ? auth.currentUser.uid : null;
    const user = await getDoc(doc(db, "users", userId)).then((doc) => {
      return (doc.data());
    });
    return dispatch(getUser(user));
  } catch (err) {
    return dispatch(getUser(err))
  }
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
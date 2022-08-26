import { auth, db } from "../config/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";

//action type
const ADD_TRANSACTION = "ADD_TRANSACTION";
const GET_TRANSACTION = "GET_TRANSACTION";

//action creator
const addTransaction = (transaction) => ({
  type: ADD_TRANSACTION,
  transaction,
});

const getTransaction = (transaction) => ({
  type: GET_TRANSACTION,
  transaction,
});

// thunk middleware
export const gettingTransactions = (transaction) => async (dispatch) => {
  const userId = auth.currentUser !== null ? auth.currentUser.uid : null;
  try {
    const grabTransactions = await getDoc(
      doc(db, "users", userId, "transactions", userId)
    ).then((doc) => {
      return doc.data();
    });
    return dispatch(getTransaction(grabTransactions));
  } catch (err) {
    return dispatch(getTransaction([]))
  }
  // await setDoc(doc(db, "users", userId, "transactions", userId), {
  //   transactions: transaction
  // })
  // const transactions = await getDoc(doc(db, "users", userId, "transactions", userId)).then((doc) => {
  //   return (doc.data());
  // });
};

export const addingTransactions = (currentTransactions, transaction) => async (dispatch) => {
  const userId = auth.currentUser !== null ? auth.currentUser.uid : null;
  currentTransactions.push(transaction)
  await setDoc(doc(db, "users", userId, "transactions", userId), {
    allTransactions: currentTransactions
  })
  const transactions = await getDoc(doc(db, "users", userId, "transactions", userId)).then((doc) => {
    return (doc.data());
  });
  return dispatch(addTransaction(transactions));
};

const initialState = [];

const transactionsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TRANSACTION:
      // state.push(action.transaction);
      return action.transaction;
    case GET_TRANSACTION:
      // state.push(action.transaction);
      return action.transaction;
    default:
      return state;
  }
};

export default transactionsReducer;

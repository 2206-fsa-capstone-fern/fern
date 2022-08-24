//action type
const ADD_TRANSACTION = "ADD_TRANSACTION";

//action creator
const addTransaction = (transaction) => ({
  type: ADD_TRANSACTION,
  transaction,
});

// thunk middleware
export const addingTransactions = (transaction) => async (dispatch) => {
  return dispatch(addTransaction(transaction));
};

const initialState = [];

const transactionsReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TRANSACTION:
      state.push(action.transaction);
      return state;
    default:
      return state;
  }
};

export default transactionsReducer;

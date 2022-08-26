import { createStore, combineReducers, applyMiddleware } from "redux";
import { createLogger } from "redux-logger";
import thunkMiddleware from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import user from "./authReducer";
import transactions from "./transactionsReducer";
import accountNotice from "./accountReducer"


const rootReducer = combineReducers({
  user,
  transactions,
  accountNotice
})
const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({ collapsed: true }))
);
const store = createStore(rootReducer, middleware);

export default store
export * from "./authReducer"
export * from "./transactionsReducer"
export * from "./accountReducer"

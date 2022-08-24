import { createStore, combineReducers, applyMiddleware } from "redux";
import authReducer from "./authReducer";
import { createLogger } from "redux-logger"; // https://github.com/evgenyrodionov/redux-logger
import { composeWithDevTools } from "redux-devtools-extension";
import thunkMiddleware from "redux-thunk"; // https://github.com/gaearon/redux-thunk
import user from "./authReducer";
import transactions from "./transactionsReducer";

const rootReducer = combineReducers({
  user,
  transactions,
});

const middleware = composeWithDevTools(
  applyMiddleware(thunkMiddleware, createLogger({ collapsed: true }))
);

const store = createStore(rootReducer, middleware);

export default store;
// export * from './auth'

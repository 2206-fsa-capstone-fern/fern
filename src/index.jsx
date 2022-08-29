import React from 'react';
import ReactDOM from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';
import store from './store';
import { Provider } from 'react-redux';
import App from './App';
import { BudgetsProvider } from './contexts/BudgetsContext';
ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BudgetsProvider>
        <App />
      </BudgetsProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

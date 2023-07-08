import React from "react";
import ReactDOM from "react-dom/client";
import App from "./Frontend/App";
import { createStore, applyMiddleware, compose } from "redux";
import rootReducer from "./Frontend/reducers";
import thunk from "redux-thunk";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import './style.css'
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);

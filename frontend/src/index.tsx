import React from "react";
import ReactDOM from "react-dom";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./components/App/App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";

// const router = <BrowserRouter basename={process.env.PUBLIC_URL}><App /></BrowserRouter>
// const router = <BrowserRouter basename='/moodytunes'><App /></BrowserRouter>

const root = createRoot(document.getElementById("root") as HTMLElement);

root.render(
  <BrowserRouter basename={process.env.PUBLIC_URL}>
    <App />
  </BrowserRouter>
);

// ReactDOM.render(
//   router,
//   document.getElementById('root')
// );

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

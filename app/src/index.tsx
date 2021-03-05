import "./index.scss";
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
// import reportWebVitals from './reportWebVitals';
import { default as firebase } from "firebase/app";
import "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyBOmdJTfK-sbU30Kzr1wyAx-qTupsLvUGo",
  authDomain: "color-griddlers.web.app",
  projectId: "color-griddlers",
  storageBucket: "color-griddlers.appspot.com",
  messagingSenderId: "295317482314",
  appId: "1:295317482314:web:af41d629f815bbbd662fb3",
  measurementId: "G-6KY32YB8LC",
};
firebase.initializeApp(firebaseConfig);
firebase.analytics();

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();

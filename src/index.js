import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import firebase from "firebase";
let firebaseConfig = {
    apiKey: "AIzaSyBGuj6vejqPlwECDR8SRGrx5UF9V13o2f0",
    authDomain: "in1-5dbeb.firebaseapp.com",
    databaseURL: "https://in1-5dbeb.firebaseio.com",
    projectId: "in1-5dbeb",
    storageBucket: "in1-5dbeb.appspot.com",
    messagingSenderId: "801575055112",
    appId: "1:801575055112:web:a24683f5c5ee507a4c06bd",
    measurementId: "G-SQBWETQW00"
};

firebase.initializeApp(firebaseConfig);
ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

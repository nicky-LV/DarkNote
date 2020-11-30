import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import {RegisterForm} from "./components/login/LoginForm";
import {LoginForm} from "./components/login/RegisterForm";
import {Sidebar} from "./components/dashboard/sidebar/sidebar";
import {RichTextEditor} from "./components/dashboard/draft-js/RichTextEditor";
import {Layout} from "./components/dashboard/layout";


ReactDOM.render(<Sidebar />, document.getElementById("root"))
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import {RegisterForm} from "./components/landing-page/forms/register-form";
import {LoginForm} from "./components/landing-page/forms/login-form";
import {Sidebar} from "./components/sidebar/sidebar";
import {RichTextEditor} from "./components/draft-js/RichTextEditor";
import {Layout} from "./components/layout";


ReactDOM.render(<Layout />, document.getElementById("root"))
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

import "./landing-page.css";
import {Features} from "./features/features";
import {Introduction} from "./introduction/introduction";
import notesIllustration from '../../static/images/undraw_on_the_office_fbfs.svg';
import Logo from "../../static/images/Logo.svg";
import Arrow from "../../static/images/Arrow.svg";
import React, {useLayoutEffect, useState} from "react";
import Cookies from 'js-cookie';
import {RegisterForm} from "./forms/register-form";
import {LoginForm} from "./forms/login-form";

export const LandingPage = (props) => {
    const [loggedIn, setLoggedIn] = useState(null)

    useLayoutEffect(() => {
        setLoggedIn(Cookies.get("token") !== null)
    })
    return(
        <div className="container-fluid landing-page-container">
            <div className="container my-auto h-100">
                <div className="row">
                    <img className="position-absolute" src={Logo} alt="DarkNote logo" height="200px" width="250px"/>
                </div>
            <div className="row vh-100">
                <Introduction />
                <div className="col-md-6 my-auto">
                    <img src={notesIllustration} alt="Person managing their notes" className="using-notes-icon"/>
                </div>
            </div>
            <div className="row h-100 p-0 features-section">
                <div className="col-md">
                    <Features/>
                </div>
                <div className="col-md mt-sm-3">
                    <h1 className="header mb-5">{loggedIn ? "Login" : "Register"}</h1>
                </div>
            </div>
        </div>
</div>)

}
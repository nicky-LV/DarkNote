import "./landing-page.css";
import {Features} from "./features/features";
import {Introduction} from "./introduction/introduction";
import notesIllustration from '../../static/images/undraw_on_the_office_fbfs.svg';
import Logo from "../../static/images/Logo.svg";
import Arrow from "../../static/images/Arrow.svg";
import React, {useEffect, useLayoutEffect, useState} from "react";
import Cookies from 'js-cookie';
import {RegisterForm} from "./forms/register-form";
import {LoginForm} from "./forms/login-form";
import {Redirect} from "react-router";

export const LandingPage = (props) => {
    const [loggedIn, setLoggedIn] = useState(null);
    const [showForm, setShowForm] = useState(true);
    const [redirect, setRedirect] = useState(false);
    useLayoutEffect(() => {setLoggedIn(Cookies.get("token") !== null)}, [])

    if (redirect){

    }

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
                    <div className="col-md login-section">
                        <h1 className="header mb-5 text-center">{loggedIn ? "Login" : "Register"}</h1>
                        <p className="description mb-5 text-center">{loggedIn ? "Ready to continue your note-taking journey?" : "Register & embark on your note-taking journey."}</p>
                        {loggedIn && !showForm?
                            <div className="login-section-body w-100">
                                <button
                                    className="btn see-more center-block mx-auto description mb-2 border-0"
                                onClick={() => setShowForm(true)}>
                                    Continue to notebook
                                </button>
                                <p className="text-center text-light">or</p>
                                <button
                                    className="btn see-more center-block description border-0 mt-2"
                                    onClick = {(e) => {
                                        e.preventDefault()
                                        setShowForm(true);
                                        setLoggedIn(false);
                                        console.log(showForm, loggedIn)
                                    }}>
                                    Create a new account</button>
                            </div>

                            : !loggedIn && showForm && <RegisterForm handleReset = {() => {
                            setLoggedIn(true);
                            setShowForm(false);
                        }}/>
                        }

                        {loggedIn && showForm ? <LoginForm handleReset={() => setShowForm(false)} /> : null }
                    </div>
                </div>
            </div>
        </div>)

}
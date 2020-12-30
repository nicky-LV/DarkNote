import {RegisterForm} from "./forms/register-form";
import {LoginForm} from "./forms/login-form";
import React, {useLayoutEffect, useState} from "react";
import Cookies from "js-cookie";

export const LoginSection = (props) => {
    const [loggedIn, setLoggedIn] = useState(null);
    const [showForm, setShowForm] = useState(true);
    useLayoutEffect(() => {setLoggedIn(Cookies.get("token") !== null)}, [])
    return(
        <div>
            <h1 className="header mb-5">{loggedIn ? "Login" : "Register"}</h1>
            <p className="description mb-5">{loggedIn ? "Ready to continue your note-taking journey?" : "Register to create your notebook."}</p>
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
    )
}
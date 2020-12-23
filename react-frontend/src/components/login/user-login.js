import React, {useState} from 'react';
import {config, useSpring, animated} from "react-spring";
import '../../static/css/login/user-login.css';
import {Features} from "./features";
import {LoginForm} from "./login-form";
import {RegisterForm} from "./register-form";

export const UserLogin = (props) => {
    const [registerForm, showRegisterForm] = useState(false);
    const [loginForm, showLoginForm] = useState(false);

    const buttonAnimation = useSpring({
        from: {width: "0%", opacity: 0},
        to: {width: "100%", opacity: 1},
        delay: 800,
        config: {
            clamp: true,
            config: config.stiff
        }
    })
    return(
        <div className="container-fluid">
            <div className="row">
                <div className="col-md">
                    <h1 className="features-header mb-5">Features</h1>
                    <Features />
                </div>
                <div className="col-md">
                    {registerForm && !loginForm && <h1 className="features-header mb-5">Register</h1>}
                    {loginForm && !registerForm && <h1 className="features-header mb-5">Login</h1>}
                    {!loginForm && !registerForm && <h1 className="features-header mb-5">Get started</h1>}

                    {!registerForm && !loginForm && <div className="login-prompt">

                        <p className="description">Create your DarkNote account to start writing!</p>
                        <div>
                            <animated.button
                                style={buttonAnimation}
                                className="register-button btn see-more"
                                onClick = {() => {
                                    showLoginForm(false);
                                    showRegisterForm(true);
                                }}
                            >
                                Register
                            </animated.button>

                            <p className="text-white text-center my-2">or</p>

                            <animated.button
                                style={buttonAnimation}
                                className="login-button btn see-more"
                                onClick = {() => {
                                    showRegisterForm(false);
                                    showLoginForm(true);
                                }}
                            >
                                Login
                            </animated.button>
                        </div>
                    </div>}

                    {registerForm && !loginForm && <RegisterForm handleReset = {
                        () => {
                           showRegisterForm(false);
                           showLoginForm(false);
                        }
                    }
                    />}
                    {loginForm && !registerForm && <LoginForm handleReset = {
                        () => {
                           showRegisterForm(false);
                           showLoginForm(false);
                        }
                    }
                    />}

                </div>
            </div>
        </div>
    )
}
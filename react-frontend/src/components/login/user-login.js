import React from 'react';
import {config, useSpring, animated} from "react-spring";
import '../../static/css/login/user-login.css';
import {Features} from "./features";

export const UserLogin = (props) => {

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
                    <h1 className="features-header mb-5">Get started</h1>
                    <div className="login-prompt">
                        <p className="description">Create your DarkNote account to start writing!</p>
                        <animated.button style={buttonAnimation} className="register-button btn see-more">Register</animated.button>
                        <p className="or">or</p>
                        <animated.button style={buttonAnimation} className="login-button btn see-more">Login</animated.button>
                    </div>
                </div>
            </div>
        </div>
    )
}
import React, {useState, useLayoutEffect, useRef} from 'react';
import {RegisterForm} from "./register-form";
import {LoginForm} from "./login-form";
import {config, useSpring, animated} from "react-spring";
import '../../static/css/login/user-login.css';
import {Features} from "./features";

export const UserLogin = (props) => {
    const [descriptionWidth, setDescriptionWidth] = useState(null)

    const description = useRef(null);

    useLayoutEffect(() => {
        let descriptionWidth = description.current.clientWidth
        setDescriptionWidth(descriptionWidth)

    }, [])

    const buttonAnimation = useSpring({
        from: {width: 0, opacity: 0},
        to: {width: descriptionWidth, opacity: 1},
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
                            <p className="description" ref={description}>Create your DarkNote account to start writing!</p>
                            <br />
                            <div className="px-auto">
                            <animated.button className="register-button btn see-more" style={buttonAnimation}>Register</animated.button>
                            <br />
                            <p className="or">or</p>
                        <br />
                        <animated.button className="login-button btn see-more center-block" style={buttonAnimation}>Login</animated.button>
                                </div>
                        </div>
                    </div>
                </div>
        </div>
    )
}
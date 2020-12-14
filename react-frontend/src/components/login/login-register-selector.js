import React, {useState, useEffect} from 'react';
import {RegisterForm} from "./register-form";
import {LoginForm} from "./login-form";

export const LoginRegisterSelector = (props) => {
    const [showLoginMenu, setMenu] = useState(false)

    return(
        <div className="container-fluid">
            <div className="buttons">
                <div className="row">
                        <button
                            className="select-login align-items-end"
                            onClick={() => setMenu(false)}
                        >
                            Login
                        </button>
                        <button
                            className="select-register"
                            onClick={() => setMenu(true)}
                        >
                            Register
                        </button>
                </div>


            </div>

            {showLoginMenu === true && <RegisterForm />}
            {showLoginMenu === false && <LoginForm />}
        </div>
    )
}
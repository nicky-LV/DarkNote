import {LoginRegisterSelector} from "./login-register-selector";
import "../../static/css/login/user-login-interface.css";
import {animated, useSpring, config} from "react-spring";
import {useState, useRef, useLayoutEffect} from "react";
import greenIcon from '../../static/images/green.png';
import orangeIcon from '../../static/images/orange.png';
import pinkIcon from '../../static/images/pink.png';
import {Features} from "./features";
import {Introduction} from "./introduction";
import {StickyNavbar} from "../landing-page/navbar/navbar";
import {UserLogin} from "../landing-page/login/login";

export const UserLoginInterface = (props) => {

    return(
        <div className="container-fluid landing-page-container">
            <div className="container my-auto h-100">
                <div className="row h-100">
                    <StickyNavbar />
                    <Introduction />
                    <div className="col-md-6">
                        <Features />
                    </div>
                </div>
                 <div className="row h-100 login-section">
                     <UserLogin />
                 </div>
            </div>
        </div>)

}
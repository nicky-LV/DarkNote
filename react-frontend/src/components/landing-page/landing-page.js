import "./landing-page.css";
import {Features} from "./features/features";
import {Introduction} from "./introduction/introduction";
import notesIllustration from '../../static/images/undraw_on_the_office_fbfs.svg';
import Logo from "../../static/images/Logo.svg";
import React from "react";
import {LoginSection} from "./login-section";
import {Footer} from "./footer/footer";

export const LandingPage = (props) => {
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
                        <LoginSection />
                    </div>
                </div>

                <div className="row">
                    < Footer />
                </div>
            </div>
        </div>)

}
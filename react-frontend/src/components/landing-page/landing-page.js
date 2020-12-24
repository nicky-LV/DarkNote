import "./landing-page.css";
import {Features} from "./features/features";
import {Introduction} from "./introduction/introduction";
import notesIllustration from '../../static/images/undraw_on_the_office_fbfs.svg';
import Logo from "../../static/images/Logo.svg";
import Arrow from "../../static/images/Arrow.svg";
import React from "react";

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
                <div className="col-md">
                    <img src={Arrow} alt="Arrow pointing to login section" className="arrow" />
                </div>
            </div>

                <div className="row login-section">
                </div>
        </div>
</div>)

}
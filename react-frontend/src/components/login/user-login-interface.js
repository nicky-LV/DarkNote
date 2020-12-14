import {LoginRegisterSelector} from "./login-register-selector";
import "../../static/css/login/user-login-interface.css";
import {Button} from "react-bootstrap";

export const UserLoginInterface = (props) => {
    return(
        <div className="container-fluid landing-page-container">
            <div className="container">
                <div className="row">
                    <div className="col-md-6" style={{"width": "max-content"}}>
                        <h1 className="title">
                            Your notes.
                            <br />
                            <strong className="standout-text">Revolutionized.</strong>
                        </h1>
                        <p className="description" style={{"color": "#ced4da"}}>
                            Dark themed notebook filled with features.
                            <br />
                            Blazingly fast.
                        </p>
                        <button className="btn see-more">See what it's about</button>
                    </div>
                </div>
            </div>
        </div>)

}
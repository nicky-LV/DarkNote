import "../../static/css/login/user-login-interface.css";
import {Features} from "./features";
import {Introduction} from "./introduction";
import {StickyNavbar} from "../landing-page/navbar/navbar";
import {UserLogin} from "./user-login";
import notesIllustration from '../../static/images/undraw_on_the_office_fbfs.svg';

export const UserLoginInterface = (props) => {

    return(
        <div className="container-fluid landing-page-container">
            <div className="container my-auto h-100">
                <div className="row">
                    <StickyNavbar />
                </div>
            <div className="row h-100">
                <Introduction />
                <div className="col-md-6 my-auto">
                    <img src={notesIllustration} alt="Person managing their notes" className="using-notes-icon"/>
                </div>
            </div>
            <div className="row h-100 login-section">
                <UserLogin />
            </div>
        </div>
</div>)

}
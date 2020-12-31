import {Navbar, Nav} from "react-bootstrap";
import './footer.css';
import github from "../../../static/images/github.png";

export const Footer = (props) => {
    return(
        <Navbar sticky="bottom" className="w-100" variant="dark">
            <Nav className="mr-auto align-items-center">
                <Nav.Link href="https://github.com/nicky-LV/DarkNote" className="align-items-center">
                            <img src={github} alt="Github link" height="30px" width="30px" />
                </Nav.Link>
            </Nav>

        </Navbar>
    )
}
import {Navbar, Nav} from "react-bootstrap";

export const Footer = (props) => {
    return(
        <div className="container-fluid">
            <Navbar sticky="bottom" bg="dark" variant="dark">
                <Navbar.Brand href="#home">Navbar</Navbar.Brand>
                <Nav className="mr-auto">
                    <Nav.Link href="#home">Home</Nav.Link>
                    <Nav.Link href="#features">Features</Nav.Link>
                    <Nav.Link href="#pricing">Pricing</Nav.Link>
                </Nav>
            </Navbar>
        </div>
    )
}
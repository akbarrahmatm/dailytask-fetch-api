import "bootstrap/dist/css/bootstrap.min.css";
import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap";

export default function Menu() {
  return (
    <>
      <Navbar expand="lg" className="bg-success navbar-dark">
        <Container>
          <Navbar.Brand href="#">Car Management</Navbar.Brand>
        </Container>
      </Navbar>
    </>
  );
}

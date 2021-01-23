import Navbar from "react-bootstrap/Navbar";
import "./Nav.css";

export default function Nav() {
  return (
  <Navbar bg="primary" variant="dark" expand="lg">
    <Navbar.Brand href="/">Dispatcher App</Navbar.Brand>
    <Navbar.Text>
      Hello, Dispatcher!
    </Navbar.Text>
  </Navbar>
  );
}
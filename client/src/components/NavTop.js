import Navbar from "react-bootstrap/Navbar";

export default function NavTop() {
  return (
  <Navbar className="mb-3" bg="primary" variant="dark" expand="true">
    <Navbar.Brand href="/">🚚 DispatchMe</Navbar.Brand>
    <Navbar.Text>
      Hello, Dispatcher!
    </Navbar.Text>
  </Navbar>
  );
}
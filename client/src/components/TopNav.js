import Navbar from "react-bootstrap/Navbar";

export default function TopNav() {
  return (
  <Navbar className="mb-3" bg="primary" variant="dark" expand="lg">
    <Navbar.Brand href="/">Dispatcher App</Navbar.Brand>
    <Navbar.Text>
      Hello, Dispatcher!
    </Navbar.Text>
  </Navbar>
  );
}
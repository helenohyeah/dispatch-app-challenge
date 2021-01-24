import Navbar from "react-bootstrap/Navbar";

export default function BotNav() {
  return (
  <Navbar className="mt-3 justify-content-center" bg="dark" variant="dark" expand="lg">
    <Navbar.Text>
      Handcrafted by <a href="https://helenouyang.me" target="_blank" rel="noopener noreferer">Helen Ouyang</a> © 2021 | <a href="https://github.com/helenohyeah/dispatch-app-challenge" target="_blank" rel="noopener noreferer">View Source Code</a>
    </Navbar.Text>
  </Navbar>
  );
}
import Spinner from "react-bootstrap/Spinner"

export default function Load(props) {
  return (
    <>
      <h2>{props.children}</h2>
      <Spinner animation="border" />
    </>
  );
}
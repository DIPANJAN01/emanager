import { useState } from "react";
import Branch from "./components/Branch";
import Container from "react-bootstrap/Container";
import Employee from "./components/Employee";
import Admin from "./components/Admin";
function App() {
  const [count, setCount] = useState(0);

  return (
    <Container>
      {/* <button className="btn btn-warning p-3 m-5">Hello</button> */}
      {/* <Branch /> */}
      <Employee />
      {/* <Admin /> */}
    </Container>
  );
}
export default App;

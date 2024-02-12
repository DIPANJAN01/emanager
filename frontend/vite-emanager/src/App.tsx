import Container from "react-bootstrap/Container";
import { Nav, Navbar } from "react-bootstrap";
import { NavLink, Outlet } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import "./App.css";
function App() {
  // const [count, setCount] = useState(0);
  const isLgUp = useMediaQuery({ query: "(min-width: 992px)" });
  return (
    <>
      <Navbar
        expand="lg"
        bg="dark"
        data-bs-theme="dark"
        className="bg-body-tertiary mb-5"
      >
        <Container>
          <Navbar.Brand>
            <NavLink to={"/employees"}> EManager</NavLink>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className={isLgUp ? "myLeftShift" : "text-center"}>
              <NavLink
                to={"/employees"}
                className={({ isActive }) => {
                  return isActive ? "myIsSelected" : "";
                }}
              >
                Employees
              </NavLink>

              <NavLink
                to={"/admins"}
                className={({ isActive }) => {
                  return isActive ? "myIsSelected" : "";
                }}
              >
                {" "}
                Admins
              </NavLink>

              <NavLink
                to={"/branches"}
                className={({ isActive }) => {
                  return isActive ? "myIsSelected" : "";
                }}
              >
                {" "}
                Branches
              </NavLink>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Container>
        <Outlet />
      </Container>
    </>
  );
}
export default App;

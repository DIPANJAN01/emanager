import { NavLink } from "react-router-dom";

const NotFound = () => {
  return (
    <div className={"container mt-5"}>
      <div className={"card text-center"}>
        <div className={"card-body"}>
          <div className="font-monospace" style={{ color: "#495057" }}>
            <h1>Oops!</h1>
            <h2>Page Not Found!!</h2>
          </div>
          <div>
            <NavLink
              className="btn btn-dark mt-4 mb-5 py-2"
              style={{
                color: "#f1f3f5",
                textDecoration: "none",
                fontWeight: "bold",
              }}
              to={"/"}
            >
              Take me back to home
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;

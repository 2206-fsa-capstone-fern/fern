import { NavLink } from "react-router-dom";
import { Button } from "react-bootstrap";
const SignedOutLinks = () => {
  return (
    <div>
      <Button color="success" style={{ marginRight: "5px" }}>
        <NavLink to="/login" className="nav-link">
          Log In
        </NavLink>
      </Button>
      <Button color="success" className="btn btn-primary">
        <NavLink to="/signup" className="nav-link">
          Sign Up
        </NavLink>
      </Button>
    </div>
  );
};

export default SignedOutLinks;

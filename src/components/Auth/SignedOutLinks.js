import { NavLink } from "react-router-dom";
import { MDBBtn } from "mdb-react-ui-kit";

const SignedOutLinks = () => {
  return (
    <div>
      <MDBBtn color="success" style={{ margin: 5 }}>
        <NavLink to="/login" className="nav-link">
          Log In
        </NavLink>
      </MDBBtn>
      <MDBBtn color="success" className="btn btn-primary" style={{ margin: 5 }}>
        <NavLink to="/signup" className="nav-link">
          Sign Up
        </NavLink>
      </MDBBtn>
    </div>
  );
};

export default SignedOutLinks;

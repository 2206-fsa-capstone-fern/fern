import { NavLink, useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { loggingOut } from "../store";
import { MDBBtn } from "mdb-react-ui-kit";

const SignedInLinks = (props) => {
  const { isLoggedIn, user } = props;
  const navigate = useNavigate();
  const handleLogout = (e) => {
    e.preventDefault();

    props.logout(navigate);
  };
  return (
    <div className="navbar-container">
      <div className="plaidButton">
        <button onClick={() => props.open()} disabled={!props.ready}>
          <strong>Link an account</strong>
        </button>
      </div>
      <MDBBtn color="success">
        <NavLink
          to="/"
          onClick={handleLogout}
          className="authLink"
          style={{ color: "white" }}
        >
          Log Out
        </NavLink>
      </MDBBtn>

      {isLoggedIn ? (
        <MDBBtn color="success">
          <NavLink to="/account" className="authLink">
            {user.firstName[0]}
            {user.lastName[0]}
          </NavLink>
        </MDBBtn>
      ) : (
        <MDBBtn color="success">
          <NavLink to="/" className="authLink">
            UR
          </NavLink>
        </MDBBtn>
      )}
    </div>
  );
};

const mapState = (state) => {
  return {
    isLoggedIn: !!state.user.firstName,
    user: state.user,
  };
};

const mapDisptach = (dispatch) => {
  return {
    logout: (navigate) => dispatch(loggingOut(navigate)),
  };
};

export default connect(mapState, mapDisptach)(SignedInLinks);

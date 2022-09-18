import { NavLink, useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { loggingOut } from "../store";
import { Button } from "react-bootstrap";
import { MDBIcon } from "mdb-react-ui-kit";

const SignedInLinks = (props) => {
  const { isLoggedIn, user } = props;
  const navigate = useNavigate();
  const handleLogout = (e) => {
    e.preventDefault();

    props.logout(navigate);
  };
  return (
    <div className="navbar-container">
      <Button
        color="success"
        style={{ marginRight: "20px", marginTop: "10px" }}
      >
        <NavLink
          to="/"
          onClick={handleLogout}
          className="authLink"
          style={{ color: "white" }}
        >
          Log Out
        </NavLink>
      </Button>

      {isLoggedIn ? (
        <Button color="success" style={{ marginTop: "10px" }}>
          <MDBIcon fas icon="user" />
          {"    "}
          <NavLink to="/account" className="authLink">
            {user.firstName[0].toUpperCase()}
            {user.lastName[0].toUpperCase()}
          </NavLink>
        </Button>
      ) : (
        <></>
        // <Button color="success" style={{ marginTop: "10px" }}>
        //   <NavLink to="/account" className="authLink">
        //     Account
        //   </NavLink>
        // </Button>
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

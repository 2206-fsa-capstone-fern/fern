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
    <div className="navbar-container vstack">
      {/* <div className="plaidButton">
        <button onClick={() => props.open()} disabled={!props.ready}>
          <strong>Link an account</strong>
        </button>
      </div> */}
      {isLoggedIn ? (
        <Button
          color="success"
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginTop: "400px",
            width: "90px",
          }}
        >
          <MDBIcon fas icon="user" />
          <NavLink to="/account" className="authLink">
            {user.firstName[0].toUpperCase()}
            {user.lastName[0].toUpperCase()}
          </NavLink>
        </Button>
      ) : (
        <Button color="success">
          <NavLink to="/" className="authLink">
            UR
          </NavLink>
        </Button>
      )}

      <Button
        color="success"
        style={{ marginRight: "5px", marginTop: "350px", width: "90px" }}
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

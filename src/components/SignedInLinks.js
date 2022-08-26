import { NavLink, useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { loggingOut } from "../store";

const SignedInLinks = (props) => {
  const { isLoggedIn, user } = props;
  const navigate = useNavigate()
  const handleLogout = (e) => {
    e.preventDefault();

    props.logout(navigate);
  };
  return (
    <ul className="right">
      <li>
        <button onClick={() => props.open()} disabled={!props.ready}>
          <strong>Link an account</strong>
          {/* {console.log(props.transactions)}
          {console.log("second", props.transactions2)} */}
        </button>
      </li>
      <li>
        <NavLink to="/" onClick={handleLogout}>
          Log Out
        </NavLink>
      </li>
      {isLoggedIn ? (
        <li>
          <NavLink to="/account" className="btn btn-floating">
            {user.firstName[0]}
            {user.lastName[0]}
          </NavLink>
        </li>
      ) : (
        <li>
          <NavLink to="/" className="btn btn-floating">
            UR
          </NavLink>
        </li>
      )}
    </ul>
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

import { NavLink } from "react-router-dom";
import { connect } from "react-redux";

const SignedInLinks = (props) => {
  const { isLoggedIn, user } = props;
  return (
    <ul className="right">
      <li>
        <NavLink to="/">Settings</NavLink>
      </li>
      <li>
        <NavLink to="/">Log Out</NavLink>
      </li>
      {isLoggedIn ? (
        <li>
          <NavLink to="/" className="btn btn-floating">
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
    user: state.user
  };
};
export default connect(mapState)(SignedInLinks);

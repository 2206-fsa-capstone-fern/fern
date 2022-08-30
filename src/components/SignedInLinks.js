import { NavLink, useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { loggingOut } from '../store';

const SignedInLinks = (props) => {
  const { isLoggedIn, user } = props;
  const navigate = useNavigate();
  const handleLogout = (e) => {
    e.preventDefault();

    props.logout(navigate);
  };
  return (
    <div className='navbar-container'>
      <div className='plaidButton'>
        <button onClick={() => props.open()} disabled={!props.ready}>
          <strong>Link an account</strong>
          {/* {console.log(props.transactions)}
          {console.log("second", props.transactions2)} */}
        </button>
      </div>
      <NavLink to='/' onClick={handleLogout} className='authLink'>
        Log Out
      </NavLink>

      {isLoggedIn ? (
        <NavLink to='/' className='authLink'>
          {user.firstName[0]}
          {user.lastName[0]}
        </NavLink>
      ) : (
        <NavLink to='/' className='authLink'>
          UR
        </NavLink>
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

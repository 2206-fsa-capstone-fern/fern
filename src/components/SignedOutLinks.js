import { NavLink } from 'react-router-dom';

const SignedOutLinks = () => {
  return (
    <ul className='navbar-nav ml-auto'>
      <li className='nav-item'>
        <NavLink to='/login' className='nav-link'>
          Log In
        </NavLink>
      </li>
      <li className='nav-item'>
        <NavLink to='/signup' className='nav-link'>
          Sign Up
        </NavLink>
      </li>
    </ul>
  );
};

export default SignedOutLinks;

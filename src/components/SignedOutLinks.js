import { NavLink } from 'react-router-dom';
import { CDBBtn } from 'cdbreact';

const SignedOutLinks = () => {
  return (
   <div>
    
        <CDBBtn color="primary" className="btn btn-primary" style={{margin:5}}>
        <NavLink to='/login' className='nav-link'>
          Log In
          </NavLink>
      </CDBBtn>
      <CDBBtn color="primary" className="btn btn-primary" style={{margin:5}}>
        <NavLink to='/signup' className='nav-link'>
          Sign Up
        </NavLink>
      </CDBBtn>
        
  </div>
  );
};

export default SignedOutLinks;

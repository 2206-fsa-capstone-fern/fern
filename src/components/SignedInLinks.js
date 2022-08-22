import { NavLink } from 'react-router-dom'


const SignedInLinks = () => {
  return (
    <ul className="right">
      <li><NavLink to="/">Settings</NavLink></li>
      <li><NavLink to="/">Log Out</NavLink></li>
      <li><NavLink to="/" className='btn btn-floating'>UR</NavLink></li>
    </ul>
  )
}

export default (SignedInLinks)
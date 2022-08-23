import { Link } from 'react-router-dom'
import { connect } from "react-redux"
import SignedInLinks from './SignedInLinks'
import SignedOutLinks from './SignedOutLinks'

const Navbar = (props) => {
  const { isLoggedIn } = props
  return (
    <nav className="nav">
      <div className="container">
        <Link to='/' className="brand-logo">FERN</Link>
        { isLoggedIn ? (<SignedInLinks />) : (<SignedOutLinks />) }
      </div>
    </nav>
  )
}

const mapState = (state) => {
  return {
    isLoggedIn: !!state.user.firstName,
  };
};

export default connect(mapState, null)(Navbar)
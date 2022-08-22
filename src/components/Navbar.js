import { Link } from 'react-router-dom'
import SignedInLinks from '../src/components/layout/SignedInLinks'
import SignedOutLinks from '../src/components/layout/SignedOutLinks'

const Navbar = () => {
  return (
    <nav className="nav">
      <div className="container">
        <Link to='/' className="brand-logo">FERN</Link>
        <SignedInLinks />
        <SignedOutLinks />
      </div>
    </nav>
  )
}

export default Navbar
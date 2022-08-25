import { Link } from "react-router-dom";
import { connect } from "react-redux";
import SignedInLinks from "./SignedInLinks";
import SignedOutLinks from "./SignedOutLinks";

const Navbar = (props) => {
  const { isLoggedIn, open, ready, transactions, transactions2 } = props;
  return (
    <nav className="nav">
      <div className="container">
        <Link to="/" className="brand-logo">
          FERN
        </Link>
        {isLoggedIn ? (
          <SignedInLinks
            open={open}
            ready={ready}
            transactions={transactions}
            transactions2={transactions2}
          />
        ) : (
          <SignedOutLinks />
        )}
      </div>
    </nav>
  );
};

const mapState = (state) => {
  return {
    isLoggedIn: !!state.user.firstName,
  };
};

export default connect(mapState, null)(Navbar);

import { Link } from "react-router-dom";
import SignedInLinks from "./SignedInLinks";
import SignedOutLinks from "./SignedOutLinks";

const Navbar = (props) => {
  return (
    <nav className="nav">
      <div className="container">
        <SignedInLinks />
        <SignedOutLinks />
        <button onClick={() => props.open()} disabled={!props.ready}>
          <strong>Link an account</strong>
          {console.log(props.transactions)}
          {console.log("second", props.transactions2)}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;

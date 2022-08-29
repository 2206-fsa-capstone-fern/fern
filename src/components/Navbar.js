import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import SignedInLinks from './SignedInLinks';
import SignedOutLinks from './SignedOutLinks';

const Navbar = (props) => {
  const { isLoggedIn, open, ready, transactions, transactions2 } = props;

  return (
    // <div className='navbar-container'>
    //   <nav className='navbar navbar-expand-lg navbar-light bg-light'>
    //     <Link to='/' className='navbar-brand'>
    //       <img src={logo} alt='logo' />
    //     </Link>
    //     <button
    //       className='navbar-toggler'
    //       type='button'
    //       data-toggle='collapse'
    //       data-target='#navbarSupportedContent'
    //       aria-controls='navbarSupportedContent'
    //       aria-expanded='false'
    //       aria-label='Toggle navigation'
    //       >
    //       <span className='navbar-toggler-icon'></span>
    //     </button>
    //     <div className='collapse navbar-collapse' id='navbarSupportedContent'>
    //       {isLoggedIn ? (
    //         <SignedInLinks
    //         open={open}
    //         ready={ready}
    //         transactions={transactions}
    //         transactions2={transactions2}
    //         />  : (
    //           <SignedOutLinks />
    //         )}
    //     </div>
    //   </nav>
    // </div>
    //   )}

    <div className='navbar-container'>
      <nav className='navbar navbar-expand-lg navbar-light bg-light'>
        <Link to='/' className='navbar-brand'>
          {/* <img src={logo} alt='logo' /> */}
          FernFi
        </Link>
        <button
          className='navbar-toggler'
          type='button'
          data-toggle='collapse'
          data-target='#navbarSupportedContent'
          aria-controls='navbarSupportedContent'
          aria-expanded='false'
          aria-label='Toggle navigation'>
          <span className='navbar-toggler-icon'></span>
        </button>
        <div className='collapse navbar-collapse' id='navbarSupportedContent'>
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
    </div>
  );
};
//       <div className='container'>
//         <Link to='/' className='brand-logo'>
//           FERN
//         </Link>
//         {isLoggedIn ? (
//           <SignedInLinks

//             open={open}
//             ready={ready}
//             transactions={transactions}
//             transactions2={transactions2}
//           />
//         ) : (
//           <SignedOutLinks />
//         )}
//       </div>
//       </nav>
//     </div>
//   );
// };

const mapState = (state) => {
  return {
    isLoggedIn: !!state.user.firstName,
  };
};

export default connect(mapState, null)(Navbar);

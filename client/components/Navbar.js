import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { logout } from '../store'

class Navbar extends Component {
  constructor(props) {
    super(props)

    this.state = {
      burgerToggleOpen: false,
      dropdownBlocks: false,
      dropdownAccount: false,
    }

    this.burgerToggle = this.burgerToggle.bind(this);
    this.closeToggle = this.closeToggle.bind(this);
  }

  burgerToggle(ev) {
    ev.preventDefault();
    this.setState({ burgerToggleOpen: !this.state.burgerToggleOpen }, () => {
      document.addEventListener('click', this.closeToggle);
    })
  }
  closeToggle() {
    this.setState({ burgerToggleOpen: false }, () => {
      document.removeEventListener('click', this.closeToggle);
    })
  }

  render() {
    const { handleClick, isLoggedIn, fullName } = this.props;
    return (
      <div id="navbar">
        <div id="burger">
          <div id="nav-icon3" onClick={this.burgerToggle} className={this.state.burgerToggleOpen ? 'open' : ''}>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
          </div>
          {isLoggedIn ? (
            <div>
              {/* The navbar will show these links after you log in */}
              {/* <button id="nav-chooseblocks" onClick={this.dropdownBlocks}>Choose Blocks</button> */}
              <button id="nav-account" onClick={this.dropdownAccount}>Hi, {fullName}</button>
            </div>
          ) : (
              <div>
              </div>
            )}
        </div>
        <Link to="/home"><h1>ULTRASOUND BOX</h1></Link>
        <div><div></div></div>
        {/* NEW PANEL */}
        <div id="menuPanel" className={this.state.burgerToggleOpen ? 'showMenuPanel' : ''}>
          <div>
            <Link to="/cardiothoracic">Cardiothoracic</Link>
            <Link to="/renal">Renal</Link>
            <Link to="/efast">EFAST</Link>
            <Link to="/ruq">RUQ</Link>
          </div>

          {isLoggedIn ?
            <div>
              <Link to="/myprofile">Profile</Link>
              <Link to="/my-testhistory">My Test History</Link>
              <a href="/" onClick={handleClick}>
                Logout
              </a>
            </div>
            :
            <div>
              {/* The navbar will show these links before you log in */}
              <Link to="/login">Login</Link>
              <Link to="/signup">Sign Up</Link>
            </div>
          }
        </div>

      </div>
    )
  }
}

const mapState = state => {
  return {
    fullName: state.auth.fullName,
    // isAdmin: state.auth.isAdmin,
    isLoggedIn: !!state.auth.id,
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

export default connect(mapState, mapDispatch)(Navbar)

// const Navbar = ({ handleClick, isLoggedIn }) => (
//   <div id="navbar">
//     <Link to="/home"><h1>ULTRASOUND BOX</h1></Link>
//     <nav>
//       {isLoggedIn ? (
//         <div>
//           {/* The navbar will show these links after you log in */}
//           <Link to="/home">Choose Blocks</Link>
//           <Link to="/home">Account</Link>
//           <a href="#" onClick={handleClick}>
//             Logout
//           </a>
//         </div>
//       ) : (
//           <div>
//             {/* The navbar will show these links before you log in */}
//             <Link to="/login">Login</Link>
//             <Link to="/signup">Sign Up</Link>
//           </div>
//         )}
//     </nav>
//   </div>
// )

// /**
//  * CONTAINER
//  */
// const mapState = state => {
//   return {
//     isLoggedIn: !!state.auth.id
//   }
// }

// const mapDispatch = dispatch => {
//   return {
//     handleClick() {
//       dispatch(logout())
//     }
//   }
// }

// export default connect(mapState, mapDispatch)(Navbar)

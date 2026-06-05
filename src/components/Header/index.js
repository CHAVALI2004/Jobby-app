import {Link, withRouter} from 'react-router-dom'
import {MdHome} from 'react-icons/md'
import {FiLogOut} from 'react-icons/fi'
import {BsBriefcaseFill} from 'react-icons/bs'
import Cookies from 'js-cookie'
import './index.css'

const Header = props => {
  const logOut = () => {
    const {history} = props

    Cookies.remove('jwt_token')

    history.replace('/login')
  }

  return (
    <>
      <nav className="navCon">
        <div>
          <Link to="/" className="navLink">
            <img
              src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
              alt="website logo"
              className="navLogo"
            />
          </Link>
        </div>

        <ul className="navUl">
          <Link to="/" className="navLink">
            <li className="navLi">Home</li>
          </Link>

          <Link to="/jobs" className="navLink">
            <li className="navLi">Jobs</li>
          </Link>
        </ul>

        <div>
          <button type="button" className="logoutBtn" onClick={logOut}>
            Logout
          </button>
        </div>
      </nav>

      <nav className="navCon-Mobile">
        <div>
          <Link to="/" className="navLink">
            <img
              src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
              alt="website logo"
              className="navLogo"
            />
          </Link>
        </div>

        <ul className="navUl">
          <Link to="/" className="navLink">
            <li className="navLi">
              <button type="button" className="Btn">
                <MdHome className="logout" />
              </button>
            </li>
          </Link>

          <Link to="/jobs" className="navLink">
            <li className="navLi">
              <button type="button" className="Btn">
                <BsBriefcaseFill className="logout" />
              </button>
            </li>
          </Link>
        </ul>

        <div>
          <button type="button" className="Btn" onClick={logOut}>
            <FiLogOut className="logout" />
          </button>
        </div>
      </nav>
    </>
  )
}

export default withRouter(Header)

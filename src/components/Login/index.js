import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'

import './index.css'

class Login extends Component {
  state = {
    user: '',
    pass: '',
    showError: false,
    error: '',
  }

  userChange = event => {
    this.setState({
      user: event.target.value,
    })
  }

  passChange = event => {
    this.setState({
      pass: event.target.value,
    })
  }

  onSuccess = jwtToken => {
    const {history} = this.props

    Cookies.set('jwt_token', jwtToken, {expires: 30})

    history.replace('/')
  }

  onFailure = msg => {
    this.setState({
      showError: true,
      error: msg,
    })
  }

  submitForm = async event => {
    event.preventDefault()

    const {user, pass} = this.state

    const userDetails = {
      username: user,
      password: pass,
    }

    const url = 'https://apis.ccbp.in/login'

    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }

    const response = await fetch(url, options)
    const data = await response.json()

    if (response.ok) {
      this.onSuccess(data.jwt_token)
    } else {
      this.onFailure(data.error_msg)
    }
  }

  render() {
    const jwtToken = Cookies.get('jwt_token')

    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }

    const {user, pass, showError, error} = this.state

    return (
      <div className="con">
        <form onSubmit={this.submitForm}>
          <div className="logoCon">
            <img
              src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
              alt="website logo"
              className="logo"
            />
          </div>

          <label htmlFor="user" className="loginLab">
            USERNAME
          </label>

          <input
            type="text"
            id="user"
            value={user}
            className="loginInp"
            placeholder="Username"
            onChange={this.userChange}
          />

          <label htmlFor="pass" className="loginLab">
            PASSWORD
          </label>

          <input
            type="password"
            id="pass"
            value={pass}
            className="loginInp"
            placeholder="Password"
            onChange={this.passChange}
          />

          <button type="submit" className="loginBtn">
            Login
          </button>

          {showError && <p className="error">*{error}</p>}
        </form>
      </div>
    )
  }
}

export default Login

import React, { Component } from 'react'
import { navigate, Router } from '@reach/router'
import { Link } from 'gatsby'
import Login, { signIn } from '../components/Login'

const Home = () => <p>Home</p>
const Settings = () => <p>Settings</p>

const isAuthenticated = () => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('isAuthenticated') === 'true'
  }
  return false
}

class Account extends Component {
  constructor(props) {
    super(props)

    this.state = { user: false }
    this.logout = this.logout.bind(this)
  }

  async componentDidMount() {
    const token = await signIn.authClient.tokenManager.get('idToken')
    if (token) {
      this.setState({ user: token.claims.name })
    } else {
      // Token has expired
      this.setState({ user: false })
      localStorage.setItem('isAuthenticated', 'false')
    }
  }

  logout() {
    signIn.authClient
      .signOut()
      .catch(error => {
        console.error(`Sign out error: ${error}`)
      })
      .then(() => {
        localStorage.setItem('isAuthenticated', 'false')
        this.setState({ user: false })
        navigate('/')
      })
  }

  render() {
    const { user } = this.state
    if (!isAuthenticated()) {
      return <Login />
    }

    return (
      <>
        <nav>
          <p>
            <Link to="/">Home</Link>
          </p>
          <p>
            <Link to="/account">My Account</Link>
          </p>
          <p>
            <Link to="/account/settings">Settings</Link>
          </p>
        </nav>
        <h1>My Account</h1>
        <>
          <p>
            Welcome, {user}.
            <button type="button" onClick={this.logout}>
              Logout
            </button>
          </p>
        </>
        <Router>
          <Home path="/account" />
          <Settings path="/account/settings" />
        </Router>
      </>
    )
  }
}

export default Account

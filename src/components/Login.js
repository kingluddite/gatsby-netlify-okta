/* eslint react/no-unused-state: 0 */ // --> OFF
import OktaSignIn from '@okta/okta-signin-widget'
import '@okta/okta-signin-widget/dist/css/okta-sign-in.min.css'
import React, { Component } from 'react'

const config = {
  baseUrl: 'https://dev-414986.oktapreview.com',
  clientId: '0oaq60o5k5hgjGrkB0h7',
  logo: '//logo.clearbit.com/gatsbyjs.org',
  redirectUri: typeof window !== 'undefined' && `${window.location.origin}/account`,
  el: '#signIn',
  authParams: {
    pkce: true,
    responseType: ['token', 'id_token'],
  },
  features: {
    registration: true,
  },
}

export const signIn = typeof window !== 'undefined' && new OktaSignIn(config)

export default class Login extends Component {
  constructor(props) {
    super(props)

    this.state = {
      user: false,
    }

    this.signIn = signIn
  }

  async componentDidMount() {
    const { authClient } = this.signIn
    const session = await authClient.session.get()
    console.log('session.status', session.status)
    // Session exists, show logged in state
    if (session.status === 'ACTIVE') {
      // clear parameters from browser window
      window.location.hash = ''
      // set username in state
      this.setState({ user: session.login })
      localStorage.setItem('isAuthenticated', 'true')
      // get access and ID tokens
      authClient.token
        .getWithoutPrompt({
          scopes: ['openid', 'email', 'profile'],
        })
        .then(tokens => {
          tokens.forEach(token => {
            if (token.idToken) {
              authClient.tokenManager.add('idToken', token)
            }
            if (token.accessToken) {
              authClient.tokenManager.add('accessToken', token)
            }
          })

          // Say hello to the person who just signed in
          authClient.tokenManager.get('idToken').then(idToken => {
            console.log(`Hello, ${idToken.claims.name} (${idToken.claims.email})`)
            window.location.reload()
          })
        })
        .catch(error => console.error(error))
      return
    }
    this.signIn.remove()

    this.signIn.renderEl({ el: '#signIn' })
  }

  render() {
    return <div id="signIn" />
  }
}

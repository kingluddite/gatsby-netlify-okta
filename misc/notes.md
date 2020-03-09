# Notes for Okta Gatsby
* Make sure you have the latest version of gatsby-cli

`$ npm i -g gatsby-cli`

(**note** I install with homebrew (mac) with `$ brew install gatsby-cli`)

* Update with `$ brew update gatsby-cli`

## See directory structure
* The `-I` excludes the `node_modules` folder

`$ tree -I node_modules`

![tree command](https://i.imgur.com/f8mD5V0.png)

## Start up gatsby app
`$ npm start`

* That will gall `$ npm run develop` and that will call `$ gatsby develop`
* This magic is done in the `package.json` "scrpts" section

`package.json`

```
// MORE CODE

  "scripts": {
    "build": "gatsby build",
    "develop": "gatsby develop",
    "format": "prettier --write \"**/*.{js,jsx,json,md}\"",
    "start": "npm run develop",
    "serve": "gatsby serve",
    "clean": "gatsby clean",
    "test": "echo \"Write tests! -> https://gatsby.dev/unit-testing\" && exit 1"
  },

// MORE CODE
```

## Troubleshoot gatsby steps
* Remove `package-lock.json` and/or `yarn.lock`
* `$ gatsby clean`
* `$ rm -rf node-modules`
* `$ npm i` (install dependencies again with package manager of your choice)
* `$ npm start`

### Hello world!
* Gatsby should be up and running - not very exciting yet

### Install netlify-cms and it's gatsby plugin
`$ npm i netlify-cms-app@2.11.20 gatsby-plugin-netlify-cms@4.1.40`

* In `gatsby-config.js`, register the Netlify CMS plugin:

```
module.exports = {
  plugins: [`gatsby-plugin-netlify-cms`],
}
```

`static/admin/config.yml`

```
backend:
  name: test-repo
  
media_folder: static/assets
public_folder: assets
  
collections:
  - name: blog
    label: Blog
    folder: blog
    create: true
    fields:
      - { name: path, label: Path }
      - { name: date, label: Date, widget: datetime }
      - { name: title, label: Title }
      - { name: body, label: Body, widget: markdown }
```

* Restart your app using `Ctrl+C` and `$ npm start`
* You’ll now be able to edit content at `http://localhost:8000/admin/`

## Add eslint Instructions
`https://github.com/mongkuen/gatsby-plugin-eslint`

`.eslintrc` (root of project)

```
{
  "extends": [
    "airbnb",
    "prettier",
    "prettier/react"
  ],
  "parser": "babel-eslint",
  "parserOptions": {
    "ecmaVersion": 8,
    "ecmaFeatures": {
      "experimentalObjectRestSpread": true,
      "impliedStrict": true,
      "classes": true
    }
  },
  "env": {
    "browser": true,
    "node": true,
    "jquery": true,
    "jest": true
  },
  "rules": {
    "no-debugger": 0,
    "no-unused-vars": [
      1,
      {
        "argsIgnorePattern": "res|next|^err"
      }
    ],
    "arrow-body-style": [
      2,
      "as-needed"
    ],
    "no-unused-expressions": [
      2,
      {
        "allowTaggedTemplates": true
      }
    ],
    "no-param-reassign": [
      2,
      {
        "props": false
      }
    ],
    "no-console": 0,
    "import/prefer-default-export": 0,
    "import": 0,
    "func-names": 0,
    "space-before-function-paren": 0,
    "comma-dangle": 0,
    "max-len": 0,
    "import/extensions": 0,
    "no-underscore-dangle": 0,
    "consistent-return": 0,
    "react/display-name": 1,
    "react/react-in-jsx-scope": 0,
    "react/prefer-stateless-function": 0,
    "react/forbid-prop-types": 0,
    "react/no-unescaped-entities": 0,
    "jsx-a11y/accessible-emoji": 0,
    "react/jsx-filename-extension": [
      1,
      {
        "extensions": [
          ".js",
          ".jsx"
        ]
      }
    ],
    "radix": 0,
    "no-shadow": [
      2,
      {
        "hoist": "all",
        "allow": [
          "resolve",
          "reject",
          "done",
          "next",
          "err",
          "error"
        ]
      }
    ],
    "quotes": [
      2,
      "single",
      {
        "avoidEscape": true,
        "allowTemplateLiterals": true
      }
    ],
    "prettier/prettier": [
      "error",
      {
        "trailingComma": "es5",
        "singleQuote": true,
        "printWidth": 120
      }
    ],
    "jsx-a11y/href-no-hash": "off",
    "jsx-a11y/anchor-is-valid": [
      "warn",
      {
        "aspects": [
          "invalidHref"
        ]
      }
    ]
  },
  "plugins": [
    "prettier"
  ]
}
```

## Dependencies
`package.json`

```
// MORE CODE

  "dependencies": {
    "gatsby": "^2.19.7",
    "gatsby-plugin-netlify-cms": "^4.1.40",
    "gatsby-source-filesystem": "^2.1.50",
    "gatsby-transformer-remark": "^2.6.55",
    "netlify-cms-app": "^2.11.20",
    "react": "^16.12.0",
    "react-dom": "^16.12.0"
  },
  "devDependencies": {
    "eslint": "^6.8.0",
    "eslint-config-airbnb": "^18.0.1",
    "eslint-loader": "^3.0.3",
    "eslint-plugin-import": "^2.20.1",
    "eslint-plugin-jsx-a11y": "^6.2.3",
    "eslint-plugin-react": "^7.19.0",
    "gatsby-plugin-eslint": "^2.0.8",
    "prettier": "^1.19.1"
  },

// MORE CODE
```

## Steps for Netlify continuous deployment
1. Create GitHub repo
2. Add and push changes to repo
3. Create new site on Netlify
4. Choose GitHub
5. Accept defaults and deploy site

## Change our backend to point to GitHub and our repo
* **IMPORTANT** If we don't do this any time we save or make any changes the files won't be saved if you restart the app!

`static/admin/config.yml`

```
backend:
  name: github
  repo: kingluddite/gatsby-netlify-okta

// MORE CODE
```

* Save, commit and push

`$ git commit -am 'Add GitHub backend`

`$ git push`

## We just created another build deployment
* Now we'll be able to login with GitHub to modify the backend
* Visit `https://netlify-gatsby-okta.netlify.com/admin/#/` and you will be prompted to sign in with Github

## Houston we have a problem!
* No Auth Provider Found

![No Auth](https://i.imgur.com/e4iUoRX.png)

### On Netlify
* Go to Site `settings` and navigate to `Access control` > (scroll down) OAuth
* Click `Install provider`
* It will prompt you for a `client ID` and `secret`
    - To get this, navigate to GitHub

### On Github
* `GitHub Developer settings` > `OAuth Apps` > `New OAuth App`

### Register new app with these settings:
* Application name: My Gatsby Blog
* Homepage URL: `<copy URL from Netlify>` (example: https://netlify-gatsby-okta.netlify.com)
* Application description: (optional)
    - Gatsby + Netlify + Okta
* Authorization callback URL: `https://api.netlify.com/auth/done`
* When all filled in, click `Register application` and you'll get the `client ID` and `secret` you will copy and paste into Netlify (remember it was looking for this before)
* Click `Install`

## Makes Sense
* This blog is stored in GitHub, so why not store our blogpost in GitHub

## Log in and authenticate
`https://netlify-gatsby-okta.netlify.com/admin`

* Create a new blog and publish
* Click back button and you will see blog post is still ther

## Pull GitHub
* Now if you pull down from GitHub you will see the markdown file was created on Github when you published the blog post and now you can pull it to your local repo
* Open your `blog/hello-world.md` file and you'll see some preformatted code and your content
    - This is the folder and file created dynamically on GitHub by netlify-cms

`blog/hello-world.md`

## Render those blog posts on the UI of the Gatsby app
`src/components/BlogRoll.js`

```
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link, graphql, StaticQuery } from 'gatsby'

class BlogRoll extends Component {
  render() {
    const { data } = this.props
    const { edges: posts } = data.allMarkdownRemark

    return (
      <div className="columns is-multiline">
        {posts &&
          posts.map(({ node: post }) => (
            <div className="is-parent column is-6" key={post.id}>
              <article
                className={`blog-list-item tile is-child box notification ${
                  post.frontmatter.featuredpost ? 'is-featured' : ''
                }`}
              >
                <header>
                  <p className="post-meta">
                    <Link
                      className="title has-text-primary is-size-4"
                      to={post.frontmatter.path}
                    >
                      {post.frontmatter.title}
                      <span> &bull; </span>
                      <span className="subtitle is-size-5 is-block">
                        {post.frontmatter.date}
                      </span>
                    </Link>
                  </p>
                </header>
                <p>
                  {post.excerpt}
                  <br />
                  <br />
                  <Link className="button" to={post.frontmatter.path}>
                    {' '}
                    Keep Reading →
                  </Link>
                </p>
              </article>
            </div>
          ))}
      </div>
    )
  }
}

BlogRoll.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      edges: PropTypes.array,
    }),
  }),
}

export default () => (
  <StaticQuery
    query={graphql`
      query BlogRollQuery {
        allMarkdownRemark(sort: { order: DESC, fields: [frontmatter___date] }) {
          edges {
            node {
              excerpt(pruneLength: 400)
              id
              frontmatter {
                path
                title
                date(formatString: "MMMM, DD, YYYY")
              }
            }
          }
        }
      }
    `}
    render={(data, count) => <BlogRoll data={data} count={count} />}
  />
)
```

## Pages
* blog

`pages/blog.js`

```
import React, { Component } from 'react'

import BlogRoll from '../components/BlogRoll'

export default class BlogIndexPage extends Component {
  render() {
    return (
      <React.Fragment>
        <h1>Latest Posts</h1>
        <section>
          <div className="content">
            <BlogRoll />
          </div>
        </section>
      </React.Fragment>
    )
  }
}
```

`pages/index.js`

```
import React from 'react'
import { Link } from 'gatsby'

export default () => {
  return (
    <>
      Hello world!
      <p>
        <Link to="/blog">View Blog</Link>
      </p>
    </>
  )
}
```

## Houston we have a problem
`$ gatsby develop`

* We get this GraphQL error

```
ERROR #85923  GRAPHQL

There was an error in your GraphQL query:

Cannot query field "allMarkdownRemark" on type "Query".
```

* Our gatsby project doesn't have Markdown support
    - [Gatsby article on adding markdown pages](https://www.gatsbyjs.org/docs/adding-markdown-pages/)

## Steps Gatsby does to work with Markdown to generate HTML
1. Read files into Gatsby from the filesystem
2. Transform Markdown to HTML and frontmatter to data
3. Add a Markdown file
4. Create a page component for the Markdown files
5. Create static pages using Gatsby’s Node.js `createPage()` API

### Install necessary modules to convert markdown to pages
`$ npm i gatsby-source-filesystem gatsby-transformer-remark`

`gatsby-config.js`

```
module.exports = {
  /* Your site config here */
  plugins: [
    `gatsby-plugin-netlify-cms`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/blog`,
        name: `markdown-pages`,
      },
    },
    `gatsby-transformer-remark`,
    `gatsby-plugin-eslint`,
  ],
}
```

## Start up app
`$ npm start`

* You should see your blog posts at `/blog`

## Houston we have a problem
* Try to navigate into a blog... and it doesn't work!

### You need to tell Gatsby to generate pages for each blog using some node magic
* Create `/gatsby-node.js` in root of your app
* Let's add code to create a static page for each blog

`gatsby-node.js`

```
const path = require(`path`)

exports.createPages = async ({ actions, graphql, reporter }) => {
  const { createPage } = actions

  const blogPostTemplate = path.resolve(`src/templates/blog.js`)

  const result = await graphql(`
    {
      allMarkdownRemark(
        sort: { order: DESC, fields: [frontmatter___date] }
        limit: 1000
      ) {
        edges {
          node {
            frontmatter {
              path
            }
          }
        }
      }
    }
  `)

  // Handle errors
  if (result.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query.`)
    return
  }

  result.data.allMarkdownRemark.edges.forEach(({ node }) => {
    createPage({
      path: node.frontmatter.path,
      component: blogPostTemplate,
      context: {}, // additonal data can be passed via context
    })
  })
}
```

`src/templates/blog.js`

```
import React from 'react'
import { graphql } from 'gatsby'

export default function Template({
  data, // this prop will be injected by the GraphQL query below
}) {
  const { markdownRemark } = data // data.markdownRemark hold your post data
  const { frontmatter, html } = markdownRemark
  return (
    <div className="blog-post-container">
      <div className="blog-post">
        <h1>{frontmatter.title}</h1>
        <h2>{frontmatter.date}</h2>
        <div className="blog-post-content" dangerouslySetInnerHTML={{ __html: html }} />
      </div>
    </div>
  )
}
export const pageQuery = graphql`
  query($path: String!) {
    markdownRemark(frontmatter: { path: { eq: $path } }) {
      html
      frontmatter {
        date(formatString: "MMMM DD, YYYY")
        path
        title
      }
    }
  }
`
```

## View page in browser
* You can now see individual blogs

## Build an Account page
* We'll first add the link to our home page

`pages/index.js`

```
import React from 'react'
import { Link } from 'gatsby'

export default () => {
  return (
    <>
      Hello world!
      <p>
        <Link to="/blog">View Blog</Link>
      </p>
      <p>
        <Link to="/account">My Account</Link>
      </p>
    </>
  )
}
```

## and now the account page
* Since this section will have dynamic content that shouldn’t be rendered statically, you need to exclude it from the build

`src/pages/account.js`

```
import React from 'react'
import { Router } from '@reach/router'
import { Link } from 'gatsby'

const Home = () => <p>Home</p>
const Settings = () => <p>Settings</p>
const Account = () => {
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
      <Router>
        <Home path="/account" />
        <Settings path="/account/settings" />
      </Router>
    </>
  )
}

export default Account
```

### We will indicate that /account is a client-only route
* We'll put this code fragment at the bottom of `gatsby-node.js`

`gatsby-node.js`

```
// MORE CODE
exports.onCreatePage = async ({ page, actions }) => {
  const { createPage } = actions

  if (page.path.match(/^\/account/)) {
    page.matchPath = '/account/*'
    createPage(page)
  }
}
```

* Now you can navigate to this new section

## Register Your App with Okta
* To begin with Okta, you’ll need to `register` your app, just like you did with GitHub
* Log in to your Okta developer account and navigate to:

`Applications` > `Add Application`

1. Choose `Single-Page App` and `Next`
2. Enter a name like `Gatsby Account`
3. Specify the following Login redirect URIs:

* http://localhost:8000/account
* http://localhost:9000/account
* https://<your-site>.netlify.com/account

4. Specify the following Logout redirect URIs:

* http://localhost:8000
* http://localhost:9000
* https://<your-site>.netlify.com

5. Click `Done`

![okta general settings for your custom SPA](https://i.imgur.com/x2qQBHM.png)

## Add Trusted Origins for your Gatsby Sites
* Gatsby can run on two different ports (8000 and 9000) locally
* Port 8000 is for development (`$ gatsby build`)
* Port 9000 is for production (`$ gatsby build` and `$ gatsby serve`)

### Add them to:
Add all of these as Trusted Origins in `API` > `Trusted Origins` of your Okta tenant

![Add trusted origins](https://i.imgur.com/acNlBBo.png)

## Time to protect Gatsby Account Section using Okta
* Install Okta's Sign-in Widget

`$ npm i @okta/okta-signin-widget`

* Make sure to plugin in Your Okta `tenant URL` and app `Client ID` (given in last step when you configured your SPA)

`Login.js`

```
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
```

## Modify account page
* To include an Account component that uses `Login` to get ID tokens and logout

`account.js`

```
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
```

### Need state so convert to class based component
Need to convert it from a stateless functional component to a class based component

* **note** If you are using a custom domain inside okta (example: sso.soccermatters.com) you need to use that domain and not your okta preview domain or production domain

## Eslint (turn errors off)
`BlogRoll.js`

```
// MORE CODE

/* eslint react/display-name: 0 */ // --> OFF
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link, graphql, StaticQuery } from 'gatsby'

// MORE CODE
```

`Login.js`

```
// MORE CODE

/* eslint react/no-unused-state: 0 */ // --> OFF
import OktaSignIn from '@okta/okta-signin-widget'
import '@okta/okta-signin-widget/dist/css/okta-sign-in.min.css'
import React, { Component } from 'react'

// MORE CODE
```

`index.js`

* Fix display name eslint error

```
// MORE CODE

import React from 'react'
import { Link } from 'gatsby'

const HomePage = () => (
  <>
    Hello world!
    <p>
      <Link to="/blog">View Blog</Link>
    </p>
    <p>
      <Link to="/account">My Account</Link>
    </p>
  </>
)

export default HomePage

// MORE CODE
```

`templates/blog.js`

```
/* eslint react/prop-types: 0 */ // --> OFF
/* eslint react/no-danger: 0 */ // --> OFF
import React from 'react'
import { graphql } from 'gatsby'
import PropTypes from 'prop-types'

// MORE CODE
```

## Try it out
* Enter your credentials and click Sign In to browse the account section
* You should also see your name
* You should also be able to logout

## Fix Gatsby Production Build
### Test building your app for production
`$ run gatsby build`

### Houston we have a problem!
* You’ll get an error because Okta’s Sign-In Widget doesn’t expect to be compiled for server-side rendering

![error on build](https://i.imgur.com/zF0YodE.png)

#### Solution to error
* To fix this, you can exclude it from the compilation process
* Modify the webpack build to exclude it from compilation by configuring webpack
* Add the JavaScript below to the bottom of `gatsby-node.js`

`gatsby-node.js`

```
// MORE CODE
exports.onCreateWebpackConfig = ({ stage, loaders, actions }) => {
  if (stage === 'build-html') {
    // Exclude Sign-In Widget from compilation path
    actions.setWebpackConfig({
      module: {
        rules: [
          {
            test: /okta-sign-in/,
            use: loaders.null(),
          },
        ],
      },
    })
  }
}
```

* Try `$ gatsby build` again
* Now it should work this time
* Run `$ gatsby serve` to see if the production build works on 

`http://localhost:9000`

* If it does, Congrats!

## Add User Registration
* To give people the ability to sign-up for accounts, go to your 

`Okta dashboard` > `Users` > `Registration`, and enable it

## Modify src/components/Login.js
* This will add Okta’s user registration feature

```
const config = {
  ...
  authParams: {
    pkce: true,
    responseType: ['token', 'id_token']
  },
  features: {
    registration: true
  }
};
```

* Then build for production and serve it up again

```
$ gatsby build
$ gatsby serve
```

* You will now see a `Sign Up` link at the bottom of the login form

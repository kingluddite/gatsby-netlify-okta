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

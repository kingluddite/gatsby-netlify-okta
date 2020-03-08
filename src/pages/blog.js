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

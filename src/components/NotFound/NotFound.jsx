import React from 'react'
import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div>
      <div className="mt-5 text-center container">
        <h1>404 - Page not found</h1>
        <p>Sorry, the page you are looking for does not exist.</p>
        <Link to="/" className="btn mt-3" style={{ background: 'var(--first-color)',color:'white' }}>Return to Homepage</Link>
      </div>
    </div>
  )
}

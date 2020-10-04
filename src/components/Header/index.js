import React from 'react'
import SearchForm from 'components/SearchForm'
import './style.css'
export default function Header () {
  return (
    <nav className="navbar" role="navigation" aria-label="main navigation">
      <div className="navbar-brand">
        <a className="navbar-item" href="/">
          <img 
            src="https://bulma.io/images/bulma-logo.png" 
            alt="Bulma: Free, open source, and modern CSS framework based on Flexbox" 
            width="112" 
            height="28"
          />
        </a>
        <div className = "navbar-item Search-form">
          <SearchForm />
        </div>
        <a role="button" className="navbar-burger" aria-label="menu" aria-expanded="false">
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>
    </nav>
    
  )
}
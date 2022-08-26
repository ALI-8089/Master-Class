import React, { useEffect, useState } from 'react'
import './navbar.css'
import { useNavigate } from 'react-router-dom'
import { decodeToken } from 'react-jwt'
function Navbar() {
  const [token, setToken] = useState()
  const navigate = useNavigate()

  const signup = (event) => {
    event.preventDefault()
    navigate('/signup', { replace: true })
  }
  const login = (event) => {
    event.preventDefault()
    navigate('/login', { replace: true })
  }
  useEffect(() => {
    const token = localStorage.getItem('userToken')
    if (token) {
      const user = decodeToken(token)
      setToken(user)
    }
  }, [])

  return (
    <section>
      <nav className="navbar navbar-expand-lg navbar-light bg-light border-bottom-0 border-success border border-3">
        <div className="container-fluid">
          <a className="navbar-brand text-success fw-bold" href="#">
            MASTER CLASSES
          </a>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto  mb-2 mb-lg-0">
              <li className="nav-item">
                <a
                  className="nav-link active"
                  style={{ color: '#F07E2B' }}
                  aria-current="page"
                  href="#"
                >
                  Explore
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  Problem
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  Context
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="#">
                  Classes
                </a>
              </li>
            </ul>
          </div>
          {token ? (
            ''
          ) : (
            <div>
              <button
                type="button"
                onClick={login}
                className="btn btn-sm btn-outline-dark mx-2"
              >
                SIGN IN
              </button>
              <button
                type="button"
                onClick={signup}
                className="btn btn-sm btn-outline-dark"
              >
                SIGN UP
              </button>
            </div>
          )}

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
        </div>
      </nav>
    </section>
  )
}

export default Navbar

import React from 'react'
import './navbar.css'
function Navbar() {
  return (
    <section>
      <nav className="navbar navbar-expand-lg navbar-light bg-light border-bottom-0 border-success border border-3">
        <div className="container-fluid">
          <a className="navbar-brand text-success fw-bold" href="/admin/">
            MASTER CLASSES ADMIN
          </a>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto  mb-2 mb-lg-0">
              <li className="nav-item">
                <a
                  className="nav-link active"
                  style={{ color: '#F07E2B' }}
                  aria-current="page"
                  href="admin/dashboard"
                >
                  DASHBOARD
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/admin/all-users">
                  ALL USERS
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/admin/all-teacher">
                  ALL TEACHERS
                </a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/admin/requests">
                  REQUESTS
                </a> 
              </li>
            </ul>
          </div>

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

/* eslint-disable no-undef */
import React from 'react'

function Request() {
  return (
    <section>
      <div className="container">
        <div className="row  m-2 p-3 shadow border border-success d-flex align-items-center justify-content-evenly">
          <div className="col-md-3">
            <p>ALI AKBAR P </p>
            <p>CAPTIAN.8089@GMAIL.COM</p>
            <p>8089888548 </p>
          </div>
          <p className="col-md-2">10:22 pm 20-12-2022</p>
          {/* <img
            src={require('../../../images/dev.jpg')}
            alt=""
            className="col-md-4 img-fluid"
          /> */}
          <div className="col-md-2  card" style={{width:"15rem"}} >
            <div className="card-body d-flex flex-column  align-items-center"> 
            <img
            src={require('../../../images/dev.jpg')}
            alt=""
            className="col-md-4 img-fluid"
          />
              <a href="#" className="btn text-center btn-warning">
               Open
              </a>
            </div>
          </div>
          <div className="col-md-2 d-flex flex-column mx-2">
            <button className="btn btn-success my-md-3">APPROVE</button>
            <button className="btn btn-danger my-md-3 my-2">DECLINE</button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Request

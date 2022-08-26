import React, { useState } from 'react'
import './teacherapplication.css'
import axios from 'axios'
import { serverURL } from '../../../constants/constant'
function TeacherApplication() {
  const [fname, setFname] = useState()
  const [lname, setLname] = useState()
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()
  const [confPassword, setConfPassword] = useState()
  const [mobile, setMobile] = useState()
  const [qualification, setQalification] = useState()
  const [certificate, setCertificate] = useState([])
  const [error, setError] = useState()

  const certificateHandle = (event) => {
    setCertificate(event.target.files[0])
    console.log(event.target.files[0])
  }
  const request = async (event) => {
    event.preventDefault()
    if (
      !fname ||
      !lname ||
      !email ||
      !password ||
      !mobile ||
      !confPassword ||
      !qualification
    ) {
      setError('Please fill all required fields')
    } else if (mobile.length !== 10) {
      setError('Enter a valid mobile number')
    } else if (password.length < 6) {
      setError('password must be at least 6 characters')
    } else if (password !== confPassword) {
      setError('Password not matching with confirm password')
    } else {
      setError('')
      const teacherdata = {
        fname,
        lname,
        email,
        mobile,
        password,
        qualification,
      }
      const data = new FormData()
      console.log('hello')
      data.append('certificate', certificate)
      data.append('teacherdata',teacherdata)

      const response = await axios.post(
        `${serverURL}/teacher/application`,
        data,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
      )
      if (response) {  
        console.log(response)
      }
    }
  }

  return (
    <section className="page position-absolute ">
      <div className="row d-flex justify-content-center m-5 app">
        <div className="col-10 col-md-10 d justify-content-center">
          <h1>
            WELCOME TO <span className="text-success ">MASTER</span> TEACHER{' '}
            <span className="text-success">
              {' '}
              <br /> APPLICATION
            </span>
          </h1>
        </div>
        <div className="row">
          <div className="col">
            <form onSubmit={request} className="m-5 d-flex flex-column  ">
              <div className="row">
                <h1 className="mt-2 text-success ">SIGN UP</h1>
              </div>
              <div className="row">
                <div className="col m-2">
                  <div className="my-2">
                    <label htmlFor="" className="">
                      First Name
                    </label>

                    <input
                      type="text"
                      value={fname}
                      className="rounded-pill inputborder form-control py-2"
                      onChange={(e) => {
                        setFname(e.target.value)
                      }}
                    />
                  </div>
                  <div className="mt-2">
                    <label htmlFor="" className="">
                      Last Name
                    </label>
                    <br />
                    <input
                      type="text"
                      value={lname}
                      className="rounded-pill inputborder form-control py-2"
                      onChange={(e) => {
                        setLname(e.target.value)
                      }}
                    />
                  </div>
                  <div className="mt-2">
                    <label className="">Email</label>

                    <input
                      type="email"
                      value={email}
                      className="rounded-pill inputborder form-control py-2"
                      onChange={(e) => {
                        setEmail(e.target.value)
                      }}
                    />
                  </div>
                  <div className="mt-2">
                    <label htmlFor="" className="">
                      Mobile
                    </label>

                    <input
                      onChange={(e) => {
                        setMobile(e.target.value)
                      }}
                      type="number"
                      value={mobile}
                      className=" rounded-pill form-control inputborder py-2"
                    />
                  </div>
                </div>
                <div className="col m-2">
                  <div className="mt-2">
                    <label htmlFor="" className="">
                      Qualification
                    </label>

                    <input
                      onChange={(e) => {
                        setQalification(e.target.value)
                      }}
                      type="text"
                      value={qualification}
                      className=" rounded-pill form-control inputborder py-2"
                    />
                  </div>
                  <div className="mt-2">
                    <label htmlFor="" className="">
                      Upload Qualification Certificate
                    </label>

                    <input
                    name='certificate'
                      onChange={certificateHandle}
                      type="file"
                      className=" rounded-pill form-control inputborder py-2"
                    />
                  </div>
                  <div className="mt-2">
                    <label htmlFor="" className="">
                      Password
                    </label>

                    <input
                      onChange={(e) => {
                        setPassword(e.target.value)
                      }}
                      type="password"
                      value={password}
                      className=" rounded-pill form-control inputborder py-2"
                    />
                  </div>
                  <div className="mt-2">
                    <label htmlFor="" className="">
                      Comfirm Password
                    </label>

                    <input
                      onChange={(e) => {
                        setConfPassword(e.target.value)
                      }}
                      type="password"
                      value={confPassword}
                      className=" rounded-pill form-control inputborder py-2"
                    />
                  </div>
                </div>
              </div>

              {error && (
                <label htmlFor="" className="text-danger">
                  {error}
                </label>
              )}
              <button
                className="btn btn-success rounded-pill signupbtn fw-bold my-5 px-5 submit"
                type="submit"
              >
                REQUEST
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

export default TeacherApplication

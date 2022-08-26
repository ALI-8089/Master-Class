/* eslint-disable no-undef */
import React, { useState } from 'react'
import axios from 'axios'
import { serverURL } from '../../../constants/constant'
import { useNavigate } from 'react-router-dom'
import { decodeToken } from 'react-jwt'
function Teacherlogin() {
  const [email, setEmail] = useState()
  const [otp, setOtp] = useState()
  const [error, setError] = useState()
  const [code, setCode] = useState()
  const [otpInput, setOtpInput] = useState(false)

  const navigate = useNavigate()
  const sentOtp = async (event) => {
    event.preventDefault()
    try {
      const data = { email }
      await axios.post(`${serverURL}/teacher/otp`, data).then((response) => {
        console.log(response)
        setCode(response.data)
        setOtpInput(true)
      })
    } catch (err) {
      console.log(err)
    }
  }
  const Login = async (event) => {
    event.preventDefault()
    const data = {
      email,
    }
    try {
      if (!otp === code) {
        setError('Invalid OTP')
      } else {
        setError('')
        await axios
          .post(`${serverURL}/teacher/login`, data)
          .then((response) => {
            console.log(response)
            if (response.data) {
              const token = decodeToken(response.data)
              if (token) {
                navigate('/teacher')
              } else {
                localStorage.removeItem(token)
                setError('Email Not Found ! Please Sign Up First')
              }
            } else {
              setError('Email Not Found ! Please Sign Up First')
            }
          })
      }
    } catch (err) {
      console.log(err)
    }
  }
  return (
    <section className="bg-color position-absolute ">
      <div className="row d-flex justify-content-center ">
        <div className="col-10 col-md-4  shadow m-5 col-one d-sm-none d-md-block d-none .d-sm-block">
          <h1 className="mt-5 ">
            WELCOME TO <strong className="text-success">MASTER </strong>
            TEACHERS
          </h1>
          <img
            src={require('../../../images/dev.jpg')}
            alt="image"
            className="img-fluid my-5"
          />
        </div>
        <div className="col-10 col-md-4 shadow my-5 col-one ">
          <form onSubmit={Login} className="m-5 d-flex flex-column  ">
            <h1 className="mt-2 text-success ">SIGN UP</h1>

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
              <div className="">
                {otpInput ? (
                  <div className="my-3">
                    <input
                      onChange={(e) => {
                        setOtp(e.target.value)
                      }}
                      value={otp}
                      type="text"
                      placeholder="Enter OTP"
                      className="inputborder form-control   rounded-pill "
                    />
                  </div>
                ) : (
                  ''
                )}

                <button
                  className="btn rounded-pill my-2  btn-sm btn-outline-success"
                  type="button"
                  onClick={sentOtp}
                >
                  sent OTP
                </button>
                <label
                  htmlFor=""
                  className="text-danger px-3
                "
                >
                  Email OTP verification
                </label>
              </div>
            </div>

            {otp ? (
              <button
                className="btn btn-success rounded-pill signupbtn fw-bold my-5 px-5 submit"
                type="submit"
              >
                SUBMIT
              </button>
            ) : (
              <button
                disabled
                className="btn btn-success rounded-pill signupbtn fw-bold my-5 px-5 submit"
                type="submit"
              >
                SUBMIT
              </button>
            )}

            {error && <h5 className="text-danger error">{error}</h5>}
          </form>
        </div>
      </div>
    </section>
  )
}

export default Teacherlogin

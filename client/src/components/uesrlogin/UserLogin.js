/* eslint-disable no-undef */
import React, { useState } from 'react'
import axios from 'axios'
import { serverURL } from '../../constants/constant'
import { useNavigate } from 'react-router-dom'
import { GoogleLogin } from 'react-google-login'
import { GOOGLE_CLIENT_ID } from '../../googleClient'
import './userlogin.css'
function UserLogin() {
  const [email, setEmail] = useState()
  const [error, setError] = useState()
  const [password, setPassword] = useState()
  const navigate = useNavigate()

  const Login = async (event) => {
    event.preventDefault()
    try {
      if (!email || !password) {
        setError('Please enter all required fields')
      } else {
        setError('')
        const response = await axios.post(`${serverURL}/login`, data)
        if (response.data) {
          setError('Email Not Found')
        } else {
          navigate('/', { replace: true })
        }
      }
    } catch (err) {
      console.log(err)
    }
  }
  const handleLogin = async (googeldata) => {
    console.log(googeldata)

    const data = {
      email: googeldata.profileObj.email,
      fname: googeldata.profileObj.givenName,
      lname: googeldata.profileObj.familyName,
      image: googeldata.profileObj.imageUrl,
    }

    const response = await axios.post(`${serverURL}/googlesignin`, data)
    console.log(response)
    if (response) {
      navigate('/', { replace: true })
    }
  }
  const handleFailure = (res) => {
    console.log('Login Failed:', res)
  }
  return (
    <section className="bg-color position-absolute ">
      <div className="row d-flex justify-content-center alien-items-center">
        <div className="col-10 col-md-4  shadow m-5 col-one d-sm-none d-md-block d-none .d-sm-block">
          <h1 className="mt-5 ">
            WELCOME TO <strong className="text-success">MASTER </strong>
           CLASSES
          </h1>
          <img
            src={require('../../images/dev.jpg')}
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
            </div>
            <div className="mt-2">
              <label className="">password</label>
              <input
                type="password"
                value={password}
                className="rounded-pill inputborder form-control py-2"
                onChange={(e) => {
                  setPassword(e.target.value)
                }}
              />
            </div>

            <button
              className="btn btn-success rounded-pill signupbtn fw-bold my-5 px-5 submit"
              type="submit"
            >
              SUBMIT
            </button>

            {error && <label className="text-danger error">{error}</label>}
            <h4 className="or text-center">OR</h4>

            <GoogleLogin
              clientId={GOOGLE_CLIENT_ID}
              buttonText="Sign In with Google"
              onSuccess={handleLogin}
              onFailure={handleFailure}
              cookiePolicy={'single_host_origin'}
            />
          </form>
        </div>
      </div>
    </section>
  )
}

export default UserLogin

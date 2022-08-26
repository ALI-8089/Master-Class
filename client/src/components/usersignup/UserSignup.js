/* eslint-disable no-undef */
import React, { useState } from 'react'
import './usersignup.css'
import axios from 'axios'
import { serverURL } from '../../constants/constant'
import { useNavigate } from 'react-router-dom'
import { GoogleLogin } from 'react-google-login'
import { GOOGLE_CLIENT_ID } from '../../googleClient'
import { gapi } from 'gapi-script'
function UserSignup() {
  const [fname, setFname] = useState()
  const [lname, setLname] = useState()
  const [email, setEmail] = useState()
  const [password, setPassword] = useState()
  const [confPassword, setConfPassword] = useState()
  const [error, setError] = useState()
  const navigate = useNavigate()
  gapi.load('client:auth2', () => {
    gapi.client.init({
      clientId: GOOGLE_CLIENT_ID,
      plugin_name: 'chat',
    })
  })
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
  const signup = async(event) => {
    event.preventDefault()
    try {
      if (!fname || !lname || !email || !password || !confPassword) {
        setError('Please enter all required fields')
      } else if (!password.length >= 6) {
        setError('Password must having minimun 6 characters')
      } else if (password !== confPassword) {
        setError('Password Not Matching with Confirm Password')
      }else{
        setError('')
        const data = {
          fname,lname,email,password
        }
        const response = await axios.post(`${serverURL}/signup`,data)
       
        if(response.data.signuperror){
          setError("Email Already Exist")
        }else{
          navigate('/login',{replace:true})
        }
      }
    } catch (err) {
      console.log()
    }
  }

  return (
    <section className="bg-color position-absolute ">
      <div className="row d-flex justify-content-center ">
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
        <div className="col-10 col-md-4 shadow my-5 col-one">
          <form onSubmit={signup} className="m-5 d-flex flex-column  ">
            <h1 className="mt-2 text-success ">SIGN UP</h1>
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
              <label className="">Password</label>

              <input
                type="password"
                value={password}
                className="rounded-pill inputborder form-control py-2"
                onChange={(e) => {
                  setPassword(e.target.value)
                }}
              />
            </div>
            <div className="mt-2">
              <label className=""> Confirm Password</label>

              <input
                type="password"
                value={confPassword}
                className="rounded-pill inputborder form-control py-2"
                onChange={(e) => {
                  setConfPassword(e.target.value)
                }}
              />
            </div>

            <button
              className="btn btn-success rounded-pill signupbtn fw-bold my-5 px-5 submit"
              type="submit"
            >
              SUBMIT
            </button>

            {error && <h5 className="text-danger error">{error}</h5>}
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

export default UserSignup

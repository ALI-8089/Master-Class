/* eslint-disable no-undef */
import React,{useState} from 'react'
import {useNavigate} from 'react-router-dom'
import axios from 'axios'
import {serverURL} from "../../../constants/constant"
function Login() {
    const [email, setEmail] = useState()
    const [error, setError] = useState()
    const [password, setPassword] = useState()
    const navigate = useNavigate()
  
    const Login = async (event) => {
      event.preventDefault()
      const data ={
        email,password
      }
      try {
        if (!email || !password) {
          setError('Please enter all required fields')
        } else {
          setError('')
          const response = await axios.post(`${serverURL}/admin/login`, data)
          if (!response.data) {
            console.log(response);
            setError('Email Not Found')
          } else {
            console.log(response);
            navigate('/admin/', { replace: true })
          }
        }
      } catch (err) {
        console.log(err)
      }
    }
  return (
    <section className="bg-color bg-success position-absolute ">
    <div className="row d-flex justify-content-center alien-items-center">
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
            {error && <label className="text-danger error">{error}</label>}
            <button
              className="btn btn-success rounded-pill signupbtn fw-bold my-5 px-5 submit"
              type="submit"
            >
              SUBMIT
            </button>

           
           
           
          </form>
      </div>
    </div>
  </section>
  )
}

export default Login
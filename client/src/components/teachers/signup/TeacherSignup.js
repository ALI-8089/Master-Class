/* eslint-disable no-undef */
import React, { useState } from 'react'
import './TeacherSignup.css'
import axios from 'axios'
import { serverURL } from '../../../constants/constant'
import {useNavigate}from "react-router-dom"
function TeacherSignup() {
  const [fname, setFname] = useState()
  const [lname, setLname] = useState()
  const [email, setEmail] = useState()
  const [mobile, setMobile] = useState()
  const [error, setError] = useState()
  const [otp, setOtp] = useState()
  const [otpInput, setOtpInput] = useState(false)
  const [code, setCode] = useState()
  const navigate = useNavigate()

  const signup = async (event) => {
    event.preventDefault()
    try {
      if (!fname || !lname || !email || !mobile) {
        setError('Fill all fields')
      } else if (!code === otp) {
        setError("Invalid OTP")
      }else{
        const data ={
          fname,lname ,email,mobile
        }
        await axios.post(`${serverURL}/teacher/signup`,data).then((response)=>{
          if(response.signuperror){
            setError("Email Already Exist")
          }else{
            console.log(response);
            navigate('/teacher/login',{ replace: true})
          }
         
        })
      }
    } catch (err) {
      console.log(err)
    }
  }
  const sendfirstmail = async () => {
    try {
      const data = {
        fullname: fname + lname,
        email,
      }
      console.log(data)
      await axios.post(`${serverURL}/teacher/otp`, data).then((code) => {
        console.log('code ---', code.data)
        setCode(code.data)
      })
    } catch (err) {
      console.log(err)
    }
  }
  const sentOtp = (event) => {
    event.preventDefault()  
    sendfirstmail()
    setOtpInput(true)
    
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

export default TeacherSignup

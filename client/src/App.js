import './App.css'
import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import UserHome from './pages/UserHome'
import UserLogin from './components/uesrlogin/UserLogin'
import UserSignup from './components/usersignup/UserSignup'
import TeacherHome from './pages/TeacherHome'
import TeacherSignup from './components/teachers/signup/TeacherSignup'
import Teacherlogin from './components/teachers/signin/Teacherlogin'
import TeacherApplication from './components/teachers/application/TeacherApplication'
import Adminlogin from './pages/Adminlogin'
import AdminHome from './pages/AdminHome'
import Request from './components/admin/teacher request/Request'

function App() {
  return (
    // eslint-disable-next-line react/react-in-jsx-scope
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<UserHome />} />
          <Route path="/login" element={<UserLogin />} />
          <Route path="/signup" element={<UserSignup />} />
          <Route path="/teacher" element={<TeacherHome />} />
          <Route path="/teacher/signup" element={<TeacherSignup />} />
          <Route path="/teacher/login" element={<Teacherlogin />} />
          <Route path="/teacher/apply" element={<TeacherApplication />} />
          <Route path="/admin/login" element={<Adminlogin />} />
          <Route path="/admin" element={<AdminHome />} />
          <Route path="/admin/request" element={<Request />} />
          
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App

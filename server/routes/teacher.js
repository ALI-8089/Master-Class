/* eslint-disable no-undef */
const express = require('express')
const router = express.Router()
const sendEmail = require('../utilies/sendMail')
const teacherHelper = require('../Helpers/teacherHelper')
const jwt = require('jsonwebtoken')
const multer = require('multer')
const DIR = './public'
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, DIR)
  },
  filename: (req, file, cb) => {
    const fileName = file.originalname.toLowerCase().split(' ').join('-')
    cb(null, fileName)
  },
})

let upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    if (
      file.mimetype == 'image/png' ||
      file.mimetype == 'image/jpeg' ||
      file.mimetype == 'image/jpg'
    ) {
      cb(null, true)
    } else {
      cb(null, false)
      return cb(new Error('only .png, .jpg and .jpeg formats are allowed'))
    }
  },
}).single('certificate')
router.post('/otp', (req, res) => {
  try {
    console.log('sssssssss', req.body)
    const data = req.body
    const code = Math.floor(100000 + Math.random() * 900000)

    sendEmail(data.email, code)

    res.json(code)
  } catch (err) {
    console.log(err)
  }
})
router.post('/signup', (req, res) => {
  try {
    const teacherData = req.body
    teacherHelper.signup(teacherData).then((response) => {
      if (response.signuperror) {
        res.json(response.signuperror)
      } else {
        res.json('signup success')
      }
    })
  } catch (err) {
    console.log(err)
  }
})
router.post('/login', (req, res) => {
  try {
    const data = req.body

    teacherHelper.login(data).then((response) => {
      if (response.signuperror) {
        res.json(response.signuperror)
      } else {
        const teacherToken = jwt.sign({}, process.env.TEACHER_TOKEN, {
          expiresIn: '24h',
        })
        res.json(teacherToken)
      }
    })
  } catch (err) {
    console.log(err)
  }
})
router.post('/application', (req, res) => {
  try {
    upload(req, res, () => {
      const data = req.body
      console.log('------------', data.teacherdata)
    })
  } catch (err) {
    console.log(err)
  }
})
module.exports = router

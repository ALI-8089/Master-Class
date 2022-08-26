/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
const express = require('express')
const router = express.Router()
const userHelper = require('../Helpers/userHelper')
const jwt = require('jsonwebtoken')
router.post('/signup', (req, res) => {
  try {
    console.log(' req.body', req.body)
    const data = req.body
    userHelper.signup(data).then((response) => {
      console.log(response)
      if (response.signuperror) {
        res.json(response)
      } else {
        res.json('Success')
      }
      
    })
  } catch (err) {
    console.log(err)
  }
})
router.post('/login', (req, res) => {
  try {
    const data = req.body
    userHelper.login(data).then((response) => {
      if (!response.user) {
        res.json('User not found')
      } else {
        const userToken = jwt.sign({}, process.env.USER_TOKEN)

        res.json(userToken)
      }
    })
  } catch (err) {
    console.log(err)
  }
})
router.post('/googlesignin', (req, res) => {
  try {
    console.log("hi0000000000000");
    const data = req.body
    userHelper.googlelogin(data).then((response) => {
    const userToken = jwt.sign({},process.env.USER_TOKEN)
    res.json(userToken)
    })
  } catch (err) {
    console.log(err)
  }
})

module.exports = router

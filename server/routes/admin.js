/* eslint-disable no-undef */
const express = require ('express')
const router = express.Router()
const  adminHelper = require('../Helpers/adminHelper')

router.post("/login",(req,res)=>{
    console.log(req.body);
    const data = req.body
    const response = adminHelper.login(data)
    if(response.loginError){
      res.json(response.loginError)
    }else{
      res.json("login success")
    }
})
module.exports = router
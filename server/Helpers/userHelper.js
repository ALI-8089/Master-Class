/* eslint-disable no-unused-vars */
/* eslint-disable no-async-promise-executor */
/* eslint-disable no-undef */
const collection = require('../configMongoose/dbCollection')
const bcrypt = require('bcrypt')

module.exports = {
  signup: (data) => {
    return new Promise(async (resolve, reject) => {
      let response = {}
      const user = await collection.USERCOLLECTION.findOne({
        email: data.email,
      })
      if (user) {
        response.signuperror = true
        resolve(response)
      } else {
        data.password = await bcrypt.hash(data.password, 10)
        collection.USERCOLLECTION.create({
          fname: data.fname,
          lname: data.lname,
          email: data.email,
          password: data.password,
        }).then((response) => {
          response.signuperror = false
          resolve(response)
        })
      }
    })
  },
  login: (data) => {
    return new Promise(async (resolve, reject) => {
      const user = await collection.USERCOLLECTION.findOne({
        email: data.email,
      })
      if (user) {
        bcrypt.compare(data.password, user.password).then(() => {
          resolve({ user: true })
        })
      } else {
        resolve('user not found')
      }
    })
  },
  googlelogin: (data) => {
    console.log('user data :', data)
    return new Promise(async (resolve, reject) => {
      const user = await collection.USERCOLLECTION.findOne({
        email: data.email,
      })
      if (user) {
        resolve(user)
      } else {
        await collection.USERCOLLECTION.create({
          fname: data.givenName,
          lname: data.familyName,
          email: data.email,
          image:data.imageUrl
        }).then(()=>{
          resolve(user)
        })
      }
    })
  },
}

/* eslint-disable no-unused-vars */
/* eslint-disable no-async-promise-executor */
/* eslint-disable no-undef */
const collection = require('../configMongoose/dbCollection')

const bcrypt = require('bcrypt')
module.exports = {
  login: (data) => {
    return new Promise(async (resolve, reject) => {
      let response = {}
      const admin = await collection.ADMINCOLLECTION.findOne({
        email: data.email,
      })
      if (admin) {
        const verifyAdmin = bcrypt.compare(data.password, admin.password)
        if (verifyAdmin) {
          resolve(admin)
        } else {
          resolve(response.loginError)
        }
      } else {
        resolve(response.loginError)
      }
    })
  },
}

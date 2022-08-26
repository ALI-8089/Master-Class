/* eslint-disable no-unused-vars */
/* eslint-disable no-async-promise-executor */
/* eslint-disable no-undef */
const collection = require('../configMongoose/dbCollection')
module.exports = {
  signup: (teacherData) => {
    return new Promise(async (resolve, reject) => {
      let response = {}
      const teacher = await collection.TEACHERCOLLECTION.findOne({
        email: teacherData.email,
      })
      if (teacher) {
        response.signuperror = true
        resolve(response)
      } else {
        collection.TEACHERCOLLECTION.create({
          fname: teacherData.fname,
          lname: teacherData.lname,
          email: teacherData.email,
          mobile: teacherData.mobile,
        }).then((response)=>{
            response.signuperror= false
            resolve(response)
        })
      }
    })
  },
  login : (data)=>{

return new Promise (async(resolve, reject)=>{
  let response={}
  const teacher  = await collection.TEACHERCOLLECTION.findOne({email: data.email})
  if(teacher ){
    response.loginError = false
    resolve(response)
  }else{
    response.loginError= true
    resolve(response)
  }
})
  }
}

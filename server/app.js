/* eslint-disable no-undef */
const express = require('express')
const adminRouter = require('./routes/admin')
const teacherRouter = require('./routes/teacher')
const userRouter = require('./routes/user')
const app = express()
const cors = require('cors')
// const jwt = require('jsonwebtoken')
require('./configMongoose/dbConnection')
require('dotenv').config()

app.use(
  cors({
    origin: '*',
  }),
)
app.use(express.json())
app.use(express.urlencoded({ extended: false }));
app.use('/', userRouter)
app.use('/teacher', teacherRouter)
app.use('/admin', adminRouter)
app.listen(4000, () => {
  console.log('server starting port 4000')
}) 

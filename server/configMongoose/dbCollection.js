/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
const mongoose =require('mongoose');
let USERCOLLECTION = new mongoose.Schema({
fname:{type:String,required:true},
lname:{type:String,required:true},
email:{type:String,required:true , unique:true},
image:{type:String},
password:{type:String}
},{collection:"users"})
USERCOLLECTION = mongoose.model('user',USERCOLLECTION)

let TEACHERCOLLECTION = new mongoose.Schema({
    fname:{type:String,required:true},
    lname:{type:String,required:true},
    email:{type:String,required:true, unique:true},
    mobile:{type:Number,required:true}
},{collection:'teacher'})
TEACHERCOLLECTION = mongoose.model('teacher',TEACHERCOLLECTION)


let ADMINCOLLECTION = new mongoose.Schema({
    email:{type:String,required:true},
    password:{type:String,required:true}
},{collection:'admin'})
ADMINCOLLECTION = mongoose.model('admin',ADMINCOLLECTION)
module.exports={
    USERCOLLECTION ,TEACHERCOLLECTION,ADMINCOLLECTION
   
}
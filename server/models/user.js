'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema

let userSchema = new Schema({
  user: String,
  pass: String
}, {
  timestamps: true
})

let User = mongoose.model('User', userSchema)

module.exports = User

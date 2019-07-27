// models/link.js
const mongoose = require('mongoose')
const Schema = mongoose.Schema
const linkSchema = new Schema({
  link: {
    type: String,
    required: true
  },
  shortLink: {
    type: String,
    required: true,
  }
})

module.exports = mongoose.model('urlShortenerLink', linkSchema)
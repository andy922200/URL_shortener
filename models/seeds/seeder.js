// models/seeds/seeder.js
const mongoose = require('mongoose')
const Link = require('../link')

// connect with DB
mongoose.connect(process.env.MONGODB_URL || 'mongodb://localhost/urlShortenerLink', { useNewUrlParser: true, useCreateIndex: true })

const db = mongoose.connection
db.on('error', () => {
  console.log('db error!')
})
db.once('open', () => {
  console.log('db connected!')
  const baseURL = "http://localhost:3000/"
  let randomString = Math.random().toString(36).slice(-5)
  let shortURL = ''
  shortURL = baseURL + randomString

  Link.create({
    link: 'https://www.books.com.tw',
    shortLink: shortURL
  })

  console.log('seed data is generated')
})
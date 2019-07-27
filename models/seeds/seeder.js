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

  Link.create({
    link: 'https://www.books.com.tw/link/jshdksdhsdjfhdsjfwerty',
    shortLink: 'https://tinyurl.com/7k3bd'
  })

  console.log('seed data is generated')
})
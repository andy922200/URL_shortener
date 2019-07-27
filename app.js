// app.js
const express = require('express')
const expressHandlebars = require('express-handlebars')
const session = require('express-session')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const mongoose = require('mongoose')
const flash = require('connect-flash')
const app = express()
const port = 3000

// express Listener
app.listen(process.env.PORT || port, () => {
  console.log(`App is running at ${port}!`)
})

// production mode or development mode
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

// connect with database
mongoose.connect('mongodb://localhost/urlShortenerLink', { useNewUrlParser: true, useCreateIndex: true })
const db = mongoose.connection
db.on('error', () => {
  console.log('mongodb error!')
})
db.once('open', () => {
  console.log('mongodb connected!')
})

// load record model
const Link = require('./models/link')

// template engine setting
app.engine('handlebars', expressHandlebars({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

// load static files
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(methodOverride('_method'))

// initialize express-session and then flash messages
app.use(session({
  secret: 'asdfghjkl',
  resave: 'false',
  saveUninitialized: 'false'
}))
app.use(flash())

// load local variables
app.use((req, res, next) => {
  res.locals.user = req.user
  //res.locals.isAuthenticated = req.isAuthenticated()
  res.locals.success_msg = req.flash('success_msg')
  res.locals.warning_msg = req.flash('warning_msg')
  next()
})

// load router settings
app.use('/', require('./routes/home'))
//app.use('/links', require('./routes/links'))
// routes/home.js
// initialize router
const express = require('express')
const router = express.Router()
//const Link = require('../models/link.js')

// index router
router.get('/', (req, res) => {
  res.render('index')
})

module.exports = router
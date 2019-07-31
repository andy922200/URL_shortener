// routes/home.js
// initialize router
const express = require('express')
const router = express.Router()
const Link = require('../models/link.js')

// index router
router.get('/', (req, res) => {
  res.render('index')
})

// redirect shortURL to originalUrl
router.get(/[0-9A-Za-z]{1,}/, (req, res) => {
  //const baseUrl = 'http://localhost:3000'
  const baseUrl = 'https://mighty-river-85810.herokuapp.com'
  let shortLink = baseUrl + req.url
  let originalLink = ''
  if (req.url.length !== 6) {
    res.redirect('/')
  } else {
    Link.find({ "shortLink": shortLink }, (err, result) => {
      if (result.length === 0) return res.redirect('/')
      //console.log(result)
      originalLink = result[0]['link']
      res.redirect(originalLink)
    })
  }

})

router.get(/[^0-9A-Za-z]{1,}/, (req, res) => {
  res.redirect('/')
})


module.exports = router
//initialize router
const express = require('express')
const router = express.Router()
const { check, validationResult } = require('express-validator')
//const { formCheck, registerFormCheck } = require('../models/validationRule')
const Link = require('../models/link.js')

// send original Link to tinyURL proxy
router.post('/', (req, res) => {
  //const errors = validationResult(req)
  const baseURL = "http://localhost:3000/"
  let randomString = Math.random().toString(36).slice(-5)
  let originalLink = req.body.originalLink
  let shortURL = ''
  shortURL = baseURL + randomString
  console.log(originalLink)
  console.log(randomString)
  console.log(shortURL)
  const link = Link({
    link: originalLink,
    shortLink: shortURL
  })
  link.save(err => {
    if (err) return console.log(err)
    res.render('result', { shortURL: shortURL, originalLink: originalLink })
  })
})

module.exports = router
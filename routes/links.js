//initialize router
const express = require('express')
const router = express.Router()
const Link = require('../models/link.js')
const { check, validationResult } = require('express-validator')
//const { formCheck, registerFormCheck } = require('../models/validationRule')


// send original Link to tinyURL proxy
router.post('/', (req, res) => {
  //const errors = validationResult(req)
  const baseURL = "http://localhost:3000/"
  let randomString = Math.random().toString(36).slice(-5)
  let originalLink = req.body.originalLink
  let shortURL = ''
  shortURL = baseURL + randomString
  const link = Link({
    link: originalLink,
    shortLink: shortURL
  })

  Link.find({ "shortLink": shortURL }, (err, results) => {
    if (err) return err
    // validate repeat shortURL
    if (results.length > 0) {
      randomString = Math.random().toString(36).slice(7, 12)
      shortURL = baseURL + randomString
    }
    Link.find({ "link": originalLink }, (err, results) => {
      if (err) return err
      // validate repeat original Link 
      if (results.length > 0) {
        shortURL = results[0]['shortLink']
        res.render('result', { shortURL: shortURL, originalLink: originalLink })
      } else {
        link.save(err => {
          if (err) return console.log(err)
          res.render('result', { shortURL: shortURL, originalLink: originalLink })
        })
      }
    })
  })

})

module.exports = router
//initialize router
const express = require('express')
const router = express.Router()
const Link = require('../models/link.js')
const { check, validationResult } = require('express-validator')
const formCheck = require('../models/validationRule')


// send original Link to tinyURL proxy
router.post('/', formCheck, async (req, res) => {
  let originalLink = req.body.originalLink
  let errorMessages = []
  const errors = validationResult(req)
  //const baseURL = "http://localhost:3000/"
  const baseURL = "https://mighty-river-85810.herokuapp.com/"
  let randomString = Math.random().toString(36).slice(-5)
  let shortURL = ''
  shortURL = baseURL + randomString
  const link = Link({
    link: originalLink,
    shortLink: shortURL
  })

  if (!errors.isEmpty()) {
    console.log(errors)
    //console.log(errors.array()[0]['msg'])
    for (let i = 0; i < errors.array().length; i++) {
      errorMessages.push({ message: errors.array()[i]['msg'] })
      //console.log(errorMessages)
    }
    res.render('index', { errorMessages: errorMessages })
  } else {
    try {
      let totalResults = await Link.find().exec()
      let results = await Link.find({ 'shortLink': shortURL }).exec()
      if (totalResults.length === 36 ** 5) {
        errorMessages.push({ message: '短網址已經用盡，請通知管理員' })
        res.render('index', { errorMessages: errorMessages })
      } else {
        while (results.length > 0) {
          randomString = Math.random().toString(36).slice(-5)
          shortURL = baseURL + randomString
          results = await Link.find({ 'shortLink': shortURL }).exec()
        }
        Link.find({ "link": originalLink })
          .exec((err, results) => {
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
      }
    } catch (error) {
      console.log(error)
    }
  }

})

module.exports = router
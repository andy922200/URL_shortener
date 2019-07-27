// initialize express-validator
const { check, validationResult } = require('express-validator')

// validator array
const linkPattern = new RegExp("^(http|https):\/\/", "i")
let formCheck =
  [
    check('originalLink')
      .isLength({ min: 1 })
      .withMessage('請檢查連結網址是否空白')
      .custom((value) => {
        return linkPattern.test(value)
      })
      .withMessage("請檢查網址格式"),
  ]

module.exports = formCheck
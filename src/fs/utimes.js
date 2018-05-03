// packages
const {utimes} = require('@ronomon/utimes')
const {promisify} = require('util')

module.exports = promisify(utimes)

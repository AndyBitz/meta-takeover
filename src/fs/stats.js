// packages
const {stat} = require('fs')
const {promisify} = require('util')

module.exports = promisify(stat)

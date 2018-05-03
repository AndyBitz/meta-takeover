// packages
const {readdir} = require('fs')
const {promisify} = require('util')

module.exports = promisify(readdir)

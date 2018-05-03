// packages
const stats = require('./fs/stats')
const utimes = require('./fs/utimes')
const {basename, dirname} = require('path')

let counter = 1

module.exports = async (originFilePath, endFilePath) => {
  const originStats = await stats(originFilePath)
  const endStats = await stats(endFilePath)

  // output
  const sname = basename(originFilePath)
  const ename = basename(endFilePath)
  const type = originStats.isFile() ? 'file' : 'folder'
  console.log(`  -------------------------------- ${counter++} ▼`)
  console.log(`  type:        ${type}`)
  console.log(`  origin:      ${originFilePath}`)
  console.log(`  destination: ${endFilePath}`)
  
  const items = {
    btime: [originStats.birthtime, endStats.birthtime],
    atime: [originStats.atime, endStats.atime],
    mtime: [originStats.mtime, endStats.mtime],
    ctime: [originStats.ctime, endStats.ctime]
  }

  const length = timeTransform(items.btime[0]).length
  const writeName = (name) => `${name}${' '.repeat(length - name.length)}`

  process.stdout.write(`\n      `)
  process.stdout.write(writeName('birth'))
  process.stdout.write(writeName('access'))
  process.stdout.write(writeName('modification'))
  process.stdout.write(writeName('change'))

  process.stdout.write(`\n  in  `)
  process.stdout.write(timeTransform(items.btime[0]))
  process.stdout.write(timeTransform(items.atime[0]))
  process.stdout.write(timeTransform(items.mtime[0]))
  process.stdout.write(timeTransform(items.ctime[0]))

  process.stdout.write(`\n  out `)
  process.stdout.write(timeTransform(items.btime[1]))
  process.stdout.write(timeTransform(items.atime[1]))
  process.stdout.write(timeTransform(items.mtime[1]))
  process.stdout.write(timeTransform(items.ctime[1]))
  process.stdout.write(`\n\n`)

  // birthtime = when file was created
  // atime = access time, when file was accessed
  // mtime = modification time, when `contents` of file got changed
  // ctime = change time, when `contents` or attributes change, except atime
  const { birthtimeMs, mtimeMs, atimeMs } = originStats

  try {
    await utimes(endFilePath, parseInt(birthtimeMs), parseInt(mtimeMs), parseInt(atimeMs))
    process.stdout.write(`  copied - out has taken over the timestamps from in\n\n\n`)
  } catch(err) {
    process.stdout.write(`  failed\n\n\n`)
    console.err(err)
  }
}


const timeTransform = (date) => {
  return `${date.getFullYear()}`
    + `-${pad(date.getMonth() + 1)}`
    + `-${pad(date.getDate())}`
    + ` ${pad(date.getHours())}`
    + `:${pad(date.getMinutes())}`
    + `:${pad(date.getSeconds())}`
    + `   `
}

const pad = (s) => `${'0'.repeat(2 - s.toString().length)}${s}`

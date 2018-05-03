// packages
const stats = require('./fs/stats')
const {resolve, join} = require('path')
const readdir = require('./fs/readdir')
const takeOverFile = require('./take-over-file')


module.exports = async (origin, end) => {
  // both are folders
  await recursive(origin, end)
}


const recursive = async (origin, end) => {
  const originContents = await readdir(origin)
  const endContents = await readdir(end)

  // skip singular files
  let contents = originContents.filter((n) => endContents.indexOf(n) != -1)
  contents = contents.filter(filter)

  for (let i=0; i < contents.length; i++) {
    const name = contents[i]

    const oPath = join(origin, name)
    const ePath = join(end, name)

    const oStats = await stats(oPath)
    const eStats = await stats(ePath)

    if (oStats.isDirectory() && eStats.isDirectory()) {
      await takeOverFile(oPath, ePath)
      await recursive(oPath, ePath)
    }

    if (oStats.isFile() && eStats.isFile()) {
      await takeOverFile(oPath, ePath)
    }
  }
}


// all files and folders that will be ignored
const filter = (name) => {
  switch (name) {
    case '.git':
    case 'node_modules':
      return false

    default:
      return true
  }

  return true
}

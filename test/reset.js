// packages
const {resolve, join} = require('path')
const stats = require('../src/fs/stats')
const utimes = require('../src/fs/utimes')
const readdir = require('../src/fs/readdir')


const main = async () => {
  // old
  await recur(resolve(`${__dirname}/old-struct`))

  // new
  await recur(resolve(`${__dirname}/new-struct`), true)
}

const recur = async (path, newStruct) => {
  const fStats = await stats(path)

  const time = newStruct ? 1577880000000 : 661014915000

  if (fStats.isDirectory()) {
    await utimes(path, time, time, time)

    const contents = await readdir(path)
    for (let i=0; i < contents.length; i++) {
      const name = contents[i]
      recur(join(path, name), newStruct)
    }
  }

  if (fStats.isFile()) {
    await utimes(path, time, time, time)
  }
}


main().catch(console.error)

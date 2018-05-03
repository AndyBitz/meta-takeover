#!/usr/bin/env node

// packages
const {resolve} = require('path')
const stats = require('./fs/stats')
const takeOverFile = require('./take-over-file')
const handleContents = require('./handle-contents')


if (process.argv.length < 4) {
  console.log(`\n  usage: meta-take-over /src/folder/or/file /dest/folder/or/file\n`)
  process.exit(0)
}


const main = async () => {
  // arguments
  const origin = resolve(process.argv[2])
  const end = resolve(process.argv[3])

  // intro
  process.stdout.write(`\x1b[36m`)
  process.stdout.write(`  meta takeover\n\n`)
  process.stdout.write(`\x1b[0m`)

  const originStats = await stats(origin)
  const endStats = await stats(end)

  if (originStats.isFile() && endStats.isFile()) {
    await takeOverFile(origin, end)
    return // end program
  }

  if (originStats.isDirectory() && endStats.isDirectory()) {
    await handleContents(origin, end) // recursive check

    // change folder data
    await takeOverFile(origin, end)

    return // end program
  }
}

main().catch(console.error)

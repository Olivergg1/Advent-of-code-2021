const fs = require('fs')

const test = () => {
  let horizontal = 0,
    depth = 0,
    aim = 0
  fs.readFile('./input/day2.txt', 'utf8', (err, data) => {
    if (err) return console.log(err)
    const lines = data.split('\n').map((x) => x.split(' '))

    for (let [cmd, value] of lines) {
      const val = Number(value)
      switch (cmd) {
        case 'forward':
          horizontal += val
          depth += aim * val
          break
        case 'up':
          aim -= val
          break
        case 'down':
          aim += val
          break
      }
    }
    console.log(horizontal, depth, aim, horizontal * depth)
  })
}

test()

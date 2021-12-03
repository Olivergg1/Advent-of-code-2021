const fs = require('fs')

const test = () => {
  let totalDepth = 0
  let prev = 0
  fs.readFile('./input/day1.txt', 'utf8', (err, data) => {
    if (err) return console.error(err)

    const arr = data.split('\n').map((x) => Number(x))

    for (let i = 0; i < arr.length; i++) {
      prev = arr[i] + arr[i + 1] + arr[i + 2] || 0
      const curr = arr[i + 1] + arr[i + 2] + arr[i + 3]
      if (prev < curr) totalDepth++
    }
    console.log(totalDepth)
  })
}

test()

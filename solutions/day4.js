const fs = require('fs')

const part1 = (data) => {
  const newData = data.split('\r\n\r\n')
  const numbersDrawn = newData[0].split(',')
  const tiles = newData.splice(1, newData.length).map((x) => x.split('\r\n'))
  console.log(tiles)
}

const main = () => {
  fs.readFile('./input/day4.txt', 'utf8', (err, data) => {
    if (err) return console.log(err)

    part1(data)
  })
}

main()

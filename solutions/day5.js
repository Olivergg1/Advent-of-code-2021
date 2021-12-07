const fs = require('fs')

const manageData = (data) => {
  const newData = data.split('\n').map((x) =>
    x.split('->').map((s) =>
      s
        .trim()
        .split(',')
        .map((i) => Number(i))
    )
  )
  return newData
}

const part1 = (d) => {
  const data = manageData(d)
  const grid = {}

  for (let [[startX, startY], [endX, endY]] of data) {
    //if (!(startX === endX) && !(startY === endY)) continue
    const [minX, maxX] = [Math.min(startX, endX), Math.max(startX, endX)]
    const [minY, maxY] = [Math.min(startY, endY), Math.max(startY, endY)]

    for (let y = minY; y < maxY + 1; y++) {
      for (let x = minX; x < maxX + 1; x++) {
        grid[`${x},${y}`] ? (grid[`${x},${y}`] += 1) : (grid[`${x},${y}`] = 1)
      }
    }
  }
  const overlaps = Object.entries(grid).reduce(
    (x, [_, i]) => (i > 1 ? x + 1 : x),
    0
  )
  return overlaps
}

const part2 = (d) => {
  const data = manageData(d)
  const grid = {}

  for (let [[startX, startY], [endX, endY]] of data) {
    const isDiagonal = !(startX === endX) && !(startY === endY)

    if (!isDiagonal) {
      const [minX, maxX] = [Math.min(startX, endX), Math.max(startX, endX)]
      const [minY, maxY] = [Math.min(startY, endY), Math.max(startY, endY)]

      for (let y = minY; y < maxY + 1; y++) {
        for (let x = minX; x < maxX + 1; x++) {
          grid[`${x},${y}`] ? (grid[`${x},${y}`] += 1) : (grid[`${x},${y}`] = 1)
        }
      }
    } else {
      let down = startY < endY
      let right = startX < endX ? 1 : -1
      y = startY

      for (let x = startX; (right === 1) ? (x <= endX) : (x >= endX); x += 1 * right) {
        grid[`${x},${y}`] ? (grid[`${x},${y}`] += 1) : (grid[`${x},${y}`] = 1)
        down ? y++ : y--
      }
    }
  }
  const overlaps = Object.entries(grid).reduce((x, [_, i]) => (i > 1 ? x + 1 : x), 0)
  return overlaps
}

const main = () => {
  fs.readFile('./input/day5.txt', 'utf8', (err, data) => {
    if (err) return console.log(err)

    console.log(part2(data))
  })
}

main()

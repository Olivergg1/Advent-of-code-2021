const { create } = require('domain')
const fs = require('fs')

const manageData = (data) => {
  const newData = data.split("\n").map(x => x.split("->").map(s => s.trim().split(",").map(i => Number(i))))
  return newData
}

const part1 = (d) => {
  const createGrid = (h = 0, w = 0) => { 
    let grid = []
    for (let i = 0; i < h; i++) {
      grid[i] = []
      for (let j = 0; j < w; j++) {
        grid[i][j] = "."
      }
    }
    //let horizontal = [...Array(h).keys()].forEach(_ => grid[0])
    //console.log(horizontal);
    return grid
  }

  const data = manageData(d)
  console.log(createGrid(3, 3))
  for (let [[startX, startY], [endX, endY]] of data) {
    //console.log(endY);
  }
}

const main = () => {
  fs.readFile('./input/day5.txt', 'utf8', (err, data) => {
    if (err) return console.log(err)

    part1(data)
  })
}

main()

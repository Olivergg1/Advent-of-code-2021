const fs = require('fs')
const ROWS = 5
const COLUMNS = 5

const manageData = (data) => {
  const newData = data.split('\r\n\r\n')
  const numbersDrawn = newData[0].split(',').map((i) => Number(i))
  const tiles = newData
    .splice(1, newData.length)
    .map((x) => x.split('\r\n'))
    .map((tile) =>
      tile.map((row) =>
        row
          .split(' ')
          .filter((s) => s !== '')
          .map((s) => Number(s))
      )
    )

  return [numbersDrawn, tiles]
}

function intersect(a, b) {
  var setB = new Set(b)
  return a.filter((x) => setB.has(x))
}

const part1 = (data) => {
  const [numbers, tiles] = manageData(data)
  let drawnNumbers = []
  let winningTile = null

  for (let n of numbers) {
    if (winningTile) break
    drawnNumbers.push(n)
    for (let t in tiles) {
      for (let c = 0; c < COLUMNS; c++) {
        if (winningTile) break
        let column = []
        for (let r = 0; r < ROWS; r++) {
          if (winningTile) break
          let matchingNumbers = intersect(tiles[t][r], drawnNumbers).sort()
          let currentRow = [...tiles[t][r]].sort()
          if (
            matchingNumbers.length === ROWS &&
            matchingNumbers.every((v, i) => v === currentRow[i])
          ) {
            winningTile = tiles[t]
              .join(',')
              .split(',')
              .map((i) => Number(i))
            break
          }
          column.push(tiles[t][r][c])
        }

        let matchingNumbers = ([] = intersect(column, drawnNumbers).sort())
        let sortedColumn = column.sort()
        if (
          matchingNumbers.length === COLUMNS &&
          matchingNumbers.every((v, i) => v === sortedColumn[i])
        ) {
          winningTile = tiles[t]
            .join(',')
            .split(',')
            .map((i) => Number(i))
          break
        }
        column = []
      }
    }
  }

  const markedNumbers = new Set(drawnNumbers)
  console.log(winningTile)
  const sumOfUnmarked = [...new Set(winningTile)]
    .filter((x) => !markedNumbers.has(x))
    .reduce((prev, curr) => prev + curr)
  console.log(sumOfUnmarked * drawnNumbers[drawnNumbers.length - 1])
}

const part2 = (data) => {
  const [numbers, tiles] = manageData(data)
  let drawnNumbers = []
  let winningTile = []

  for (let n of numbers) {
    if (tiles.length === 0) break
    if (tiles.length === 1) {
      winningTile = tiles[0]
        .join(',')
        .split(',')
        .map((i) => Number(i))
    }

    drawnNumbers.push(n)
    for (let t = 0; t < tiles.length; t++) {
      col: for (let c = 0; c < COLUMNS; c++) {
        let column = []
        for (let r = 0; r < ROWS; r++) {
          let matchingNumbers = intersect(tiles[t][r], drawnNumbers).sort()
          let currentRow = [...tiles[t][r]].sort()
          if (
            matchingNumbers.length === ROWS &&
            matchingNumbers.every((v, i) => v === currentRow[i])
          ) {
            tiles.splice(t, 1)
            break col
          }
          column.push(tiles[t][r][c])
        }

        let matchingNumbers = intersect(column, drawnNumbers).sort()
        let sortedColumn = column.sort()
        if (
          matchingNumbers.length === COLUMNS &&
          matchingNumbers.every((v, i) => v === sortedColumn[i])
        ) {
          tiles.splice(t, 1)
          break col
        }
        column = []
      }
    }
  }

  const markedNumbers = new Set(drawnNumbers)
  const sumOfUnmarked = [...new Set(winningTile)]
    .filter((x) => !markedNumbers.has(x))
    .reduce((prev, curr) => prev + curr)
  console.log(
    sumOfUnmarked,
    drawnNumbers[drawnNumbers.length - 1],
    sumOfUnmarked * drawnNumbers[drawnNumbers.length - 1]
  )
}

const main = () => {
  fs.readFile('./input/day4.txt', 'utf8', (err, data) => {
    if (err) return console.log(err)

    //part1(data)
    part2(data)
  })
}

main()

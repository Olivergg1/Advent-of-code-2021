const fs = require('fs')
const DAYS = 256

const manageData = (data) => {
  const newData = data.split(',').map(Number)
  return newData
}

function range(size, startAt = 0) {
  return [...Array(size).keys()].map(i => i + startAt);
}

const solution = (part, d) => {
  const crabs = manageData(d)
  const highestPos = [...new Set(crabs)].reduce((p, c) => Math.max(p, c))
  const totalFuels = {}
  const positions = range(highestPos)
  for(let pos of positions) {
    for (let i = 0; i < crabs.length; i++) {
      if (!totalFuels[pos]) totalFuels[pos] = 0
      if (part === "part1") {
        totalFuels[pos] += Math.abs(crabs[i]-pos)
      } else {
        const usedFuel = Math.abs(crabs[i]-pos) !== 0 ? range(Math.abs(crabs[i]-pos)).map(i => i+1).reduce((c, v) => c+v) : 0
        totalFuels[pos] += usedFuel
      }
    }
  }
  console.log(totalFuels);
  return Object.entries(totalFuels).reduce((prev, curr) => prev[1] > curr[1] ? curr : prev)
}

const main = () => {
  fs.readFile('./input/day7.txt', 'utf8', (err, data) => {
    if (err) return console.log(err)
    
    console.log(solution("part2", data));
  })
}

main()

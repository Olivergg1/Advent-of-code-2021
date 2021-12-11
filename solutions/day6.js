const fs = require('fs')
const DAYS = 256

const manageData = (data) => {
  const newData = data.split(',').map(Number)
  return newData
}

const part1 = (d) => {
  const fishes = manageData(d)
  for (let i = 0; i < DAYS; i++) {
    for (let f in fishes) {
      if (fishes[f] !== 0) {
        fishes[f]--
        continue
      }
      fishes[f] = 6
      fishes.push(8)
    }
  }
  console.log(fishes.length);
}

const part2 = (d) => {
  let input = manageData(d)
  let fishes = new Array(9).fill(0)
  input.forEach(x => fishes[+x]++)
  for(let i = 0; i < DAYS; i++) {
      let births = fishes.shift()
      fishes[6] += births
      fishes.push(births)
  }
  console.log(fishes.length);
  return fishes.reduce((sum, x) => sum + x)
}

const main = () => {
  fs.readFile('./input/day6.txt', 'utf8', (err, data) => {
    if (err) return console.log(err)

    
    console.log(part2(data));
  })
}

main()
